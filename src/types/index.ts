import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: any;
    Cliente: any;
    CadastroCliente: undefined;
    Pedido: undefined;
    Financeiro: undefined;
    Resumo: undefined;
    Painel: undefined;

};

export type LoginScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'Login'
>;

export type ClienteScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'Cliente'
>;

export type CadastroClienteScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'CadastroCliente'
>;

export type NovoPedidoScreenPorps = NativeStackScreenProps<
 RootStackParamList,
 'Pedido'
>;

export type FinanceiroScreenPorps = NativeStackScreenProps<
 RootStackParamList,
 'Financeiro'
>;

// Cliente
export type TCliente = {
    id_cliente : number,
    tipo_pessoa :  string,
    tipo_cadastro :  string,
    cnpj_cliente : string,
    razao_cliente :  string,
    fantasia_cliente :  string,
    endereco_cliente :  string,
    numero_cliente : number,
    bairro_cliente : string,
    complemento_cliente : string,
    cep_cliente : string,
    cidade_cliente : string,
    cidade_cliente_cod : number,
    uf_cliente : string,
    contato_cliente : string,
    fone_cliente : string,
    fone_contato_cliente : string,
    fone_ramal_cliente : string,
    fax_cliente : string,
    celular_cliente : string,
    email_cliente : string,
    email_contato_cliente : string,
    website_cliente : string,
    insc_estadual_cliente : string,
    insc_municipal_cliente : string,
    insc_produtor_cliente : string,
    insc_suframa_cliente : string,
    situacao_cliente :  string,
    vendedor_cliente :  string,
    vendedor_cliente_id : number,
    observacoes_cliente :  string,
    data_nasc_cliente : string,
    data_cad_cliente : string,
    data_mod_cliente : string,
    lixeira :  string 
};
// Pedido via PDV
export type PedidoResponse = {
    id_ped: number,
    id_pedido: number,
    id_cliente: number,
    nome_cliente:  string ,
    id_local_retirada: number,
    id_local_cobranca: number,
    vendedor_pedido: string,
    vendedor_pedido_id: number,
    listapreco_produtos: number,
    valor_total_produtos: number,
    desconto_pedido: number,
    desconto_pedido_porc: number,
    peso_total_nota: number,
    peso_total_nota_liq: number,
    frete_pedido: number,
    valor_total_nota: number,
    valor_baseICMS: number,
    valor_ICMS: number,
    valor_baseST: number,
    valor_ST: number,
    valor_IPI: number,
    condicao_pagamento_id: number,
    condicao_pagamento: number,
    frete_por_pedido: number,
    transportadora_pedido: string,
    id_transportadora: number,
    data_pedido: string,
    prazo_entrega: string,
    referencia_pedido: string,
    obs_pedido: string,
    obs_interno_pedido: string,
    status_pedido: string,
    contas_pedido: 0,
    comissao_pedido: 0,
    estoque_pedido: 0,
    pdv_emitido: any,
    ordemc_emitido: number,
    data_cad_pedido: string,
    data_mod_pedido: string,
    id_aplicativo: any,
    id_pedido_aplicativo: any,
    id_almoxarifado: number,
    pagamento_com_vhpay: number,
    pagamento_com_conta_integrada: number,
    link_pgto_gerado: number,
    lixeira:  string 
};
// Produto
export type TProduto = {
    id_produto: number;
    id_registro: number;
    id_empresa: number;
    id_categoria: number;
    cod_produto: string;
    marca_produto: string;
    desc_produto: string;
    atalho_produto: string;
    fornecedor_produto: string;
    fornecedor_produto_id: number;
    produto_variado: number;
    id_produto_parent: number;
    minimo_produto: string;
    maximo_produto: string;
    estoque_produto: string;
    unidade_produto: string;
    valor_produto: string;
    valor_custo_produto: string;
    peso_produto: string;
    peso_liq_produto: string;
    icms_produto: string | null;
    ipi_produto: string | null;
    pis_produto: string | null;
    cofins_produto: string | null;
    unidade_tributavel: string | null;
    cest_produto: string;
    beneficio_fiscal: string | null;
    ncm_produto: string;
    origem_produto: number;
    codigo_barra_produto: string;
    codigo_barras_internos: string | null;
    obs_produto: string;
    tipo_produto: string;
    tamanho_produto: string;
    localizacao_produto: string;
    kit_produto: string;
    baixar_kit: number;
    desmembrar_kit: number;
    loja_visivel: number;
    loja_video_url: string | null;
    valor_tributos: string;
    valor_tributosEst: string;
    status_produto: string;
    id_comissionamento: number | null;
    data_cad_produto: string;
    data_mod_produto: string;
    data_mod_estoque: string | null;
    lixeira: string;
    endereco_fixo: string | null;
    controla_lote: string | null;
    controla_validade: string | null;
    lista_preco: string | null;
    subcategoria: any[];
    grades: any[];
    variacoes: any[];
    imagens: any[];
};
// Produto inserido no pedido
export type TProdutoPedido = {
    id_ped_produto: number;
    id_pedido: number;
    id_produto: number;
    desc_produto: string;
    qtde_produto: string;
    desconto_produto: string;
    ipi_produto: string;
    icms_produto: string;
    valor_unit_produto: string;
    valor_custo_produto: string;
    valor_total_produto: string;
    peso_produto: string;
    peso_liq_produto: string
};
// Transportadora
export type TTransportadora =
	{
		id_transportadora: number,
		id_registro: number,
		tipo_pessoa: string,
		desc_transportadora: string,
		fantasia_transportadora: string,
		cnpj_transportadora: string,
		ie_transportadora: string,
		endereco_transportadora: string,
		numero_transportadora: number,
		cep_transportadora: string,
		bairro_transportadora: string,
		complemento_transportadora: string,
		cidade_transportadora: string,
		cidade_transportadora_cod: number,
		estado_transportadora: string,
		fone_transportadora: string,
		email_transportadora: string,
		rntc_transportadora: string | null,
		observacoes_transportadora: string | null,
		data_cad_transportadora: string,
		data_mod_transportadora: string | null,
		lixeira: string
};
// Status do pedido
enum Status_pedido {
        'Em Aberto',
        'Em Andamento',
        'Atendido',
        'Cancelado'
};
// Lixeira
enum Lixeira_pedido {
        'sim',
        'não'
};

