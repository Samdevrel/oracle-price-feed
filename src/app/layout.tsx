import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle Price Feed | @samdevrel",
  description: "Decentralized price feeds via Chainlink, Band Protocol, Pyth - real-time oracle data.",
  keywords: ["oracle", "price-feed", "chainlink", "band-protocol", "decentralized", "data-feed"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
