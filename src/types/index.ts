import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
    // Login: any;
    Cliente: { vendedor: TVendedorResponse };
    CadastroCliente: undefined;
    Pedido: { cliente: TClienteResponse, vendedor: TVendedorResponse };
    Financeiro: { cliente: TClienteResponse, vendedor: TVendedorResponse };
    Painel: { cliente: TClienteResponse, vendedor: TVendedorResponse };
    Vendedor: any

};

// export type LoginScreenProps = NativeStackScreenProps<
//  RootStackParamList,
//  'Login'
// >;

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

export type VendedorScreenPorps = NativeStackScreenProps<
 RootStackParamList,
 'Vendedor'
>;

// Cliente Resposta
export type TClienteResponse = {
  id_cliente: number; //
  id_registro: number; //
  tipo_pessoa: string; //
  tipo_cadastro: string; //
  cnpj_cliente: string;//
  rg_cliente: string | null;//
  data_emissao_rg_cliente: string | null;//
  orgao_expedidor_rg_cliente: string | null;//
  passaporte_cliente: string | null;//
  estrangeiro_cliente: string | null | number;//
  razao_cliente: string;//
  fantasia_cliente: string;//
  endereco_cliente: string;//
  numero_cliente: string;//
  bairro_cliente: string;//
  complemento_cliente: string;//
  referencia_cliente: string | null;//
  cep_cliente: string;//
  cidade_cliente: string;//
  cidade_cliente_cod: number;//
  uf_cliente: string;//
  tel_destinatario_cliente: string | null;//
  doc_destinatario_cliente: string | null;//
  nome_destinatario_cliente: string | null;//
  contato_cliente: string | null;//
  fone_cliente: string;//
  fone_contato_cliente: string | null;//
  fone_ramal_cliente: string | null;//
  fax_cliente: string | null;//
  celular_cliente: string;//
  email_cliente: string;//
  email_contato_cliente: string | null;
  celular_contato_cliente: string | null;
  estado_civil_cliente: string | null;
  website_cliente: string | null;
  aposentado_cliente: string | null | number;
  empregador_cliente: string | null;
  profissao_cliente: string | null;
  genero_cliente: string | null;
  insc_estadual_cliente: string;
  insc_municipal_cliente: string | null;
  insc_produtor_cliente: string | null;
  insc_suframa_cliente: string | null;
  nif: string | null;
  situacao_cliente: string; // e.g. "Ativo"
  vendedor_cliente: string | null;
  vendedor_cliente_id: string | null | number;
  modalidade_frete: number;
  id_transportadora: string | null;
  desc_transportadora: string | null;
  observacoes_cliente: string | null;
  listapreco_cliente: number;
  condicaopag_cliente: number;
  limite_credito: string; // Assuming it's a string representation of a number
  ultrapassar_limite_credito: number; // e.g. 0 or 1
  consumidor_final: string; // e.g. "1"
  contribuinte_icms: number; // e.g. 0 or 1
  atividade_encerrada_cliente: string | null | number;
  data_nasc_cliente: string; // Format: "YYYY-MM-DD"
  data_cad_cliente: string; // Format: "YYYY-MM-DD HH:mm:ss"
  data_mod_cliente: string | null; // Format: "YYYY-MM-DD HH:mm:ss"
  lixeira: string; // e.g. "Sim"
};

// Cliente Resposta
export type TClienteRegister = {
  id_cliente: number;
  tipo_pessoa: string;
  tipo_cadastro: string;
  cnpj_cliente: string;
  razao_cliente: string;
  fantasia_cliente: string;
  endereco_cliente: string;
  numero_cliente: number;
  bairro_cliente: string;
  complemento_cliente: string;
  cep_cliente: string;
  cidade_cliente: string;
  cidade_cliente_cod: number;
  uf_cliente: string;
  contato_cliente: string;
  fone_cliente: string;
  fone_contato_cliente: string;
  fone_ramal_cliente: string;
  fax_cliente: string;
  celular_cliente: string;
  email_cliente: string;
  email_contato_cliente: string;
  website_cliente: string;
  insc_estadual_cliente: number;
  insc_municipal_cliente: number;
  insc_produtor_cliente: number;
  insc_suframa_cliente: number;
  situacao_cliente: string;
  vendedor_cliente: string;
  vendedor_cliente_id: number;
  observacoes_cliente: string;
  data_nasc_cliente: string;
  data_cad_cliente: string;
  data_mod_cliente: string;
  lixeira: string;
};

