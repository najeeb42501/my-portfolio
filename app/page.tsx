import { profile, socials } from "@/data/site";
import { siteDescription, siteUrl } from "./lib/site";
import Hero from "./components/sections/Hero";
import LogoStrip from "./components/sections/LogoStrip";
import SelectedWork from "./components/sections/SelectedWork";
import Archive from "./components/sections/Archive";
import Impact from "./components/sections/Impact";
import Capabilities from "./components/sections/Capabilities";
import Experience from "./components/sections/Experience";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}${profile.portrait}`,
  jobTitle: profile.role,
  description: siteDescription,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  worksFor: { "@type": "Organization", name: "Jami Partners" },
  sameAs: socials.map((s) => s.href),
  knowsAbout: ["React", "Next.js", "Angular", "TypeScript", "Fintech platforms", "Dashboards", "RAG", "AI applications"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <LogoStrip />
      <SelectedWork />
      <Archive />
      <Impact />
      <Capabilities />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
