import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Breadcrumb({
  items,
  className,
}: {
  items: { label: string; onClick?: () => void }[]
  className?: string
}) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <React.Fragment key={i}>
            {item.onClick && !isLast ? (
              <button onClick={item.onClick} className="cursor-pointer font-medium transition-colors hover:text-foreground">
                {item.label}
              </button>
            ) : (
              <span className={cn(isLast && "font-semibold text-foreground")}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3 shrink-0" />}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export { Breadcrumb }
