'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Tooltip leve, sem dependência externa. Mostra ao hover/focus, com pequeno
 * atraso para não "piscar" em passagens rápidas do mouse.
 *
 * `interactive` mantém o balão aberto enquanto o mouse estiver sobre ele
 * (permite ler textos longos e rolar), fechando com um pequeno atraso ao
 * sair. Use com `side="bottom"` para explicações compridas, que ficam
 * sobrepostas ao conteúdo logo abaixo do gatilho.
 */
function Tooltip({
  content,
  children,
  side = "top",
  className,
  interactive = false,
}: {
  content: React.ReactNode
  children: React.ReactElement
  side?: "top" | "bottom" | "left" | "right"
  className?: string
  interactive?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current)
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }
  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    showTimer.current = setTimeout(() => setOpen(true), 200)
  }
  const hide = () => {
    if (showTimer.current) clearTimeout(showTimer.current)
    // Com `interactive`, dá tempo do mouse cruzar o vão entre o gatilho e o
    // balão sem fechá-lo.
    hideTimer.current = setTimeout(() => setOpen(false), interactive ? 260 : 0)
  }

  React.useEffect(() => clearTimers, [])

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
          onMouseEnter={interactive ? show : undefined}
          onMouseLeave={interactive ? hide : undefined}
          className={cn(
            "sigfis-fade-in absolute z-50 rounded-lg bg-brand-navy px-2.5 py-1.5 text-[11px] font-medium leading-relaxed text-white shadow-popover",
            interactive
              ? "pointer-events-auto max-w-[280px] whitespace-normal"
              : "pointer-events-none whitespace-nowrap",
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
