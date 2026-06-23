'use client';

import { CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, User } from '@/lib/api';
import { X, Printer, FileText, AlertCircle } from 'lucide-react';

interface Props {
  user: User;
  onClose: () => void;
}

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(v);

const fmtDate = (d?: string) => {
  if (!d) return '—';
  try { return new Date(d.length === 10 ? d + 'T12:00:00Z' : d).toLocaleDateString('pt-BR'); }
  catch { return d; }
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Vigente', CONCLUDED: 'Encerrado', SUSPENDED: 'Suspenso',
  RESCINDED: 'Rescindido', EXPIRED: 'Vencido', DRAFT: 'Minuta',
};
const statusColor: Record<string, string> = {
  ACTIVE: '#16a34a', CONCLUDED: '#2563eb', SUSPENDED: '#d97706',
  RESCINDED: '#dc2626', EXPIRED: '#b91c1c', DRAFT: '#6b7280',
};

const thS: CSSProperties = {
  padding: '3px 4px',
  fontSize: '5.5pt',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  textAlign: 'center',
  color: 'white',
  verticalAlign: 'middle',
  borderRight: '1px solid rgba(255,255,255,0.15)',
  lineHeight: '1.25',
  overflow: 'hidden',
};
const tdS: CSSProperties = {
  padding: '2.5px 4px',
  verticalAlign: 'top',
  borderBottom: '1px solid #e5e7eb',
  borderRight: '1px solid #f3f4f6',
  lineHeight: '1.35',
  fontSize: '5.5pt',
  color: '#111827',
  overflow: 'hidden',
  wordBreak: 'break-word',
};

export function ContractReport({ user, onClose }: Props) {
  const { data: contracts, isLoading, isError } = useQuery<any[]>({
    queryKey: ['contracts-report'],
    queryFn: () => api.contracts.report(),
    staleTime: 60_000,
  });

  const now = new Date();
  const emissionDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const emissionTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const periodLabel = (() => {
    const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    return `Posição em ${months[now.getMonth()]} de ${now.getFullYear()}`;
  })();

  const sorted = (contracts || []).sort((a, b) => {
    const order = ['ACTIVE','SUSPENDED','EXPIRED','RESCINDED','CONCLUDED'];
    return order.indexOf(a.status) - order.indexOf(b.status) || a.contractNumber.localeCompare(b.contractNumber);
  });
  const activeCount   = sorted.filter(c => c.status === 'ACTIVE').length;
  const totalValue    = sorted.reduce((s, c) => s + Number(c.currentValue), 0);
  const totalExecuted = sorted.reduce((s, c) => s + Number(c.totalMeasured), 0);
  const totalBalance  = sorted.reduce((s, c) => s + Number(c.balance), 0);
  const avgMonthly    = sorted.length > 0 ? sorted.reduce((s, c) => s + Number(c.monthlyValue), 0) / sorted.length : 0;

  const handlePrint = () => {
    const source = document.getElementById('sigfis-report-print-root');
    if (!source) return;

    // Clone content as a direct body child so display:none on parent doesn't hide it
    const portal = document.createElement('div');
    portal.id = 'sigfis-print-portal';
    portal.style.display = 'none';
    portal.innerHTML = source.innerHTML;
    document.body.appendChild(portal);

    const el = document.createElement('style');
    el.id = 'sigfis-report-print-style';
    el.textContent = `
      @media print {
        @page { size: A4 landscape; margin: 10mm; }
        html, body { margin: 0; padding: 0; background: white !important; }
        body > *:not(#sigfis-print-portal) { display: none !important; }
        #sigfis-print-portal {
          display: block !important;
          background: white !important;
          font-family: Arial, Helvetica, sans-serif;
          color: #111827;
        }
        thead { display: table-header-group; }
        tr { page-break-inside: avoid; }
        table { table-layout: fixed; width: 100%; word-break: break-word; }
      }
    `;
    document.head.appendChild(el);
    window.print();
    window.addEventListener('afterprint', () => {
      document.getElementById('sigfis-report-print-style')?.remove();
      document.getElementById('sigfis-print-portal')?.remove();
    }, { once: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.92)' }}>

      {/* ── Toolbar (hidden on print) ── */}
      <div className="no-print flex items-center justify-between px-5 py-3 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-indigo-400" />
          <div>
            <span className="text-sm font-bold text-white">Relatório de Gestão e Fiscalização de Contratos</span>
            <span className="ml-2 text-[10px] text-zinc-500">· IQUEGO · {periodLabel}</span>
          </div>
          {!isLoading && (
            <span className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">
              {sorted.length} contratos
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            disabled={isLoading || isError}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimir / Salvar como PDF
          </button>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Preview scroll area ── */}
      <div className="no-print flex-1 overflow-auto p-6" style={{ background: '#1a1a1f' }}>
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-400 text-sm animate-pulse">Carregando dados do relatório…</div>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center h-64 gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" /> Erro ao carregar dados. Tente novamente.
          </div>
        )}
        {!isLoading && !isError && (
          <div style={{ width: '277mm', margin: '0 auto', boxShadow: '0 8px 48px rgba(0,0,0,0.7)' }}>
            <ReportContent
              contracts={sorted} user={user}
              emissionDate={emissionDate} emissionTime={emissionTime} periodLabel={periodLabel}
              activeCount={activeCount} totalValue={totalValue}
              totalExecuted={totalExecuted} totalBalance={totalBalance} avgMonthly={avgMonthly}
            />
          </div>
        )}
      </div>

      {/* ── Hidden portal source (cloned to body on print) ── */}
      {!isLoading && !isError && (
        <div id="sigfis-report-print-root" style={{ display: 'none' }}>
          <ReportContent
            contracts={sorted} user={user}
            emissionDate={emissionDate} emissionTime={emissionTime} periodLabel={periodLabel}
            activeCount={activeCount} totalValue={totalValue}
            totalExecuted={totalExecuted} totalBalance={totalBalance} avgMonthly={avgMonthly}
          />
        </div>
      )}
    </div>
  );
}

