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
  align = "left",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
  trend?: { value: string; direction: "up" | "down"; positive?: boolean }
  tone?: keyof typeof toneStyles
  onClick?: () => void
  className?: string
  /** "center" põe ícone + título lado a lado à esquerda (como no Painel Geral) e centraliza só o valor. Padrão "left" preserva o layout original (ícone sozinho em cima). */
  align?: "left" | "center"
}) {
  const Comp = onClick ? "button" : "div"
  const centered = align === "center"
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-all text-left",
        onClick && "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      {centered ? (
        <>
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", toneStyles[tone])}>
              <Icon className="size-4" />
            </span>
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground" title={label}>{label}</p>
          </div>
          <p className="mt-2.5 text-center text-2xl font-bold text-foreground">{value}</p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className={cn("flex size-9 items-center justify-center rounded-xl", toneStyles[tone])}>
              <Icon className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          </div>
        </>
      )}
      {trend && (
        <div className={cn("mt-3 flex items-center gap-1 text-[11px] font-semibold", centered && "justify-center", trend.positive === false ? "text-brand-red" : "text-brand-green")}>
          {trend.direction === "up" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {trend.value}
        </div>
      )}
    </Comp>
  )
}

export { StatCard }