// Parcelas do pedido
export type TParcelas = {
    id_pedido: number,
    data_parcela: string,
    valor_parcela: string,
    forma_pagamento: string,
    observacoes_parcela: string
};

// Pedido via CRM
export type TPedido = {
    id_ped: number;
    id_pedido: number;
    id_cliente: number;
    nome_cliente: string;
    id_local_retirada: number;
    id_local_cobranca: number;
    vendedor_pedido: string;
    vendedor_pedido_id: number;
    listapreco_produtos: number;
    valor_total_produtos: string;
    desconto_pedido: string;
    desconto_pedido_porc: string;
    peso_total_nota: string;
    peso_total_nota_liq: string;
    frete_pedido: string;
    valor_total_nota: string;
    valor_baseICMS: string;
    valor_ICMS: string;
    valor_baseST: string;
    valor_ST: string;
    valor_IPI: string;
    condicao_pagamento_id: number;
    condicao_pagamento: number;
    frete_por_pedido: number;
    transportadora_pedido: string;
    id_transportadora: number;
    data_pedido: string;
    prazo_entrega: string;
    referencia_pedido: string;
    obs_pedido: string;
    obs_interno_pedido: string;
    status_pedido: string;
    contas_pedido: number;
    comissao_pedido: number;
    estoque_pedido: number;
    pdv_emitido: null | string;
    ordemc_emitido: number;
    data_cad_pedido: string;
    data_mod_pedido: string;
    id_aplicativo: null | number;
    id_pedido_aplicativo: null | number;
    id_almoxarifado: number;
    pagamento_com_vhpay: number;
    pagamento_com_conta_integrada: number;
    link_pgto_gerado: number;
    lixeira: string;
};
