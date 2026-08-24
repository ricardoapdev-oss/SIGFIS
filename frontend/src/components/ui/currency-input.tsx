'use client';

// Campo de valor monetário (R$) com máscara pt-BR — "999.999,99" enquanto o
// usuário digita, em vez do <input type="number"> nativo (que não agrupa
// milhar nem usa vírgula decimal). Funciona como uma "máscara de centavos":
// cada dígito digitado entra pela direita, então "99999999" vira "999.999,99".
// Sempre expõe/recebe o valor numérico puro (reais, com centavos em ponto
// flutuante) via `value`/`onChange` — quem usa o componente não lida com
// string formatada em nenhum momento.

import { InputHTMLAttributes } from 'react';

interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number | string | null | undefined;
  onChange: (value: number) => void;
  /** Permite valor negativo (ex: impacto financeiro de aditivo de supressão). */
  allowNegative?: boolean;
}

function toDisplay(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const n = Number(value);
  if (Number.isNaN(n)) return '';
  const formatted = Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n < 0 ? `-${formatted}` : formatted;
}

export function CurrencyInput({ value, onChange, placeholder = '0,00', className, allowNegative, ...rest }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const negative = allowNegative && e.target.value.trim().startsWith('-');
    const digits = e.target.value.replace(/\D/g, '');
    const n = digits ? Number(digits) / 100 : 0;
    onChange(negative ? -n : n);
  };

  return (
    <input
      {...rest}
      type="text"
      inputMode="decimal"
      value={toDisplay(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
