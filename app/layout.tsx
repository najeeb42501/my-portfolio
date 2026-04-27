import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://njb.dev"),
  title: {
    default: "NJB | Software Engineer",
    template: "%s | NJB",
  },
  description:
    "Portfolio for a software engineer building fast, accessible, production-grade web products with Next.js, React, and TypeScript.",
  keywords: [
    "software engineer",
    "frontend engineer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "NJB" }],
  creator: "NJB",
  openGraph: {
    title: "NJB | Software Engineer",
    description:
      "Fast, accessible web products with polished interfaces and reliable systems.",
    url: "https://njb.dev",
    siteName: "NJB Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NJB | Software Engineer",
    description:
      "Fast, accessible web products with polished interfaces and reliable systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-zinc-100">{children}</body>
    </html>
  );
}
