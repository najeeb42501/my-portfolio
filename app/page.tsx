import PortfolioPage from "./components/PortfolioPage";
import { siteUrl, siteDescription } from "./lib/site";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Najeeb Ullah Khan",
    url: siteUrl,
    image: `${siteUrl}/najeeb-new.png`,
    jobTitle: "Software Engineer",
    description: siteDescription,
    sameAs: [
      "https://github.com/najeeb42501",
      "https://www.linkedin.com/in/najeebullah-khan-86b759170/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Full-stack development",
      "Frontend architecture",
      "AI applications",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioPage />
    </>
  );
}
