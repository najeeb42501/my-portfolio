import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import Header from "./Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import MyProcess from "./sections/MyProcess";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import MotionProvider from "./shared/MotionProvider";
export default function PortfolioPage() {
  return (
    <MotionProvider>
      <div className="site-wrap">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <MyProcess />
          <Experience />
          <Contact />
        </main>
        <footer className="site-footer">
          <div className="page-container footer-top">
            <a className="wordmark" href="#hero" aria-label="Back to top">
              nk<span>.</span>
            </a>
            <p>
              Thoughtfully designed.
              <br />
              Carefully engineered.
            </p>
            <div className="footer-links">
              <a
                href="https://github.com/najeeb42501"
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub aria-hidden /> GitHub <FiArrowUpRight aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com/in/najeebullah-khan-86b759170/"
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin aria-hidden /> LinkedIn{" "}
                <FiArrowUpRight aria-hidden />
              </a>
              <a href="/NajeebullahKhan-resume.pdf" download>
                Résumé <FiArrowUpRight aria-hidden />
              </a>
            </div>
          </div>
          <div className="page-container footer-bottom">
            <span>© {new Date().getFullYear()} Najeeb Ullah Khan</span>
            <a href="#hero">Back to the top ↑</a>
            <span>Built with intent.</span>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}
