import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { Button } from "@/components/ui/button";
import { useOsStore } from "@/lib/os-store";
import { THEME_META, THEMES, type ThemeName } from "@/lib/os-types";
import { cn } from "@/lib/utils";

function ThemeChip({ t }: { t: ThemeName }) {
  return (
    <span
      data-theme={t}
      className="flex size-8 overflow-hidden rounded-md border border-border"
      aria-hidden
    >
      <span className="w-1/2 bg-bg" />
      <span className="w-1/4 bg-accent" />
      <span className="w-1/4 bg-fg" />
    </span>
  );
}

export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const theme = useOsStore((s) => s.theme);
  const setTheme = useOsStore((s) => s.setTheme);
  const { canUseTheme } = useEntitlements();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <Palette className="size-4" />
      </Button>
      {open ? (
        <div
          role="listbox"
          aria-label="Themes"
          className="absolute right-0 top-11 z-40 max-h-[min(24rem,70vh)] w-64 overflow-auto rounded-lg border border-border bg-card p-1.5 shadow-soft"
        >
          {THEMES.map((t) => {
            const locked = !canUseTheme(t);
            return (
              <button
                key={t}
                type="button"
                role="option"
                aria-selected={theme === t}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
                onClick={() => {
                  if (locked) {
                    toast.message("Studio unlocks the other three looks.");
                    setOpen(false);
                    void navigate({ to: "/pricing", search: { highlight: "studio" } });
                    return;
                  }
                  setTheme(t);
                  setOpen(false);
                }}
              >
                <ThemeChip t={t} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm">{THEME_META[t].label}</span>
                  <span className="block text-xs text-muted-fg">
                    {locked ? "Studio" : THEME_META[t].detail}
                  </span>
                </span>
                {theme === t ? <span className="text-xs text-accent">On</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function ThemeGrid() {
  const theme = useOsStore((s) => s.theme);
  const setTheme = useOsStore((s) => s.setTheme);
  const { canUseTheme } = useEntitlements();
  const navigate = useNavigate();

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {THEMES.map((t) => {
        const locked = !canUseTheme(t);
        return (
          <button
            key={t}
            type="button"
            data-theme={t}
            onClick={() => {
              if (locked) {
                toast.message("Studio unlocks the other three looks.");
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              setTheme(t);
            }}
            className={cn(
              "rounded-lg border bg-card p-3 text-left text-fg",
              theme === t ? "border-accent ring-2 ring-accent/30" : "border-border hover:bg-muted",
            )}
          >
            <span className="flex h-10 overflow-hidden rounded-md border border-border">
              <span className="flex-1 bg-bg" />
              <span className="w-10 bg-accent" />
              <span className="w-7 bg-fg" />
            </span>
            <span className="mt-3 block text-sm font-medium">{THEME_META[t].label}</span>
            <span className="mt-0.5 block text-xs text-muted-fg">
              {locked ? "Studio look" : THEME_META[t].detail}
            </span>
          </button>
        );
      })}
    </div>
  );
}
