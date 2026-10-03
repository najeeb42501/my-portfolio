import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { caseStudies, caseStudyBySlug, projectBySlug } from "@/data/projects";
import BrowserFrame from "../../components/ui/BrowserFrame";
import Reveal from "../../components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.title} case study`,
    description: study.outcome,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — case study`,
      description: study.outcome,
      url: `/work/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  const position = caseStudies.indexOf(study);
  const next = caseStudies[(position + 1) % caseStudies.length];
  const multi = study.modules.length > 1;
  const tint = { "--glow-color": study.tint } as React.CSSProperties;

  return (
    <article>
      <header className="cs-hero container">
        <div className="enter-lcp">
          <Link href="/#work" className="back-link">
            <FiArrowLeft aria-hidden /> All work
          </Link>
          <p className="eyebrow">Case study — {study.category}</p>
          <h1 className="display">{study.title}</h1>
          <p className="lead">{study.outcome}</p>
        </div>
        <div className="enter" style={{ "--delay": "80ms" } as React.CSSProperties}>
          <dl className="cs-meta">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          {study.demo ? (
            <div style={{ marginTop: 32 }}>
              <a href={study.demo} target="_blank" rel="noreferrer" className="btn btn-solid btn-sm">
                Visit live site <FiArrowUpRight aria-hidden />
              </a>
            </div>
          ) : null}
        </div>
        <div className="cs-cover enter" style={{ ...tint, "--delay": "160ms" } as React.CSSProperties}>
          <div className="glow" aria-hidden />
          <BrowserFrame
            src={study.cover}
            alt={`${study.title} main screen`}
            url={study.demo ? new URL(study.demo).host : undefined}
            sizes="(max-width: 1200px) 96vw, 1200px"
            preload
          />
        </div>
      </header>

      <div className="container" style={{ marginTop: 96 }}>
        <Reveal as="section" className="cs-section" aria-labelledby="problem">
          <h2 id="problem">Problem</h2>
          <div className="cs-prose">
            <p>{study.problem}</p>
          </div>
        </Reveal>
        <Reveal as="section" className="cs-section" aria-labelledby="approach">
          <h2 id="approach">Approach</h2>
          <div className="cs-prose">
            <ol>
              {study.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal as="section" className="cs-section" aria-labelledby="solution">
          <h2 id="solution">Solution</h2>
          <div className="cs-prose">
            <p>{study.solution}</p>
          </div>
        </Reveal>
        <Reveal as="section" className="cs-section" aria-labelledby="outcome">
          <h2 id="outcome">Outcome</h2>
          <div className="cs-prose">
            <p>{study.outcomeText}</p>
            <div className="cs-metrics">
              {study.metrics.map((metric) => (
                <span key={metric} className="chip chip-solid">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {study.modules.map((module, index) => {
          const project = projectBySlug(module.project);
          const shots = project.images.filter((src) => src !== study.cover).slice(0, multi ? 3 : 5);
          return (
            <section key={module.id} id={module.id} className="cs-module" aria-labelledby={`${module.id}-title`}>
              <Reveal className="cs-module-head">
                <div>
                  <p className="eyebrow">
                    {multi ? `${String(index + 1).padStart(2, "0")} — ${project.category}` : "Inside the product"}
                  </p>
                  <h2 className="h2" id={`${module.id}-title`} style={{ marginTop: 12 }}>
                    {multi ? project.title : "What it does"}
                  </h2>
                  <p className="lead">{project.description}</p>
                </div>
                <div>
                  <ul className="cs-features">
                    {project.features.map((feature) => (
                      <li key={feature}>
                        <FiCheck aria-hidden /> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="chips" style={{ marginTop: 24 }}>
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {multi && project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                      style={{ marginTop: 20 }}
                    >
                      Open {project.title} <FiArrowUpRight aria-hidden />
                    </a>
                  ) : null}
                </div>
              </Reveal>
              <div className="cs-shots">
                {shots.map((src, i) => (
                  <Reveal key={src} delay={i * 0.06}>
                    <BrowserFrame
                      src={src}
                      alt={`${project.title}, screen ${i + 2}`}
                      sizes={i === 0 ? "(max-width: 1200px) 96vw, 1200px" : "(max-width: 900px) 96vw, 600px"}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        <Link href={`/work/${next.slug}`} className="card cs-next">
          <div className="cs-next-copy">
            <span className="eyebrow">Next project</span>
            <span className="h2">{next.title}</span>
            <span className="lead">{next.outcome}</span>
            <span className="text-link" style={{ marginTop: 8 }}>
              Read case study <FiArrowRight aria-hidden />
            </span>
          </div>
          <div className="cs-next-media">
            <Image src={next.cover} alt="" fill sizes="(max-width: 900px) 96vw, 600px" />
          </div>
        </Link>
      </div>
    </article>
  );
}
