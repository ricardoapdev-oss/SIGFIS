'use client';

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Painel lateral (drawer). Usado pela sidebar em telas pequenas e por
 * painéis contextuais (ex.: Central de Ajuda).
 */
function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  widthClassName = "max-w-sm",
}: {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  title?: string
  children: React.ReactNode
  widthClassName?: string
}) {
  React.useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onEsc)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onEsc)
      document.body.style.overflow = ""
    }
  }, [open, onClose]);

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={cn(
          "sigfis-fade-in relative flex h-full w-full flex-col bg-surface shadow-popover",
          widthClassName,
          side === "right" ? "ml-auto" : "mr-auto"
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="text-sm font-bold text-foreground">{title}</h2>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer">
              <X className="size-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

export { Drawer }
