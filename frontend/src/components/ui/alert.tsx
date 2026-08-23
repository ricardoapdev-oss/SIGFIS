import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground",
        info: "border-brand-blue/20 bg-brand-blue/5 text-brand-blue-dark",
        success: "border-brand-green/25 bg-brand-green/10 text-emerald-700",
        warning: "border-brand-amber/25 bg-brand-amber/10 text-amber-700",
        destructive: "border-brand-red/25 bg-brand-red/10 text-red-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const icons = { default: Info, info: Info, success: CheckCircle2, warning: AlertTriangle, destructive: XCircle }

function Alert({
  className,
  variant = "default",
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants> & { title?: string }) {
  const Icon = icons[variant ?? "default"]
  return (
    <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 space-y-0.5">
        {title && <p className="font-semibold leading-none">{title}</p>}
        {children && <div className="text-xs opacity-90 leading-relaxed">{children}</div>}
      </div>
    </div>
  )
}

export { Alert, alertVariants }
