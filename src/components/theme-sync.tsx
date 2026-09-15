import { useEffect } from "react";
import { useOsStore } from "@/lib/os-store";

export function ThemeSync() {
  const theme = useOsStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("actr-one-theme", theme);
    } catch {
      /* private mode */
    }
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-color")
      .trim();
    if (!color) return;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [theme]);

  return null;
}
