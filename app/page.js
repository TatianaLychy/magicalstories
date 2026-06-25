"use client";

import { useState } from "react";

const generators = [
  {
    key: "artist",
    icon: "🎨",
    title: "The Artist's Vision",
    description:
      "Describe any scene and receive it translated through the visual language of great masters, from Rembrandt to Bilibin, Klimt to Bouguereau.",
    tag: "Midjourney",
    file: "/Artist-s-Vision.html",
    active: true,
  },
  {
    key: "fairy",
    icon: "📖",
    title: "Storybook Character Generator",
    description:
      "Build fairy tale characters in flat-lay photography style with complete prompts for Midjourney and Seedance 2.0.",
    tag: "Midjourney · Seedance",
    file: "/FairyTale-Flat-lay-photography-style.html",
    active: true,
  },
  {
    key: "flower",
    icon: "🌸",
    title: "Flower Greeting Cards",
    description:
      "Create endless greeting card concepts with floral compositions, ready to paste into Midjourney v7.",
    tag: "Midjourney v7",
    file: "/Flower-Cards-Generator.html",
    active: true,
  },
  {
    key: "kling",
    icon: "✨",
    title: "Kling Animation Builder",
    description:
      "Camera moves, cinematic motion and elegant prompt structure for AI video workflows.",
    tag: "Kling",
    active: false,
  },
  {
    key: "seedance",
    icon: "🎬",
    title: "Seedance Scene Generator",
    description:
      "Multi-shot sequences with consistent atmosphere and visual continuity for Seedance 2.0.",
    tag: "Seedance",
    active: false,
  },
  {
    key: "consistency",
    icon: "🖼️",
    title: "Character Consistency Sheet",
    description:
      "Keep one character consistent across poses, scenes, styling notes and story moments.",
    tag: "Midjourney",
    active: false,
  },
];

const faq = [
  {
    q: "Can I download the generators?",
    a: "No. The generators are meant to be used inside your private studio experience and are not sold as downloadable products.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Both plans include a 3-day free trial before billing starts.",
  },
  {
    q: "What happens if I cancel?",
    a: "Your access pauses when the subscription ends, and resumes again when you reactivate it.",
  },
  {
    q: "Which tools are supported?",
    a: "The current generators are designed for Midjourney, Kling and Seedance workflows.",
  },
  {
    q: "How often will new generators appear?",
    a: "At least one new generator is planned each month, with yearly members getting earlier access to selected releases.",
  },
];

