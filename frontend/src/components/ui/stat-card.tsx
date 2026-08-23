import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const toneStyles: Record<string, string> = {
  blue: "bg-brand-blue/10 text-brand-blue",
  cyan: "bg-brand-cyan/10 text-teal-600",
  green: "bg-brand-green/10 text-emerald-600",
  purple: "bg-brand-purple/10 text-violet-600",
  amber: "bg-brand-amber/10 text-amber-600",
  red: "bg-brand-red/10 text-red-600",
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  tone = "blue",
  onClick,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
  trend?: { value: string; direction: "up" | "down"; positive?: boolean }
  tone?: keyof typeof toneStyles
  onClick?: () => void
  className?: string
}) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 text-left shadow-card transition-all",
        onClick && "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("flex size-9 items-center justify-center rounded-xl", toneStyles[tone])}>
          <Icon className="size-4.5" />
        </span>
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 text-[11px] font-semibold", trend.positive === false ? "text-brand-red" : "text-brand-green")}>
          {trend.direction === "up" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {trend.value}
        </div>
      )}
    </Comp>
  )
}

export { StatCard }
