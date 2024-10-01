import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { NovoPedidoScreenPorps } from "../../types/index";
import { Button, Card, DataTable, IconButton, TextInput, Snackbar, ActivityIndicator  } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import DatePicker from '../../components/datePicker'
import {Picker} from '@react-native-picker/picker';
import React from "react";
import {
    TProduto,
    TProdutoPedido,
    TParcelas,
    TNovoPedido,
    RootStackParamList,
    Status_pedido,
    Estoque_pedido,
    Conta_lancada,
} from "../../types/index";
import {dataProdutoMock} from '../../Mocks/produtoMock'
import { PedidosContext } from '../../utils/PedidoContext';
import { useRoute, RouteProp } from '@react-navigation/native';
// utils
import { truncateText, dataFormaPagamento } from "../../utils";

const NovoPedido: React.FC<NovoPedidoScreenPorps> = () => {
    // produto
    // TODO verificar quais payloads recebem enum e substituir
    const [produto, setProduto] = useState<TProduto | null>(null);
    const [arrayProdutos, setArrayProdutos] = useState<TProdutoPedido[]>([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState<string>();
    const [descontoProdutos, setDescontoProdutos] = useState<string>('');
    const [totalDescontoProdutos, setTotalDescontoProdutos] = useState<number>(0);
    const [totalProdutos, setTotalProdutos] = useState(0)
    const [dataProdutos, setDataProdutos] = useState<TProduto[]>([]);
    // route params
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { cliente, vendedor } = route.params;  // Acessa o parâmetro 'cliente'
    //pagamento
    let novoArrayParcelas: TParcelas[] = []
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [parcelas, setParcelas] = useState('');
    const [pagamentoParcelado, setPagamentoParcelado] = useState<TParcelas[]>([]);
    //obs
    const [observacao, onChangeobservacao] = useState<string>('');
    //prazo
    const [prazo, setPrazo] = useState(new Date());
    const [isLoading, setLoading] = useState(false);
    const [isLoadingPedido, setLoadingPedido] = useState(false);
    const [visible, setVisible] = useState(false);
    const pedidosContext = useContext(PedidosContext);

    useEffect(() => {
        getProdutos();
    }, []);

    //clear function
    const clearPainel = () => {
        setArrayProdutos([]);
        setTotalDescontoProdutos(0)
        setFormaPagamento(null)
        setParcelas('')
        setPagamentoParcelado([])
        onChangeobservacao('')
        setPrazo(new Date())
        setLoadingPedido(false);
        setLoading(false);
        setVisible(true);
        setTotalProdutos(0)
    }

    //GET--------------
    const getProdutos = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
          'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        };
        try {
          const response = await fetch('/api/produtos', {
            method: 'GET',
            headers,
          });
      
          const json = await response.json();
          setDataProdutos(json.data);
        } catch (error) {
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
        // setDataProdutos(dataProdutoMock);
    };

    // Monta pedido
    const novoPedido = (): TNovoPedido => {
            return {
              id_cliente: cliente.id_cliente, // ID do cliente 
              nome_cliente: cliente.razao_cliente, // Nome do cliente
              vendedor_pedido: vendedor.razao_vendedor, // Nome do vendedor
              vendedor_pedido_id: vendedor.id_vendedor, // ID do vendedor
              desconto_pedido: String(totalDescontoProdutos), // Valor total do desconto
              peso_total_nota: '0', // Peso total do pedido
              peso_total_nota_liq: '0', // Peso líquido do pedido
              data_pedido: new Date().toISOString().split('T')[0], // Data do pedido
              prazo_entrega: new Date(prazo).toISOString().split('T')[0], // Prazo de entrega (Dias)
              referencia_pedido: null, // Referência do pedido
              obs_pedido: observacao, // Observações do pedido
              obs_interno_pedido: null, // Observação interna do pedido
              status_pedido: Status_pedido["Em Aberto"], // Status do pedido
              estoque_pedido: Estoque_pedido.Não, // Estoque lançado (Sim/Não)
              contas_pedido: Conta_lancada.Não, // Contas lançadas (Sim/Não)
              valor_total_produtos: totalProdutos
            };
    };

    // Função para criar o pedido
const postPedido = async (novoPedido:TNovoPedido) => {
    try {
        const pedidoResponse = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
                'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
            },
            body: JSON.stringify(novoPedido),
        });
        console.log('novoPedido', novoPedido);
        if (!pedidoResponse.ok) {
            console.error('Erro: gerar pedido');
            throw new Error('Erro ao criar o pedido');
        }
        const pedidoData = await pedidoResponse.json();
        console.log('Pedido criado com sucesso:', pedidoData);
        return pedidoData.data[0].id_ped; // Retorna o ID do pedido criado
    } catch (error) {
        console.error('Erro ao criar o pedido:', error);
        throw error;
    }
};

