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

export type ResumoScreenPorps = NativeStackScreenProps<
 RootStackParamList,
 'Resumo'
>;

export type ClienteResponse = {
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
}

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
}
