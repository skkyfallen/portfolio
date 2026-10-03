"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className="inline-flex h-12 w-12 items-center justify-center text-foreground transition-colors duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <span className="relative h-5 w-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ease-out ${
            mounted && resolvedTheme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ease-out ${
            mounted && resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