// Função para adicionar os produtos ao pedido
const postProdutos = async (idPedido:number, produtos:TProdutoPedido[]) => {
    try {
        console.log(`/api/produtos-pedido?id_ped=${idPedido}`);
        const produtosResponse = await fetch(`/api/pedido/${idPedido}/produtos`, {
            method: 'POST',
            headers: {
                'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
                'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
            },
            body: JSON.stringify(produtos),
        });
        if (!produtosResponse.ok) {
            console.error('Erro: gravar produtos no pedido');
            throw new Error('Erro ao cadastrar os produtos no pedido');
        }
        const produtosData = await produtosResponse.json(); // Espera a resolução da Promise
        console.log('Produtos cadastrados com sucesso no pedido:', idPedido);
        console.log('produtosResponse:', produtosData); // Agora `produtosData` contém o objeto resolvido
        
    } catch (error) {
        console.error('Erro ao cadastrar os produtos no pedido:', error);
        throw error;
    }
};

// Função para adicionar as parcelas ao pedido
const postParcelas = async (idPedido:number, parcelas:TParcelas[]) => {
    try {
        console.log(`/api/parcelas?id_ped=${idPedido}`);
        const parcelaResponse = await fetch(`/api/parcelas?id_ped=${idPedido}`, {
            method: 'POST',
            headers: {
                'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
                'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
            },
            body: JSON.stringify(parcelas),
        });
        if (!parcelaResponse.ok) {
            console.error('Erro: cadastrar parcelas no pedido');
            throw new Error('Erro ao cadastrar as parcelas no pedido');
        }
        const parcelasData = await parcelaResponse.json(); // Espera a resolução da Promise
        console.log('Parcelas cadastradas com sucesso no pedido:', idPedido);
        console.log('parcelaResponse:', parcelasData); // Agora `produtosData` contém o objeto resolvido
    } catch (error) {
        console.error('Erro ao cadastrar as parcelas no pedido:', error);
        throw error;
    }
};

// Função principal para criar o pedido, cadastrar produtos e parcelas
const criaNovoPedido = async () => {
    setLoading(true);
    setLoadingPedido(true);
    try {
        // Cria o pedido
        const idPedido = await postPedido(novoPedido());

        // Cadastra os produtos no pedido
        const produtos = arrayProdutos.map((produto) => ({
            id_produto: produto.id_produto,
            desc_produto: produto.desc_produto,
            qtde_produto: parseFloat(produto.qtde_produto).toFixed(4),
            valor_unit_produto: parseFloat(produto.valor_unit_produto).toFixed(4),
            desconto_produto: produto.desconto_produto ? parseFloat(produto.desconto_produto).toFixed(2) : undefined,
            ipi_produto: produto.ipi_produto ? parseFloat(produto.ipi_produto).toFixed(2) : undefined,
            icms_produto: produto.icms_produto ? parseFloat(produto.icms_produto).toFixed(2) : undefined,
            valor_custo_produto: produto.valor_custo_produto ? parseFloat(produto.valor_custo_produto).toFixed(4) : undefined,
            peso_produto: produto.peso_produto ? parseFloat(produto.peso_produto).toFixed(2) : undefined,
            peso_liq_produto: produto.peso_liq_produto ? parseFloat(produto.peso_liq_produto).toFixed(2) : undefined
        }));
        console.log('produtos inside criaNovoPedido', produtos)
        await postProdutos(idPedido, produtos);

        // Cadastra as parcelas no pedido
        const parcelas = pagamentoParcelado.map((parcela) => ({
            data_parcela: parcela.data_parcela,
            valor_parcela: parcela.valor_parcela,
            forma_pagamento: parcela.forma_pagamento,
            observacoes_parcela: parcela.observacoes_parcela,
            conta_liquidada: parcela.conta_liquidada
        }));
        await postParcelas(idPedido, parcelas);

        // Atualiza pedidos, se necessário
        if (pedidosContext) {
            pedidosContext.atualizarPedidos(cliente.id_cliente, vendedor.id_vendedor);
        }

    } catch (error) {
        console.error('Erro ao criar o pedido ou cadastrar os produtos e parcelas:', error);
    } finally {
        setLoading(false);
        setLoadingPedido(false);
        clearPainel();
    }
};

