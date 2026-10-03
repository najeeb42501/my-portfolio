"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiBriefcase,
  FiCopy,
  FiDownload,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { caseStudies } from "@/data/projects";
import { profile, socials } from "@/data/site";
import { copyText, scrollToId, toggleTheme } from "../../lib/client";

type Command = {
  id: string;
  group: string;
  label: string;
  icon: IconType;
  hint?: string;
  run: () => void;
};

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback(() => {
    setQuery("");
    setIndex(0);
    setOpen(true);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const section = (id: string) => () => {
      if (pathname === "/") scrollToId(id);
      else router.push(`/#${id}`);
    };
    const external = (href: string) => () => window.open(href, "_blank", "noopener");
    const github = socials.find((s) => s.label === "GitHub")!.href;
    const linkedin = socials.find((s) => s.label === "LinkedIn")!.href;
    return [
      { id: "work", group: "Navigate", label: "Selected work", icon: FiBriefcase, run: section("work") },
      { id: "archive", group: "Navigate", label: "Project archive", icon: FiFileText, run: section("archive") },
      { id: "experience", group: "Navigate", label: "Experience", icon: FiBriefcase, run: section("experience") },
      { id: "about", group: "Navigate", label: "About", icon: FiUser, run: section("about") },
      { id: "contact", group: "Navigate", label: "Contact", icon: FiMail, run: section("contact") },
      ...caseStudies.map((study) => ({
        id: `cs-${study.slug}`,
        group: "Case studies",
        label: study.title,
        hint: study.category,
        icon: FiArrowRight,
        run: () => router.push(`/work/${study.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: FiCopy,
        run: () => copyText(profile.email, "Email copied"),
      },
      { id: "github", group: "Actions", label: "Open GitHub", icon: FiGithub, run: external(github) },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", icon: FiLinkedin, run: external(linkedin) },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        icon: FiDownload,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.resume;
          link.download = "";
          link.click();
        },
      },
      { id: "theme", group: "Actions", label: "Toggle theme", icon: FiMoon, run: toggleTheme },
    ];
  }, [pathname, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
      }
    };
    addEventListener("keydown", onKey);
    addEventListener("app:command", show);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("app:command", show);
    };
  }, [open, close, show]);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.__lenis?.start();
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: "nearest" });
  }, [index, listId]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    close();
    // Run after the menu has closed so focus and scroll locks are released.
    requestAnimationFrame(command.run);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            className="cmdk-backdrop"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            key="panel"
            className="cmdk"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.97, x: "-50%", y: -8 }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: "-50%", y: -4 }}
            transition={{ duration: 0.22 }}
            onKeyDown={onKeyDown}
            data-lenis-prevent
          >
            <div className="cmdk-input-row">
              <FiSearch aria-hidden />
              <input
                ref={inputRef}
                className="cmdk-input"
                placeholder="Type a command or search…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIndex(0);
                }}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={results[index] ? `${listId}-${index}` : undefined}
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <div className="cmdk-list" id={listId} role="listbox" aria-label="Commands">
              {results.length === 0 ? (
                <p className="cmdk-empty">No results for “{query}”.</p>
              ) : (
                results.map((command, i) => {
                  const heading = command.group !== lastGroup ? command.group : null;
                  lastGroup = command.group;
                  return (
                    <div key={command.id} role="presentation">
                      {heading ? (
                        <div className="cmdk-group" role="presentation">
                          {heading}
                        </div>
                      ) : null}
                      <div
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={i === index}
                        className="cmdk-item"
                        onPointerMove={() => setIndex(i)}
                        onClick={() => run(command)}
                      >
                        <command.icon aria-hidden />
                        {command.label}
                        {command.hint ? <span className="hint">{command.hint}</span> : null}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="cmdk-foot" aria-hidden>
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
