export const metadata = {
  title: "Magical Prompt Studio · Tatiana Lychy",
  description: "A private studio for AI generators, prompt tools, and creative digital products for illustrators, animators, and storytellers.",
  openGraph: {
    title: "Magical Prompt Studio · Tatiana Lychy",
    description: "A private studio for AI generators, prompt tools, and creative digital products for illustrators, animators, and storytellers.",
    url: "https://magicalstories.vercel.app",
    siteName: "Magical Prompt Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Magical Prompt Studio by Tatiana Lychy",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magical Prompt Studio · Tatiana Lychy",
    description: "A private studio for AI generators, prompt tools, and creative digital products.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
