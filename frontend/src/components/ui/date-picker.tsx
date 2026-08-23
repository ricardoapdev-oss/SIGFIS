import * as React from "react"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Campo de data. Usa o seletor nativo do navegador (acessível, sem
 * dependência extra) com o visual do Design System do SIGFIS.
 */
function DatePicker({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Calendar className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="date"
        data-slot="date-picker"
        className={cn(
          "h-8 w-full rounded-lg border border-input bg-transparent py-1 pr-2.5 pl-8 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { DatePicker }
