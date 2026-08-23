'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Dropdown/menu leve baseado em posicionamento absoluto + fechamento por
 * clique fora / Escape. Usado pelo header global (busca, notificações,
 * ajuda, perfil) e por qualquer menu contextual futuro.
 */
function Dropdown({
  trigger,
  children,
  align = "end",
  className,
  panelClassName,
  open: controlledOpen,
  onOpenChange,
}: {
  trigger: (props: { open: boolean; toggle: () => void }) => React.ReactNode
  children: React.ReactNode
  align?: "start" | "end"
  className?: string
  panelClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = React.useCallback((v: boolean) => {
    setInternalOpen(v)
    onOpenChange?.(v)
  }, [onOpenChange])
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [open, setOpen]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {trigger({ open, toggle: () => setOpen(!open) })}
      {open && (
        <div
          className={cn(
            "sigfis-fade-in absolute z-40 mt-2 min-w-56 overflow-hidden rounded-xl border border-border bg-popover shadow-popover",
            align === "end" ? "right-0" : "left-0",
            panelClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function DropdownItem({
  className,
  icon: Icon,
  ...props
}: React.ComponentProps<"button"> & { icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-3.5 shrink-0 text-muted-foreground" />}
      {props.children}
    </button>
  )
}

function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border", className)} />
}

function DropdownLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-3.5 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel }
