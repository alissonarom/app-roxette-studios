export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

export const dataFormaPagamento  = [
    'Dinheiro',
    'PIX',
    'Cheque',
    'Permuta',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Boleto',
    'Transferência',
    'Doc',
    'Ted',
    'Depósito Identificado',
    'Depósito em C/C',
    'Duplicata Mercantil',
    'Faturado',
    'Faturar',
    'Débito Automático',
    'Lotérica',
    'Banco',
    'DDA',
    'Pagamento online',
    'BNDES',
    'Outros',
    'DP Descontada',
    'CH Descontado',
    'Vale Alimentação',
    'Vale Refeição',
    'Vale Presente',
    'Vale Combustível'
    ]

export const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam em 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };