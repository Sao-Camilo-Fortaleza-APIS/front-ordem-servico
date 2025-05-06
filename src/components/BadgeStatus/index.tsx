import styled from 'styled-components';

export const badgeStyles: Record<string, { color: string; background: string; border: string }
> = {
    'Aguardando Atendimento': {
        color: '#7f1d1d',
        background: '#fee2e2',
        border: '#ef4444',
    },
    'Aguardando Compras': {
        color: '#5b21b6',
        background: '#ede9fe',
        border: '#a78bfa',
    },
    'Aguardando Fornecedor': {
        color: '#5b21b6',
        background: '#ede9fe',
        border: '#a78bfa',
    },
    'Aguardando Validação': {
        color: '#1e40af',
        background: '#dbeafe',
        border: '#3b82f6',
    },
    'Aguardando manutenção predial': {
        color: '#5b21b6',
        background: '#ede9fe',
        border: '#a78bfa',
    },
    'Aguardando retorno Solicitante': {
        color: '#374151',
        background: '#f3f4f6',
        border: '#6b7280',
    },
    'Atendimento Programado': {
        color: '#064e3b',
        background: '#d1fae5',
        border: '#10b981',
    },
    'Em Atendimento': {
        color: '#78350f',
        background: '#ffedd5',
        border: '#fbbf24',
    },
    'Enviado para Philips': {
        color: '#134e4a',
        background: '#cffafe',
        border: '#06b6d4',
    },
    'Desenvolvimento Philips': {
        color: '#164e63',
        background: '#ccfbf1',
        border: '#22d3ee',
    },
    'Não Solucionado': {
        color: '#7f1d1d',
        background: '#fee2e2',
        border: '#ef4444',
    },
    'Retorno Philips': {
        color: '#083344',
        background: '#e0f2fe',
        border: '#0891b2',
    },
    'Encerrado': {
        color: '#374151',
        background: '#f3f4f6',
        border: '#d1d5db',
    },
    'null': { // se for null ou undefined
        color: '#6b7280',
        background: '#e5e7eb',
        border: '#9ca3af',
    },
}

export const DefaultBadge = styled.span<{ textColor: string; bgColor: string; borderColor: string }>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
`

export const StatusBadge = ({ status }: { status: string | null }) => {
    const displayStatus = typeof status === 'string' ? status : 'Sem Estágio Informado'; // Se status for null ou undefined, exibe 'Sem Estágio Informado'

    const style = badgeStyles[displayStatus] || badgeStyles['null'];
    return (
        <DefaultBadge textColor={style.color} bgColor={style.background} borderColor={style.border}>
            {displayStatus}
        </DefaultBadge>
    );
};