// Monta produtos do pedido
const adicionarProduto = () => {
        if (produto && quantidadeProdutos) {
          const novoProduto: TProdutoPedido = {
            id_produto: produto.id_produto,
            desc_produto: produto.desc_produto,
            qtde_produto: String(quantidadeProdutos),
            valor_unit_produto: produto.valor_produto,
            valor_custo_produto: produto.valor_custo_produto,
            valor_total_produto: (parseFloat(produto.valor_produto) * parseFloat(quantidadeProdutos)).toFixed(2),
            desconto_produto: descontoProdutos
          };
            setTotalProdutos(totalProdutos + (parseInt(quantidadeProdutos) * parseInt(produto.valor_produto)));
            setTotalDescontoProdutos(totalDescontoProdutos + (descontoProdutos ? parseInt(descontoProdutos): 0));
            setArrayProdutos((prevArray) => [...prevArray, novoProduto]);
        }
        setProduto(null); // Reset Picker
        setQuantidadeProdutos('');
        setDescontoProdutos('');
};
      
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#145B91", display: "flex", flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5 }}>
                <View>
                        <Text style={{ fontWeight: '600', color: 'white' }}>Cliente</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 130 }}>{cliente.razao_cliente}</Text>
                </View>
                <View>
                        <Text style={{ fontWeight: '600', color: 'white' }}>Vendedor</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 130 }}>{vendedor.razao_vendedor}</Text>
                </View>
            </View>
            {isLoading ? (
            <View>
                <ActivityIndicator size={'large'} color="#145B91"/>
                {isLoadingPedido ? (
                <Text style={[styles.h3, {alignSelf:'center'}]}>Criando seu pedido </Text>
                ): null
            }
            </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {/* Produtos */}
                    {/* TODO criar lógica de remover produtos */}
                    <Card mode="elevated" style={styles.cardPanel}>
                            <View style={[styles.cardPanelContent, { justifyContent: 'space-between' }]}>
                                <Text style={styles.h3}>Produtos  </Text>
                                <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: arrayProdutos.length ? 'green' : 'red' }}>obrigatório</Text>
                            </View>
                            <View style={styles.cardPanelContent}>
                                <Picker
                                    dropdownIconColor="#9E9E9E"
                                    style={styles.selectPicker}
                                    selectedValue={produto?.desc_produto}
                                    onValueChange={(itemValue, itemIndex) => {
                                        const selectedItem = dataProdutos[itemIndex - 1];
                                        setProduto(selectedItem || null);
                                    } }>
                                    <Picker.Item label='Selecione um produto' value='Selecione um produto' />
                                    {dataProdutos.map((item) => {
                                        return <Picker.Item label={truncateText(item.desc_produto, 17)} value={item.desc_produto} key={item.id_produto} />;
                                    })}
                                </Picker>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    style={{ marginHorizontal: 2, width: 70, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={descontoProdutos}
                                    onChangeText={setDescontoProdutos}
                                    mode="outlined"
                                    label="Desconto" />
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Qtde"
                                    style={{ marginHorizontal: 5, width: 60, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={quantidadeProdutos}
                                    onChangeText={setQuantidadeProdutos} />
                                <IconButton
                                    style={{ width: 25 }}
                                    icon="plus-circle"
                                    iconColor='green'
                                    size={30}
                                    onPress={() => adicionarProduto()}
                                    disabled={(produto && quantidadeProdutos) ? false : true} />
                            </View>
                            <View style={styles.cardPanelContent}>
                            </View>
                            {arrayProdutos.length ?
                                <View style={styles.viewCardPedido}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title style={{ paddingBottom: 0 }}>Produtos</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 30, paddingBottom: 0 }}>Qtd</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 40, paddingBottom: 0 }}>V. unit.</DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: 'center', maxWidth: 35, paddingBottom: 0 }}>Custo</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 35, paddingBottom: 0 }}>Desc.</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 50, paddingBottom: 0 }}>Total</DataTable.Title>
                                        </DataTable.Header>
                                        {arrayProdutos.map((item, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell style={{ width: 90 }} textStyle={{ fontSize: 12 }}>{item.desc_produto}</DataTable.Cell>
                                                <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 30 }} textStyle={{ fontSize: 11 }}>{Number(item.qtde_produto)}</DataTable.Cell>
                                                <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 40 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.valor_unit_produto)}`}</DataTable.Cell>
                                                <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 35 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.valor_custo_produto)}`}</DataTable.Cell>
                                                <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 35 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.desconto_produto)}`}</DataTable.Cell>
                                                <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 50 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.valor_total_produto) - Number(item.desconto_produto)}`}</DataTable.Cell>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>
                                </View> : null}
                    </Card>
                    {/* Prazo */}
                    {/* TODO criar máscara para datas */}
                    <Card mode="elevated" style={styles.cardPanel}>
                            <Text style={styles.h3}>Prazos</Text>
                            <View style={styles.cardPanelContent}>
                                <View style={styles.cardInputs}>
                                    <Text>Data do pedido</Text>
                                    <TextInput
                                        outlineColor='#145B91'
                                        activeOutlineColor='#145B91'
                                        mode="outlined"
                                        label="Hoje"
                                        style={{ backgroundColor: '#F7F8FA', fontSize: 14, fontFamily: 'Roboto' }}
                                        disabled />
                                </View>
                                <View style={styles.cardInputs}>
                                    <Text>Prazo de entrega</Text>
                                    {<DatePicker date={prazo} setDate={setPrazo} />}
                                </View>
                            </View>
                    </Card>
                    {/* Pagamento */}
                    <Card mode="elevated" style={styles.cardPanel}>
                            <View style={[styles.cardPanelContent, { justifyContent: 'space-between' }]}>
                                <Text style={styles.h3}>Forma de pagamento ou nº parcelas </Text>
                                <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: 'red' }}>obrigatório</Text>
                            </View>
                            <View style={styles.cardPanelContent}>
                                <Picker
                                    dropdownIconColor="#9E9E9E"
                                    placeholder="Forma de pagamento"
                                    style={styles.selectPicker}
                                    selectedValue={formaPagamento}
                                    onValueChange={(itemValue) => { setFormaPagamento(itemValue); } }
                                    enabled={arrayProdutos.length > 0}
                                >
                                    <Picker.Item label="Forma de pagamento" />
                                    {dataFormaPagamento.map((item) => {
                                        return <Picker.Item label={item} value={item} key={item} />;
                                    })}
                                </Picker>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Nº Parcelas"
                                    style={{ marginHorizontal: 5, width: 110, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={parcelas}
                                    onChangeText={setParcelas}
                                    disabled={!arrayProdutos.length} />
                                <IconButton
                                    style={{ width: 25 }}
                                    icon={(pagamentoParcelado.length > 0) ? "delete" : "plus-circle"}
                                    iconColor={(pagamentoParcelado.length > 0) ? "red" : "green"}
                                    size={30}
                                    onPress={() => {
                                        if (!pagamentoParcelado.length) {
                                            if (arrayProdutos.length > 0 && (parcelas || formaPagamento)) {
                                                const numParcelas = parcelas ? parseInt(parcelas) : 1;
                                                for (let i = 1; i <= numParcelas; i++) {
                                                    novoArrayParcelas.push({
                                                        data_parcela: prazo ? String(prazo) : '',
                                                        valor_parcela: String(totalProdutos / numParcelas),
                                                        forma_pagamento: formaPagamento ? formaPagamento : 'Dinheiro',
                                                        observacoes_parcela: observacao || '',
                                                        conta_liquidada: 0
                                                    });
                                                }
                                            }
                                            setPagamentoParcelado(novoArrayParcelas);
                                        } else { setPagamentoParcelado([]), setParcelas(''); }
                                    } }
                                    disabled={!parcelas && !formaPagamento} />
                            </View>
                            {pagamentoParcelado.length ?
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={[styles.tableTitlePagamento, { maxWidth: 25 }]}>Nº</DataTable.Title>
                                        <DataTable.Title numeric style={styles.tableTitlePagamento}>Forma Pgto</DataTable.Title>
                                        <DataTable.Title numeric style={styles.tableTitlePagamento}>Data</DataTable.Title>
                                        <DataTable.Title style={styles.tableTitlePagamento}>Valor</DataTable.Title>
                                    </DataTable.Header>
                                    {pagamentoParcelado.map((parcelas, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={[styles.tableTitlePagamento, { maxWidth: 25 }]} textStyle={{ fontSize: 13 }}>{index+1}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{parcelas.forma_pagamento}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{parcelas.data_parcela}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{`R$ ${Number(parcelas.valor_parcela)}`}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable> : null}
                    </Card>
                    {/* Observação */}
                    <Card mode="elevated" style={styles.cardPanel}>
                            <Text style={styles.h3}>Observação</Text>
                            <View style={styles.cardPanelContent}>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Detalhes do pedido"
                                    numberOfLines={2}
                                    style={{ color: "grey", backgroundColor: '#F7F8FA', flexGrow: 1, marginTop: 10 }}
                                    onChangeText={onChangeobservacao}
                                    value={observacao}
                                    multiline />
                            </View>
                    </Card>
                </ScrollView>
                )}
                <View style={styles.footer}>
                    <View style={styles.subFooter}>
                                <Text style={styles.textFooter}>Total em Produto</Text>
                                <Text style={styles.textFooter}>R$ {totalProdutos}</Text>
                    </View>
                    <View style={styles.subFooter}>
                                <Text style={styles.textFooter}>Desconto</Text>
                                <Text style={{ color: '#ff9090', fontWeight: "600" }}>-R$ {totalDescontoProdutos ? totalDescontoProdutos : 0}</Text>
                    </View>
                    <View style={[styles.subFooter, { marginBottom: 10 }]}>
                                <Text style={[styles.textFooter, { fontSize: 21 }]}>Total</Text>
                                <Text style={[styles.textFooter, { fontSize: 21 }]}>R$ {totalProdutos - totalDescontoProdutos}</Text>
                    </View>
                    <Button
                        style={{ marginHorizontal: 60 }}
                        disabled={(arrayProdutos.length && pagamentoParcelado.length) ? false : true}
                        labelStyle={{ fontSize: 15, fontWeight: "600" }}
                        buttonColor='white'
                        textColor="#145B91"
                        mode="contained"
                        onPress={criaNovoPedido}
                    >
                        Criar Pedido
                    </Button>
                </View>
            
                <Snackbar
                    style={{backgroundColor: 'green'}}
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    duration={1000}
                    >
                    Pedido criado com sucesso.
                </Snackbar>
        </SafeAreaView>
    );
  };

  export default NovoPedido;
  