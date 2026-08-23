'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

function Tabs({
  value,
  onValueChange,
  tabs,
  className,
}: {
  value: string
  onValueChange: (v: string) => void
  tabs: { value: string; label: string; icon?: React.ComponentType<{ className?: string }> }[]
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-1 overflow-x-auto border-b border-border", className)} role="tablist">
      {tabs.map((t) => {
        const active = t.value === value
        const Icon = t.icon
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(t.value)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              active
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="size-3.5" />}
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
