import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl, siteDescription } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Najeeb Ullah Khan — Software Engineer & Product Builder",
    template: "%s | Najeeb Ullah Khan",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  keywords: [
    "software engineer",
    "frontend engineer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Najeeb Ullah Khan", url: siteUrl }],
  creator: "Najeeb Ullah Khan",
  openGraph: {
    title: "Najeeb Ullah Khan — Thoughtful code. Remarkable experiences.",
    description: siteDescription,
    url: siteUrl,
    siteName: "Najeeb Ullah Khan",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Najeeb Ullah Khan — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Najeeb Ullah Khan — Software Engineer",
    description: siteDescription,
    images: ["/opengraph-image"],
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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='dark'?'dark':'light'}catch{}`,
          }}
        />
      </head>
      <body className="min-h-full theme-page">{children}</body>
    </html>
  );
}
