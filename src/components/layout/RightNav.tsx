"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CircuitBoard,
  Fingerprint,
  Home,
  Mail,
  ScanLine,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Fingerprint },
  { id: "resume", label: "Resume", icon: ScanLine },
  { id: "projects", label: "Projects", icon: CircuitBoard },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const ITEM_HEIGHT = 48;
const EXPAND_DELAY = 200;
const COLLAPSE_DELAY = 150;

export function RightNav() {
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = navItems.findIndex((item) => item.id === activeId);

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  const handleMouseEnter = () => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(
      expand,
      prefersReducedMotion ? 0 : EXPAND_DELAY
    );
  };

  const handleMouseLeave = () => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(
      collapse,
      prefersReducedMotion ? 0 : COLLAPSE_DELAY
    );
  };

  const handleFocusCapture = () => expand();

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) {
      collapse();
    }
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const midpoint = window.innerHeight / 2;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= midpoint) {
          current = section.id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => clearHoverTimer(), []);

  return (
    <>
      {/* Desktop: hard rectangular rail */}
      <div
        ref={wrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-row-reverse items-center md:flex"
      >
        <nav
          aria-label="Sections"
          data-expanded={expanded}
          className={cn(
            "relative flex h-fit flex-col overflow-hidden border-y border-l border-border bg-background",
            "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            expanded ? "w-40" : "w-14"
          )}
        >
          <ul className="relative flex flex-1 flex-col">
            {/* Active block */}
            <motion.div
              className="absolute left-0 top-0 h-12 w-full bg-accent text-accent-foreground"
              aria-hidden="true"
              initial={false}
              animate={{
                y: activeIndex >= 0 ? activeIndex * ITEM_HEIGHT : 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            />

            {navItems.map((item) => {
              const isActive = activeId === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group relative flex h-12 w-full items-center gap-3 px-4 text-muted-foreground transition-colors duration-200 ease-out",
                      "hover:bg-foreground hover:text-background",
                      "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      isActive && "text-accent-foreground"
                    )}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    <span
                      className={cn(
                        "overflow-hidden text-ellipsis whitespace-nowrap font-mono text-micro uppercase tracking-widest transition-opacity duration-200",
                        expanded ? "w-auto opacity-100" : "w-0 opacity-0"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-border">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Hover invitation */}
        <div
          className="pointer-events-auto flex h-28 w-8 cursor-default flex-col items-end justify-center"
          aria-hidden="true"
        >
          <div className="nav-pointer flex h-full w-5 items-center justify-center border border-r-0 border-border bg-background px-1">
            <span
              className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.12em] text-muted-foreground"
              style={{ transform: "rotate(-90deg)" }}
            >
              Menu
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: bottom tab bar */}
      <nav
        aria-label="Sections"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden"
      >
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;

            return (
              <li key={item.id} className="flex-1">
                <a
                  href={`#${item.id}`}
                  aria-label={item.label}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex h-14 flex-col items-center justify-center gap-1 px-1 text-muted-foreground transition-colors duration-200 ease-out",
                    "hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <span className="max-w-full truncate font-mono text-micro uppercase tracking-wider leading-none">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
          <li className="flex shrink-0 items-center justify-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
