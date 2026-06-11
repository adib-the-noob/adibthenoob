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
 * active-section indicator. The parent attaches a ref so it can
 * read each link's DOM rect and position a shared highlight pill.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink(
    { href, label, activeHref, onNavigate, className },
    ref,
  ) {
    const isActive = activeHref === href;
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onNavigate}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "relative z-10 px-3 py-1.5 text-sm transition-colors duration-200",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {label}
      </Link>
    );
  },
);
