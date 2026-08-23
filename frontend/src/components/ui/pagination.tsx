import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
  className?: string
}) {
  const pages = React.useMemo(() => {
    const arr: (number | "…")[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) arr.push(i)
      else if (arr[arr.length - 1] !== "…") arr.push("…")
    }
    return arr
  }, [page, totalPages])

  if (totalPages <= 1) return null

  const btn = "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Paginação">
      <button className={btn} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft className="size-3.5" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-xs text-muted-foreground">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(btn, p === page ? "bg-brand-blue text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground")}
          >
            {p}
          </button>
        )
      )}
      <button className={btn} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        <ChevronRight className="size-3.5" />
      </button>
    </nav>
  )
}

export { Pagination }
