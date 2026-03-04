import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../fonts/geist-latin.woff2",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "90-Day CTO Plan - Verse Wealth",
  description:
    "90-day delivery plan focused on workflow visibility, data integrity, and security posture uplift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
