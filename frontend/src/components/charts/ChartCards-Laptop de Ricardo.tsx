'use client';

import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

// ── Paleta corporativa ────────────────────────────────────────────────────────
export const CHART_COLORS = [
  '#10b981', // emerald  — chart-1
  '#3b82f6', // blue     — chart-2
  '#f59e0b', // amber    — chart-3
  '#ef4444', // red      — chart-4
  '#8b5cf6', // violet   — chart-5
  '#06b6d4', // cyan
  '#f97316', // orange
  '#ec4899', // pink
];

// ── Wrapper card ──────────────────────────────────────────────────────────────
export function ChartCard({
  title, subtitle, children, className = '', action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`relative bg-zinc-900/30 border border-zinc-800/60 p-5 rounded-2xl overflow-hidden group
        hover:border-zinc-700/60 transition-all duration-300 ${className}`}
    >
      {/* Subtle gradient glow top-left */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent pointer-events-none rounded-2xl" />

      <div className="relative flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xs font-semibold text-zinc-200 leading-tight">{title}</h4>
          {subtitle && <p className="text-[10px] text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0 ml-2">{action}</div>}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
export function BarChartCard({
  title, subtitle, data, dataKey, nameKey = 'name', color = CHART_COLORS[0], className,
}: {
  title: string; subtitle?: string; data: any[]; dataKey: string;
  nameKey?: string; color?: string; className?: string;
}) {
  const config: ChartConfig = {
    [dataKey]: { label: title, color },
  };

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={config} className="h-[200px] w-full">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false} tickLine={false}
          />
          <YAxis tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
          <ChartTooltip
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}

// ── Multi-Bar Chart ───────────────────────────────────────────────────────────
export function MultiBarChartCard({
  title, subtitle, data, bars, nameKey = 'name', className, stacked = false,
}: {
  title: string; subtitle?: string; data: any[];
  bars: { key: string; label: string; color?: string }[];
  nameKey?: string; className?: string; stacked?: boolean;
}) {
  const config: ChartConfig = Object.fromEntries(
    bars.map((b, i) => [b.key, { label: b.label, color: b.color || CHART_COLORS[i] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={config} className="h-[200px] w-full">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false} tickLine={false}
          />
          <YAxis tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
          <ChartTooltip
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          {bars.map((b, i) => (
            <Bar
              key={b.key}
              dataKey={b.key}
              name={b.label}
              fill={`var(--color-${b.key})`}
              radius={stacked ? [0, 0, 0, 0] : [3, 3, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}

// ── Horizontal Bar Chart ──────────────────────────────────────────────────────
export function HorizontalBarChartCard({
  title, subtitle, data, dataKey, nameKey = 'name', className,
}: {
  title: string; subtitle?: string; data: any[]; dataKey: string;
  nameKey?: string; className?: string;
}) {
  const config: ChartConfig = {
    [dataKey]: { label: dataKey, color: CHART_COLORS[0] },
  };

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <div className="space-y-2">
        {data.map((d, i) => {
          const max = Math.max(...data.map((x) => x[dataKey]));
          const pct = max > 0 ? (d[dataKey] / max) * 100 : 0;
          const color = CHART_COLORS[i % CHART_COLORS.length];
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-400 w-24 truncate shrink-0">{d[nameKey]}</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
              <span className="text-[10px] font-bold shrink-0" style={{ color }}>{d[dataKey]}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}

// ── Pie / Donut Chart ─────────────────────────────────────────────────────────
export function PieChartCard({
  title, subtitle, data, dataKey = 'value', nameKey = 'name', className, centerLabel,
}: {
  title: string; subtitle?: string; data: any[]; dataKey?: string;
  nameKey?: string; className?: string; centerLabel?: string;
}) {
  const config: ChartConfig = Object.fromEntries(
    data.map((d, i) => [
      d[nameKey],
      { label: d[nameKey], color: CHART_COLORS[i % CHART_COLORS.length] },
    ])
  );

  const total = data.reduce((sum, d) => sum + d[dataKey], 0);

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <div className="flex items-center gap-4">
        <ChartContainer config={config} className="h-[160px] w-[160px] shrink-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={68}
              dataKey={dataKey}
              nameKey={nameKey}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            {/* Center label rendered via absolute overlay below */}
          </PieChart>
        </ChartContainer>

        {/* Center overlay */}
        <div className="relative -ml-[160px] w-[160px] h-[160px] pointer-events-none flex items-center justify-center shrink-0">
          <div className="text-center">
            {centerLabel ? (
              <>
                <p className="text-xl font-bold text-white leading-none">{total}</p>
                <p className="text-[9px] text-zinc-500 mt-0.5">{centerLabel}</p>
              </>
            ) : null}
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {data.map((d, i) => {
            const pct = total > 0 ? ((d[dataKey] / total) * 100).toFixed(0) : 0;
            return (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                />
                <span className="text-[10px] text-zinc-400 truncate flex-1">{d[nameKey]}</span>
                <span className="text-[10px] font-bold text-zinc-300 tabular-nums">
                  {d[dataKey]}
                </span>
                <span className="text-[9px] text-zinc-600 tabular-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
}

// ── Area Chart ────────────────────────────────────────────────────────────────
export function AreaChartCard({
  title, subtitle, data, lines, nameKey = 'name', className,
}: {
  title: string; subtitle?: string; data: any[];
  lines: { key: string; label: string; color?: string }[];
  nameKey?: string; className?: string;
}) {
  const config: ChartConfig = Object.fromEntries(
    lines.map((l, i) => [l.key, { label: l.label, color: l.color || CHART_COLORS[i] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={config} className="h-[200px] w-full">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <defs>
            {lines.map((l, i) => (
              <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={l.color || CHART_COLORS[i]} stopOpacity={0.25} />
                <stop offset="95%" stopColor={l.color || CHART_COLORS[i]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false} tickLine={false}
          />
          <YAxis tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
          <ChartTooltip
            cursor={{ stroke: '#3f3f46', strokeWidth: 1 }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          {lines.map((l, i) => (
            <Area
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label}
              stroke={l.color || CHART_COLORS[i]}
              strokeWidth={2}
              fill={`url(#grad-${l.key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}

// ── Radial Bar Chart ──────────────────────────────────────────────────────────
export function RadialChartCard({
  title, subtitle, data, className,
}: {
  title: string; subtitle?: string; className?: string;
  data: { name: string; value: number; fill: string; max?: number }[];
}) {
  const config: ChartConfig = Object.fromEntries(
    data.map((d) => [d.name, { label: d.name, color: d.fill }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={config} className="h-[200px] w-full">
        <RadialBarChart
          data={data}
          innerRadius={30}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          barSize={10}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#27272a' }} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="name" />}
          />
        </RadialBarChart>
      </ChartContainer>
      {/* Legend manual */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.fill }} />
            <span className="text-[10px] text-zinc-400">{d.name}</span>
            <span className="text-[10px] font-bold tabular-nums" style={{ color: d.fill }}>
              {d.value}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Radar Chart ───────────────────────────────────────────────────────────────
export function RadarChartCard({
  title, subtitle, data, keys, className,
}: {
  title: string; subtitle?: string; className?: string;
  data: any[];
  keys: { key: string; label: string; color?: string }[];
}) {
  const config: ChartConfig = Object.fromEntries(
    keys.map((k, i) => [k.key, { label: k.label, color: k.color || CHART_COLORS[i] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={config} className="h-[220px] w-full">
        <RadarChart data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#71717a', fontSize: 9 }}
          />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {keys.map((k, i) => (
            <Radar
              key={k.key}
              dataKey={k.key}
              name={k.label}
              stroke={k.color || CHART_COLORS[i]}
              fill={k.color || CHART_COLORS[i]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </RadarChart>
      </ChartContainer>
    </ChartCard>
  );
}
