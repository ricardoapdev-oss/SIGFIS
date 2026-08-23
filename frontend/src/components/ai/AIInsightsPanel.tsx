'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Brain, AlertTriangle, TrendingUp, CheckCircle, Clock,
  BarChart2, Building2, MessageSquare, Search, Shield,
  RefreshCw, Send, Activity, ArrowUpRight, ArrowDownRight,
  Minus, Target, FileText, ChevronRight, Users, Zap, XCircle, Info,
} from 'lucide-react';
import { api, User } from '@/lib/api';
import { formatCurrency } from '@/lib/labels';
import { Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string) => void;
}

const SECTIONS = [
  { id: 'insights',        label: 'Insights',      icon: Brain },
  { id: 'recommendations', label: 'Recomendações', icon: Target },
  { id: 'predictive',      label: 'Preditiva',     icon: TrendingUp },
  { id: 'compliance',      label: 'Compliance',    icon: Shield },
  { id: 'suppliers',       label: 'Fornecedores',  icon: Building2 },
  { id: 'assistant',       label: 'Assistente',    icon: MessageSquare },
  { id: 'diagnosis',       label: 'Diagnóstico',   icon: Search },
];

// ── Info Tooltip ──────────────────────────────────────────────────────────────
function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="relative group inline-flex items-center shrink-0">
      <Info className="h-3 w-3 text-gray-400 group-hover:text-gray-500 cursor-help transition-colors" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-100 border border-gray-300 rounded-xl p-3 text-[10px] text-gray-700 leading-relaxed shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-left font-normal whitespace-normal">
        {text}
      </div>
    </div>
  );
}

function SevBadge({ sev }: { sev: string }) {
  const cls = sev === 'CRITICAL' ? 'text-red-400 bg-red-500/10 border-red-500/30'
    : sev === 'HIGH'   ? 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    : sev === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  const label = sev === 'CRITICAL' ? 'Crítico' : sev === 'HIGH' ? 'Alto' : sev === 'MEDIUM' ? 'Médio' : 'Baixo';
  return <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>;
}

const GRADE_TOOLTIPS: Record<string, string> = {
  A: 'Excelente (90–100 pts): Fornecedor sem ocorrências abertas, medições em dia e processos regulares. Recomendado para novos contratos e renovações.',
  B: 'Bom (75–89 pts): Desempenho satisfatório com eventuais pendências menores. Apto para renovação com monitoramento padrão.',
  C: 'Regular (60–74 pts): Fornecedor com algumas pendências. Exige acompanhamento mais próximo pelo fiscal designado.',
  D: 'Abaixo do esperado (45–59 pts): Ocorrências recorrentes ou medições atrasadas. Requerer plano de ação corretiva formal.',
  F: 'Crítico (<45 pts): Múltiplas não conformidades. Avaliar aplicação de sanções contratuais ou rescisão conforme cláusula contratual.',
};

function GradeChip({ grade, withTooltip }: { grade: string; withTooltip?: boolean }) {
  const cls = grade === 'A' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    : grade === 'B' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    : grade === 'C' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : grade === 'D' ? 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    : 'text-red-400 bg-red-500/10 border-red-500/30';
  if (withTooltip && GRADE_TOOLTIPS[grade]) {
    return (
      <div className="flex items-center gap-1">
        <span className={`text-sm font-black px-2.5 py-1 rounded-lg border ${cls}`}>{grade}</span>
        <InfoTooltip text={GRADE_TOOLTIPS[grade]} />
      </div>
    );
  }
  return <span className={`text-sm font-black px-2.5 py-1 rounded-lg border ${cls}`}>{grade}</span>;
}

function ScoreGauge({ score }: { score: number }) {
  const pct = Math.min(1, Math.max(0, score / 100));
  const cx = 60, cy = 60, r = 48;
  const angle = Math.PI - pct * Math.PI;
  const ex = cx + r * Math.cos(angle);
  const ey = cy - r * Math.sin(angle);
  const largeArc = pct > 0.5 ? 1 : 0;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#27272a" strokeWidth="10" strokeLinecap="round" />
      {score > 0 && <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />}
      <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize="22" fontWeight="bold">{score}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#71717a" fontSize="9">/ 100</text>
    </svg>
  );
}

