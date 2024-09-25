import { useState } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import { NovoPedidoScreenPorps } from "../../types/index";
import { Button, Card, DataTable, IconButton, TextInput } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import DatePicker from '../../components/datePicker'
import {Picker} from '@react-native-picker/picker';
import React from "react";
import { dataFrete, dataProduto, dataTrasportadoras, dataFormaPagamento } from "../../Mocks/produtoMock";
import { TProduto, TProdutoPedido, TTransportadora, TParcelas } from "../../types/index";

const NovoPedido: React.FC<NovoPedidoScreenPorps> = () => {
    // produto
    // TODO verificar quais payloads recebem enum e substituir
    const [produto, setProduto] = useState<TProduto | null>(null);
    const [arrayProdutos, setArrayProdutos] = useState<TProdutoPedido[]>([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState<string>();
    const [descontoProdutos, setDescontoProdutos] = useState<string>('');
    const [totalDescontoProdutos, setTotalDescontoProdutos] = useState<number>(0);
    
    const [totalProdutos, setTotalProdutos] = useState(0)
    let novoArrayParcelas: TParcelas[] = []
    //frete
    const [frete, setFrete] = useState<String | null>(null);
    const [transportadora, setTransportadora] = useState<TTransportadora | null>(null);
    const [valorFrete, setValorFrete] = useState<string>('')
    //pagamento
    const [formaPagamento, setFormaPagamento] = useState();
    const [parcelas, setParcelas] = useState('');
    const [pagamentoParcelado, setPagamentoParcelado] = useState<TParcelas[]>([]);
    //obs
    const [observacao, onChangeobservacao] = useState('');
    //prazo
    const [prazo, setPrazo] = useState(new Date());


    // TODO criar lógica do botão de 'Adicionar' e o restante dos cards expandidos
    // TODO validar os enums - pode ser que seja necessário enviar um number nos campos com este tipo
    
    // função monta produtos do pedido
    const adicionarProduto = () => {
        if (produto && quantidadeProdutos) {
          const novoProduto: TProdutoPedido = {
            id_ped_produto: arrayProdutos.length + 1, // ou gerado por outro meio
            id_pedido: 123, // ID do pedido, substitua conforme necessário
            id_produto: produto.id_produto,
            desc_produto: produto.desc_produto,
            qtde_produto: String(quantidadeProdutos),
            desconto_produto: descontoProdutos,
            ipi_produto: produto.ipi_produto || '0',
            icms_produto: produto.icms_produto || '0',
            valor_unit_produto: produto.valor_produto,
            valor_custo_produto: produto.valor_custo_produto,
            valor_total_produto: (parseFloat(produto.valor_produto) * parseFloat(quantidadeProdutos)).toFixed(2),
            peso_produto: produto.peso_produto,
            peso_liq_produto: produto.peso_liq_produto,
          };
            setTotalProdutos(totalProdutos + parseInt(novoProduto.valor_total_produto));
            setTotalDescontoProdutos(totalDescontoProdutos + (descontoProdutos ? parseInt(descontoProdutos): 0));
            setArrayProdutos((prevArray) => [...prevArray, novoProduto]);
        }
        setProduto(null); // Reset Picker
        setQuantidadeProdutos('');
        setDescontoProdutos('');
      };

    // TODO lógica do número do pedido exclusivo
      
    return (
        <SafeAreaView style={styles.container}>
            <View style={{backgroundColor:"#145B91", display: "flex", flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5}}>
                <View>
                    <Text style={{fontWeight: '600', color: 'white'}}>Cliente</Text>
                    <Text style={{color: 'white'}}>Fulano da Silva</Text>
                </View>
                <View>
                <Text style={{fontWeight: '600', color: 'white'}}>Vendedor</Text>
                <Text style={{color: 'white'}}>Bestrano Vendedor</Text>
                </View>
                <View>
                <Text style={{fontWeight: '700', color: 'white'}}>Pedido</Text>
                <Text style={{fontWeight: '700', color: 'white'}}>12548</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {/* Produtos */}
                {/* TODO criar lógica de remover produtos */}
                <Card mode="elevated" style={styles.cardPanel}>
                    <View style={[styles.cardPanelContent, {justifyContent: 'space-between'}]}>
                        <Text style={styles.h3}>Produtos  </Text>
                        <Text style={{fontSize:10, alignSelf: 'flex-start', color: 'red'}}>obrigatório</Text>
                    </View>
                    <View style={styles.cardPanelContent}>
                        <Picker
                            dropdownIconColor="#9E9E9E"
                            style={styles.selectPicker}
                            selectedValue={produto?.desc_produto}
                            onValueChange={(itemValue, itemIndex) => {
                                const selectedItem = dataProduto[itemIndex - 1];
                                setProduto(selectedItem || null);
                            }}>
                            <Picker.Item label='Selecione um produto' value='Selecione um produto' />
                            {dataProduto.map((item) => {
                                return <Picker.Item label={item.desc_produto} value={item.desc_produto} key={item.id_produto} />;
                            })}
                        </Picker>
                        <TextInput
                            outlineColor='#145B91'
                            activeOutlineColor='#145B91'
                            style={{marginHorizontal: 2, width: 70, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto'}}
                            value={descontoProdutos}
                            onChangeText={setDescontoProdutos}
                            mode="outlined"
                            label="Desconto"
                        />
                        <TextInput
                            outlineColor='#145B91'
                            activeOutlineColor='#145B91'
                            mode="outlined"
                            label="Qtde"
                            style={{ marginHorizontal: 5, width: 60, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto'}}
                            value={quantidadeProdutos}
                            onChangeText={setQuantidadeProdutos}
                        />
                        <IconButton
                            style={{width: 25}}
                            icon="plus-circle"
                            iconColor='green'
                            size={30}
                            onPress={() => adicionarProduto()}
                            disabled={(produto && quantidadeProdutos) ? false : true}
                        />
                    </View>
                    <View style={styles.cardPanelContent}>
                    </View>
                    {arrayProdutos.length ?
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
                            {arrayProdutos.map((item, index) => (
                                <DataTable.Row key={item.id_ped_produto}>
                                    <DataTable.Cell style={{ width: 90}} textStyle={{fontSize: 12}}>{item.desc_produto}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent: 'center', maxWidth: 30}} textStyle={{fontSize: 11}}>{Number(item.qtde_produto)}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent: 'center', maxWidth: 40}} textStyle={{fontSize: 11}}>{`R$${Number(item.valor_unit_produto)}`}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent: 'center', maxWidth: 35}} textStyle={{fontSize: 11}}>{`R$${Number(item.valor_custo_produto)}`}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent: 'center', maxWidth: 35}} textStyle={{fontSize: 11}}>{`R$${Number(item.desconto_produto)}`}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent: 'center', maxWidth: 50}} textStyle={{fontSize: 11}}>{`R$${Number(item.valor_total_produto) * Number(item.qtde_produto)-Number(item.desconto_produto)}`}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View> : null }
                </Card>
                {/* Frete */}
                <Card mode="elevated" style={styles.cardPanel}>
                    <Text style={styles.h3}>Frete</Text>
                    <View style={styles.cardPanelContent}>
                        <Picker
                            dropdownIconColor="#9E9E9E"
                            placeholder="Selecione um tipo de frete"
                            prompt="Fretes"
                            style={styles.selectPicker}
                            selectedValue={frete}
                            onValueChange={(itemValue) => {
                                setFrete(itemValue);
                            } }>
                            <Picker.Item label="Sem frete" />
                            {dataFrete.map((item, index) => {
                                return <Picker.Item label={item} value={item} key={index} />;
                            })}
                        </Picker>
                        <Picker
                            dropdownIconColor="#9E9E9E"
                            placeholder="Selecione uma trasportadora"
                            prompt="Transportadora"
                            style={styles.selectPicker}
                            selectedValue={transportadora?.desc_transportadora}
                            onValueChange={(itemValue, itemIndex) => {
                                const selectedItem = dataTrasportadoras[itemIndex - 1];
                                setTransportadora(selectedItem || null);
                            } }>
                                <Picker.Item label="Transportadora" />
                                {dataTrasportadoras.map((item, index) => {
                                    return <Picker.Item label={item.desc_transportadora} value={item.desc_transportadora} key={item.id_transportadora} />;
                                })}
                        </Picker>
                        <TextInput
                            outlineColor='#145B91'
                            activeOutlineColor='#145B91'
                            mode="outlined"
                            label="Valor"
                            style={{marginHorizontal: 5, width: 80, flexShrink:1 , backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto'}}
                            value={valorFrete}
                            onChangeText={setValorFrete}
                            disabled={!frete}
                        />
                    </View>
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
                                disabled
                            />
                        </View>
                        <View style={styles.cardInputs}>
                            <Text>Prazo de entrega</Text>
                            {<DatePicker date={prazo} setDate={setPrazo} />}
                        </View>
                    </View>
                </Card>
                {/* Pagamento */}
                <Card mode="elevated" style={styles.cardPanel}>
                    <View style={[styles.cardPanelContent, {justifyContent: 'space-between'}]}>
                        <Text style={styles.h3}>Forma de pagamento ou nº parcelas </Text>
                        <Text style={{fontSize:10, alignSelf: 'flex-start', color: 'red'}}>obrigatório</Text>
                    </View>
                    <View style={styles.cardPanelContent}>
                        <Picker
                            dropdownIconColor="#9E9E9E"
                            placeholder="Forma de pagamento"
                            style={styles.selectPicker}
                            selectedValue={formaPagamento}
                            onValueChange={(itemValue) => {setFormaPagamento(itemValue);}}
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
                            style={{marginHorizontal: 5, width: 110, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto'}}
                            value={parcelas}
                            onChangeText={setParcelas}
                            disabled={!arrayProdutos.length}
                        />
                        <IconButton
                            style={{width: 25}}
                            icon={(pagamentoParcelado.length > 0)? "delete" : "plus-circle"}
                            iconColor={(pagamentoParcelado.length > 0)? "red" : "green"}
                            size={30}
                            onPress={() => {
                                if (!pagamentoParcelado.length){
                                    if (arrayProdutos.length > 0 && (parcelas || formaPagamento)) {
                                        const numParcelas = parcelas ? parseInt(parcelas) : 1;
                                        for (let i = 1; i <= numParcelas; i++) {
                                            novoArrayParcelas.push({
                                            id_pedido: i,
                                            data_parcela: prazo ? String(prazo) : '',
                                            valor_parcela: String(totalProdutos / numParcelas),
                                            forma_pagamento: formaPagamento ? formaPagamento : 'Dinheiro',
                                            observacoes_parcela: observacao || ''
                                            })
                                        }
                                    }
                                    setPagamentoParcelado(novoArrayParcelas);
                                }else{ setPagamentoParcelado([]), setParcelas('')}
                            }}
                              disabled={!parcelas && !formaPagamento}
                        />
                    </View>
                    {pagamentoParcelado.length ?
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={[styles.tableTitlePagamento, {maxWidth: 25}]}>Nº</DataTable.Title>
                            <DataTable.Title numeric style={styles.tableTitlePagamento}>Forma Pgto</DataTable.Title>
                            <DataTable.Title numeric style={styles.tableTitlePagamento}>Data</DataTable.Title>
                            <DataTable.Title style={styles.tableTitlePagamento}>Valor</DataTable.Title>
                        </DataTable.Header>
                    {pagamentoParcelado.map((parcelas) => (
                        <DataTable.Row key={parcelas.id_pedido}>
                            <DataTable.Cell style={[styles.tableTitlePagamento, {maxWidth: 25}]} textStyle={{fontSize: 13}}>{parcelas.id_pedido}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{fontSize: 13}}>{parcelas.forma_pagamento}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{fontSize: 13}}>{parcelas.data_parcela}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableTitlePagamento} textStyle={{fontSize: 13}}>{`R$ ${Number(parcelas.valor_parcela)}`}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable> :null}
                </Card>
                {/* Observação */}
                <Card mode="elevated"style={styles.cardPanel}>
                    <Text style={styles.h3}>Observação</Text>
                    <View style={styles.cardPanelContent}>
                    <TextInput
                        outlineColor='#145B91'
                        activeOutlineColor='#145B91'
                        mode="outlined"
                        label="Detalhes do pedido"
                        numberOfLines= {2}
                        style={{color: "grey", backgroundColor: '#F7F8FA', flexGrow: 1, marginTop: 10}}
                        onChangeText={onChangeobservacao}
                        value={observacao}
                        multiline
                    />
                    </View>
                </Card>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.subFooter}>
                    <Text style={styles.textFooter}>Total em Produto</Text>
                    <Text style={styles.textFooter}>R$ {totalProdutos}</Text>
                </View>
                <View style={styles.subFooter}>
                    <Text style={styles.textFooter}>Frete</Text>
                    <Text style={styles.textFooter}>R$ {valorFrete ? parseInt(valorFrete) : 0 }</Text>
                </View>
                <View style={styles.subFooter}>
                    <Text style={styles.textFooter}>Desconto</Text>
                    <Text style={{color:'#ff9090', fontWeight: "600"}}>-R$ {totalDescontoProdutos ? totalDescontoProdutos : 0}</Text>
                </View>
                <View style={[styles.subFooter, {marginBottom: 10}]}>
                    <Text style={[styles.textFooter,{fontSize:21}]}>Total</Text>
                    <Text style={[styles.textFooter,{fontSize:21}]}>R$ { (totalProdutos + (valorFrete ? parseInt(valorFrete) : 0)) - totalDescontoProdutos}</Text>
                </View>
                <Button
                    style={{marginHorizontal: 60}}
                    disabled={(arrayProdutos.length && pagamentoParcelado.length) ? false : true }
                    labelStyle={{fontSize: 15, fontWeight: "600"}}
                    buttonColor='white'
                    textColor="#145B91"
                    mode="contained">
                        Criar Pedido
                </Button>
            </View>
        </SafeAreaView>
    );
  };

  export default NovoPedido;
  