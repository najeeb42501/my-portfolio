"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scrolls to a section on this page, through Lenis when it is running. Offsets come from CSS scroll-margin. */
export function scrollToId(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return false;
  if (window.__lenis) {
    window.__lenis.scrollTo(target);
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
  if (id !== "top") history.replaceState(null, "", `#${id}`);
  return true;
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: message }));
}

export function openCommandMenu() {
  window.dispatchEvent(new Event("app:command"));
}

export async function copyText(text: string, message = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast("Couldn't copy. Select the text instead.");
  }
}

/* Theme ------------------------------------------------------------------ */

export type Theme = "light" | "dark";

function subscribeTheme(callback: () => void) {
  window.addEventListener("app:theme", callback);
  return () => window.removeEventListener("app:theme", callback);
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* Theme still applies for this visit. */
  }
  window.dispatchEvent(new Event("app:theme"));
  window.setTimeout(() => root.classList.remove("theme-transition"), 350);
}

export function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}

/* Media queries ------------------------------------------------------------ */

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (callback) => {
      const list = matchMedia(query);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    () => matchMedia(query).matches,
    () => serverValue,
  );
}