export default function Page() {
  const [openGen, setOpenGen] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(160deg, #0a1a0e 0%, #1a3a1f 35%, #2d5a27 65%, #1a3a1f 85%, #0a1a0e 100%);
          background-attachment: fixed;
          color: #f0e6c8;
        }
        a { color: inherit; text-decoration: none; }
      `}</style>

      {openGen ? (
        <div style={{ position: "fixed", inset: 0, background: "#0a1a0e", zIndex: 1000, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid rgba(212,175,55,.2)", background: "rgba(10,26,14,.95)" }}>
            <button
              onClick={() => setOpenGen(null)}
              style={{ background: "transparent", border: "1px solid rgba(212,175,55,.25)", color: "#a8c5a0", borderRadius: 999, padding: "8px 14px", cursor: "pointer" }}
            >
              ← Back to Studio
            </button>
            <div style={{ color: "#d4af37", fontStyle: "italic" }}>{openGen.title}</div>
            <div style={{ width: 120 }} />
          </div>
          <iframe src={openGen.file} title={openGen.title} style={{ flex: 1, border: 0, width: "100%" }} />
        </div>
      ) : null}

      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 20, background: "rgba(10,26,14,.82)", border: "1px solid rgba(212,175,55,.3)", borderRadius: 8, padding: "6px 12px", color: "#d4af37", fontStyle: "italic", fontSize: 12 }}>
        © 2026 Tatiana Lychy
      </div>

      <nav style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: "rgba(10,26,14,.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,175,55,.18)" }}>
        <div style={{ color: "#d4af37", fontStyle: "italic" }}>✦ Magical Prompt Studio</div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#generators" style={{ color: "#a8c5a0", fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em" }}>Generators</a>
          <a href="#pricing" style={{ color: "#a8c5a0", fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em" }}>Pricing</a>
          <a href="#faq" style={{ color: "#a8c5a0", fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em" }}>FAQ</a>
          <a href="#pricing" style={{ background: "#d4af37", color: "#0a1a0e", padding: "8px 14px", borderRadius: 999, fontSize: 13 }}>Start Free Trial</a>
        </div>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 96px" }}>
        <section style={{ textAlign: "center", padding: "88px 0 64px" }}>
          <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".55em", fontSize: 12, marginBottom: 24 }}>✦   ✦   ✦</div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.3rem)", fontWeight: 400, lineHeight: 1.12, margin: 0 }}>
            <span style={{ color: "#d4af37", fontStyle: "italic" }}>Magical</span> Prompt Studio
          </h1>
          <p style={{ maxWidth: 720, margin: "16px auto 34px", color: "#a8c5a0", fontStyle: "italic", fontSize: 18, lineHeight: 1.7 }}>
            A private library of AI generators for animators, illustrators and storytellers.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
 <a href="https://whop.com/checkout/plan_e5EQbgYs95UvS" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", borderRadius: 999, background: "linear-gradient(135deg,#b8922a 0%,#d4af37 50%,#b8922a 100%)", color: "#0a1a0e", boxShadow: "0 6px 22px rgba(212,175,55,.22)" }}>Start 3-Day Free Trial</a>
            <a href="#generators" style={{ padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(212,175,55,.3)", color: "#d4af37" }}>Explore the Generators</a>
          </div>
        </section>

        <section id="generators" style={{ padding: "48px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ The Collection ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, margin: 0 }}>The <span style={{ color: "#d4af37", fontStyle: "italic" }}>Generators</span></h2>
            
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
            {generators.map((gen) => (
              <div key={gen.key} style={{ position: "relative", background: "rgba(13,32,22,.75)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 20, padding: 24, opacity: gen.active ? 1 : 0.52, display: "flex", flexDirection: "column", minHeight: 260 }}>
                {!gen.active ? <div style={{ position: "absolute", top: 16, right: 16, color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", padding: "2px 8px", borderRadius: 999, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>Coming Soon</div> : null}
                <div style={{ fontSize: 34, marginBottom: 14 }}>{gen.icon}</div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 400, fontSize: 22 }}>{gen.title}</h3>
                <p style={{ margin: 0, color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.7, flex: 1 }}>{gen.description}</p>
                <div style={{ marginTop: 16, display: "inline-block", width: "fit-content", color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", padding: "3px 10px", borderRadius: 999, fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em" }}>{gen.tag}</div>
                {gen.active ? (
                  <button onClick={() => setOpenGen(gen)} style={{ marginTop: 18, width: "100%", padding: "12px 14px", borderRadius: 10, background: "transparent", color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", cursor: "pointer" }}>
                    Open Generator →
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "24px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ The Process ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400, margin: 0 }}>How it <span style={{ color: "#d4af37", fontStyle: "italic" }}>works</span></h2>
          </div>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {[
              ["I", "Try for Free", "There is a 3-day free trial when you subscribe. Full access to all generators, no charge until the trial ends."],
              ["II", "Choose a Generator", "Open any tool from the library. Each one is built for a specific creative workflow."],
              ["III", "Generate Your Prompt", "Fill the fields, click generate, and use the finished prompt inside Midjourney, Kling or Seedance."],
              ["IV", "Create & Return", "Your library grows over time as new generators are added to the studio."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "54px 1fr", gap: 18, padding: "22px 0", borderBottom: "1px solid rgba(212,175,55,.08)" }}>
                <div style={{ color: "#d4af37", opacity: 0.42, fontSize: 32, fontStyle: "italic", textAlign: "center" }}>{n}</div>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontWeight: 400, fontSize: 18 }}>{t}</h3>
                  <p style={{ margin: 0, color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.8 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" style={{ padding: "16px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ Subscription ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, margin: 0 }}>Choose Your <span style={{ color: "#d4af37", fontStyle: "italic" }}>Plan</span></h2>
            <p style={{ color: "#a8c5a0", fontStyle: "italic", marginTop: 12 }}>Simple, elegant pricing with full access.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22, maxWidth: 760, margin: "0 auto" }}>
            <div style={{ background: "rgba(13,32,22,.75)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 22, padding: 28 }}>
              <div style={{ color: "#d4af37", opacity: 0.78, textTransform: "uppercase", letterSpacing: ".28em", fontSize: 12, marginBottom: 14 }}>Monthly</div>
              <div style={{ fontSize: 54, lineHeight: 1, fontStyle: "italic" }}>$11.99</div>
              <div style={{ color: "#a8c5a0", fontStyle: "italic", marginTop: 4 }}>per month</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, color: "#d4af37", border: "1px solid rgba(212,175,55,.28)", borderRadius: 999, padding: "4px 12px", fontSize: 12 }}>• 3-day free trial</div>
              <ul style={{ paddingLeft: 18, color: "#a8c5a0", lineHeight: 1.9, fontStyle: "italic", margin: "22px 0" }}>
                <li>Full access to all generators</li>
                <li>New tools added every month</li>
                <li>Use in any browser</li>
                <li>Cancel anytime</li>
              </ul>
              <a href="https://whop.com/checkout/plan_e5EQbgYs95UvS" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 18, background: "linear-gradient(135deg,#b8922a 0%,#d4af37 50%,#b8922a 100%)", color: "#0a1a0e", padding: "12px 18px", borderRadius: 999, textDecoration: "none", boxShadow: "0 6px 22px rgba(212,175,55,.22)" }}>Start Monthly</a>
            </div>
            <div style={{ background: "rgba(13,32,22,.9)", border: "1px solid rgba(212,175,55,.45)", borderRadius: 22, padding: 28, position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#d4af37", color: "#0a1a0e", padding: "4px 12px", borderRadius: 999, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Best Value</div>
              <div style={{ color: "#d4af37", opacity: 0.78, textTransform: "uppercase", letterSpacing: ".28em", fontSize: 12, marginBottom: 14 }}>Yearly</div>
              <div style={{ fontSize: 54, lineHeight: 1, fontStyle: "italic" }}>$90</div>
              <div style={{ color: "#a8c5a0", fontStyle: "italic", marginTop: 4 }}>per year · $11.99 / month</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, color: "#d4af37", border: "1px solid rgba(212,175,55,.28)", borderRadius: 999, padding: "4px 12px", fontSize: 12 }}>• 3-day free trial</div>
              <ul style={{ paddingLeft: 18, color: "#a8c5a0", lineHeight: 1.9, fontStyle: "italic", margin: "22px 0" }}>
                <li>Everything in Monthly</li>
                <li>Priority access to new generators</li>
                <li>Exclusive bonus style packs</li>
                <li>One payment for the full year</li>
              <a href="https://whop.com/checkout/plan_Nm1bqb4HqA95A" style={{ display: "inline-block", marginTop: 18, background: "linear-gradient(135deg,#b8922a 0%,#d4af37 50%,#b8922a 100%)", color: "#0a1a0e", padding: "12px 18px", borderRadius: 999, textDecoration: "none", boxShadow: "0 6px 22px rgba(212,175,55,.22)" }}>Start Yearly</a>
              <a href="#" style={{ display: "block", textAlign: "center", padding: "13px 16px", borderRadius: 10, background: "linear-gradient(135deg,#b8922a 0%,#d4af37 50%,#b8922a 100%)", color: "#0a1a0e" }}>Start Free Trial</a>
            </div>
          </div>
        </section>

        <section id="faq" style={{ padding: "0 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ Questions ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400, margin: 0 }}><span style={{ color: "#d4af37", fontStyle: "italic" }}>Frequently</span> Asked</h2>
          </div>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {faq.map((item, i) => (
              <div key={item.q} style={{ borderBottom: "1px solid rgba(212,175,55,.1)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width: "100%", background: "transparent", border: 0, color: "#f0e6c8", textAlign: "left", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 16 }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: "#d4af37", fontSize: 22 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i ? <p style={{ margin: "0 0 18px", color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.8 }}>{item.a}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "0 0 40px" }}>
          <div style={{ textAlign: "center", background: "rgba(13,32,22,.7)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 22, padding: "56px 24px" }}>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 400, margin: "0 0 10px" }}>
              Begin creating <span style={{ color: "#d4af37", fontStyle: "italic" }}>today</span>
            </h2>
            <p style={{ color: "#a8c5a0", fontStyle: "italic", margin: "0 0 24px", lineHeight: 1.8 }}>Both plans include a 3-day free trial. No charge until it ends.</p>
            <a href="#pricing" style={{ display: "inline-block", padding: "14px 28px", borderRadius: 999, background: "linear-gradient(135deg,#b8922a 0%,#d4af37 50%,#b8922a 100%)", color: "#0a1a0e" }}>Choose Your Plan</a>
          </div>
        </section>

        <footer style={{ textAlign: "center", paddingTop: 26, borderTop: "1px solid rgba(212,175,55,.08)" }}>
          <p style={{ color: "#a8c5a0", fontStyle: "italic", fontSize: 18 }}>Every ordinary scene deserves an extraordinary vision</p>
          <p style={{ color: "#6a9e62", fontStyle: "italic" }}>Created with love by Tatiana Lychy</p>
          <p style={{ color: "rgba(212,175,55,.36)", fontSize: 12, letterSpacing: ".05em" }}>© 2026 Tatiana Lychy — All Rights Reserved · Generators are protected.</p>
        </footer>
      </main>
    </>
  );
}
