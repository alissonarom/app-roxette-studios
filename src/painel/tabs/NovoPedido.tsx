import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Liquidado, NovoPedidoScreenPorps, TBancoCadastro, TCategoFinanceira, TContaReceber } from "../../types/index";
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
import { PedidosContext } from '../../utils/PedidoContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { dataVendedor, dataClientes } from "../../Mocks/produtoMock";
// utils
import { dataFormaPagamento, formatDate, formatarValor } from "../../utils";

const NovoPedido: React.FC<NovoPedidoScreenPorps> = () => {
    const [produto, setProduto] = useState<TProduto | null>(null);
    const [arrayProdutos, setArrayProdutos] = useState<TProdutoPedido[]>([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState<string>();
    const [descontoProdutos, setDescontoProdutos] = useState<string>('');
    const [totalDescontoProdutos, setTotalDescontoProdutos] = useState(0);
    const [totalProdutos, setTotalProdutos] = useState('')
    const [dataProdutos, setDataProdutos] = useState<TProduto[]>([]);
    // route params
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { cliente, vendedor } = route.params;

    //pagamento
    const [formaPagamento, setFormaPagamento] = useState('');
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
    //conta bancária
    const [contaBancaria, setDataContaBancaria] = useState<TBancoCadastro[]>([]);
    //categorias financeiras
    const [categoFinanceiras, setCategoFinanceiras] = useState<TCategoFinanceira[]>([]);
    const [type, setType] = useState<string>('');

    useEffect(() => {
        getProdutos();
        getContaBancaria();
        getCategoFinanceiras();
    }, []);

    useEffect(() => {
        atualizarParcelas();  // Chama a função de atualização de parcelas
    }, [arrayProdutos, parcelas, formaPagamento]);

    const atualizarParcelas = () => {
        if (!pagamentoParcelado.length && arrayProdutos.length > 0 && (parcelas || formaPagamento)) {
          const desconto = totalDescontoProdutos;
          const numParcelas = parcelas ? parseInt(parcelas) : 1;
          const novoArrayParcelas = [];
      
          for (let i = 1; i <= numParcelas; i++) {
            novoArrayParcelas.push({
              data_parcela: formatDate(prazo),
              valor_parcela: `${(parseFloat(totalProdutos) - desconto) / numParcelas}`,
              forma_pagamento: formaPagamento,
              observacoes_parcela: observacao || '',
              conta_liquidada: 0
            });
          }
      
          setPagamentoParcelado(novoArrayParcelas);
        } else if (pagamentoParcelado.length) {
          setPagamentoParcelado([]);
          setParcelas('');
        }
    };

    const getContaBancaria = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
          'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        };
        try {
          const response = await fetch('/api/contas-bancarias', {
            method: 'GET',
            headers,
          });
      
          const json = await response.json();
          setDataContaBancaria(json.data);
        } catch (error) {
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
        // setDataProdutos(dataProdutoMock);
    };

    const getCategoFinanceiras = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
          'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        };
        try {
          const response = await fetch('/api/categorias-financeiras', {
            method: 'GET',
            headers,
          });
      
          const json = await response.json();
          setCategoFinanceiras(json.data);
        } catch (error) {
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
    };

    //clear function
    const clearPainel = () => {
        setArrayProdutos([]);
        setTotalDescontoProdutos(0)
        setFormaPagamento('')
        setParcelas('')
        setPagamentoParcelado([])
        onChangeobservacao('')
        setPrazo(new Date())
        setLoadingPedido(false);
        setLoading(false);
        setVisible(true);
        setTotalProdutos('')
    };

//GET--------------
    const getProdutos = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
          'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
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
    const novoPedido = () => {
            return {
              id_cliente: cliente.id_cliente, // ID do cliente 
              nome_cliente: cliente.razao_cliente, // Nome do cliente
              vendedor_pedido: vendedor.razao_vendedor, // Nome do vendedor
              vendedor_pedido_id: vendedor.id_vendedor, // ID do vendedor
              // desconto_pedido: String(totalDescontoProdutos), // Valor total do desconto
              peso_total_nota: '0', // Peso total do pedido
              peso_total_nota_liq: '0', // Peso líquido do pedido
              data_pedido: new Date().toISOString().split('T')[0], // Data do pedido
              prazo_entrega: new Date(prazo).toISOString().split('T')[0], // Prazo de entrega (Dias)
              referencia_pedido: null, // Referência do pedido
              obs_pedido: observacao, // Observações do pedido
              obs_interno_pedido: '', // Observação interna do pedido
              status_pedido: Status_pedido["Em Aberto"], // Status do pedido
              estoque_pedido: Estoque_pedido.Não, // Estoque lançado (Sim/Não)
              contas_pedido: Conta_lancada.Sim, // Contas lançadas (Sim/Não)
              valor_total_produtos: totalProdutos
            };
    };

//POST--------------
    // Função para criar o pedido
    const postPedido = async (novoPedido:TNovoPedido) => {
    try {
        const pedidoResponse = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
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

    const postOrcamento = async (novoPedido:TNovoPedido) => {
        try {
            const pedidoResponse = await fetch('/api/orcamentos', {
                method: 'POST',
                headers: {
                    'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                    'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(novoPedido),
            });
            console.log('novo Orçamento', novoPedido);
            if (!pedidoResponse.ok) {
                console.error('Erro: gerar orçamento');
                throw new Error('Erro ao criar o orçamento');
            }
            const pedidoData = await pedidoResponse.json();
            console.log('Orçamento criado com sucesso:', pedidoData);
            return pedidoData.data[0].id_ped; // Retorna o ID do pedido criado
        } catch (error) {
            console.error('Erro ao criar o orçamento:', error);
            throw error;
        }
        };
    // Função para adicionar os produtos ao pedido
    const postProdutos = async (idPedido:number, produtos:TProdutoPedido[]) => {
        if (type === 'pedido'){
            try {
                    const response = await fetch(`/api/pedidos/${idPedido}/produtos`, {
                        method: 'POST',
                        headers: {
                            'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                            'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                            'cache-control': 'no-cache',
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(produtos),
                    });
                if (!response.ok) {
                    console.error('Erro: gravar produtos no pedido');
                    throw new Error('Erro ao cadastrar os produtos no pedido');
                }
                const produtosData = await response.json(); // Espera a resolução da Promise
                console.log('Produtos cadastrados com sucesso no pedido:', idPedido);
                console.log('produtosResponse:', produtosData); // Agora `produtosData` contém o objeto resolvido
                
            } catch (error) {
                console.error('Erro ao cadastrar os produtos no pedido:', error);
                throw error;
            }
        };
        if (type === 'orcamento'){
            try {
                    const response = await fetch(`/api/orcamento/${idPedido}/produtos`, {
                        method: 'POST',
                        headers: {
                            'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                            'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                            'cache-control': 'no-cache',
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(produtos),
                    });
                if (!response.ok) {
                    console.error('Erro: gravar produtos no orcamento');
                    throw new Error('Erro ao cadastrar os produtos no orcamento');
                }
                const produtosData = await response.json(); // Espera a resolução da Promise
                console.log('Produtos cadastrados com sucesso no orcamento:', idPedido);
                console.log('produtosResponse:', produtosData); // Agora `produtosData` contém o objeto resolvido
                
            } catch (error) {
                console.error('Erro ao cadastrar os produtos no orcamento:', error);
                throw error;
            }
        };
    };
    // Função para adicionar as parcelas ao pedido
    const postParcelas = async (idPedido:number, parcelas:TParcelas[]) => {
        if (type === 'pedido'){
            try {
                const parcelaResponse = await fetch(`/api/pedidos/${idPedido}/parcelas`, {
                    method: 'POST',
                    headers: {
                        'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                        'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(parcelas),
                });
                if (!parcelaResponse.ok) {
                    throw new Error('Erro ao cadastrar as parcelas no pedido');
                }
            } catch (error) {
                console.error('Erro ao cadastrar as parcelas no pedido:', error);
                throw error;
            }
        };
        if (type === 'orcamento'){
            try {
                const response = await fetch(`/api/orcamento/${idPedido}/parcelas`, {
                    method: 'POST',
                    headers: {
                        'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                        'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(parcelas),
                });
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar as parcelas no orcamento');
                }
            } catch (error) {
                console.error('Erro ao cadastrar as parcelas no orcamento:', error);
                throw error;
            }
        }
    };
    // Monta produtos do pedido
    const adicionarProduto = () => {
        if (produto && quantidadeProdutos) {
          const novoProduto: TProdutoPedido = {
              id_produto: produto.id_produto,
              desc_produto: produto.desc_produto,
              qtde_produto: quantidadeProdutos,
              valor_unit_produto: produto.valor_produto,
              valor_custo_produto: produto.valor_custo_produto,
              valor_total_produto: (parseInt(produto.valor_produto) * parseInt(quantidadeProdutos)).toFixed(2),
              desconto_produto: descontoProdutos,
              valor_desconto: ""
          };
            setTotalProdutos(String(parseInt(totalProdutos) + (parseInt(quantidadeProdutos) * parseInt(produto.valor_produto))));
            setTotalDescontoProdutos(totalDescontoProdutos + (descontoProdutos ? parseFloat(descontoProdutos): 0));
            setArrayProdutos((prevArray) => [...prevArray, novoProduto]);
        }
        setProduto(null); // Reset Picker
        setQuantidadeProdutos('');
        setDescontoProdutos('');
    };
    //formata Nome vendedor
    function formatarNomeCliente(nomeCliente:string) {
        const nomes = nomeCliente.split(' ');
        return nomes.length > 1 ? `${nomes[0]} ${nomes[nomes.length - 1]}` : nomes[0];
    };

    const criarContaReceber:any = async (idPedido:string) => {
        setLoading(true);
        const despesa: TContaReceber = {
            nome_conta : `Venda de ${formatarNomeCliente(vendedor.razao_vendedor)}`,
            id_categoria : categoFinanceiras[0].id_categoria,
            categoria_rec :  categoFinanceiras[0].desc_categoria,
            id_banco : contaBancaria[0].id_banco_cad,
            id_cliente : cliente.id_cliente,
            nome_cliente : cliente.razao_cliente,
            vencimento_rec : new Date(prazo).toISOString().split('T')[0],
            valor_rec : (parseFloat(totalProdutos)-totalDescontoProdutos).toFixed(2),
            valor_pago : "00.00",
            data_emissao : new Date().toISOString().split('T')[0],
            n_documento_rec : idPedido,
            observacoes_rec : "",
            id_centro_custos : 0,
            centro_custos_rec : "",
            liquidado_rec : Liquidado.Não,
            data_pagamento : null,
            obs_pagamento : null,
            forma_pagamento : formaPagamento,
            tipo_conta : '',
            valor_juros : "00.00",
            valor_desconto : "00.00",
            valor_acrescimo : String(totalDescontoProdutos)
        };
        console.log('despesa no criarContaReceber', despesa)
        try {
            const ContaReceberResponse = await fetch(`/api/contas-receber`, {
                method: 'POST',
                headers: {
                    'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                    'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(despesa),
            });
            if (!ContaReceberResponse.ok) {
                throw new Error('Erro ao cadastrar Conta Receber');
            }
            const ContaReceber = await ContaReceberResponse.json();
            console.log('ContaReceber criado com sucesso:', ContaReceber);
            return ContaReceber.data[0].id_conta_rec; // Retorna o ID da receita criada
    
        } catch (error) {
            console.error('Erro ao criar contas a receber:', error);
        }
    };
    // Função principal para criar o pedido, cadastrar produtos e parcelas
    const criaNovoPedido = async () => {
    setLoading(true);
    setLoadingPedido(true);
    try {
        // Cria o pedido
        const idPedido = await postPedido(novoPedido());
        await criarContaReceber(String(idPedido));

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
            peso_liq_produto: produto.peso_liq_produto ? parseFloat(produto.peso_liq_produto).toFixed(2) : undefined,
            valor_desconto: parseFloat('0').toFixed(4)
        }));
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

    const criaNovoOrcamento = async () => {
        setLoading(true);
        setLoadingPedido(true);
        try {
            // Cria o pedido
            const idPedido = await postOrcamento(novoPedido());
            // await criarContaReceber(String(idPedido));
    
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
                peso_liq_produto: produto.peso_liq_produto ? parseFloat(produto.peso_liq_produto).toFixed(2) : undefined,
                valor_desconto: parseFloat('0').toFixed(4)
            }));
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
                pedidosContext.atualizarOrcamentos(cliente.id_cliente, vendedor.id_vendedor);
            }
    
        } catch (error) {
            console.error('Erro ao criar o orçamento ou cadastrar os produtos e parcelas:', error);
        } finally {
            setLoading(false);
            setLoadingPedido(false);
            clearPainel();
        }
        };

    const removerProduto = (index: number) => {
    setArrayProdutos((prevArray) => {
        // Obter o produto que será removido
        const produtoRemovido = prevArray[index];
        
        // Atualizar o total de produtos removendo o valor do produto removido
        const valorRemovido = parseFloat(produtoRemovido.valor_unit_produto) * parseInt(produtoRemovido.qtde_produto);
        setTotalProdutos((parseFloat(totalProdutos) - valorRemovido).toFixed(2));
        
        // Atualizar o total de desconto removendo o desconto do produto removido
        const descontoRemovido = produtoRemovido.desconto_produto ? parseFloat(produtoRemovido.desconto_produto) : 0;
        setTotalDescontoProdutos(totalDescontoProdutos - descontoRemovido);

        // Retornar o novo array de produtos sem o produto removido
        return prevArray.filter((_, i) => i !== index);
    });
    };

    const handleChangeDesconto = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setDescontoProdutos(valorFormatado)
    };

    const handleChangeQuantidade = (texto: any) => {
        // const valorFormatado = formatarValor(texto);
        setQuantidadeProdutos(texto)
    };

    const handleChangeParcelas = (texto: any) => {
        // const valorFormatado = formatarValor(texto);
        setParcelas(texto)
    };

    const handlePostFunction = () => {
        if (type === 'pedido'){
            criaNovoPedido();
        }else if(type === 'orcamento'){
            criaNovoOrcamento();
        };
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
                    {/* <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 130 }}>{vendedor.razao_vendedor}</Text> */}
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', maxWidth: 130 }}>{vendedor.razao_vendedor}</Text>
                </View>
            </View>
            {isLoading ? (
            <View>
                <ActivityIndicator size={'large'} color="#145B91"/>
                {isLoadingPedido ? (
                <Text style={[styles.h3, {alignSelf:'center'}]}>Criando seu {type} </Text>
                ): null
            }
            </View>
            ) : (
                <ScrollView style={[styles.scrollView]}>
                    {/* Tipo pedido */}
                    <Card mode="elevated" style={styles.cardPanel}>
                        <View style={[styles.cardPanelContent, { justifyContent: 'space-between' }]}>
                            <Text style={styles.h3}>Selecione o tipo  </Text>
                            <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: arrayProdutos.length ? 'green' : 'red' }}>obrigatório</Text>
                        </View>
                        <View style={[styles.cardPanelContent, {justifyContent: 'space-around'}]}>
                            <Button
                                style={{ marginVertical: 5, borderColor: '#145B91' }}
                                labelStyle={{ fontSize: 15, fontWeight: "600" }}
                                buttonColor={type === 'pedido' ? '#145B91' : 'white'}
                                textColor={type === 'pedido' ? 'white' : '#145B91'}
                                mode={type === 'pedido' ? "contained" : 'outlined'}
                                onPress={()=> setType('pedido')}
                            >       
                                Criar Pedido
                            </Button>
                            <Button
                                style={{ marginVertical: 5, borderColor: '#145B91' }}
                                labelStyle={{ fontSize: 15, fontWeight: "600" }}
                                buttonColor={type === 'orcamento' ? '#145B91' : 'white'}
                                textColor={type === 'orcamento' ? 'white' : '#145B91'}
                                mode={type === 'orcamento' ? "contained" : 'outlined'}
                                onPress={()=> setType('orcamento')}
                            >       
                                Criar Orçamento
                            </Button>
                        </View>
                    </Card>
                    {/* Produtos */}
                    <Card mode="elevated" style={styles.cardPanel}>
                            <View style={[styles.cardPanelContent, { justifyContent: 'space-between' }]}>
                                <Text style={styles.h3}>Produtos  </Text>
                                <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: arrayProdutos.length ? 'green' : 'red' }}>obrigatório</Text>
                            </View>
                            <View style={styles.cardPanelContent}>
                                <View style={{width:100, flexGrow: 1}}>
                                <Picker
                                    dropdownIconColor="#9E9E9E"
                                    style={styles.selectPicker}
                                    selectedValue={produto?.desc_produto}
                                    onValueChange={(itemValue, itemIndex) => {
                                        const selectedItem = dataProdutos[itemIndex - 1];
                                        setProduto(selectedItem || null);
                                    } }
                                    enabled={type !== ''}
                                    >
                                    <Picker.Item style={{fontSize:14}} label='Selecione um produto' value='Selecione um produto' />
                                    {dataProdutos.map((item) => {
                                        return <Picker.Item style={{fontSize:14}} label={item.desc_produto} value={item.desc_produto} key={item.id_produto}/>;
                                    })}
                                </Picker>
                                </View>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    style={{ marginHorizontal: 2, width: 70, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={descontoProdutos}
                                    onChangeText={handleChangeDesconto}
                                    mode="outlined"
                                    label="Desconto"
                                    keyboardType="numeric"
                                    disabled={type === ''}/>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Qtde"
                                    style={{ marginHorizontal: 5, width: 60, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={quantidadeProdutos}
                                    onChangeText={handleChangeQuantidade}
                                    disabled={type === ''}/>
                                <IconButton
                                    style={{ width: 25 }}
                                    icon="plus-circle"
                                    iconColor='green'
                                    size={25}
                                    onPress={() => adicionarProduto()}
                                    disabled={(produto && quantidadeProdutos) ? false : true} />
                            </View>
                            <View style={styles.cardPanelContent}>
                            </View>
                            {arrayProdutos.length ?
                                <View style={styles.viewCardPedido}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title style={{ paddingBottom: 0, maxWidth:130 }}>Produtos</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 30 }}>Qtd</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 40 }}>V. unit.</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 35 }}>Desc.</DataTable.Title>
                                            <DataTable.Title numeric style={{ justifyContent: 'center', maxWidth: 50 }}>Total</DataTable.Title>
                                        </DataTable.Header>
                                        {arrayProdutos.map((item, index) => (
                                            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", }}>
                                                <DataTable.Row key={index} style={{paddingHorizontal: 0, flexGrow: 1}}>
                                                    <DataTable.Cell style={{ width: 90 }} textStyle={{ fontSize: 11 }}>{item.desc_produto}</DataTable.Cell>
                                                    <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 30 }} textStyle={{ fontSize: 11 }}>{Number(item.qtde_produto)}</DataTable.Cell>
                                                    <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 40 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.valor_unit_produto)}`}</DataTable.Cell>
                                                    <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 35 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.desconto_produto)}`}</DataTable.Cell>
                                                    <DataTable.Cell style={{ justifyContent: 'center', maxWidth: 50 }} textStyle={{ fontSize: 11 }}>{`R$${Number(item.valor_total_produto) - Number(item.desconto_produto)}`}</DataTable.Cell>
                                                </DataTable.Row>
                                                <IconButton
                                                    icon="delete"
                                                    iconColor="red"
                                                    size={25}
                                                    onPress={() => removerProduto(index)}
                                                    style={{marginLeft: 0, marginRight: 0}}
                                                />
                                            </View>
                                        ))}
                                    </DataTable>
                                </View> : null}
                    </Card>
                    {/* Prazo */}
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
                                <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: formaPagamento && parcelas ? 'green' : 'red' }}>obrigatório</Text>
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
                                    onChangeText={handleChangeParcelas}
                                    disabled={!arrayProdutos.length} />
                                <IconButton
                                    style={{ width: 25 }}
                                    icon={(pagamentoParcelado.length > 0) ? "delete" : "plus-circle"}
                                    iconColor={(pagamentoParcelado.length > 0) ? "red" : "green"}
                                    size={25}
                                    onPress={() => {
                                        atualizarParcelas();  // Chama a mesma função ao pressionar o botão
                                      }}
                                    disabled={!(parcelas && formaPagamento)} />
                            </View>
                            {pagamentoParcelado.length ?
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={[styles.tableTitlePagamento, { maxWidth: 25 }]}>Nº</DataTable.Title>
                                        <DataTable.Title numeric style={styles.tableTitlePagamento}>Forma Pgto</DataTable.Title>
                                        <DataTable.Title numeric style={styles.tableTitlePagamento}>Data</DataTable.Title>
                                        <DataTable.Title numeric style={styles.tableTitlePagamento}>Valor</DataTable.Title>
                                    </DataTable.Header>
                                    {pagamentoParcelado.map((parcelas, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={[styles.tableTitlePagamento, { maxWidth: 25 }]} textStyle={{ fontSize: 13 }}>{index+1}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{parcelas.forma_pagamento}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{(parcelas.data_parcela)}</DataTable.Cell>
                                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{ fontSize: 13 }}>{`R$ ${parcelas.valor_parcela}`}</DataTable.Cell>
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
                        <Text style={styles.textFooter}>R$ {totalProdutos ? totalProdutos : 0}</Text>
                    </View>
                    <View style={styles.subFooter}>
                        <Text style={styles.textFooter}>Desconto</Text>
                        <Text style={{ color: '#ff9090', fontWeight: "600" }}>-R$ {totalDescontoProdutos ? totalDescontoProdutos : 0}</Text>
                    </View>
                    <View style={[styles.subFooter, { marginBottom: 10 }]}>
                        <Text style={[styles.textFooter, { fontSize: 21 }]}>Total</Text>
                        <Text style={[styles.textFooter, { fontSize: 21 }]}>R$ {totalProdutos ? (parseInt(totalProdutos) - totalDescontoProdutos) : 0}</Text>
                    </View>
                    <Button
                        style={{ marginHorizontal: 60 }}
                        disabled={(arrayProdutos.length && pagamentoParcelado.length) ? false : true}
                        labelStyle={{ fontSize: 15, fontWeight: "600" }}
                        buttonColor='white'
                        textColor="#145B91"
                        mode="contained"
                        onPress={handlePostFunction}
                    >
                        Criar {type ? type : 'Pedido'}
                    </Button>
                </View>
                <Snackbar
                    style={{backgroundColor: 'green'}}
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    duration={1000}
                    >
                    {type} criado com sucesso.
                </Snackbar>
        </SafeAreaView>
    );
  };

  export default NovoPedido;
  