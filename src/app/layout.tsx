import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../fonts/geist-latin.woff2",
  variable: "--font-body",
  display: "swap",
});

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
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
      <body className={`${geist.variable} ${display.variable}`}>
        <a href="#main-content" className="skipLink">
          Skip to Main Content
        </a>
        {children}
      </body>
    </html>
  );
}
