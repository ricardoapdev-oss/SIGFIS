'use client';

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg"
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

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm px-4">
      <div
        role="dialog"
        aria-modal="true"
        className={cn("sigfis-fade-in w-full rounded-2xl border border-border bg-surface shadow-popover", sizes[size])}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div className="min-w-0">
              {title && <h2 className="text-sm font-bold text-foreground">{title}</h2>}
              {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-border p-5">{footer}</div>}
      </div>
    </div>
  )
}

export { Modal }
