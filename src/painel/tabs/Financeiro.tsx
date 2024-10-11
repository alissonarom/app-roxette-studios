import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { FinanceiroScreenPorps, Liquidado, RootStackParamList, Status_pedido, TContaReceber, TDespesas, TPedido } from "../../types";
import { ActivityIndicator, Button, Card, DataTable, Divider, List, Snackbar, TextInput } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import { PedidosContext } from '../../utils/PedidoContext';
import { useRoute, RouteProp } from "@react-navigation/native";
import DatePicker from "../../components/datePicker";
import { Picker } from "@react-native-picker/picker";
import { dataFormaPagamento, formatarValor } from "../../utils";

const Financeiro: React.FC<FinanceiroScreenPorps> = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { cliente, vendedor } = route.params;
	const pedidosContext = useContext(PedidosContext);
    const [checked, setChecked] = useState(false);
    const [dataPagamento, setDataPagamento] = useState(new Date());
    const [valorPago, setValorPago] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataDespesas , setDataDespesas] = useState('')

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
        getDespesas()
	}, []);

    const cancelPagamento = () => {
        setChecked(false);
        setFormaPagamento('');
        setValorPago('');
        setDataPagamento(new Date())
    };

    const getDespesas = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
          'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        };
        try {
          const response = await fetch('/api/contas-pagar', {
            method: 'GET',
            headers,
          });
      
          const json = await response.json();

          const despesasFiltradas = json.data.filter((pedido: any) => 
            Number(pedido.n_documento_pag) === vendedor.id_vendedor
          );

          const somaTotal = despesasFiltradas.reduce((acc: number, despesa: any) => {
            return acc + parseFloat(despesa.valor_pago); // Certifique-se de que valor_pag é um número
        }, 0);

        // Define a soma total no estado
        setDataDespesas((somaTotal));

        } catch (error) {
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
        // setDataProdutos(dataProdutoMock);
    };

    const putContaReceber = async (totalNota: string, idPedido: number) => {
        const valorNotaCalculado: boolean = totalNota === valorPago;
    
        const contaReceber: TContaReceber = {
            valor_pago: valorPago,
            data_pagamento: new Date(dataPagamento).toISOString().split('T')[0],
            obs_pagamento: "Pagamento parcial",
            forma_pagamento: formaPagamento,
            liquidado_rec: valorNotaCalculado ? Liquidado.Sim : Liquidado.Não,
        };
    
        try {
            // Busca todas as contas a receber
            const response = await fetch('/api/contas-receber', {
                method: 'GET',
                headers: {
                    'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                    'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                },
            });
    
            const json = await response.json();
            
            // Filtra pelo número do pedido
            const conta = json.data.find((conta: TContaReceber) => conta.n_documento_rec === String(idPedido))
    
            if (!conta) {
                throw new Error('Conta a receber não encontrada para o pedido informado.');
            }
    
            // Atualiza a conta a receber filtrada
            const ContaReceberResponse = await fetch(`/api/contas-receber/${conta.id_conta_rec}`, {
                method: 'PUT',
                headers: {
                    'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                    'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(contaReceber),
            });
    
            if (!ContaReceberResponse.ok) {
                throw new Error('Erro ao atualizar Conta Receber');
            }
    
            const contaAtualizada = await ContaReceberResponse.json();
            console.log('Conta Receber atualizada com sucesso:', contaAtualizada);
    
        } catch (error) {
            console.error('Erro ao buscar ou atualizar contas a receber:', error);
        }
    };

    const putPedido = async (idPedido:number, totalNota:string ) => {
        const valorNotaCalculado:boolean = totalNota === valorPago
        
        const pedidoAlterado = {
            valor_total_nota: valorNotaCalculado ? '0' : `${parseInt(totalNota) - parseInt(valorPago)}`,
            status_pedido : valorNotaCalculado ? Status_pedido.Atendido : Status_pedido["Em Aberto"]
        };
        try {
                const pedidoResponse = await fetch(`/api/pedidos/${idPedido}`, {
                    method: 'PUT',
                    headers: {
                        'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                        'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(pedidoAlterado),
                });

                if (!pedidoResponse.ok) {
                    throw new Error('Erro ao atualizar o pedido');
                }
                const pedidoAtualizadoResponse = await pedidoResponse.json();
                console.log('pedidoAtualizadoResponse criado com sucesso:', pedidoAtualizadoResponse);

            } catch (error) {
                console.error('Erro ao criar contas a pagar:', error);
        }
    };

    const atualizaPedido = async (idPedido: number, totalNota: string) => {
        setLoading(true); // Inicia o loading
    
        try {
            // Chama as duas funções em sequência
            await putPedido(idPedido, totalNota);
            await putContaReceber(totalNota, idPedido);
    
            // Após o sucesso de ambas as operações
            setTimeout(() => {
                setVisible(true);
                setLoading(false);
                cancelPagamento();
            }, 1000);
    
            // Se houver contexto de pedidos, atualiza os pedidos
            if (pedidosContext) {
                pedidosContext.atualizarPedidos(cliente.id_cliente, vendedor.id_vendedor);
            }
    
        } catch (error) {
            console.error('Erro ao atualizar pedido ou conta a receber:', error);
            setLoading(false); // Desativa o loading em caso de erro
        }
    };

    const handleChangeTextValorPago = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setValorPago(valorFormatado)
    };
    
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
                <View style={{alignSelf:'center', flex: 1}}>
                    <View style={{display: "flex", justifyContent: "space-between"}}>
                        <Text style={{color: '#145B91', fontWeight: '500', fontSize: 18, marginVertical:10}}>Minhas despesas</Text>
                        <Card style={{backgroundColor: '#FAEBEB', justifyContent: 'center'}}>
                            <Card.Content style={{alignItems: 'center'}}>
                                <Text style={{color: '#f01a1a', fontWeight: '600', fontSize: 16}}>{`R$ ${dataDespesas}`}</Text>
                                <Text style={{color: 'back', fontWeight: '500', fontSize: 12}}>Essa semana</Text>
                            </Card.Content>
                        </Card>
                    </View>
                </View>
			{!pedidosContext ?
			<View style={{height:'50%'}}>
				<ActivityIndicator size={'large'} color="#145B91"/>
			</View>
			: pedidosContext.pedidos.length ?
			<ScrollView style={styles.scrollView}>
                <List.Section>
                    {pedidosContext.pedidos.map((item, index) => (
                    <>
                        <List.Accordion
                            key={index}
                            title={item.status_pedido}
                            style={{ backgroundColor: 'white', paddingVertical: 0, paddingLeft: 0 }}
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
											style={{ maxWidth: 170 }}
										>
											{item.nome_cliente}
										</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '600' }}>Vendedor </Text>
                                        <Text
										numberOfLines={1}
										ellipsizeMode="tail"
										style={{ maxWidth: 170 }}
										>{item.vendedor_pedido}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '600' }}>Nº Pedido: </Text>
                                    <Text>{item.id_pedido}</Text>
                                </View>
                            </View>
                            <View style={styles.viewCardPedido}>
							{Array.isArray(item.produtos) && item.produtos.length > 0 ? (
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ paddingBottom: 0}} textStyle={{color: '#145B91'}}>Produtos</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 30, paddingBottom: 0}} textStyle={{color: '#145B91'}}>Qtd</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 40, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>V. unit.</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 40, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Custo</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 40, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Desc.</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 60, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {item.produtos.slice().map((produtos, index) => (
                                        <DataTable.Row key={produtos.id_produto}>
                                            <DataTable.Cell textStyle={{fontSize: 10}}>{produtos.desc_produto}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 30}} textStyle={{fontSize: 10}}>{Number(produtos.qtde_produto)}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 40}} textStyle={{fontSize: 10}}>{`R$ ${Number(produtos.valor_unit_produto)}`}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 40}} textStyle={{fontSize: 10}}>{`R$ ${Number(produtos.valor_custo_produto)}`}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 40}} textStyle={{fontSize: 10}}>{`R$ ${Number(produtos.desconto_produto)}`}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 60}} textStyle={{fontSize: 10}}>{`R$ ${Number(produtos.valor_total_produto)-Number(produtos.desconto_produto)}`}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>) : <Text>{String(item.produtos)}</Text>}
                            </View>
							<View style={styles.viewCardPedido}>
							{Array.isArray(item.parcelas) && item.parcelas.length > 0 ? (
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ paddingBottom: 0 , maxWidth: 50}} textStyle={{color: '#145B91'}}>Parcelas</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 70, paddingBottom: 0}} textStyle={{color: '#145B91'}}>Data</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 70, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Valor</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 90, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Forma pgto</DataTable.Title>
                                        <DataTable.Title style={{ justifyContent: 'center', maxWidth: 60, paddingBottom: 0 }} textStyle={{color: '#145B91'}}>Liquidada</DataTable.Title>
                                    </DataTable.Header>
                                    {item.parcelas.slice().map((parcelas, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={{ width: 30}} textStyle={{fontSize: 10}}>{index+1}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 70}} textStyle={{fontSize: 10}}>{parcelas.data_parcela}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 70}} textStyle={{fontSize: 10}}>{`R$ ${Number(parcelas.valor_parcela)}`}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 90}} textStyle={{fontSize: 10}}>{parcelas.forma_pagamento}</DataTable.Cell>
                                            <DataTable.Cell style={{justifyContent: 'center', maxWidth: 60}} textStyle={{fontSize: 10}}>{parcelas.conta_liquidada ? parcelas.conta_liquidada : 'Nao'}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>) : <Text>{String(item.parcelas)}</Text>}
                            </View>
                            { checked ?
                                <View style={[styles.cardPanelContent, {marginVertical: 10, backgroundColor: 'white'}]}>
                                    <View style={styles.cardInputs}>
                                        <Text>Data de pagamento</Text>
                                        <DatePicker date={dataPagamento} setDate={setDataPagamento}/>
                                    </View>
                                    <View style={styles.cardInputs}>
                                            <Text>Valor pago</Text>
                                            <TextInput
                                                outlineColor='#145B91'
                                                activeOutlineColor='#145B91'
                                                mode="outlined"
                                                label="Valor pago"
                                                style={{ flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto', marginTop: 19 }}
                                                value={valorPago}
                                                onChangeText={handleChangeTextValorPago}
                                                keyboardType="numeric"
                                            />
                                    </View>
                                    <View style={styles.cardInputs}>
                                            <Text>Forma de pagamento</Text>
                                            <Picker
                                                dropdownIconColor="#9E9E9E"
                                                placeholder="Forma de pagamento"
                                                style={styles.selectPicker}
                                                selectedValue={formaPagamento}
                                                onValueChange={(itemValue) => { setFormaPagamento(itemValue); } }
                                            >
                                                <Picker.Item label="Forma de pagamento" />
                                                {dataFormaPagamento.map((item) => {
                                                    return <Picker.Item label={item} value={item} key={item} />;
                                                })}
                                            </Picker>
                                    </View>
                                </View> : null}
                            {/*footer*/}
							<View style={styles.footer}>
								<View style={styles.subFooter}>
									<Text style={styles.textFooter}>Total em Produto</Text>
									<Text style={styles.textFooter}>R$ {item.valor_total_produtos}</Text>
								</View>
								<View style={styles.subFooter}>
									<Text style={styles.textFooter}>Desconto</Text>
									<Text style={{ color: '#ff9090', fontWeight: "600" }}>-R$ {item.desconto_pedido}</Text>
								</View>
								<View style={[styles.subFooter, { marginBottom: 10 }]}>
									<Text style={[styles.textFooter, { fontSize: 21 }]}>Total</Text>
									<Text style={[styles.textFooter, { fontSize: 21 }]}>R$ {item.valor_total_nota}</Text>
								</View>
                                <View style={styles.cardPanelContent}>
                                    <Button
                                        style={{ flexGrow: 1 }}
                                        labelStyle={{ fontSize: 15, fontWeight: "600" }}
                                        buttonColor='white'
                                        textColor="#145B91"
                                        mode="contained"
                                        onPress={()=> checked ? atualizaPedido(item.id_ped, item.valor_total_nota) : setChecked(!checked)}
                                        disabled={checked && !(dataPagamento && valorPago && formaPagamento)}
                                        loading={isLoading}
                                    >
                                        {checked ? 'Finalizar' : 'Pagar'}
                                    </Button>
                                    <Button
                                        style={{ flexGrow: 1 }}
                                        labelStyle={{ fontSize: 15, fontWeight: '600' }}
                                        buttonColor='white'
                                        textColor='#145B91'
                                        mode='contained'
                                        onPress={()=>cancelPagamento()}
                                        disabled={!checked}
                                    >
                                        Cancelar
                                    </Button>
                                </View>
							</View>
                        </List.Accordion>
                        <Divider style={{ marginVertical: 5, backgroundColor: 'transparent' }} />
                    </>
                    ))}
                    
                </List.Section>
                <Snackbar
                    style={{backgroundColor: 'green'}}
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    duration={1000}
                    >
                    Pagamento feito com sucesso!
                </Snackbar>
            </ScrollView>:
			<Text style={{ fontWeight: '600', height: '50%', alignSelf: 'center', color: 'grey', fontSize: 20 }}>Não há pedidos deste cliente</Text>}
        </SafeAreaView>
    );
  };

  export default Financeiro;
  