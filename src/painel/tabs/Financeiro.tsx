import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { FinanceiroScreenPorps } from "../../types";
import { Card, DataTable, Divider, List } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";

const Financeiro: React.FC<FinanceiroScreenPorps> = () => {
    const [parcelas, setParcelas] = useState("");
    const [expanded, setExpanded] = useState(true);

    const[pedidos] = useState([ 
		{
			id_ped: 37003714,
			id_pedido: 456,
			id_cliente: 0,
			nome_cliente: "FULANO DE TAL",
			id_local_retirada: 0,
			id_local_cobranca: 0,
			vendedor_pedido: "EU MESMO",
			vendedor_pedido_id: 0,
			listapreco_produtos: 0,
			valor_total_produtos: "1700.00",
			desconto_pedido: "0.00",
			desconto_pedido_porc: "0.00",
			peso_total_nota: "0.00",
			peso_total_nota_liq: "0.000000",
			frete_pedido: "15.00",
			valor_total_nota: "1700.00",
			valor_baseICMS: "1700.00",
			valor_ICMS: "0.00",
			valor_baseST: "0.00",
			valor_ST: "0.00",
			valor_IPI: "0.00",
			condicao_pagamento_id: 0,
			condicao_pagamento: 2,
			frete_por_pedido: 9,
			transportadora_pedido: "Expresso São Miguel",
			id_transportadora: 0,
			data_pedido: "2024-08-02",
			prazo_entrega: "02\/08\/2024",
			referencia_pedido: "",
			obs_pedido: "Referência: Orçamento #1",
			obs_interno_pedido: "",
			status_pedido: "Em Aberto",
			contas_pedido: 0,
			comissao_pedido: 0,
			estoque_pedido: 0,
			pdv_emitido: null,
			ordemc_emitido: 0,
			data_cad_pedido: "2024-08-02 09:42:59",
			data_mod_pedido: "2024-08-05 16:50:22",
			id_aplicativo: null,
			id_pedido_aplicativo: null,
			id_almoxarifado: 0,
			pagamento_com_vhpay: 0,
			pagamento_com_conta_integrada: 0,
			link_pgto_gerado: 0,
			lixeira: "Sim"
		},
		{
			id_ped: 37003714,
			id_pedido: 123,
			id_cliente: 0,
			nome_cliente: "FULANO DE TAL",
			id_local_retirada: 0,
			id_local_cobranca: 0,
			vendedor_pedido: "EU MESMO",
			vendedor_pedido_id: 0,
			listapreco_produtos: 0,
			valor_total_produtos: "1700.00",
			desconto_pedido: "0.00",
			desconto_pedido_porc: "0.00",
			peso_total_nota: "0.00",
			peso_total_nota_liq: "0.000000",
			frete_pedido: "0.00",
			valor_total_nota: "1700.00",
			valor_baseICMS: "1700.00",
			valor_ICMS: "0.00",
			valor_baseST: "0.00",
			valor_ST: "0.00",
			valor_IPI: "0.00",
			condicao_pagamento_id: 0,
			condicao_pagamento: 2,
			frete_por_pedido: 9,
			transportadora_pedido: "",
			id_transportadora: 0,
			data_pedido: "2024-08-02",
			prazo_entrega: "02\/08\/2024",
			referencia_pedido: "",
			obs_pedido: "Referência: Orçamento #1",
			obs_interno_pedido: "",
			status_pedido: "Cancelado",
			contas_pedido: 0,
			comissao_pedido: 0,
			estoque_pedido: 0,
			pdv_emitido: null,
			ordemc_emitido: 0,
			data_cad_pedido: "2024-08-02 09:42:59",
			data_mod_pedido: "2024-08-05 16:50:22",
			id_aplicativo: null,
			id_pedido_aplicativo: null,
			id_almoxarifado: 0,
			pagamento_com_vhpay: 0,
			pagamento_com_conta_integrada: 0,
			link_pgto_gerado: 0,
			lixeira: "Sim"
		},
        {
			id_ped: 37003714,
			id_pedido: 2,
			id_cliente: 0,
			nome_cliente: "FULANO DE TAL",
			id_local_retirada: 0,
			id_local_cobranca: 0,
			vendedor_pedido: "EU MESMO",
			vendedor_pedido_id: 0,
			listapreco_produtos: 0,
			valor_total_produtos: "1700.00",
			desconto_pedido: "0.00",
			desconto_pedido_porc: "0.00",
			peso_total_nota: "0.00",
			peso_total_nota_liq: "0.000000",
			frete_pedido: "0.00",
			valor_total_nota: "1700.00",
			valor_baseICMS: "1700.00",
			valor_ICMS: "0.00",
			valor_baseST: "0.00",
			valor_ST: "0.00",
			valor_IPI: "0.00",
			condicao_pagamento_id: 0,
			condicao_pagamento: 2,
			frete_por_pedido: 9,
			transportadora_pedido: "",
			id_transportadora: 0,
			data_pedido: "2024-08-02",
			prazo_entrega: "02\/08\/2024",
			referencia_pedido: "",
			obs_pedido: "Referência: Orçamento #1",
			obs_interno_pedido: "",
			status_pedido: "Atendido",
			contas_pedido: 0,
			comissao_pedido: 0,
			estoque_pedido: 0,
			pdv_emitido: null,
			ordemc_emitido: 0,
			data_cad_pedido: "2024-08-02 09:42:59",
			data_mod_pedido: "2024-08-05 16:50:22",
			id_aplicativo: null,
			id_pedido_aplicativo: null,
			id_almoxarifado: 0,
			pagamento_com_vhpay: 0,
			pagamento_com_conta_integrada: 0,
			link_pgto_gerado: 0,
			lixeira: "Sim"
		},
        {
			id_ped: 37003714,
			id_pedido: 3,
			id_cliente: 0,
			nome_cliente: "FULANO DE TAL",
			id_local_retirada: 0,
			id_local_cobranca: 0,
			vendedor_pedido: "EU MESMO",
			vendedor_pedido_id: 0,
			listapreco_produtos: 0,
			valor_total_produtos: "1700.00",
			desconto_pedido: "0.0",
			desconto_pedido_porc: "0.00",
			peso_total_nota: "0.00",
			peso_total_nota_liq: "0.000000",
			frete_pedido: "0.00",
			valor_total_nota: "1700.00",
			valor_baseICMS: "1700.00",
			valor_ICMS: "0.00",
			valor_baseST: "0.00",
			valor_ST: "0.00",
			valor_IPI: "0.00",
			condicao_pagamento_id: 0,
			condicao_pagamento: 2,
			frete_por_pedido: 9,
			transportadora_pedido: "",
			id_transportadora: 0,
			data_pedido: "2024-08-02",
			prazo_entrega: "02\/08\/2024",
			referencia_pedido: "",
			obs_pedido: "Referência: Orçamento #1",
			obs_interno_pedido: "",
			status_pedido: "Em Andamento",
			contas_pedido: 0,
			comissao_pedido: 0,
			estoque_pedido: 0,
			pdv_emitido: null,
			ordemc_emitido: 0,
			data_cad_pedido: "2024-08-02 09:42:59",
			data_mod_pedido: "2024-08-05 16:50:22",
			id_aplicativo: null,
			id_pedido_aplicativo: null,
			id_almoxarifado: 0,
			pagamento_com_vhpay: 0,
			pagamento_com_conta_integrada: 0,
			link_pgto_gerado: 0,
			lixeira: "Sim"
		},
    ])

    const [items] = useState([
        {
			id_ped_produto: 217211087,
			id_pedido: 37548850,
			id_produto: 65971505,
			id_almoxarifado: null,
			id_lote: null,
			desc_produto: "Bucha - BUCHA S12",
			qtde_produto: "3.0000",
			desconto_produto: "0.30",
			ipi_produto: "5.00",
			icms_produto: "0.00",
			valor_unit_produto: "1.990000",
			valor_custo_produto: "0.550000",
			valor_total_produto: "1.99",
			valor_desconto: "0.00",
			peso_produto: "0.00",
			peso_liq_produto: "0.00",
			info_adicional: "",
			xPed_produto: "",
			nItem_produto: "",
			json_localizacoes: "[]"
		},
		{
			id_ped_produto: 217211087,
			id_pedido: 37548850,
			id_produto: 65971505,
			id_almoxarifado: null,
			id_lote: null,
			desc_produto: "Bucha - BUCHA S12",
			qtde_produto: "1.0000",
			desconto_produto: "0.00",
			ipi_produto: "5.00",
			icms_produto: "0.00",
			valor_unit_produto: "1.990000",
			valor_custo_produto: "0.550000",
			valor_total_produto: "1.99",
			valor_desconto: "0.00",
			peso_produto: "0.00",
			peso_liq_produto: "0.00",
			info_adicional: "",
			xPed_produto: "",
			nItem_produto: "",
			json_localizacoes: "[]"
		}
       ]);

    const states: any = {
        'Em Aberto': {icon:'minus-circle-outline', color:'#145B91'},
        'Em Andamento': {icon:'refresh-circle', color:'orange'},
        'Cancelado': {icon:'close-circle-outline', color:'red'},
        'Atendido': {icon:'check-circle-outline', color:'green'},
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <Card style={{backgroundColor: 'white', justifyContent: 'center'}}>
                            <Card.Content style={{alignItems: 'center'}}>
                                <Text style={{color: '#145B91', fontWeight: '500'}}>Saldo anterior</Text>
                                <Text style={{color: 'green', fontWeight: '400'}}>R$ 25.500,45</Text>
                            </Card.Content>
                        </Card>
						<View style={{minWidth: '70%'}}>
							<View style={{display: "flex", flexDirection: "row"}}>
								<Card style={styles.cardResumo}>
									<Card.Content style={{alignItems: 'center'}}>
										<Text style={{color: '#145B91', fontWeight: '500'}}>Entrada</Text>
										<Text style={{color: 'green', fontWeight: '400'}}>R$ 500,45</Text>
									</Card.Content>
								</Card>
								<Card style={styles.cardResumo}>
									<Card.Content style={{alignItems: 'center'}}>
									<Text style={{color: '#145B91', fontWeight: '500'}}>saída</Text>
									<Text style={{color: 'red', fontWeight: '400'}}>R$ 200,00</Text>
									</Card.Content>
								</Card>
							</View>
							<View style={{display: "flex", justifyContent: 'space-around', flexDirection: "row"}}>
								<Card style={styles.cardResumo}>
									<Card.Content style={{alignItems: 'center'}}>
										<Text style={{color: '#145B91', fontWeight: '500'}}>Entrada</Text>
										<Text style={{color: 'green', fontWeight: '400'}}>R$ 500,45</Text>
									</Card.Content>
								</Card>
								<Card style={styles.cardResumo}>
									<Card.Content style={{alignItems: 'center'}}>
									<Text style={{color: '#145B91', fontWeight: '500'}}>saída</Text>
									<Text style={{color: 'red', fontWeight: '400'}}>R$ 200,00</Text>
									</Card.Content>
								</Card>
							</View>
						</View>
                    </View>
                    
                </View>
                {/* Pedidos */}
                <List.Section title="Pedidos do mês">
                    {pedidos.slice().map((item, index) => (
                    <>
                        <List.Accordion
                            key={index}
                            title={item.status_pedido}
                            style={{ backgroundColor: 'white', paddingVertical: 0 }}
                            description="00/00/00"
                            titleStyle={{ color: '#145B91', fontWeight: '600' }}
                            left={props => <List.Icon {...props} icon={states[item.status_pedido].icon} color={states[item.status_pedido].color} />}>
                            {/* head */}
                            <View style={styles.viewCardPedido}>
                                    <View>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: '600' }}>Cliente: </Text>
                                            <Text>{item.nome_cliente}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: '600' }}>Vendedor </Text>
                                            <Text>{item.vendedor_pedido}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '600' }}>Nº Pedido: </Text>
                                        <Text>{item.id_pedido}</Text>
                                    </View>
                            </View>
                            {/* Produtos */}
                            <View style={styles.viewCardPedido}>
                                <DataTable >
                                    <DataTable.Header>
                                        <DataTable.Title style={{ paddingBottom: 0}}>Produtos</DataTable.Title>
                                        <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 30, paddingBottom: 0}}>Qtd</DataTable.Title>
                                        <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 40, paddingBottom: 0 }}>V. unit.</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 35, paddingBottom: 0 }}>Custo</DataTable.Title>
                                        <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 35, paddingBottom: 0 }}>Desc.</DataTable.Title>
                                        <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 50, paddingBottom: 0 }}>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {items.slice().map((item, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={{ width: 90}} textStyle={{fontSize: 10}}>{item.desc_produto}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 30}} textStyle={{fontSize: 10}}>{Number(item.qtde_produto)}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 40}} textStyle={{fontSize: 10}}>{Number(item.valor_unit_produto)}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 35}} textStyle={{fontSize: 10}}>{Number(item.valor_custo_produto)}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 35}} textStyle={{fontSize: 10}}>{`R$ ${Number(item.desconto_produto)}`}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 50}} textStyle={{fontSize: 10}}>{`R$ ${Number(item.valor_total_produto) * Number(item.qtde_produto)-Number(item.desconto_produto)}`}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </View>
							{/* Frete */}
							{item.transportadora_pedido &&
							<View style={styles.viewCardPedido}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Frete: </Text>
									<Text>{item.transportadora_pedido}</Text>
								</View>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>R$ </Text>
									<Text>{item.frete_pedido}</Text>
								</View>
                            </View>}
							{/* Prazos */}{/* TODO mascara de datas */}
							<View style={styles.viewCardPedido}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Data do Pedido: </Text>
									<Text>{item.data_pedido}</Text>
								</View>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Entrega </Text>
									<Text>{item.prazo_entrega}</Text>
								</View>
                            </View>
							{/* Pagamento */}
							<View style={styles.viewCardPedido}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Forma de pagamento: </Text>
									<Text>Boleto 30 dias</Text>
								</View>
                            </View>
							{/* Resumo */}
							<View style={styles.resumo}>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Subtotal produtos</Text>
									<Text style={styles.resumoTexts}>{`R$ ${'2.250,20'}`}</Text>
								</View>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Frete</Text>
									<Text style={styles.resumoTexts}>{`R$ ${'2.250,20'}`}</Text>
								</View>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Desconto</Text>
									<Text style={styles.resumoTexts}>{`-R$ ${'2.250,20'}`}</Text>
								</View>
                            </View>
							<View style={[styles.resumoView, {backgroundColor: '#145B91', paddingRight: 15}]}>
								<Text style={{fontWeight: '600', color: 'white'}}>TOTAL</Text>
								<Text style={{fontWeight: '600', color: 'white'}}>{`R$ ${'2.250,20'}`}</Text>
							</View>
                        </List.Accordion>
                        <Divider style={{ marginVertical: 5, backgroundColor: 'transparent' }} />
                    </>
                    ))}
                </List.Section>
                
            </ScrollView>
        </SafeAreaView>
    );
  };

  export default Financeiro;
  