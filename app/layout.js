export const metadata = {
  title: 'Magical Stories · Fairy Tale Generator by Tatiana Lychy',
  description: 'Fairy Tale Prompt Generator — by Tatiana Lychy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
