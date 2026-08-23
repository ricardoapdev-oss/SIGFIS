import * as React from "react"
import { cn } from "@/lib/utils"

export type TimelineItem = {
  id: string
  title: string
  description?: string
  date?: string
  tone?: "default" | "success" | "warning" | "destructive"
}

const toneDot: Record<string, string> = {
  default: "bg-brand-blue",
  success: "bg-brand-green",
  warning: "bg-brand-amber",
  destructive: "bg-brand-red",
}

function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-5 border-l border-border pl-5", className)}>
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className={cn("absolute -left-[1.42rem] top-1 size-2.5 rounded-full ring-4 ring-surface", toneDot[item.tone ?? "default"])} />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold text-foreground">{item.title}</p>
            {item.date && <span className="shrink-0 text-[10px] text-muted-foreground">{item.date}</span>}
          </div>
          {item.description && <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>}
        </li>
      ))}
    </ol>
  )
}

export { Timeline }
