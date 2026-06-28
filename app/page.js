"use client";

import Link from "next/link";
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
    key: "summer-adventures",
    icon: "☀️",
    title: "Summer Adventures",
    description:
      "Create warm, cozy summer scenes filled with sunshine, nostalgia, soft storytelling, and magical seasonal atmosphere.",
    tag: "Midjourney",
    file: "/AI-Summer-Adventures.html",
    active: true,
  },
  {
    key: "cosy-inspiration",
    icon: "🕯️",
    title: "Cosy Inspiration Generator",
    description:
      "Generate warm, intimate and cosy atmosphere prompts filled with soft light, comfort and quiet seasonal magic.",
    tag: "Midjourney",
    file: "/Cosy-Inspiration-Generator.html",
    active: true,
  },
];

const digitalProducts = [
  {
    key: "bonus-1",
    icon: "✨",
    title: "Bonus Style Packs",
    description:
      "Exclusive creative resources and visual direction packs reserved for Studio members.",
    status: "Included",
  },
  {
    key: "bonus-2",
    icon: "🕊️",
    title: "Prompt Collections",
    description:
      "Curated prompt collections and themed creative bundles added over time.",
    status: "Growing Library",
  },
  {
    key: "bonus-3",
    icon: "📚",
    title: "Digital Story Tools",
    description:
      "A developing collection of additional storytelling tools and creative digital products.",
    status: "Coming Soon",
  },
];

export default function StudioPage() {
  const [openGen, setOpenGen] = useState(null);

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(160deg, #08150c 0%, #122c19 35%, #214627 65%, #122c19 85%, #08150c 100%);
          background-attachment: fixed;
          color: #f0e6c8;
        }
        a { color: inherit; text-decoration: none; }
      `}</style>

      {openGen ? (
        <div style={{ position: "fixed", inset: 0, background: "#08150c", zIndex: 1000, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid rgba(212,175,55,.2)", background: "rgba(8,21,12,.96)", gap: 12 }}>
            <button
              onClick={() => setOpenGen(null)}
              style={{ background: "transparent", border: "1px solid rgba(212,175,55,.25)", color: "#a8c5a0", borderRadius: 999, padding: "8px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}
            >
              ← Back to Studio
            </button>
            <div style={{ color: "#d4af37", fontStyle: "italic", textAlign: "center", flex: 1 }}>{openGen.title}</div>
            <div style={{ width: 120 }} />
          </div>
          <iframe src={openGen.file} title={openGen.title} style={{ flex: 1, border: 0, width: "100%" }} />
        </div>
      ) : null}

      <nav style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: "rgba(8,21,12,.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,175,55,.18)", gap: 16, flexWrap: "wrap" }}>
        <div style={{ color: "#d4af37", fontStyle: "italic" }}>✦ Studio</div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#generators" style={{ color: "#a8c5a0", fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em" }}>Generators</a>
          <a href="#products" style={{ color: "#a8c5a0", fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em" }}>Products</a>
          <Link href="/" style={{ border: "1px solid rgba(212,175,55,.28)", color: "#d4af37", padding: "8px 14px", borderRadius: 999, fontSize: 13 }}>Back to Home</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 96px" }}>
        <section style={{ textAlign: "center", padding: "84px 0 54px" }}>
          <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".55em", fontSize: 12, marginBottom: 24 }}>✦   ✦   ✦</div>
          <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.12, margin: 0 }}>
            Welcome to the <span style={{ color: "#d4af37", fontStyle: "italic" }}>Studio</span>
          </h1>
          <p style={{ maxWidth: 760, margin: "16px auto 0", color: "#a8c5a0", fontStyle: "italic", fontSize: 18, lineHeight: 1.8 }}>
            A private creative space for prompt generators, story tools, and digital resources designed for artists, animators, and storytellers.
          </p>
        </section>

        <section style={{ padding: "0 0 54px" }}>
          <div style={{ background: "rgba(13,32,22,.72)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 24, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ color: "#d4af37", opacity: 0.7, letterSpacing: ".28em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ Magical Prompt Studio ✦</div>
            <h2 style={{ margin: "0 0 10px", fontWeight: 400, fontSize: 30 }}>
              Your creative library begins <span style={{ color: "#d4af37", fontStyle: "italic" }}>here</span>
            </h2>
            <p style={{ maxWidth: 720, margin: "0 auto", color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.8 }}>
              Explore generators, return to your favorite tools, and discover new digital products as the collection grows.
            </p>
          </div>
        </section>

        <section id="generators" style={{ padding: "10px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ Generators ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, margin: 0 }}>
              Open the <span style={{ color: "#d4af37", fontStyle: "italic" }}>tool</span> you need
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
            {generators.map((gen) => (
              <div key={gen.key} style={{ position: "relative", background: "rgba(13,32,22,.78)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", minHeight: 270 }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{gen.icon}</div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 400, fontSize: 22 }}>{gen.title}</h3>
                <p style={{ margin: 0, color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.7, flex: 1 }}>{gen.description}</p>
                <div style={{ marginTop: 16, display: "inline-block", width: "fit-content", color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", padding: "3px 10px", borderRadius: 999, fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em" }}>{gen.tag}</div>
                <button
                  onClick={() => setOpenGen(gen)}
                  style={{ marginTop: 18, width: "100%", padding: "12px 14px", borderRadius: 10, background: "transparent", color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", cursor: "pointer", fontFamily: "Georgia, serif" }}
                >
                  Open Generator →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="products" style={{ padding: "0 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={{ color: "#d4af37", opacity: 0.65, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>✦ Digital Products ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, margin: 0 }}>
              A growing <span style={{ color: "#d4af37", fontStyle: "italic" }}>library</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
            {digitalProducts.map((item) => (
              <div key={item.key} style={{ background: "rgba(13,32,22,.72)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 20, padding: 24, minHeight: 220, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 400, fontSize: 22 }}>{item.title}</h3>
                <p style={{ margin: 0, color: "#a8c5a0", fontStyle: "italic", lineHeight: 1.7, flex: 1 }}>{item.description}</p>
                <div style={{ marginTop: 16, display: "inline-block", width: "fit-content", color: "#d4af37", border: "1px solid rgba(212,175,55,.3)", padding: "3px 10px", borderRadius: 999, fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em" }}>{item.status}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "0 0 40px" }}>
          <div style={{ textAlign: "center", background: "rgba(13,32,22,.7)", border: "1px solid rgba(212,175,55,.18)", borderRadius: 22, padding: "52px 24px" }}>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 400, margin: "0 0 10px" }}>
              Return whenever inspiration <span style={{ color: "#d4af37", fontStyle: "italic" }}>calls</span>
            </h2>
            <p style={{ color: "#a8c5a0", fontStyle: "italic", margin: "0 auto 24px", lineHeight: 1.8, maxWidth: 720 }}>
              Your studio is designed to grow with your creative practice, one generator, one story, and one beautiful idea at a time.
            </p>
            <Link href="/" style={{ display: "inline-block", padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(212,175,55,.3)", color: "#d4af37" }}>
              Return to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
