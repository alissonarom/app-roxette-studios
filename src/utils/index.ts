
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

export const formatarValor = (valor: string) => {
    // Remove tudo que não seja número
    let valorNumerico = valor.replace(/\D/g, '');

    // Converte para formato de moeda (mantendo a vírgula como separador de centavos)
    const valorFormatado = (Number(valorNumerico) / 100).toFixed(2);

    return valorFormatado; // Retorna uma string formatada com 2 casas decimais
};

export const headers = {
    'access-token': 'UOTGAISHUNMBfPNRDZHKSBLLBUPdCc',
    'secret-access-token': 'UXkvL5o4lzbgJWXZPHAfXYMDzX9WTy',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };