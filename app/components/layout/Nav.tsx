"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiCommand, FiMenu, FiX } from "react-icons/fi";
import { navItems, profile, socials } from "@/data/site";
import { openCommandMenu, scrollToId } from "../../lib/client";
import ThemeToggle from "./ThemeToggle";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = innerHeight * 0.4;
        const hit = navItems.find((item) =>
          item.sections.some((id) => {
            const rect = document.getElementById(id)?.getBoundingClientRect();
            return rect ? rect.top <= line && rect.bottom > line : false;
          }),
        );
        setActive(hit?.id ?? null);
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [enabled]);
  return enabled ? active : null;
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    const button = menuButton.current;
    return () => {
      removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      button?.focus();
    };
  }, [open]);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const go = (id: string) => (event: React.MouseEvent) => {
    if (!isHome) return;
    event.preventDefault();
    setOpen(false);
    // Let the sheet release scroll before moving.
    requestAnimationFrame(() => scrollToId(id));
  };
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <Link
          href="/"
          className="logo"
          aria-label={`${profile.name}, home`}
          onClick={(event) => {
            if (isHome) {
              event.preventDefault();
              scrollToId("top");
            }
          }}
        >
          nk<span>.</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={href(item.id)}
              onClick={go(item.id)}
              className="nav-link"
              aria-current={active === item.id ? "location" : undefined}
            >
              {active === item.id ? (
                <motion.span
                  layoutId="nav-active"
                  className="nav-link-bg"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="kbd-btn"
            onClick={openCommandMenu}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <FiCommand aria-hidden /> K
          </button>
          <ThemeToggle />
          <a href={href("contact")} onClick={go("contact")} className="btn btn-accent btn-sm nav-cta">
            Let&rsquo;s talk
          </a>
          <button
            ref={menuButton}
            type="button"
            className="icon-btn nav-menu-btn"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-sheet"
            ref={sheetRef}
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="sheet-links" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={href(item.id)}
                  onClick={go(item.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  {item.label}
                  <FiArrowUpRight aria-hidden />
                </motion.a>
              ))}
            </nav>
            <div className="sheet-foot">
              <a href={href("contact")} onClick={go("contact")} className="btn btn-accent">
                Let&rsquo;s talk
              </a>
              <div className="row">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                ))}
                <a href={profile.resume} download>
                  Résumé
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
