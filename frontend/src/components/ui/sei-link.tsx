'use client';

import * as React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Link para o processo no SEI a partir do número gravado no contrato/processo.
 *
 * A "Pesquisa Rápida" do SEI é um POST com token de sessão (infra_hash), então
 * não é possível submetê-la a partir de outro site. Comportamento padrão:
 * copia o número para a área de transferência e abre o SEI — o usuário cola no
 * campo "Pesquisar" (Ctrl+V) e tecla Enter.
 *
 * Se a instância do SEI aceitar busca por URL (GET), basta definir
 * `NEXT_PUBLIC_SEI_SEARCH_URL` com o placeholder `{q}` (ex.:
 * `https://sei.go.gov.br/sei/controlador.php?acao=protocolo_pesquisa_rapida&txtPesquisaRapida={q}`)
 * — aí o clique abre o processo direto, sem passo de colar.
 */
const SEI_BASE_URL = process.env.NEXT_PUBLIC_SEI_URL || 'https://sei.go.gov.br/sei/';
const SEI_SEARCH_TEMPLATE = process.env.NEXT_PUBLIC_SEI_SEARCH_URL || '';

function resolveSeiTarget(processNumber: string): { url: string; deepLink: boolean } {
  const raw = processNumber.trim();
  if (SEI_SEARCH_TEMPLATE.includes('{q}')) {
    return { url: SEI_SEARCH_TEMPLATE.replace('{q}', encodeURIComponent(raw)), deepLink: true };
  }
  return { url: SEI_BASE_URL, deepLink: false };
}

export function SeiProcessLink({
  processNumber,
  className,
}: {
  processNumber: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const { url, deepLink } = resolveSeiTarget(processNumber);

  const handleClick = async () => {
    if (!deepLink) {
      try {
        await navigator.clipboard.writeText(processNumber.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* área de transferência indisponível — segue abrindo o SEI mesmo assim */
      }
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={
        deepLink
          ? 'Abrir este processo no SEI'
          : 'Copiar o número e abrir o SEI — cole no campo Pesquisar (Ctrl+V) e tecle Enter'
      }
      className={cn(
        'group inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer',
        className,
      )}
    >
      <span className="font-mono">{processNumber}</span>
      {copied ? (
        <span className="inline-flex items-center gap-0.5 text-emerald-600 no-underline">
          <Check className="h-3 w-3" /> <span className="text-[9px] font-sans">copiado</span>
        </span>
      ) : (
        <ExternalLink className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
      )}
    </button>
  );
}
