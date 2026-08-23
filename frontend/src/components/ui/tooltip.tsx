'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Tooltip leve, sem dependência externa. Mostra ao hover/focus, com pequeno
 * atraso para não "piscar" em passagens rápidas do mouse.
 */
function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: React.ReactNode
  children: React.ReactElement
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    timer.current = setTimeout(() => setOpen(true), 250)
  }
  const hide = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(false)
  }

  const sideClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "sigfis-fade-in pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-brand-navy px-2.5 py-1.5 text-[11px] font-medium text-white shadow-popover",
            sideClasses[side],
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}

export { Tooltip }
