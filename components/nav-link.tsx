"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  activeHref: string;
  onNavigate?: () => void;
  className?: string;
};

/**
 * Single nav link that participates in the parent nav's sliding
 * active-section indicator. Each instance reports its own DOM rect
 * to the parent via `onMeasure`, which is then used to position a
 * shared highlight pill.
 */
export function NavLink({
  href,
  label,
  activeHref,
  onNavigate,
  className,
}: NavLinkProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const isActive = activeHref === href;

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative z-10 px-3 py-1.5 text-sm transition-colors duration-200",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}
