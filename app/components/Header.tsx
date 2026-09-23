"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
const navigation = [
  { label: "Work", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];
function subscribeTheme(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme || "light",
    () => "light",
  );
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = "";
        for (const item of navigation) {
          const section = document.querySelector(item.href);
          if (
            section &&
            section.getBoundingClientRect().top <= innerHeight * 0.4
          )
            current = item.href;
        }
        setActive(current);
      });
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Theme works without storage. */
    }
    window.dispatchEvent(new Event("themechange"));
  }
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <a
          href="#hero"
          className="wordmark"
          onClick={() => setOpen(false)}
          aria-label="Najeeb Ullah Khan — home"
        >
          nk<span>.</span>
        </a>
        <div className="desktop-navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          </button>
          <a href="#contact" className="header-contact">
            Let’s talk <FiArrowUpRight aria-hidden />
          </a>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </nav>
      <div id="mobile-navigation" className="mobile-navigation" hidden={!open}>
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active === item.href ? "location" : undefined}
          >
            {item.label}
            <FiArrowUpRight aria-hidden />
          </a>
        ))}
      </div>
    </header>
  );
}
