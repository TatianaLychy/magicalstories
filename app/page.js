'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [used, setUsed] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loginErrorDetail, setLoginErrorDetail] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginError = params.get('login_error');
    if (loginError) {
      setLoginErrorDetail({ code: loginError, desc: params.get('desc') });
    }
  }, []);

  async function generate(usedOverride) {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ used: usedOverride ?? used }),
    });
    const data = await res.json();
    if (data.error === 'not_subscribed') {
      window.location.href = '/api/auth/login';
      return;
    }
    if (data.error) {
      setResult({ error: data.error });
    } else {
      setResult(data);
      setUsed(data.usedMap ?? {});
    }
    setLoading(false);
  }

  function handleLogin() {
    window.location.href = '/api/auth/login';
  }

  function copyPrompt() {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0d2016 0%, #1a3a1f 30%, #2d5a27 60%, #1b3a22 80%, #0a1a0e 100%)', fontFamily: 'Georgia, serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
          <h1 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '0.5rem' }}>Magical Stories</h1>
          <p style={{ color: '#a8c5a0', fontStyle: 'italic' }}>Fairy Tale Prompt Generator</p>
        </div>

        {loginErrorDetail && (
          <div style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(180,60,60,0.5)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', color: '#ffaaaa', textAlign: 'center' }}>
            <p>Sign-in failed. Please try again.</p>
            <button onClick={handleLogin} style={{ marginTop: '0.5rem', padding: '0.5rem 1.5rem', background: '#d4af37', color: '#0d2016', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
              Try Again
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => generate()}
            disabled={loading}
            style={{ padding: '0.85rem 2rem', background: loading ? '#555' : 'linear-gradient(135deg, #2d5a27, #4a8a40)', color: '#fff', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', fontFamily: 'Georgia, serif' }}>
            {loading ? '✨ Creating...' : '✨ Generate New Story'}
          </button>

          <button
            onClick={handleLogin}
            style={{ padding: '0.85rem 2rem', background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'Georgia, serif' }}>
            🔑 Sign In with Whop
          </button>
        </div>

        {result?.error && (
          <div style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(180,60,60,0.5)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', color: '#ffaaaa', textAlign: 'center' }}>
            <p>{result.error === 'not_subscribed' ? 'Please sign in or subscribe to use this generator.' : "Couldn't generate a story right now. Please try again."}</p>
            <button onClick={handleLogin} style={{ marginTop: '0.75rem', padding: '0.5rem 1.5rem', background: '#d4af37', color: '#0d2016', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
              Sign In with Whop
            </button>
          </div>
        )}

        {result?.prompt && (
          <div style={{ background: 'rgba(10,26,14,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#e8d5a3', lineHeight: '1.7', marginBottom: '1rem' }}>{result.prompt}</p>
            <button onClick={copyPrompt} style={{ padding: '0.5rem 1.5rem', background: copied ? '#2d5a27' : 'rgba(212,175,55,0.2)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
              {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#6a9e62', fontStyle: 'italic', padding: '2rem' }}>
            <p>✨ Press the button to open a fairy tale...</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Every prompt is a new enchanted world</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#4a6a44', fontSize: '0.8rem' }}>
          <p>Created with love by Tatiana Lychy · @TatianaLychy</p>
          <p>© 2026 Tatiana Lychy · All Rights Reserved</p>
        </div>

      </div>
    </div>
  );
}
