import type { Metadata, Viewport } from "next";
import { Allura, Archivo, Geist_Mono, Instrument_Serif, Outfit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./home.css";
import { siteDescription, siteUrl } from "./lib/site";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import CommandMenu from "./components/layout/CommandMenu";
import SmoothScroll from "./components/layout/SmoothScroll";
import Toaster from "./components/ui/Toaster";
import MotionProvider from "./components/ui/MotionProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

/** Wide, heavy display face for the name and section titles. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** Signature in the footer. */
const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Najeeb Ullah Khan — Software Engineer",
    template: "%s · Najeeb Ullah Khan",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  keywords: [
    "software engineer",
    "frontend engineer",
    "fintech",
    "dashboards",
    "Next.js",
    "React",
    "Angular",
    "TypeScript",
    "Karachi",
  ],
  authors: [{ name: "Najeeb Ullah Khan", url: siteUrl }],
  creator: "Najeeb Ullah Khan",
  openGraph: {
    title: "Najeeb Ullah Khan — Thoughtful code. Remarkable experiences.",
    description: siteDescription,
    url: siteUrl,
    siteName: "Najeeb Ullah Khan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Najeeb Ullah Khan — Software Engineer",
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${archivo.variable} ${allura.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SmoothScroll />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CommandMenu />
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}