// ── Section 1: Insights ────────────────────────────────────────────────────────
function InsightsSection({ insights, onNavigate }: { insights: any[]; onNavigate: Props['onNavigate'] }) {
  const catIcon = (cat: string) =>
    cat === 'EXPIRY' ? <Clock className="h-3.5 w-3.5" />
    : cat === 'FISCAL' ? <Users className="h-3.5 w-3.5" />
    : cat === 'MEASUREMENT' ? <BarChart2 className="h-3.5 w-3.5" />
    : cat === 'OCCURRENCE' ? <AlertTriangle className="h-3.5 w-3.5" />
    : <Zap className="h-3.5 w-3.5" />;
  const catLabel: Record<string, string> = { EXPIRY: 'Vencimento', FISCAL: 'Fiscal', MEASUREMENT: 'Medição', OCCURRENCE: 'Ocorrência', WORKLOAD: 'Carga de Trabalho' };

  if (!insights.length) return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
      <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
      <p className="text-sm font-bold text-emerald-400">Nenhum insight crítico identificado</p>
      <p className="text-xs text-gray-500 mt-1">A carteira está dentro dos parâmetros normais.</p>
    </div>
  );

  const critical = insights.filter(i => i.severity === 'CRITICAL').length;
  const high = insights.filter(i => i.severity === 'HIGH').length;
  const medium = insights.filter(i => i.severity === 'MEDIUM').length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-red-400">{critical}</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Críticos</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-orange-400">{high}</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Altos</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-amber-400">{medium}</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Médios</p>
        </div>
      </div>
      <div className="space-y-2">
        {insights.map(ins => {
          const sevBg = ins.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-500/5'
            : ins.severity === 'HIGH' ? 'border-orange-500/30 bg-orange-500/5'
            : ins.severity === 'MEDIUM' ? 'border-amber-500/30 bg-amber-500/5'
            : 'border-blue-500/20 bg-blue-500/5';
          const iconColor = ins.severity === 'CRITICAL' ? 'text-red-400' : ins.severity === 'HIGH' ? 'text-orange-400' : ins.severity === 'MEDIUM' ? 'text-amber-400' : 'text-blue-400';
          const btnCls = ins.severity === 'CRITICAL' ? 'text-red-400 border-red-500/30 bg-red-500/10' : ins.severity === 'HIGH' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10';
          return (
            <div key={ins.id} className={`p-4 rounded-xl border ${sevBg}`}>
              <div className="flex items-start gap-3">
                <div className={`shrink-0 mt-0.5 ${iconColor}`}>{catIcon(ins.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <SevBadge sev={ins.severity} />
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">{catLabel[ins.category] ?? ins.category}</span>
                    {ins.contractNumber && <span className="text-[9px] text-gray-400">{ins.contractNumber}</span>}
                  </div>
                  <p className="text-xs font-bold text-gray-800">{ins.title}</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">{ins.description}</p>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <div className="flex-1 bg-gray-100/60 border border-gray-300 rounded-lg px-2.5 py-1.5">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Ação Recomendada</p>
                      <p className="text-[11px] text-gray-700">{ins.action}</p>
                    </div>
                    {ins.contractId && (
                      <button onClick={() => onNavigate('details', ins.contractId)}
                        className={`shrink-0 flex items-center gap-1 text-[9px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${btnCls}`}>
                        Ver <ChevronRight className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section 2: Recommendations ────────────────────────────────────────────────
function RecommendationsSection({ recommendations, onNavigate }: { recommendations: any[]; onNavigate: Props['onNavigate'] }) {
  if (!recommendations.length) return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
      <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
      <p className="text-sm font-bold text-emerald-400">Nenhuma ação prioritária pendente</p>
    </div>
  );
  return (
    <div className="space-y-3">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{recommendations.length} ações priorizadas por impacto</p>
      {recommendations.map((rec, idx) => (
        <div key={idx} className="bg-gray-100/30 border border-gray-200 rounded-xl p-4 flex items-start gap-4">
          <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 shrink-0">{rec.priority}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{rec.category}</span>
              <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${rec.impact === 'HIGH' ? 'text-red-400 bg-red-500/10' : rec.impact === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                Impacto {rec.impact === 'HIGH' ? 'Alto' : rec.impact === 'MEDIUM' ? 'Médio' : 'Baixo'}
              </span>
              <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${rec.effort === 'LOW' ? 'text-emerald-400 bg-emerald-500/10' : rec.effort === 'MEDIUM' ? 'text-gray-500 bg-gray-100' : 'text-red-400 bg-red-500/10'}`}>
                Esforço {rec.effort === 'LOW' ? 'Baixo' : rec.effort === 'MEDIUM' ? 'Médio' : 'Alto'}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-800">{rec.title}</p>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{rec.description}</p>
          </div>
          {rec.contractId && (
            <button onClick={() => onNavigate('details', rec.contractId)}
              className="shrink-0 flex items-center gap-1 text-[9px] font-bold text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
              Ver <ChevronRight className="h-2.5 w-2.5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Section 3: Predictive ─────────────────────────────────────────────────────
function PredictiveSection({ predictions, monthlyData }: { predictions: any[]; monthlyData: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {predictions.map((pred, i) => {
          const TrendIcon = pred.trend === 'UP' ? ArrowUpRight : pred.trend === 'DOWN' ? ArrowDownRight : Minus;
          const trendColor = pred.trend === 'UP' ? 'text-emerald-400' : pred.trend === 'DOWN' ? 'text-red-400' : 'text-gray-500';
          const barColor = pred.probability > 0.7 ? '#ef4444' : pred.probability > 0.4 ? '#f59e0b' : '#10b981';
          return (
            <div key={i} className="bg-gray-100/30 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">{pred.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <p className="text-xs font-bold text-gray-800">{pred.title}</p>
                    {(pred as any).tooltip && <InfoTooltip text={(pred as any).tooltip} />}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">{pred.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-black text-gray-800">{Math.round(pred.probability * 100)}%</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">Probabilidade</p>
                  <div className="mt-1.5 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pred.probability * 100}%`, background: barColor }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {monthlyData.length > 0 && (() => {
        const chartData = monthlyData.map((m: any) => ({
          name: m.name,
          valueM: m.value > 0 ? +(m.value / 1_000_000).toFixed(2) : 0,
          measuredK: m.measured > 0 ? Math.round(m.measured / 1000) : 0,
        }));
        return (
          <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-violet-400" /> Evolução Financeira — Últimos 6 Meses
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={chartData} margin={{ top: 4, right: 32, bottom: 4, left: -10 }}>
                <defs>
                  <linearGradient id="intValGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="value" tick={{ fill: '#71717a', fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}M`} />
                <YAxis yAxisId="pct" orientation="right" tick={{ fill: '#71717a', fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}K`} />
                <Tooltip
                  contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 11 }}
                  formatter={(v: any, name: any) =>
                    name === 'Carteira ativa'
                      ? [`R$ ${Number(v).toFixed(2).replace('.', ',')}M`, name]
                      : [`${Number(v).toLocaleString('pt-BR')} mil`, name]
                  }
                />
                <Area yAxisId="value" type="monotone" dataKey="valueM" stroke="#6366f1" strokeWidth={1.5} fill="url(#intValGrad)" dot={false} name="Carteira ativa" />
                <Line yAxisId="pct" type="monotone" dataKey="measuredK" stroke="#10b981" strokeWidth={2}
                  dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} name="Executado/medido" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="h-1.5 w-4 rounded-full bg-indigo-500" /><span className="text-[9px] text-gray-500">Carteira ativa (R$ M — eixo esquerdo)</span></div>
              <div className="flex items-center gap-1.5"><div className="h-0.5 w-4 rounded-full bg-emerald-500" /><span className="text-[9px] text-gray-500">% executado (eixo direito)</span></div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

const COMPLIANCE_TOOLTIPS: Record<string, string> = {
  'Cobertura Fiscal': 'Peso: 25 pts — Percentual de contratos ativos com fiscal titular formalmente designado. Contratos sem fiscal violam o art. 117 da Lei 14.133/2021 (Nova Lei de Licitações), que exige designação de gestor/fiscal como condição de regularidade. Pontuação máxima quando 100% dos contratos ativos têm designação registrada.',
  'Ocorrências Críticas': 'Peso: 20 pts — Mede o índice de contratos com ocorrências (irregularidades, inadimplementos ou não conformidades) ainda em aberto. Ocorrências sem resolução formal indicam falha na fiscalização e podem caracterizar omissão do gestor. Cada contrato com ocorrência ativa reduz a pontuação proporcional ao total da carteira.',
  'Medições Pendentes': 'Peso: 20 pts — Avalia a regularidade das medições mensais de execução. Atrasos nas medições dificultam o acompanhamento da execução física e financeira do contrato, podendo levar a pagamentos sem correspondência com o serviço prestado — o que configura falha de fiscalização. A pontuação decresce por contrato com medição não aprovada.',
  'Contratos Expirando': 'Peso: 20 pts — Identifica contratos ativos a vencer em até 30 dias sem processo de renovação ou nova licitação formalmente iniciado. A descontinuidade de serviço por falta de contrato vigente configura irregularidade administrativa. A pontuação é reduzida proporcionalmente ao número de contratos nessa situação.',
  'Processos em Dia': 'Peso: 15 pts — Verifica se os processos licitatórios vinculados aos contratos estão em andamento regular, sem etapas com prazo vencido ou com status "Bloqueado". Processos atrasados comprometem a formalização tempestiva de novos contratos e aditivos, gerando risco de desabastecimento ou contratação emergencial.',
};

// ── Section 4: Compliance ─────────────────────────────────────────────────────
function ComplianceSection({ compliance }: { compliance: any }) {
  if (!compliance) return <div className="text-center py-8 text-gray-500 text-xs">Dados insuficientes para calcular compliance.</div>;
  const { overallScore, grade, dimensions, contractsAudit } = compliance;
  const dimBarColor = (s: string) => s === 'OK' ? 'bg-emerald-500' : s === 'WARNING' ? 'bg-amber-500' : 'bg-red-500';
  const dimTextColor = (s: string) => s === 'OK' ? 'text-emerald-400' : s === 'WARNING' ? 'text-amber-400' : 'text-red-400';
  return (
    <div className="space-y-6">
      <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center shrink-0">
          <ScoreGauge score={overallScore} />
          <div className="mt-2 flex items-center justify-center gap-2">
            <GradeChip grade={grade} />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-700">Score Geral</p>
              <p className="text-[10px] text-gray-500">Compliance Contratual</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3 w-full">
          {dimensions.map((d: any) => (
            <div key={d.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-500">{d.name}</span>
                  <InfoTooltip text={COMPLIANCE_TOOLTIPS[d.name] ?? ''} />
                </div>
                <span className={`text-[10px] font-bold ${dimTextColor(d.status)}`}>{d.score}/{d.maxScore}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${dimBarColor(d.status)}`} style={{ width: `${(d.score / d.maxScore) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100/20 border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Auditoria por Contrato (Top 10 Ativos)</p>
        </div>
        <div className="divide-y divide-gray-200">
          {contractsAudit.map((c: any) => {
            const g = c.score >= 90 ? 'A' : c.score >= 75 ? 'B' : c.score >= 60 ? 'C' : c.score >= 45 ? 'D' : 'F';
            return (
              <div key={c.contractId} className="px-4 py-3 flex items-start gap-3">
                <div className="shrink-0"><GradeChip grade={g} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-700">{c.contractNumber}</p>
                  <p className="text-[10px] text-gray-500 truncate">{c.object}</p>
                  {c.issues.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {c.issues.map((issue: string, i: number) => (
                        <span key={i} className="text-[8px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-full">{issue}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-gray-700">{c.score}</p>
                  <p className="text-[9px] text-gray-400">/100</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Section 5: Suppliers ──────────────────────────────────────────────────────
function SuppliersSection({ suppliers }: { suppliers: any[] }) {
  if (!suppliers.length) return <div className="text-center py-8 text-gray-500 text-xs">Nenhum fornecedor encontrado.</div>;
  const counts = { A: suppliers.filter(s => s.grade === 'A').length, B: suppliers.filter(s => s.grade === 'B').length, C: suppliers.filter(s => s.grade === 'C').length, D: suppliers.filter(s => s.grade === 'D' || s.grade === 'F').length };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {([
          { grade: 'A', count: counts.A, color: 'bg-emerald-500/10 border-emerald-500/20', num: 'text-emerald-400' },
          { grade: 'B', count: counts.B, color: 'bg-blue-500/10 border-blue-500/20',       num: 'text-blue-400'    },
          { grade: 'C', count: counts.C, color: 'bg-amber-500/10 border-amber-500/20',     num: 'text-amber-400'   },
          { grade: 'D/F', count: counts.D, color: 'bg-red-500/10 border-red-500/20',       num: 'text-red-400'     },
        ] as const).map(({ grade, count, color, num }) => (
          <div key={grade} className={`${color} border rounded-xl p-3 text-center`}>
            <p className={`text-2xl font-black ${num}`}>{count}</p>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Nota {grade}</p>
              <InfoTooltip text={GRADE_TOOLTIPS[grade] ?? GRADE_TOOLTIPS['F']} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100/20 border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 grid grid-cols-12 gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Fornecedor</div>
          <div className="col-span-2 text-center">Contratos</div>
          <div className="col-span-2 text-center">Ocorrências</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-1 text-center">Nota</div>
        </div>
        <div className="divide-y divide-gray-200 max-h-[420px] overflow-y-auto">
          {suppliers.map((s, i) => (
            <div key={s.contractorId} className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-100/20 transition-colors">
              <div className="col-span-1 text-xs font-bold text-gray-400">{i + 1}</div>
              <div className="col-span-4 min-w-0">
                <p className="text-xs font-bold text-gray-800 truncate">{s.name}</p>
                <p className="text-[9px] text-gray-500 truncate">{s.category}</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="text-xs font-bold text-gray-700">{s.activeContracts}</p>
                <p className="text-[9px] text-gray-400">ativos</p>
              </div>
              <div className="col-span-2 text-center">
                <p className={`text-xs font-bold ${s.openOccurrences > 0 ? 'text-red-400' : 'text-gray-500'}`}>{s.openOccurrences}</p>
                <p className="text-[9px] text-gray-400">abertas</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="text-xs font-bold text-gray-800">{s.score}</p>
                <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.score >= 75 ? '#10b981' : s.score >= 50 ? '#f59e0b' : '#ef4444' }} />
                </div>
              </div>
              <div className="col-span-1 flex justify-center"><GradeChip grade={s.grade} withTooltip /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section 6: Assistant ──────────────────────────────────────────────────────
function AssistantSection({ chatHistory, setChatHistory, chatInput, setChatInput, processQuestion }: {
  chatHistory: { role: 'user' | 'assistant'; text: string }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ role: 'user' | 'assistant'; text: string }[]>>;
  chatInput: string;
  setChatInput: (v: string) => void;
  processQuestion: (q: string) => string;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  const sendMessage = () => {
    const q = chatInput.trim();
    if (!q) return;
    const answer = processQuestion(q);
    setChatHistory(prev => [...prev, { role: 'user', text: q }, { role: 'assistant', text: answer }]);
    setChatInput('');
  };

  const suggestions = [
    'Quantos contratos vencem este mês?',
    'Qual fiscal tem mais contratos?',
    'Quais contratos têm medição pendente?',
    'Qual o valor total da carteira?',
    'Quais contratos estão sem fiscal?',
    'Qual contrato tem o maior valor?',
    'Quantos contratos estão com ocorrência aberta?',
    'Qual a taxa de execução financeira?',
    'Quais contratos vencem em 90 dias?',
    'Quais fornecedores têm nota abaixo de C?',
    'Qual contrato tem menos dias restantes?',
    'Qual a média de valor dos contratos ativos?',
    'Quais contratos foram encerrados?',
    'Quais contratos têm processo atrasado?',
    'Qual o saldo financeiro a pagar?',
  ];

  const ASSISTANT_TOOLTIP = 'O assistente responde perguntas em linguagem natural sobre a carteira de contratos. Você pode perguntar sobre: vencimentos e prazos, fiscais designados, medições pendentes, ocorrências abertas, valores financeiros, fornecedores, riscos e compliance. As respostas são calculadas em tempo real a partir dos dados do sistema.';

  return (
    <div className="space-y-4">
      <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-3 flex items-start gap-2">
        <Brain className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-500">Assistente baseado nos dados reais da carteira. Faça perguntas em linguagem natural sobre contratos, fiscais, medições e valores.</p>
      </div>
      <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-4 min-h-[240px] max-h-[400px] overflow-y-auto space-y-3">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Faça uma pergunta sobre a carteira de contratos</p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {suggestions.slice(0, 3).map((s, i) => (
                <button key={i} onClick={() => setChatInput(s)}
                  className="text-[10px] text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-3 py-2 ${msg.role === 'user' ? 'bg-violet-500/20 border border-violet-500/30 text-gray-800' : 'bg-gray-100/60 border border-gray-300 text-gray-700'}`}>
                {msg.role === 'assistant' && <p className="text-[8px] font-bold text-violet-400 uppercase tracking-widest mb-1">Assistente</p>}
                <pre className="text-[11px] whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</pre>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Pergunte sobre contratos, fiscais, medições..."
          className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50" />
        <button onClick={sendMessage} className="bg-violet-500 hover:bg-violet-400 text-white px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Sugestões rápidas</p>
          <InfoTooltip text={ASSISTANT_TOOLTIP} />
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setChatInput(s)}
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
              <ChevronRight className="h-2.5 w-2.5 shrink-0" />{s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section 7: Diagnosis ──────────────────────────────────────────────────────
function DiagnosisSection({ contracts, selectedContractId, setSelectedContractId, diagnosis, onNavigate }: {
  contracts: any[]; selectedContractId: string; setSelectedContractId: (v: string) => void;
  diagnosis: any; onNavigate: Props['onNavigate'];
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Selecionar Contrato para Diagnóstico</p>
        <select value={selectedContractId} onChange={e => setSelectedContractId(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer">
          <option value="">— Selecione um contrato ativo —</option>
          {contracts.filter((c: any) => c.status === 'ACTIVE').map((c: any) => (
            <option key={c.id} value={c.id}>{c.contractNumber} — {(c.objectDescription ?? '').substring(0, 55)}</option>
          ))}
        </select>
      </div>
      {!diagnosis ? (
        <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-10 text-center">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-xs text-gray-400">Selecione um contrato para gerar o diagnóstico de saúde</p>
        </div>
      ) : (() => {
        const { contract: c, daysRemaining, issues, score } = diagnosis;
        const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 45 ? 'D' : 'F';
        const fiscal = c.fiscalAssignments?.[0]?.fiscal;
        return (
          <div className="space-y-4">
            <div className="bg-gray-100/30 border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="text-center shrink-0">
                  <ScoreGauge score={score} />
                  <div className="mt-1"><GradeChip grade={grade} /></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Diagnóstico Individual</p>
                  <p className="text-sm font-black text-gray-900 mt-0.5">{c.contractNumber}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{c.objectDescription}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-[10px]">
                    <div><p className="text-gray-400">Contratada</p><p className="text-gray-700 font-bold">{c.contractor?.tradeName || c.contractor?.name || '—'}</p></div>
                    <div><p className="text-gray-400">Valor</p><p className="text-gray-700 font-bold">{formatCurrency(c.currentValue ?? 0)}</p></div>
                    <div><p className="text-gray-400">Vencimento</p><p className={`font-bold ${daysRemaining <= 30 ? 'text-red-400' : daysRemaining <= 90 ? 'text-amber-400' : 'text-gray-700'}`}>{new Date(c.endDate).toLocaleDateString('pt-BR')} ({daysRemaining}d)</p></div>
                    <div><p className="text-gray-400">Fiscal</p><p className={`font-bold ${fiscal ? 'text-gray-700' : 'text-red-400'}`}>{fiscal?.name ?? 'Sem designação'}</p></div>
                  </div>
                </div>
              </div>
            </div>
            {issues.length > 0 ? (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Não conformidades identificadas</p>
                <ul className="space-y-1.5">
                  {issues.map((issue: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-gray-700">
                      <AlertTriangle className="h-3 w-3 text-red-400 shrink-0" /> {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                <p className="text-xs font-bold text-emerald-400">Contrato em conformidade — nenhuma não conformidade identificada</p>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Fiscal Designado', ok: (c.fiscalAssignments?.length ?? 0) > 0 },
                { label: 'Sem Ocorrências Abertas', ok: !c.hasOpenOccurrences },
                { label: 'Medições em Dia', ok: !c.hasPendingMeasurements },
                { label: 'Processo sem Atraso', ok: !c.hasDelayedProcesses },
              ].map(({ label, ok }) => (
                <div key={label} className={`rounded-xl p-3 border text-center ${ok ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  {ok ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto mb-1" /> : <XCircle className="h-4 w-4 text-red-400 mx-auto mb-1" />}
                  <p className="text-[9px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('details', c.id)}
              className="w-full flex items-center justify-center gap-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-400 font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer">
              <FileText className="h-3.5 w-3.5" /> Abrir Contrato Completo
            </button>
          </div>
        );
      })()}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function AIInsightsPanel({ user, onNavigate }: Props) {
  const [activeSection, setActiveSection] = useState('insights');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [selectedContractId, setSelectedContractId] = useState('');

  const { data: dashData, isLoading: dashLoading, refetch } = useQuery({
    queryKey: ['intelligence-dash', user.id],
    queryFn: () => api.dashboard.gestor() as Promise<any>,
    staleTime: 60_000,
  });

  // Reusa cache de contratos já carregado pelo ContractsListView (mesma queryKey)
  const { data: contractsRaw, isLoading: contractsLoading } = useQuery({
    queryKey: ['contracts-list', user.id],
    queryFn: () => api.contracts.list() as Promise<any>,
    staleTime: 300_000,
  });

  const contracts: any[] = useMemo(() => Array.isArray(contractsRaw) ? contractsRaw : (contractsRaw as any)?.data ?? [], [contractsRaw]);
  const dash: any = dashData;
  const isLoading = dashLoading || contractsLoading;

  const autoInsights = useMemo(() => {
    if (!dash || !contracts.length) return [];
    const insights: any[] = [];
    const now = new Date();
    contracts.filter(c => c.status === 'ACTIVE').forEach(c => {
      const days = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
      if (days < 0) insights.push({ id: `exp-${c.id}`, category: 'EXPIRY', severity: 'CRITICAL', title: `Contrato vencido há ${Math.abs(days)}d`, description: `${c.contractNumber} encerrou em ${new Date(c.endDate).toLocaleDateString('pt-BR')} e ainda está ativo.`, action: 'Encerrar ou regularizar prorrogação imediatamente.', contractId: c.id, contractNumber: c.contractNumber });
      else if (days <= 30) insights.push({ id: `exp-${c.id}`, category: 'EXPIRY', severity: 'CRITICAL', title: `Vence em ${days} dias`, description: `${c.contractNumber} — risco iminente de descontinuidade.`, action: 'Iniciar processo de prorrogação ou nova licitação urgentemente.', contractId: c.id, contractNumber: c.contractNumber });
      else if (days <= 60) insights.push({ id: `exp-${c.id}`, category: 'EXPIRY', severity: 'HIGH', title: `Vence em ${days} dias`, description: `${c.contractNumber} encerra em ${new Date(c.endDate).toLocaleDateString('pt-BR')}.`, action: 'Iniciar processo de renovação ou licitação substitutiva.', contractId: c.id, contractNumber: c.contractNumber });
      else if (days <= 90) insights.push({ id: `exp-${c.id}`, category: 'EXPIRY', severity: 'MEDIUM', title: `Atenção: vence em ${days} dias`, description: `${c.contractNumber} — planejar renovação.`, action: 'Avaliar necessidade e iniciar processo de renovação.', contractId: c.id, contractNumber: c.contractNumber });
    });
    const noFiscal = contracts.filter(c => c.status === 'ACTIVE' && !(c.fiscalAssignments?.some((a: any) => a.isActive)));
    if (noFiscal.length) insights.push({ id: 'no-fiscal', category: 'FISCAL', severity: 'HIGH', title: `${noFiscal.length} contrato(s) sem fiscal designado`, description: `Contratos: ${noFiscal.slice(0, 3).map((c: any) => c.contractNumber).join(', ')}${noFiscal.length > 3 ? ` +${noFiscal.length - 3}` : ''}.`, action: 'Designar fiscal titular conforme Lei 14.133/21.' });
    const pendingMsr = contracts.filter(c => c.measurements?.some((m: any) => m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') || c.hasPendingMeasurements);
    if (pendingMsr.length) insights.push({ id: 'pending-msr', category: 'MEASUREMENT', severity: 'MEDIUM', title: `${pendingMsr.length} contrato(s) com medição aguardando homologação`, description: `Medições submetidas aguardando aprovação do gestor.`, action: 'Revisar e aprovar ou reprovar as medições pendentes.' });
    const openOcc = contracts.filter(c => c.occurrences?.some((o: any) => o.status !== 'RESOLVED') || c.hasOpenOccurrences);
    if (openOcc.length) insights.push({ id: 'open-occ', category: 'OCCURRENCE', severity: dash?.riskSummary?.critical > 0 ? 'HIGH' : 'MEDIUM', title: `${openOcc.length} contrato(s) com ocorrências abertas`, description: `Ocorrências abertas aguardando resolução formal.`, action: 'Acompanhar e resolver, especialmente as críticas.' });
    const overloaded = (dash?.fiscalWorkload ?? []).filter((f: any) => f.contracts >= 5);
    if (overloaded.length) insights.push({ id: 'workload', category: 'WORKLOAD', severity: 'MEDIUM', title: `${overloaded.length} fiscal(is) com carga excessiva (≥5 contratos)`, description: `${overloaded.map((f: any) => f.shortName).join(', ')} — risco de falhas.`, action: 'Redistribuir contratos ou designar fiscais substitutos.' });
    const order: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return insights.sort((a, b) => (order[a.severity] ?? 4) - (order[b.severity] ?? 4));
  }, [dash, contracts]);

  const recommendations = useMemo(() => {
    const recs: any[] = [];
    const now = new Date();
    let p = 1;
    contracts.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return c.status === 'ACTIVE' && d >= 0 && d <= 30; })
      .forEach(c => recs.push({ priority: p++, category: 'Renovação Urgente', title: `Renovar: ${c.contractNumber}`, description: 'Vence em menos de 30 dias. Risco de descontinuidade imediata.', impact: 'HIGH', effort: 'HIGH', contractId: c.id }));
    contracts.filter(c => c.measurements?.some((m: any) => m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') || c.hasPendingMeasurements)
      .forEach(c => recs.push({ priority: p++, category: 'Homologação', title: `Homologar medição: ${c.contractNumber}`, description: 'Medição aguardando aprovação. Prazo médio: 10 dias úteis.', impact: 'MEDIUM', effort: 'LOW', contractId: c.id }));
    const noFiscal = contracts.filter(c => c.status === 'ACTIVE' && !(c.fiscalAssignments?.some((a: any) => a.isActive)));
    if (noFiscal.length) recs.push({ priority: p++, category: 'Designação', title: `Designar fiscal para ${noFiscal.length} contrato(s)`, description: 'A Lei 14.133/21 exige designação formal de fiscal. Risco de autuação.', impact: 'HIGH', effort: 'MEDIUM' });
    contracts.filter(c => c.occurrences?.some((o: any) => o.status !== 'RESOLVED') || c.hasOpenOccurrences)
      .forEach(c => recs.push({ priority: p++, category: 'Ocorrência', title: `Resolver ocorrência: ${c.contractNumber}`, description: 'Ocorrência aberta requer documentação de resolução.', impact: 'MEDIUM', effort: 'MEDIUM', contractId: c.id }));
    contracts.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return c.status === 'ACTIVE' && d > 30 && d <= 60; }).slice(0, 3)
      .forEach(c => recs.push({ priority: p++, category: 'Renovação', title: `Planejar renovação: ${c.contractNumber}`, description: 'Contrato vence em 31–60 dias.', impact: 'HIGH', effort: 'MEDIUM', contractId: c.id }));
    return recs;
  }, [contracts]);

  const predictions = useMemo(() => {
    if (!dash) return [];
    const monthly = dash?.charts?.monthlyEvolution ?? [];
    const last3 = monthly.slice(-3);
    const measuredTrend = last3.length >= 2 ? last3[last3.length - 1].measured - last3[0].measured : 0;
    return [
      {
        title: 'Contratos em risco de descontinuidade',
        description: `${dash?.extendedAlerts?.expiring30 ?? 0} contratos vencem nos próximos 30 dias sem renovação confirmada.`,
        probability: Math.min(0.9, 0.3 + (dash?.extendedAlerts?.expiring30 ?? 0) * 0.2),
        timeframe: 'Próximos 30 dias', trend: 'DOWN' as const,
        tooltip: 'Contratos ativos que encerram nos próximos 30 dias sem processo formal de renovação ou nova licitação iniciada. O risco de descontinuidade representa a probabilidade de o serviço ou fornecimento ser interrompido por falta de cobertura contratual — o que configura irregularidade administrativa.',
      },
      {
        title: 'Tendência de execução financeira',
        description: measuredTrend > 0 ? `Execução cresceu R$ ${measuredTrend.toLocaleString('pt-BR')} nos últimos 3 meses.` : measuredTrend < 0 ? `Execução reduziu R$ ${Math.abs(measuredTrend).toLocaleString('pt-BR')} — possível subexecução.` : 'Execução financeira estável.',
        probability: 0.75, timeframe: 'Últimos 3 meses',
        trend: measuredTrend > 0 ? 'UP' as const : measuredTrend < 0 ? 'DOWN' as const : 'STABLE' as const,
        tooltip: 'Compara o total de medições aprovadas (valores efetivamente pagos à contratada) entre os últimos 3 meses. Redução pode indicar subexecução — quando o contratado entrega menos do que o previsto — o que pode gerar necessidade de glosa ou distrato parcial. Crescimento indica boa evolução dos serviços.',
      },
      {
        title: 'Risco de não conformidade',
        description: `${dash?.riskSummary?.critical ?? 0} contratos em risco crítico. Resolução necessária em até 15 dias.`,
        probability: Math.min(0.85, 0.2 + (dash?.riskSummary?.critical ?? 0) * 0.15),
        timeframe: 'Próximas 2 semanas', trend: 'STABLE' as const,
        tooltip: 'Contratos classificados em risco crítico possuem irregularidades que podem resultar em autuação pelo controle interno, glosa de valores ou questionamento pelo TCE. Exemplos: contrato vencido ainda ativo, ausência de fiscal designado, ocorrência crítica sem resposta ou processo judicial aberto. Resolução em até 15 dias úteis é o prazo mínimo recomendado.',
      },
      {
        title: 'Risco de sobrecarga de fiscais',
        description: `${(dash?.fiscalWorkload ?? []).filter((f: any) => f.contracts >= 5).length} fiscal(is) acima da capacidade. Risco de falhas na fiscalização.`,
        probability: 0.6, timeframe: 'Situação atual', trend: 'STABLE' as const,
        tooltip: 'Fiscais com 5 ou mais contratos simultâneos excedem a capacidade operacional recomendada. A sobrecarga aumenta o risco de medições não realizadas no prazo, ocorrências não identificadas a tempo e falhas de registro — o que pode comprometer a regularidade do contrato e a responsabilidade do fiscal perante a Lei 8.666/93 e a Lei 14.133/21.',
      },
    ];
  }, [dash]);

  const compliance = useMemo(() => {
    if (!contracts.length || !dash) return null;
    const active = contracts.filter(c => c.status === 'ACTIVE');
    const total = active.length;
    if (!total) return null;
    const now = new Date();
    const fiscalScore = Math.round((active.filter(c => c.fiscalAssignments?.length > 0).length / total) * 25);
    const occScore = Math.round(Math.max(0, 1 - active.filter(c => c.hasOpenOccurrences).length / total) * 20);
    const msrScore = Math.round(Math.max(0, 1 - active.filter(c => c.hasPendingMeasurements).length / total) * 20);
    const exp30 = active.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return d >= 0 && d <= 30; }).length;
    const expiryScore = Math.round(Math.max(0, 1 - exp30 / total) * 20);
    const processScore = Math.round(Math.max(0, 1 - active.filter(c => c.hasDelayedProcesses).length / total) * 15);
    const totalScore = fiscalScore + occScore + msrScore + expiryScore + processScore;
    const grade = totalScore >= 90 ? 'A' : totalScore >= 75 ? 'B' : totalScore >= 60 ? 'C' : totalScore >= 45 ? 'D' : 'F';
    const st = (v: number, min1: number, min2: number) => v >= min1 ? 'OK' : v >= min2 ? 'WARNING' : 'CRITICAL';
    return {
      overallScore: totalScore, grade,
      dimensions: [
        { name: 'Cobertura Fiscal', score: fiscalScore, maxScore: 25, status: st(fiscalScore, 20, 12) },
        { name: 'Ocorrências Críticas', score: occScore, maxScore: 20, status: st(occScore, 16, 10) },
        { name: 'Medições Pendentes', score: msrScore, maxScore: 20, status: st(msrScore, 16, 10) },
        { name: 'Contratos Expirando', score: expiryScore, maxScore: 20, status: st(expiryScore, 16, 10) },
        { name: 'Processos em Dia', score: processScore, maxScore: 15, status: st(processScore, 12, 7) },
      ],
      contractsAudit: active.slice(0, 10).map(c => {
        const issues: string[] = [];
        if (!c.fiscalAssignments?.length) issues.push('Sem fiscal');
        if (c.hasOpenOccurrences) issues.push('Ocorrência aberta');
        if (c.hasPendingMeasurements) issues.push('Medição pendente');
        if (c.hasDelayedProcesses) issues.push('Processo atrasado');
        const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
        if (d >= 0 && d <= 90) issues.push(`Vence em ${d}d`);
        return { contractId: c.id, contractNumber: c.contractNumber, object: (c.objectDescription ?? '').substring(0, 45), score: Math.max(0, 100 - issues.length * 18), issues };
      }),
    };
  }, [contracts, dash]);

  const suppliers = useMemo(() => {
    if (!contracts.length) return [];
    const map: Record<string, any> = {};
    contracts.forEach(c => {
      if (!c.contractor) return;
      const id = c.contractorId ?? c.contractor?.id ?? 'unknown';
      if (!map[id]) map[id] = { name: c.contractor?.tradeName || c.contractor?.corporateName || c.contractor?.name || '—', category: c.contractor?.category ?? 'N/A', list: [] };
      map[id].list.push(c);
    });
    return Object.entries(map).map(([id, d]: [string, any]) => {
      const active = d.list.filter((c: any) => c.status === 'ACTIVE');
      const withOcc = d.list.filter((c: any) => c.hasOpenOccurrences).length;
      const withPend = d.list.filter((c: any) => c.hasPendingMeasurements).length;
      const withDel = d.list.filter((c: any) => c.hasDelayedProcesses).length;
      const score = Math.max(0, Math.min(100, 100 - withOcc * 15 - withPend * 5 - withDel * 10));
      const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 45 ? 'D' : 'F';
      return { contractorId: id, name: d.name, category: d.category, contractCount: d.list.length, activeContracts: active.length, openOccurrences: withOcc, pendingMeasurements: withPend, score, grade };
    }).sort((a, b) => b.score - a.score);
  }, [contracts]);

  const processQuestion = useMemo(() => (q: string): string => {
    if (!dash || !contracts.length) return 'Carregando dados...';
    const ql = q.toLowerCase();
    const now = new Date();
    if (ql.match(/quantos contratos|total de contratos/)) {
      return `${contracts.length} contratos cadastrados.\n${contracts.filter(c => c.status === 'ACTIVE').length} ativos, ${contracts.filter(c => c.status === 'CONCLUDED').length} encerrados.`;
    }
    if (ql.match(/venc|encerr|expir/)) {
      const e30 = contracts.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return c.status === 'ACTIVE' && d >= 0 && d <= 30; });
      const e60 = contracts.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return c.status === 'ACTIVE' && d > 30 && d <= 60; });
      return `${e30.length} contrato(s) vencem em 30 dias.\n${e60.length} em 60 dias.\nCríticos: ${e30.map(c => c.contractNumber).join(', ') || 'Nenhum'}.`;
    }
    if (ql.match(/fiscal|responsável|quem cuida/)) {
      const wl = dash?.fiscalWorkload ?? [];
      return `Fiscais com mais contratos:\n${wl.slice(0, 3).map((f: any, i: number) => `${i + 1}. ${f.name} — ${f.contracts} contratos`).join('\n')}`;
    }
    if (ql.match(/medi[çc]|medir/)) {
      const pend = contracts.filter(c => c.hasPendingMeasurements);
      return `${pend.length} medição(ões) pendentes.\n${pend.slice(0, 3).map(c => c.contractNumber).join(', ')}${pend.length > 3 ? ` +${pend.length - 3}` : ''}.`;
    }
    if (ql.match(/ocorrência|ocorr|problema/)) {
      const occ = contracts.filter(c => c.hasOpenOccurrences);
      return `${occ.length} contrato(s) com ocorrências abertas.\n${occ.slice(0, 3).map(c => c.contractNumber).join(', ')}${occ.length > 3 ? ` +${occ.length - 3}` : ''}.`;
    }
    if (ql.match(/valor|financ|dinheiro|r\$/)) {
      const fin = dash?.financial;
      return `Carteira: R$ ${fin?.totalContracted?.toLocaleString('pt-BR') ?? '-'}\nExecutado: R$ ${fin?.totalExecuted?.toLocaleString('pt-BR') ?? '-'}\nExecução: ${fin?.executionPercent?.toFixed(1) ?? '-'}%`;
    }
    if (ql.match(/risco|crítico|alerta/)) {
      const rs = dash?.riskSummary;
      return `Mapa de Riscos:\nCrítico: ${rs?.critical ?? 0}\nAlto: ${rs?.high ?? 0}\nMédio: ${rs?.medium ?? 0}\nBaixo: ${rs?.low ?? 0}`;
    }
    if (ql.match(/saúde|pontuação|score/)) {
      const h = dash?.health;
      return `Saúde da Carteira: ${h?.score ?? '-'}/100 — ${h?.level ?? '-'}`;
    }
    if (ql.match(/fornecedor|contratad|empresa/)) {
      return `Melhores fornecedores:\n${suppliers.slice(0, 3).map((s, i) => `${i + 1}. ${s.name} — ${s.score}/100 (${s.grade})`).join('\n')}`;
    }
    if (ql.match(/sem fiscal|sem designação/)) {
      const nf = contracts.filter(c => c.status === 'ACTIVE' && !c.fiscalAssignments?.length);
      return nf.length > 0 ? `${nf.length} contrato(s) sem fiscal:\n${nf.map(c => `• ${c.contractNumber}`).join('\n')}` : '✅ Todos os contratos ativos têm fiscal designado.';
    }
    if (ql.match(/maior valor|mais caro|maior contrato/)) {
      const active = contracts.filter(c => c.status === 'ACTIVE');
      if (!active.length) return 'Nenhum contrato ativo encontrado.';
      const top = active.sort((a, b) => Number(b.currentValue) - Number(a.currentValue))[0];
      return `Contrato de maior valor:\n• ${top.contractNumber}\n• ${(top.objectDescription ?? '').substring(0, 60)}\n• R$ ${Number(top.currentValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    if (ql.match(/ocorrência|ocorr|problema/)) {
      const occ = contracts.filter(c => c.hasOpenOccurrences);
      return `${occ.length} contrato(s) com ocorrências abertas:\n${occ.slice(0, 5).map(c => `• ${c.contractNumber}`).join('\n')}${occ.length > 5 ? `\n+${occ.length - 5} outros` : ''}`;
    }
    if (ql.match(/taxa.*execu|execu.*financ|percent.*execu/)) {
      const fin = dash?.financial;
      return `Taxa de Execução Financeira: ${fin?.executionPercent?.toFixed(1) ?? '-'}%\nContratado: R$ ${fin?.totalContracted?.toLocaleString('pt-BR') ?? '-'}\nExecutado: R$ ${fin?.totalExecuted?.toLocaleString('pt-BR') ?? '-'}\nSaldo: R$ ${fin?.balance?.toLocaleString('pt-BR') ?? '-'}`;
    }
    if (ql.match(/90 dias|noventa dias|trim/)) {
      const e90 = contracts.filter(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return c.status === 'ACTIVE' && d >= 0 && d <= 90; });
      return `${e90.length} contrato(s) vencem em até 90 dias:\n${e90.map(c => { const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000); return `• ${c.contractNumber} (${d}d)`; }).join('\n') || 'Nenhum'}`;
    }
    if (ql.match(/nota.*c|abaixo.*c|nota d|nota f|fornecedor.*ruim|pior fornecedor/)) {
      const bad = suppliers.filter(s => s.grade === 'C' || s.grade === 'D' || s.grade === 'F');
      return bad.length > 0 ? `${bad.length} fornecedor(es) com nota C ou abaixo:\n${bad.map(s => `• ${s.name} — Nota ${s.grade} (${s.score}/100)`).join('\n')}` : '✅ Todos os fornecedores têm nota B ou superior.';
    }
    if (ql.match(/menos dias|mais próximo.*venc|vence primeiro|primeiro.*venc/)) {
      const active = contracts.filter(c => c.status === 'ACTIVE' && c.endDate);
      if (!active.length) return 'Nenhum contrato ativo com data de vencimento.';
      const closest = active.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())[0];
      const d = Math.round((new Date(closest.endDate).getTime() - now.getTime()) / 86400000);
      return `Contrato que vence primeiro:\n• ${closest.contractNumber}\n• ${(closest.objectDescription ?? '').substring(0, 50)}\n• Vence em ${d} dia(s) — ${new Date(closest.endDate).toLocaleDateString('pt-BR')}`;
    }
    if (ql.match(/média.*valor|valor médio|ticket médio/)) {
      const active = contracts.filter(c => c.status === 'ACTIVE');
      if (!active.length) return 'Nenhum contrato ativo.';
      const avg = active.reduce((s, c) => s + Number(c.currentValue), 0) / active.length;
      return `Valor médio dos contratos ativos: R$ ${avg.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nBaseado em ${active.length} contrato(s) ativo(s).`;
    }
    if (ql.match(/encerr|conclu|finaliz/)) {
      const concluded = contracts.filter(c => c.status === 'CONCLUDED' || c.status === 'RESCINDED' || c.status === 'EXPIRED');
      return `${concluded.length} contrato(s) encerrado(s):\n• Encerrados: ${contracts.filter(c => c.status === 'CONCLUDED').length}\n• Rescindidos: ${contracts.filter(c => c.status === 'RESCINDED').length}\n• Vencidos: ${contracts.filter(c => c.status === 'EXPIRED').length}`;
    }
    if (ql.match(/processo.*atras|atras.*processo|processo.*atraso/)) {
      const delayed = contracts.filter(c => c.hasDelayedProcesses);
      return delayed.length > 0 ? `${delayed.length} contrato(s) com processo atrasado:\n${delayed.slice(0, 5).map(c => `• ${c.contractNumber}`).join('\n')}${delayed.length > 5 ? `\n+${delayed.length - 5} outros` : ''}` : '✅ Nenhum processo com atraso identificado.';
    }
    if (ql.match(/saldo|a pagar|restante.*financ|financ.*restante/)) {
      const fin = dash?.financial;
      return `Saldo financeiro a pagar: R$ ${fin?.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) ?? '-'}\nCorresponde a ${fin?.executionPercent != null ? (100 - fin.executionPercent).toFixed(1) : '-'}% do valor total contratado.`;
    }
    return `Não encontrei uma resposta específica. Exemplos de perguntas:\n• "Qual contrato tem o maior valor?"\n• "Quantos contratos vencem em 90 dias?"\n• "Qual a taxa de execução financeira?"\n• "Quais fornecedores têm nota abaixo de C?"\n• "Qual contrato tem menos dias restantes?"\n• "Quais contratos foram encerrados?"\n• "Qual o saldo financeiro a pagar?"`;
  }, [dash, contracts, suppliers]);

  const selectedContract = useMemo(() => contracts.find(c => c.id === selectedContractId), [contracts, selectedContractId]);
  const diagnosis = useMemo(() => {
    if (!selectedContract) return null;
    const c = selectedContract;
    const now = new Date();
    const daysRemaining = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
    const issues: string[] = [];
    if (!c.fiscalAssignments?.length) issues.push('Sem fiscal designado');
    if (c.hasOpenOccurrences) issues.push('Ocorrência em aberto');
    if (c.hasPendingMeasurements) issues.push('Medição pendente de aprovação');
    if (c.hasDelayedProcesses) issues.push('Processo com fase atrasada');
    if (daysRemaining >= 0 && daysRemaining <= 30) issues.push(`Vence em ${daysRemaining} dias — URGENTE`);
    else if (daysRemaining >= 0 && daysRemaining <= 90) issues.push(`Vence em ${daysRemaining} dias`);
    return { contract: c, daysRemaining, issues, score: Math.max(0, 100 - issues.length * 18) };
  }, [selectedContract]);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-48 gap-3">
      <Brain className="h-8 w-8 text-violet-400 animate-pulse" />
      <p className="text-xs text-gray-500">Carregando inteligência contratual...</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-4 w-4 text-violet-400" /> Inteligência Contratual
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">Análise preditiva, compliance e assistência baseada nos dados reais da carteira</p>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-gray-700 border border-gray-300 bg-gray-100/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
          <RefreshCw className="h-3 w-3" /> Atualizar
        </button>
      </div>

      <div className="flex gap-1 flex-wrap bg-gray-100/30 p-1 rounded-xl border border-gray-200">
        {SECTIONS.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex-1 justify-center whitespace-nowrap ${
                activeSection === s.id
                  ? 'sigfis-tab-active-gray border-black/30 text-white'
                  : 'border-transparent text-gray-500 hover:bg-white/70 hover:text-gray-800 hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
              }`}>
              <Icon className="h-3 w-3 shrink-0" />
              <span className="hidden lg:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {activeSection === 'insights'        && <InsightsSection insights={autoInsights} onNavigate={onNavigate} />}
      {activeSection === 'recommendations' && <RecommendationsSection recommendations={recommendations} onNavigate={onNavigate} />}
      {activeSection === 'predictive'      && <PredictiveSection predictions={predictions} monthlyData={dash?.charts?.monthlyEvolution ?? []} />}
      {activeSection === 'compliance'      && <ComplianceSection compliance={compliance} />}
      {activeSection === 'suppliers'       && <SuppliersSection suppliers={suppliers} />}
      {activeSection === 'assistant'       && <AssistantSection chatHistory={chatHistory} setChatHistory={setChatHistory} chatInput={chatInput} setChatInput={setChatInput} processQuestion={processQuestion} />}
      {activeSection === 'diagnosis'       && <DiagnosisSection contracts={contracts} selectedContractId={selectedContractId} setSelectedContractId={setSelectedContractId} diagnosis={diagnosis} onNavigate={onNavigate} />}
    </div>
  );
}
