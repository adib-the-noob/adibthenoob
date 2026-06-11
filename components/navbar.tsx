"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

/**
 * Sticky, floating-pill top navigation.
 *
 * - Outer bar: full-bleed sticky, hairline border, strong backdrop blur.
 * - Inner pill: centered rounded container that holds the links.
 * - Active section: a single sliding highlight tracks the section
 *   currently in view (via IntersectionObserver) and animates to
 *   the matching link's position.
 * - Mobile: a hamburger opens a right-side Sheet with the same links
 *   (plus the theme toggle), so the nav is usable on every breakpoint.
 */
export function Navbar({ className }: { className?: string }) {
  const [activeHref, setActiveHref] = React.useState<string>(links[0]!.href);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Refs to each link button so we can position the sliding highlight.
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = React.useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  /**
   * Watch the four section targets and pick the one closest to the
   * top of the viewport. We only call `setActiveHref` from inside
   * the IntersectionObserver callback (an event handler), so this
   * doesn't trip the `react-hooks/set-state-in-effect` rule.
   */
  React.useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(`#${entry.target.id}`, entry.intersectionRatio);
          } else {
            visible.delete(`#${entry.target.id}`);
          }
        }
        if (visible.size > 0) {
          // Pick the section with the highest intersection ratio.
          let best: { href: string; ratio: number } | null = null;
          for (const [href, ratio] of visible) {
            if (!best || ratio > best.ratio) best = { href, ratio };
          }
          if (best) setActiveHref(best.href);
        }
      },
      {
        // Highlight the section that occupies the upper-middle of the viewport.
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  /**
   * Recompute the sliding highlight's position whenever the active
   * link changes or the window resizes. Pure ref measurement, no
   * setState — just updates a `highlight` value that's already in
   * state for the CSS transition to read.
   */
  React.useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const active = linkRefs.current[activeHref];
      if (!container || !active) {
        setHighlight((h) => ({ ...h, opacity: 0 }));
        return;
      }
      const cRect = container.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      setHighlight({
        left: aRect.left - cRect.left,
        width: aRect.width,
        opacity: 1,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    // Re-measure once fonts have loaded (mono swap can change widths).
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", measure);
  }, [activeHref]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/40",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm text-foreground/90"
        >
          <span className="relative flex size-7 items-center justify-center rounded-full border border-border/60 bg-background/60 transition-colors group-hover:border-emerald-500/50">
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/20" />
            <span className="relative size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-tight">adib</span>
          <span className="hidden text-muted-foreground sm:inline">
            /backend
          </span>
        </Link>

        {/* Desktop pill nav */}
        <nav
          ref={containerRef}
          className="relative hidden items-center rounded-full border border-border/60 bg-background/60 p-1 shadow-[0_1px_0_0_color-mix(in_oklch,var(--foreground)_4%,transparent),0_8px_24px_-12px_color-mix(in_oklch,var(--foreground)_10%,transparent)] backdrop-blur sm:flex"
        >
          {/* Sliding active highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-foreground/10 transition-[left,width,opacity] duration-300 ease-out"
            style={{
              left: highlight.left,
              width: highlight.width,
              opacity: highlight.opacity,
            }}
          />
          {links.map((l) => (
            <NavLink
              key={l.href}
              ref={(el) => {
                linkRefs.current[l.href] = el;
              }}
              href={l.href}
              label={l.label}
              activeHref={activeHref}
            />
          ))}
        </nav>

        {/* Right cluster: theme toggle (always visible) + mobile menu */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground/80 transition-colors hover:text-foreground sm:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 gap-0 p-0 sm:hidden"
              showCloseButton={false}
            >
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <SheetTitle className="font-mono text-sm">adib /backend</SheetTitle>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => {
                      setActiveHref(l.href);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm transition-colors",
                      activeHref === l.href
                        ? "bg-foreground/5 text-foreground"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
