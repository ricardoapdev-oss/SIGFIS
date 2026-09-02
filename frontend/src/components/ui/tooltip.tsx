'use client';

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

/**
 * Tooltip leve, sem dependência externa.
 *
 * Quando abre, o balão é renderizado num portal no <body> com posição
 * `fixed` e z-index alto — assim fica SOBREPOSTO a toda a tela, sem ser
 * cortado por `overflow` de nenhum contêiner. A posição é calculada a partir
 * do gatilho e presa aos limites da janela (12px de margem), invertendo de
 * lado quando não há espaço.
 *
 * `interactive` deixa o balão largo (o dobro da largura antiga), com texto
 * quebrando em várias linhas, e o mantém aberto enquanto o mouse estiver
 * sobre ele — para ler explicações compridas por inteiro.
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
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null)
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const tipRef = React.useRef<HTMLSpanElement>(null)
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current)
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }
  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    showTimer.current = setTimeout(() => setOpen(true), 150)
  }
  const hide = () => {
    if (showTimer.current) clearTimeout(showTimer.current)
    hideTimer.current = setTimeout(() => setOpen(false), interactive ? 280 : 0)
  }
  React.useEffect(() => clearTimers, [])

  const reposition = React.useCallback(() => {
    const trigger = triggerRef.current?.getBoundingClientRect()
    if (!trigger) return
    const tip = tipRef.current?.getBoundingClientRect()
    const M = 12
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = tip?.width ?? (interactive ? Math.min(560, vw - 2 * M) : 240)
    const h = tip?.height ?? 90
    const gap = 8

    let top: number
    let left: number

    if (side === "left" || side === "right") {
      top = trigger.top + trigger.height / 2 - h / 2
      const wantRight = side === "right"
      const fitsRight = trigger.right + gap + w <= vw - M
      const fitsLeft = trigger.left - gap - w >= M
      const putRight = wantRight ? (fitsRight || !fitsLeft) : (!fitsLeft && fitsRight)
      left = putRight ? trigger.right + gap : trigger.left - gap - w
    } else {
      const spaceBelow = vh - trigger.bottom
      const spaceAbove = trigger.top
      const putBelow = side === "bottom"
        ? (spaceBelow >= h + gap + M || spaceBelow >= spaceAbove)
        : (spaceAbove >= h + gap + M ? false : spaceBelow >= spaceAbove)
      top = putBelow ? trigger.bottom + gap : trigger.top - h - gap
      left = trigger.left + trigger.width / 2 - w / 2
    }

    left = Math.max(M, Math.min(left, vw - w - M))
    top = Math.max(M, Math.min(top, vh - h - M))
    setCoords({ top, left })
  }, [side, interactive])

  React.useEffect(() => {
    if (!open) return
    reposition()
    const raf = requestAnimationFrame(reposition)
    const handler = () => reposition()
    window.addEventListener("scroll", handler, true)
    window.addEventListener("resize", handler)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", handler, true)
      window.removeEventListener("resize", handler)
      setCoords(null)
    }
  }, [open, reposition])

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && typeof document !== "undefined" && createPortal(
        <span
          ref={tipRef}
          role="tooltip"
          onMouseEnter={interactive ? show : undefined}
          onMouseLeave={interactive ? hide : undefined}
          style={{
            position: "fixed",
            top: coords ? coords.top : -9999,
            left: coords ? coords.left : -9999,
            visibility: coords ? "visible" : "hidden",
          }}
          className={cn(
            "sigfis-fade-in z-[9999] rounded-lg bg-brand-navy px-3 py-2 text-[11px] font-medium leading-relaxed text-white shadow-popover [&_*]:!max-w-none",
            interactive
              ? "pointer-events-auto w-[560px] max-w-[calc(100vw-24px)] whitespace-normal"
              : "pointer-events-none max-w-[calc(100vw-24px)] whitespace-nowrap",
            className,
          )}
        >
          {content}
        </span>,
        document.body,
      )}
    </span>
  )
}

export { Tooltip }
