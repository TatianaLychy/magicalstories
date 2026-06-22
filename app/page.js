'use client';

import { useState } from 'react';

export default function Page() {
  const [used, setUsed] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate(usedOverride) {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ used: usedOverride ?? used }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          setResult({ error: 'login_required' });
        } else if (res.status === 403) {
          setResult({ error: 'subscription_required' });
        } else if (res.status === 503) {
          setResult({ error: 'check_failed' });
        } else {
          setResult({ error: 'unknown' });
        }
        return;
      }
      const data = await res.json();
      setUsed(data.used);
      setResult({ title: data.title, description: data.description, prompt: data.prompt });
    } finally {
      setLoading(false);
    }
  }

  function resetSession() {
    setUsed({});
    setResult(null);
    generate({});
  }

  async function copyPrompt() {
    if (!result?.prompt) return;
    try {
      await navigator.clipboard.writeText(result.prompt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = result.prompt;
      ta.style.position = 'fixed';
      ta.style.left = '-999999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Georgia, 'Times New Roman', serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #0d2016 0%, #1a3a1f 30%, #2d5a27 60%, #1b3a22 80%, #0a1a0e 100%);
          background-attachment: fixed;
          overflow-x: hidden;
        }
        .container { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem; }
        .copyright-badge {
          position: fixed; top: 1rem; right: 1rem;
          background: rgba(10,26,14,0.75); backdrop-filter: blur(12px);
          padding: 0.45rem 1rem; border-radius: 0.5rem;
          border: 1px solid rgba(212,175,55,0.35); z-index: 1000;
          color: #d4af37; font-size: 0.8rem; font-family: Georgia, serif;
          font-style: italic; letter-spacing: 0.03em;
        }
        .header { text-align: center; padding-top: 2.5rem; margin-bottom: 2.5rem; }
        .header-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 100px; height: 100px;
          background: radial-gradient(circle, #2d5a27, #0d2016);
          border: 2px solid rgba(212,175,55,0.5); border-radius: 50%;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 30px rgba(212,175,55,0.2), 0 0 60px rgba(45,90,39,0.4), inset 0 0 20px rgba(212,175,55,0.1);
          font-size: 3rem;
        }
        .title {
          font-size: 3.2rem; font-weight: normal; color: #f0e6c8; margin-bottom: 0.4rem;
          letter-spacing: 0.05em; text-shadow: 0 2px 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15);
        }
        .title-ornament { color: #d4af37; font-size: 1.2rem; letter-spacing: 0.3em; }
        .subtitle { font-size: 1.1rem; color: #a8c5a0; margin: 0.75rem 0 1.25rem; font-style: italic; letter-spacing: 0.04em; }
        .possibilities-badge { display: inline-block; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.4); border-radius: 9999px; padding: 0.5rem 1.75rem; }
        .possibilities-text { color: #d4af37; font-size: 1rem; font-style: italic; letter-spacing: 0.06em; }
        .ornament-divider { text-align: center; color: rgba(212,175,55,0.5); font-size: 1.1rem; letter-spacing: 0.5em; margin: 1.5rem 0; }
        .button-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .main-button {
          display: inline-flex; align-items: center; gap: 0.85rem; padding: 1.2rem 2.75rem;
          background: linear-gradient(135deg, #2d5a27 0%, #3d7a35 40%, #2d5a27 100%);
          color: #f0e6c8; border: 1px solid rgba(212,175,55,0.5); border-radius: 9999px;
          font-family: Georgia, serif; font-size: 1.15rem; font-style: italic; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.2);
          letter-spacing: 0.03em;
        }
        .main-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .reset-button {
          display: inline-flex; align-items: center; gap: 0.85rem; padding: 1.2rem 2.75rem;
          background: linear-gradient(135deg, #1a2e1a 0%, #243824 40%, #1a2e1a 100%);
          color: #a8c5a0; border: 1px solid rgba(168,197,160,0.3); border-radius: 9999px;
          font-family: Georgia, serif; font-size: 1.15rem; font-style: italic; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.4); letter-spacing: 0.03em;
        }
        .btn-icon { font-size: 1.6rem; display: inline-block; }
        .empty-state { text-align: center; color: #a8c5a0; padding: 2rem 0; }
        .story-card {
          background: rgba(13,32,22,0.7); backdrop-filter: blur(16px); border-radius: 1.5rem;
          padding: 2.25rem; margin-bottom: 2rem; border: 1px solid rgba(212,175,55,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1);
        }
        .card-label { font-size: 0.72rem; font-family: Georgia, serif; color: rgba(212,175,55,0.6); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.4rem; }
        .card-title { font-size: 1.6rem; color: #f0e6c8; font-weight: normal; letter-spacing: 0.03em; line-height: 1.3; margin-bottom: 1.5rem; }
        .description-box { background: rgba(45,90,39,0.15); border-radius: 0.75rem; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 3px solid rgba(212,175,55,0.4); }
        .description-text { color: #c8dfc4; font-style: italic; font-size: 1rem; line-height: 1.7; }
        .prompt-box { background: rgba(0,0,0,0.35); border-radius: 0.85rem; padding: 1.5rem; border: 1px solid rgba(212,175,55,0.2); }
        .prompt-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.85rem; color: #d4af37; font-size: 0.85rem; font-family: Georgia, serif; font-style: italic; letter-spacing: 0.08em; }
        .prompt-text { color: #e8f0e6; background: rgba(255,255,255,0.04); padding: 1rem 1.1rem; border-radius: 0.5rem; font-family: 'Courier New', Courier, monospace; font-size: 0.88rem; line-height: 1.75; margin-bottom: 1rem; word-wrap: break-word; border: 1px solid rgba(255,255,255,0.07); }
        .copy-button {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem;
          background: linear-gradient(135deg, #2d5a27, #3d7a35); color: #f0e6c8; border: 1px solid rgba(212,175,55,0.3);
          border-radius: 0.5rem; font-family: Georgia, serif; font-size: 0.95rem; font-style: italic; cursor: pointer; letter-spacing: 0.04em;
        }
        .footer { text-align: center; padding: 2.5rem 0 1.5rem; color: #6a9e62; font-style: italic; font-size: 0.9rem; line-height: 1.8; }
        .footer-brand { color: #a8c5a0; font-size: 0.95rem; margin-bottom: 0.3rem; }
        .footer-copy { color: rgba(212,175,55,0.5); font-size: 0.78rem; letter-spacing: 0.05em; margin-top: 0.8rem; }
        .error-box { color: #e8a0a0; text-align: center; padding: 1.5rem; font-style: italic; }
        @media (max-width: 640px) {
          .title { font-size: 2.1rem; }
          .main-button, .reset-button { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="copyright-badge">© 2026 Tatiana Lychy</div>

      <div className="container">
        <div className="header">
          <div className="header-icon">🌿</div>
          <div className="title-ornament">✦ ✦ ✦</div>
          <h1 className="title">Magical Stories</h1>
          <p className="subtitle">Fairy Tale Prompt Generator</p>
          <div className="possibilities-badge">
            <p className="possibilities-text">✨ Infinite enchanted combinations</p>
          </div>
        </div>

        <div className="ornament-divider">· · · ◆ · · ·</div>

        <div className="button-group">
          <button className="main-button" disabled={loading} onClick={() => generate()}>
            <span className="btn-icon">{loading ? '🌀' : '🌿'}</span>
            <span>{loading ? 'Weaving the story...' : 'Generate New Story'}</span>
          </button>
          <button className="reset-button" onClick={resetSession}>
            <span className="btn-icon">🌙</span>
            <span>New Session</span>
          </button>
        </div>

        {result?.error === 'login_required' && (
          <div className="story-card" style={{ textAlign: 'center' }}>
            <p style={{ color: '#e8f0e6', marginBottom: '1.25rem' }}>
              Sign in with your Whop account to use the generator.
            </p>
            <a href="/api/auth/login" className="main-button" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <span>🔑</span>
              <span>Sign in with Whop</span>
            </a>
          </div>
        )}

        {result?.error === 'subscription_required' && (
          <div className="story-card" style={{ textAlign: 'center' }}>
            <p style={{ color: '#e8f0e6', marginBottom: '1.25rem' }}>
              You're signed in, but you don't have an active subscription yet.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CHECKOUT_URL || '#'}
              className="main-button"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              <span>✨</span>
              <span>Subscribe now</span>
            </a>
          </div>
        )}

        {result?.error === 'check_failed' && (
          <div className="error-box">
            Couldn't verify your subscription right now. Please try again in a moment.
          </div>
        )}

        {result?.error === 'unknown' && (
          <div className="error-box">Something went wrong. Please try again.</div>
        )}

        {result && !result.error && (
          <div className="story-card">
            <div className="card-label">✦ Fairy Tale Prompt</div>
            <h2 className="card-title">{result.title}</h2>
            <div className="description-box">
              <p className="description-text">{result.description}</p>
            </div>
            <div className="prompt-box">
              <div className="prompt-header">
                <span>🖼️</span>
                <span>Midjourney Prompt — ready to copy</span>
              </div>
              <p className="prompt-text">{result.prompt}</p>
              <button className="copy-button" onClick={copyPrompt}>
                <span>{copied ? '✓' : '📋'}</span>
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        )}

        {!result && (
          <div className="empty-state">
            <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🌿 Press the button to open a fairy tale...</p>
            <p style={{ fontSize: '0.875rem', color: '#6a9e62', fontStyle: 'italic' }}>Every prompt is a new enchanted world</p>
          </div>
        )}

        <div className="footer">
          <p className="footer-brand">🌿 Created with love by Tatiana Lychy · @TatianaLychy</p>
          <p style={{ fontSize: '1.15rem', color: '#c8dfc4', letterSpacing: '0.04em' }}>A fairy tale is the breath of eternity</p>
          <p className="footer-copy">© 2026 Tatiana Lychy · All Rights Reserved · For personal use only</p>
        </div>
      </div>
    </>
  );
}
