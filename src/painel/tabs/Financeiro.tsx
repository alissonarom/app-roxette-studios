import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { FinanceiroScreenPorps, RootStackParamList, TPedido } from "../../types";
import { ActivityIndicator, Card, DataTable, Divider, List } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import { PedidosContext } from '../../utils/PedidoContext';
// import { dataPedido } from "../../Mocks/produtoMock";
import { useRoute, RouteProp } from "@react-navigation/native";

const Financeiro: React.FC<FinanceiroScreenPorps> = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { cliente, vendedor } = route.params;
	const [pedidos, setDataPedidos] = useState<TPedido[]>([]);
	const [isLoading, setLoading] = useState(false);
	const pedidosContext = useContext(PedidosContext);

	{/* TODO fazer loop de parcelas e forma de pagamento */}

    const [items] = useState([
        {
			"id_ped_produto": 217211087,
			"id_pedido": 37548850,
			"id_produto": 65971505,
			"id_almoxarifado": null,
			"id_lote": null,
			"desc_produto": "Bucha - BUCHA S12",
			"qtde_produto": "1.0000",
			"desconto_produto": "0.00",
			"ipi_produto": "5.00",
			"icms_produto": "0.00",
			"valor_unit_produto": "1.990000",
			"valor_custo_produto": "0.550000",
			"valor_total_produto": "1.99",
			"valor_desconto": "0.00",
			"peso_produto": "0.00",
			"peso_liq_produto": "0.00",
			"info_adicional": "",
			"xPed_produto": "",
			"nItem_produto": "",
			"json_localizacoes": "[]"
		},
		{
			"id_ped_produto": 217211088,
			"id_pedido": 37548850,
			"id_produto": 65986365,
			"id_almoxarifado": null,
			"id_lote": null,
			"desc_produto": "Furadeira Impacto 500W",
			"qtde_produto": "1.0000",
			"desconto_produto": "0.00",
			"ipi_produto": "5.00",
			"icms_produto": "0.00",
			"valor_unit_produto": "0.000000",
			"valor_custo_produto": "0.000000",
			"valor_total_produto": "0.00",
			"valor_desconto": "0.00",
			"peso_produto": "0.00",
			"peso_liq_produto": "0.00",
			"info_adicional": "",
			"xPed_produto": "",
			"nItem_produto": "",
			"json_localizacoes": "[]"
		},
		{
			"id_ped_produto": 217211089,
			"id_pedido": 37548850,
			"id_produto": 65955474,
			"id_almoxarifado": null,
			"id_lote": null,
			"desc_produto": "Produto 1",
			"qtde_produto": "1.0000",
			"desconto_produto": "0.00",
			"ipi_produto": "0.00",
			"icms_produto": "0.00",
			"valor_unit_produto": "120.000000",
			"valor_custo_produto": "10.000000",
			"valor_total_produto": "120.00",
			"valor_desconto": "0.00",
			"peso_produto": "0.00",
			"peso_liq_produto": "0.00",
			"info_adicional": "",
			"xPed_produto": "",
			"nItem_produto": "",
			"json_localizacoes": "[]"
		}
       ]);

    const states: any = {
        'Em Aberto': {icon:'minus-circle-outline', color:'#145B91'},
        'Em Andamento': {icon:'refresh-circle', color:'orange'},
        'Cancelado': {icon:'close-circle-outline', color:'red'},
        'Atendido': {icon:'check-circle-outline', color:'green'},
    };

	useEffect(() => {
		if (pedidosContext) {
		  pedidosContext.atualizarPedidos(cliente.id_cliente, vendedor.id_vendedor); // Chama a função ao carregar a página
		}
	  }, []);

	// const getPedidos = async () => {
	// 	setLoading(true);
    //     const headers = {
    //       'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
    //       'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
    //       'cache-control': 'no-cache',
    //       'content-type': 'application/json',
    //     };
    //     try {
    //       const response = await fetch('/api/pedidos', {
    //         method: 'GET',
    //         headers,
    //       });
      
    //       const json = await response.json();

	// 	  const pedidosFiltrados = json.data.filter((pedido: any) => 
	// 		pedido.vendedor_pedido_id === vendedor.id_vendedor && pedido.id_cliente === cliente.id_cliente
	// 	  );
	// 	  setDataPedidos(pedidosFiltrados); // Atualiza o estado com os pedidos filtrados
    //     } catch (error) {
    //       console.error('Erro:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    // };
    
    return (
        <SafeAreaView style={styles.container}>
			<View style={{ backgroundColor: "#145B91", display: "flex", flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5 }}>
                <View>
                    <Text style={{ fontWeight: '600', color: 'white' }}>Cliente</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 150 }}>{cliente.razao_cliente}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: '600', color: 'white' }}>Vendedor</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 150 }}>{vendedor.razao_vendedor}</Text>
                </View>
            </View>
			{!pedidosContext ?
			<View style={{height:'50%'}}>
				<ActivityIndicator size={'large'} color="#145B91"/>
			</View>
			: pedidosContext.pedidos.length ?
			<ScrollView style={styles.scrollView}>
                {/* <View>
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
                </View> */}
                <List.Section title={`Pedidos do cliente: ${cliente.razao_cliente}`}>
                    {pedidosContext.pedidos.map((item, index) => (
                    <>
                        <List.Accordion
                            key={index}
                            title={item.status_pedido}
                            style={{ backgroundColor: 'white', paddingVertical: 0 }}
                            description={item.data_pedido}
                            titleStyle={{ color: '#145B91', fontWeight: '600' }}
                            left={props => <List.Icon {...props} icon={states[item.status_pedido].icon} color={states[item.status_pedido].color} />}
                            right={props => <View style={{display: 'flex', flexDirection: 'row'}}><Text>R$ {item.valor_total_nota}</Text><List.Icon {...props}  icon='chevron-down' color={states[item.status_pedido].color} /></View>}>
							<View style={styles.viewCardPedido}>
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '600' }}>Cliente: </Text>
                                        <Text
											numberOfLines={1}
											ellipsizeMode="tail"
											style={{ maxWidth: 200 }}
										>
											{item.nome_cliente}
										</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '600' }}>Vendedor </Text>
                                        <Text
										numberOfLines={1}
										ellipsizeMode="tail"
										style={{ maxWidth: 200 }}
										>{item.vendedor_pedido}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '600' }}>Nº Pedido: </Text>
                                    <Text>{item.id_pedido}</Text>
                                </View>
                            </View>
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
                                        <DataTable.Row key={index+item.id_pedido}>
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
							<View style={styles.viewCardPedido}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Criado em: </Text>
									<Text>{item.data_pedido}</Text>
								</View>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Entrega </Text>
									<Text>{item.prazo_entrega}</Text>
								</View>
                            </View>
							
							<View style={styles.viewCardPedido}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<Text style={{ fontWeight: '600' }}>Forma de pagamento: </Text>
									<Text>PIX</Text>
								</View>
                            </View>
							<View style={styles.resumo}>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Subtotal produtos</Text>
									<Text style={styles.resumoTexts}>R$ {item.valor_total_produtos}</Text>
								</View>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Frete</Text>
									<Text style={styles.resumoTexts}>R$ {item.frete_pedido}</Text>
								</View>
								<View style={styles.resumoView}>
									<Text style={styles.resumoTexts}>Desconto</Text>
									<Text style={styles.resumoTexts}>-R$ {item.desconto_pedido}</Text>
								</View>
                            </View>
							<View style={[styles.resumoView, {backgroundColor: '#145B91', paddingRight: 15}]}>
								<Text style={{fontWeight: '600', color: 'white'}}>TOTAL</Text>
								<Text style={{fontWeight: '600', color: 'white'}}>R$ {item.valor_total_nota}</Text>
							</View>
                        </List.Accordion>
                        <Divider style={{ marginVertical: 5, backgroundColor: 'transparent' }} />
                    </>
                    ))}
                </List.Section>
            </ScrollView>:
			<Text style={{ fontWeight: '600', height: '50%', alignSelf: 'center', color: 'grey', fontSize: 20 }}>Não há pedidos deste cliente</Text>}
        </SafeAreaView>
    );
  };

  export default Financeiro;
  