// ── Report content ─────────────────────────────────────────────────────────────
function ReportContent({ contracts, user, emissionDate, emissionTime, periodLabel, activeCount, totalValue, totalExecuted, totalBalance, avgMonthly }: {
  contracts: any[]; user: User; emissionDate: string; emissionTime: string; periodLabel: string;
  activeCount: number; totalValue: number; totalExecuted: number; totalBalance: number; avgMonthly: number;
}) {
  const executionPct = totalValue > 0 ? ((totalExecuted / totalValue) * 100).toFixed(1) : '0.0';

  return (
    <div style={{
      background: 'white',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '8pt',
      color: '#111827',
      width: '100%',
    }}>

      {/* ══ CABEÇALHO ══════════════════════════════════════════════════════════ */}
      <div style={{ padding: '6mm 10mm 4mm', borderBottom: '3px solid #1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6mm' }}>

        {/* Esquerda: Título */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13pt', fontWeight: 900, color: '#1e3a8a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            RELATÓRIO DE GESTÃO E FISCALIZAÇÃO<br/>
            <span style={{ color: '#2563eb' }}>DE CONTRATOS ADMINISTRATIVOS</span>
          </div>
          <div style={{ fontSize: '6.5pt', color: '#6b7280', marginTop: '1.5mm', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            IQUEGO · Indústria Química do Estado de Goiás S/A
          </div>
        </div>

        {/* Direita: Emissão e Competência em duas colunas */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2mm 5mm',
          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '3mm',
          padding: '3mm 5mm', flexShrink: 0, minWidth: '68mm',
        }}>
          <div>
            <div style={{ fontSize: '5.5pt', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5mm' }}>Emissão</div>
            <div style={{ fontSize: '8pt', fontWeight: 800, color: '#111827' }}>{emissionDate}</div>
            <div style={{ fontSize: '7pt', color: '#374151', fontWeight: 600 }}>{emissionTime}h</div>
          </div>
          <div>
            <div style={{ fontSize: '5.5pt', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5mm' }}>Competência</div>
            <div style={{ fontSize: '7pt', fontWeight: 700, color: '#111827' }}>{periodLabel}</div>
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '1mm' }}>
            <div style={{
              fontSize: '5pt', background: '#eff6ff', color: '#1d4ed8',
              border: '1px solid #bfdbfe', borderRadius: '2mm', padding: '1mm 3mm',
              fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center',
            }}>
              Documento Interno · Uso Restrito
            </div>
          </div>
        </div>
      </div>

      {/* ══ SUMÁRIO EXECUTIVO ══════════════════════════════════════════════════ */}
      <div style={{ padding: '3mm 10mm', background: '#f0f4ff', borderBottom: '1px solid #dbeafe' }}>
        <div style={{ fontSize: '6.5pt', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2.5mm' }}>
          Sumário Executivo
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '2.5mm' }}>
          {[
            { label: 'Contratos Vigentes',      value: activeCount.toString(), sub: `de ${contracts.length} total`,  accent: '#16a34a' },
            { label: 'Valor Total da Carteira',  value: fmt(totalValue),        sub: 'valor contratual atual',         accent: '#1d4ed8' },
            { label: 'Total Executado',          value: fmt(totalExecuted),     sub: 'medições aprovadas',             accent: '#059669' },
            { label: 'Saldo Contratual',         value: fmt(totalBalance),      sub: 'a pagar aos contratados',        accent: '#dc2626' },
            { label: 'Valor Mensal Médio',       value: fmt(avgMonthly),        sub: 'desembolso mensal estimado',     accent: '#7c3aed' },
            { label: 'Taxa de Execução',         value: `${executionPct}%`,     sub: 'do valor total executado',       accent: '#0891b2' },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: 'white', border: `1px solid ${kpi.accent}25`,
              borderTop: `3px solid ${kpi.accent}`, borderRadius: '2mm', padding: '2.5mm 3mm',
            }}>
              <div style={{ fontSize: '5pt', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5mm', lineHeight: 1.3 }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '9pt', fontWeight: 900, color: kpi.accent, lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: '5pt', color: '#9ca3af', marginTop: '1mm' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TABELA PRINCIPAL ══════════════════════════════════════════════════ */}
      <div style={{ padding: '3mm 10mm 5mm' }}>
        <div style={{
          fontSize: '7pt', fontWeight: 800, color: '#1e3a8a', marginBottom: '2.5mm',
          paddingBottom: '1.5mm', borderBottom: '2px solid #1e3a8a',
          textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Relação de Contratos Administrativos</span>
          <span style={{ fontSize: '6pt', color: '#6b7280', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            Ordenado por situação e número do contrato · Todos os valores em R$
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{width:'3%'}}/>
            <col style={{width:'6%'}}/>
            <col style={{width:'17%'}}/>
            <col style={{width:'12%'}}/>
            <col style={{width:'7%'}}/>
            <col style={{width:'2%'}}/>
            <col style={{width:'8%'}}/>
            <col style={{width:'7%'}}/>
            <col style={{width:'8%'}}/>
            <col style={{width:'8%'}}/>
            <col style={{width:'5%'}}/>
            <col style={{width:'5%'}}/>
            <col style={{width:'5%'}}/>
            <col style={{width:'7%'}}/>
          </colgroup>
          <thead>
            <tr style={{ background: '#1e3a8a' }}>
              <th style={{ ...thS, textAlign: 'center' }}>ORD.</th>
              <th style={{ ...thS, textAlign: 'left' }}>N° PROCESSO<br/>LICITATÓRIO</th>
              <th style={{ ...thS, textAlign: 'left' }}>EMPRESA CONTRATADA<br/>OBJETO DO CONTRATO</th>
              <th style={{ ...thS, textAlign: 'left' }}>UNID. ADMINISTRATIVA<br/>FISCAL / PORTARIA</th>
              <th style={{ ...thS, textAlign: 'left' }}>N° DO CONTRATO</th>
              <th style={{ ...thS, textAlign: 'center' }}>AD.</th>
              <th style={{ ...thS, textAlign: 'right' }}>VALOR<br/>CONTRATUAL</th>
              <th style={{ ...thS, textAlign: 'right' }}>VALOR<br/>MENSAL EST.</th>
              <th style={{ ...thS, textAlign: 'right' }}>TOTAL<br/>EXECUTADO</th>
              <th style={{ ...thS, textAlign: 'right' }}>SALDO<br/>A PAGAR</th>
              <th style={{ ...thS, textAlign: 'center' }}>INÍCIO</th>
              <th style={{ ...thS, textAlign: 'center' }}>TÉRMINO</th>
              <th style={{ ...thS, textAlign: 'center' }}>SITUAÇÃO</th>
              <th style={{ ...thS, textAlign: 'left', borderRight: 'none' }}>OBSERVAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, idx) => {
              const rowBg = idx % 2 === 0 ? 'white' : '#f9fafb';
              const contractor = c.contractor;
              const cnpj = contractor?.cnpj ? `CNPJ: ${contractor.cnpj}` : '';
              return (
                <tr key={c.id} style={{ background: rowBg }}>
                  <td style={{ ...tdS, textAlign: 'center', fontWeight: 700, color: '#6b7280', fontSize: '5.5pt' }}>{idx + 1}</td>
                  <td style={{ ...tdS }}>
                    {c.process ? (
                      <>
                        <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '5.5pt' }}>{c.process.processNumber}</div>
                        <div style={{ color: '#9ca3af', fontSize: '5pt' }}>{c.process.modality || ''}</div>
                      </>
                    ) : <span style={{ color: '#d1d5db' }}>—</span>}
                  </td>
                  <td style={{ ...tdS }}>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '5.5pt' }}>
                      {contractor?.corporateName || contractor?.tradeName || '—'}
                    </div>
                    {cnpj && <div style={{ color: '#9ca3af', fontSize: '5pt' }}>{cnpj}</div>}
                    <div style={{ color: '#4b5563', fontSize: '5pt', marginTop: '1px', fontStyle: 'italic' }}>
                      {(c.objectDescription || '').slice(0, 75)}{(c.objectDescription || '').length > 75 ? '…' : ''}
                    </div>
                  </td>
                  <td style={{ ...tdS }}>
                    {c.department && (
                      <div style={{ fontWeight: 700, color: '#374151', fontSize: '5.5pt', marginBottom: '1px' }}>{c.department}</div>
                    )}
                    {c.titular ? (
                      <>
                        <div style={{ color: '#1d4ed8', fontSize: '5.5pt' }}>{c.titular.name}</div>
                        {c.titular.designationAct && (
                          <div style={{ color: '#6b7280', fontSize: '5pt' }}>Port. {c.titular.designationAct}</div>
                        )}
                      </>
                    ) : (
                      <div style={{ color: '#fca5a5', fontSize: '5pt' }}>Sem fiscal</div>
                    )}
                    {c.substituto && (
                      <div style={{ color: '#6b7280', fontSize: '5pt', marginTop: '1px' }}>
                        Sub.: {c.substituto.name}
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdS }}>
                    <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '5.5pt' }}>{c.contractNumber}</div>
                    {c.initialValue !== c.currentValue && (
                      <div style={{ color: '#9ca3af', fontSize: '5pt' }}>
                        Orig: {fmt(Number(c.initialValue))}
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdS, textAlign: 'center', fontWeight: 700 }}>
                    {c.aditivoCount > 0 ? (
                      <span style={{ color: '#7c3aed', fontWeight: 800, fontSize: '5.5pt' }}>{c.aditivoCount}°</span>
                    ) : <span style={{ color: '#d1d5db' }}>—</span>}
                  </td>
                  <td style={{ ...tdS, textAlign: 'right', fontWeight: 700 }}>
                    {fmt(Number(c.currentValue))}
                  </td>
                  <td style={{ ...tdS, textAlign: 'right', color: '#374151' }}>
                    {fmt(Number(c.monthlyValue))}
                    <div style={{ fontSize: '5pt', color: '#9ca3af' }}>{c.durationMonths}m</div>
                  </td>
                  <td style={{ ...tdS, textAlign: 'right', color: '#059669', fontWeight: 600 }}>
                    {fmt(Number(c.totalMeasured))}
                    {Number(c.totalMeasured) > 0 && Number(c.currentValue) > 0 && (
                      <div style={{ fontSize: '5pt', color: '#9ca3af' }}>
                        {((Number(c.totalMeasured)/Number(c.currentValue))*100).toFixed(0)}%
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdS, textAlign: 'right', fontWeight: 700,
                    color: Number(c.balance) < Number(c.currentValue) * 0.1 && Number(c.balance) > 0 ? '#b91c1c' : Number(c.balance) === 0 ? '#059669' : '#374151'
                  }}>
                    {fmt(Number(c.balance))}
                  </td>
                  <td style={{ ...tdS, textAlign: 'center', whiteSpace: 'nowrap', color: '#374151', fontSize: '5pt' }}>
                    {fmtDate((c as any).startDate || c.signingDate)}
                  </td>
                  <td style={{ ...tdS, textAlign: 'center', whiteSpace: 'nowrap', fontSize: '5pt' }}>
                    <span style={{
                      color: (() => {
                        if (!c.endDate) return '#6b7280';
                        const d = Math.ceil((new Date(c.endDate + 'T12:00:00Z').getTime() - Date.now()) / 86400000);
                        return d <= 0 ? '#dc2626' : d <= 90 ? '#d97706' : '#374151';
                      })(),
                      fontWeight: (() => {
                        if (!c.endDate) return 400;
                        const d = Math.ceil((new Date(c.endDate + 'T12:00:00Z').getTime() - Date.now()) / 86400000);
                        return d <= 90 ? 700 : 400;
                      })(),
                    }}>
                      {fmtDate(c.endDate)}
                    </span>
                  </td>
                  <td style={{ ...tdS, textAlign: 'center' }}>
                    <span style={{
                      background: (statusColor[c.status] || '#6b7280') + '18',
                      color: statusColor[c.status] || '#6b7280',
                      border: `1px solid ${(statusColor[c.status] || '#6b7280')}35`,
                      borderRadius: '2px', padding: '1px 3px',
                      fontWeight: 800, fontSize: '5pt', whiteSpace: 'nowrap',
                    }}>
                      {statusLabel[c.status] || c.status}
                    </span>
                  </td>
                  <td style={{ ...tdS, color: '#6b7280', fontSize: '5pt', borderRight: 'none' }}>
                    {c.observations || '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#1e3a8a', color: 'white' }}>
              <td colSpan={6} style={{ ...tdS, color: 'white', textAlign: 'right', fontWeight: 800, fontSize: '6pt', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
                TOTAIS GERAIS ({contracts.length} contratos)
              </td>
              <td style={{ ...tdS, color: 'white', textAlign: 'right', fontWeight: 800 }}>{fmt(contracts.reduce((s, c) => s + Number(c.currentValue), 0))}</td>
              <td style={{ ...tdS, color: 'rgba(255,255,255,0.6)', textAlign: 'right' }}>{fmt(contracts.reduce((s, c) => s + Number(c.monthlyValue), 0))}</td>
              <td style={{ ...tdS, color: '#6ee7b7', textAlign: 'right', fontWeight: 700 }}>{fmt(contracts.reduce((s, c) => s + Number(c.totalMeasured), 0))}</td>
              <td style={{ ...tdS, color: '#fca5a5', textAlign: 'right', fontWeight: 700 }}>{fmt(contracts.reduce((s, c) => s + Number(c.balance), 0))}</td>
              <td colSpan={4} style={{ ...tdS, color: 'rgba(255,255,255,0.4)', fontSize: '5.5pt', borderRight: 'none' }}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ══ RODAPÉ / ASSINATURA ═══════════════════════════════════════════════ */}
      <div style={{ padding: '3mm 10mm 7mm', borderTop: '2px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8mm' }}>
          <div style={{ textAlign: 'center', minWidth: '80mm' }}>
            <div style={{ height: '8mm', borderBottom: '1px solid #374151', width: '80mm', margin: '0 auto' }} />
            <div style={{ paddingTop: '2mm' }}>
              <div style={{ fontWeight: 800, fontSize: '7pt', color: '#111827' }}>Responsável pela Emissão</div>
              <div style={{ fontSize: '6.5pt', color: '#1e3a8a', marginTop: '0.5mm', fontWeight: 600 }}>{user.name}</div>
              {user.registrationNumber && <div style={{ fontSize: '5.5pt', color: '#6b7280' }}>Mat. {user.registrationNumber}</div>}
              <div style={{ fontSize: '6pt', color: '#6b7280', marginTop: '0.5mm' }}>
                {user.role === 'ADMIN' ? 'Administrador do Sistema' : user.role === 'ALTA_GESTAO' ? 'Alta Gestão' : 'Gestor de Contratos'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5mm', padding: '2mm 4mm', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '2mm', textAlign: 'center' }}>
          <div style={{ fontSize: '5.5pt', color: '#9ca3af' }}>
            Documento gerado automaticamente pelo <strong>SIGFIS</strong> — Sistema de Gestão e Fiscalização de Contratos · IQUEGO &nbsp;·&nbsp;
            Emitido em {emissionDate} às {emissionTime}h por {user.name} &nbsp;·&nbsp;
            Este documento é de uso interno e restrito ao corpo funcional da IQUEGO
          </div>
        </div>
      </div>
    </div>
  );
}
