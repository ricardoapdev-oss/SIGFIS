'use client';

import * as React from "react"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Toast = { id: number; message: string; variant: "success" | "error" | "info" }
type ToastContextValue = { push: (message: string, variant?: Toast["variant"]) => void }

const ToastContext = React.createContext<ToastContextValue | null>(null)

const icons = { success: CheckCircle2, error: XCircle, info: Info }
const styles = {
  success: "border-brand-green/30 bg-white text-emerald-700 [&_svg]:text-brand-green",
  error: "border-brand-red/30 bg-white text-red-700 [&_svg]:text-brand-red",
  info: "border-brand-blue/30 bg-white text-brand-blue-dark [&_svg]:text-brand-blue",
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const push = React.useCallback((message: string, variant: Toast["variant"] = "info") => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, variant }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => {
          const Icon = icons[t.variant]
          return (
            <div
              key={t.id}
              className={cn("sigfis-fade-in flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs font-medium shadow-popover", styles[t.variant])}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{t.message}</span>
              <button onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>")
  return ctx
}
