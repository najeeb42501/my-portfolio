import { profile, socials } from "@/data/site";
import { siteDescription, siteUrl } from "./lib/site";
import Stage from "./components/sections/Stage";
import Expertise from "./components/sections/Expertise";
import Work from "./components/sections/Work";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Dock from "./components/sections/Dock";
import Experience from "./components/sections/Experience";
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
      <Stage />
      <Expertise />
      <Work />
      <Projects />
      <Skills />
      <Dock />
      <Experience />
      <Contact />
    </>
  );
}
