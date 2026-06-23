'use client';

import {
  BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

export const CHART_COLORS = [
  '#3ecf8e',
  '#24b47e',
  '#10b981',
  '#f59e0b',
  '#e11d48',
  '#3b82f6',
  '#a1a1aa',
  '#2e2e33',
];

// ── Card Wrapper ───────────────────────────────────────────────────────────────
export function ChartCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-[#121214] border border-[#232326] p-6 rounded-lg shadow-sm ${className}`}>
      <div className="mb-4">
        <h4 className="text-xs font-semibold tracking-wide text-zinc-100 uppercase">{title}</h4>
        {subtitle && <p className="text-[11px] text-zinc-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Bar Chart ──────────────────────────────────────────────────────────────────
export function BarChartCard({ title, subtitle, data, dataKey, nameKey = 'name', color = CHART_COLORS[0], className, onBarClick }: {
  title: string; subtitle?: string; data: any[]; dataKey: string; nameKey?: string; color?: string; className?: string;
  onBarClick?: (item: any) => void;
}) {
  const chartConfig: ChartConfig = {
    [dataKey]: { label: dataKey, color },
  };

  const BAR_MIN_WIDTH = 52;
  const scrollable = data.length > 8;
  const minWidth = scrollable ? Math.max(data.length * BAR_MIN_WIDTH, 400) : undefined;

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <div className={scrollable ? 'overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900' : ''}>
        <ChartContainer config={chartConfig} className="h-[220px]" style={minWidth ? { minWidth } : undefined}>
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
            <CartesianGrid strokeDasharray="0" stroke="#1e1e20" vertical={false} />
            <XAxis
              dataKey={nameKey}
              tick={{ fill: '#71717a', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{ fill: '#71717a', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey={dataKey}
              fill={`var(--color-${dataKey})`}
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
              onClick={onBarClick ? (item) => onBarClick(item) : undefined}
              className={onBarClick ? 'cursor-pointer' : undefined}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </ChartCard>
  );
}

// ── Multi-Bar Chart ────────────────────────────────────────────────────────────
export function MultiBarChartCard({ title, subtitle, data, bars, nameKey = 'name', className }: {
  title: string; subtitle?: string; data: any[]; bars: { key: string; label: string; color?: string }[];
  nameKey?: string; className?: string;
}) {
  const chartConfig: ChartConfig = Object.fromEntries(
    bars.map((b, i) => [b.key, { label: b.label, color: b.color ?? CHART_COLORS[i % CHART_COLORS.length] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
          <CartesianGrid strokeDasharray="0" stroke="#1e1e20" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {bars.map((b) => (
            <Bar key={b.key} dataKey={b.key} fill={`var(--color-${b.key})`} radius={[3, 3, 0, 0]} maxBarSize={30} />
          ))}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}

// ── Pie / Donut Chart ──────────────────────────────────────────────────────────
export function PieChartCard({ title, subtitle, data, dataKey = 'value', nameKey = 'name', className }: {
  title: string; subtitle?: string; data: any[]; dataKey?: string; nameKey?: string; className?: string;
}) {
  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((d, i) => [d[nameKey], { label: d[nameKey], color: CHART_COLORS[i % CHART_COLORS.length] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <div className="flex items-center gap-6">
        <ChartContainer config={chartConfig} className="h-[160px] w-[55%]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={68}
              dataKey={dataKey}
              nameKey={nameKey}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>
        <div className="flex-1 space-y-2 border-l border-[#232326] pl-4">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
              />
              <span className="text-[10px] text-zinc-400 font-mono truncate flex-1">{d[nameKey]}</span>
              <span className="text-[10px] font-bold text-zinc-200 font-mono">{d[dataKey]}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

// ── Area Chart ─────────────────────────────────────────────────────────────────
export function AreaChartCard({ title, subtitle, data, lines, nameKey = 'name', className }: {
  title: string; subtitle?: string; data: any[];
  lines: { key: string; label: string; color?: string }[];
  nameKey?: string; className?: string;
}) {
  const chartConfig: ChartConfig = Object.fromEntries(
    lines.map((l, i) => [l.key, { label: l.label, color: l.color ?? CHART_COLORS[i % CHART_COLORS.length] }])
  );

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
          <defs>
            {lines.map((l, i) => (
              <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={l.color ?? CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.24} />
                <stop offset="95%" stopColor={l.color ?? CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#1e1e20" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {lines.map((l) => (
            <Area
              key={l.key}
              type="monotone"
              dataKey={l.key}
              stroke={`var(--color-${l.key})`}
              strokeWidth={2}
              fill={`url(#grad-${l.key})`}
              dot={false}
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}