export type TVendedorResponse = {
    id_vendedor: number;
    id_registro: number;
    tipo_pessoa: string;
    cnpj_vendedor: string;
    razao_vendedor: string;
    fantasia_vendedor: string;
    endereco_vendedor: string;
    numero_vendedor: string;
    bairro_vendedor: string;
    complemento_vendedor: string;
    cep_vendedor: string;
    cidade_vendedor: string;
    uf_vendedor: string;
    contato_vendedor: string;
    fone_vendedor: string;
    fone_ramal_vendedor: string;
    celular_vendedor: string;
    email_vendedor: string;
    website_vendedor: string;
    banco_vendedor: string;
    banco_agencia: string;
    banco_conta: string;
    banco_salario: string;
    situacao_vendedor: string;
    comissao_usuario: string;
    comissao_regra: number;
    usuario_vendedor: number;
    observacoes_vendedor: string;
    data_cad_vendedor: string; // formato "0000-00-00 00:00:00"
    data_mod_vendedor: string; // formato "0000-00-00 00:00:00"
    lixeira: string;
}

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
    marca_produto: string | number | null;
    desc_produto: string;
    atalho_produto: string | null;
    fornecedor_produto: string;
    fornecedor_produto_id: number | null;
    produto_variado: number;
    id_produto_parent: number;
    minimo_produto: string;
    maximo_produto: string;
    estoque_produto: string;
    unidade_produto: string;
    valor_produto: string;
    valor_custo_produto: string;
    peso_produto: string | number | null;
    peso_liq_produto: string | number | null;
    icms_produto: string | null;
    ipi_produto: string | null;
    pis_produto: string | null;
    cofins_produto: string | null;
    unidade_tributavel: string | null;
    cest_produto: string | number | null;
    beneficio_fiscal: string | null;
    ncm_produto: string | number | null;
    origem_produto: number;
    codigo_barra_produto: string | number | null;
    codigo_barras_internos: string | null;
    obs_produto: string | null;
    tipo_produto: string;
    tamanho_produto: string | number | null;
    localizacao_produto: string | number | null;
    kit_produto: string;
    baixar_kit: number;
    desmembrar_kit: number;
    loja_visivel: number;
    loja_video_url: string | null;
    valor_tributos: string | number | null;
    valor_tributosEst: string | number | null;
    status_produto: string;
    id_comissionamento: number | null;
    data_cad_produto: string;
    data_mod_produto: string | number | null;
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

export type TProdutoOnPedido ={
    
}

// Produto inserido no pedido
export type TProdutoPedido = {
    id_produto: number,
    desc_produto: string,
    qtde_produto: string,
    valor_unit_produto: string,
    valor_custo_produto?: string,
    valor_total_produto?: string,
    desconto_produto?: any,
    ipi_produto?: any,
    icms_produto?: any,
    peso_produto?: any,
    peso_liq_produto?: any,
    id_ped_produto?: number,
    id_lote?: number,
    id_almoxarifado?: number,
    info_adicional?: string,
    valor_desconto: string
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
export enum Status_pedido {
        'Em Aberto'='Em Aberto',
        'Em Andamento'='Em Andamento',
        'Atendido'='Atendido',
        'Cancelado'='Cancelado'
};

// Lixeira
export enum Lixeira_pedido {
        'sim',
        'não'
};

// Estoque lançado
export enum Estoque_pedido {
'Sim'=1,
'Não'=0
}

// Conta lançada
export enum Conta_lancada {
    'Sim'=1,
    'Não'=0
    }

// Parcelas do pedido
export type TParcelas = {
    data_parcela: string,
    valor_parcela: string,
    forma_pagamento: string,
    observacoes_parcela: string,
    conta_liquidada: number
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
    produtos: TProdutoPedido[],
    parcelas: TParcelas[]
};

// POST Criar pedido
export type TNovoPedido = {
    id_cliente: number | null; //ID do cliente 
    nome_cliente: string; //Nome do cliente
    vendedor_pedido: string; //Nome do vendedor
    vendedor_pedido_id: number | null; //Nome do vendedor
    desconto_pedido: string | number | null;//Valor total do desconto
    peso_total_nota?: string | number | null;//Peso total do pedido
    peso_total_nota_liq?: string | number | null;//Peso liquido do pedido
    data_pedido: string | null;//Data do pedido
    prazo_entrega: string | null;//Prazo de entrega (Dias)
    referencia_pedido: string | null;//Referência do pedido
    obs_pedido: string | null;//Observações do pedido
    obs_interno_pedido: string | null;//Observação interna do pedido
    status_pedido: Status_pedido;//Status do pedido
    estoque_pedido: Estoque_pedido;//Estoque lançado 1 = Sim, 0 = Não
    contas_pedido: Conta_lancada;//Contas lançada 1 = Sim, 0 = Não
    valor_total_nota?: string | number | null,
    valor_total_produtos: string | number | null
};

export const dataFrete = [{ nome:'Destinatário', valor:1}, {nome: 'Terceiro', valor:2}, {nome:'Sem frete', valor:9}, {nome:'Emitente', valor:0}]
