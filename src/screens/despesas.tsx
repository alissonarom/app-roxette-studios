import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { TDespesas, DespesasScreenPorps, TBancoCadastro, RootStackParamList, TCentrosCusto } from "../../src/types/index";
import { Button, Card, TextInput, Snackbar, ActivityIndicator, Checkbox  } from 'react-native-paper';
import { styles } from "./styles"
import { SafeAreaView } from "react-native";
import DatePicker from '../components/datePicker'
import {Picker} from '@react-native-picker/picker';
import { useRoute, RouteProp } from '@react-navigation/native';
// utils
import { truncateText, dataFormaPagamento, formatDate, formatarValor } from "../utils";

export default function Despesas({navigation}:DespesasScreenPorps) {
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    
    // centros de custo
    const [centroCusto, setCentroCusto] = useState<TCentrosCusto>();
    const [dataCentroCusto, setDataCentroCusto] = useState<TCentrosCusto[]>([]);
    //Dados pagamento
    const [nomeDespesa, setNomeDespesa] = useState('');
    //conta bancaria
    const [dataContaBancaria, setDataContaBancaria] = useState<TBancoCadastro[]>([]);
    const [contaBancaria, setContaBancaria] = useState<TBancoCadastro | null>(null);
    //Forma pagamento
    const [formaPagamento, setFormaPagamento] = useState(null);
    //data vencimento
    const [vencimento, setVencimento] = useState(new Date());
    //data emissão
    const [dataEmissao, setDataEmissao] = useState(new Date());
    //fornecedor
    const [fornecedor, setFornecedor] = useState('');
    //data pagamento
    const [dataPagamento, setDataPagamento] = useState(new Date());
    //valor baixa
    const [valorBaixa, setValorBaixa] = useState('');
    //desconto
    const [desconto, setDesconto] = useState('');
    //juros/multa
    const [jurosMulta, setJurosMulta] = useState('');
    //taxa
    const [taxa, setTaxa] = useState('');
    //observação
    const [observacao, onChangeobservacao] = useState<string>('');
    
    //route params
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { vendedor } = route.params;
    //loading
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getContaBancaria();
        getCentroCusto();
    }, []);
    //clear function
    const clearPainel = () => {
        // setNomeDespesa('');
        // setContaBancaria(null);
        // setFormaPagamento(null);
        // setCategoria('');
        // setVencimento(new Date());
        // setDataPagamento(new Date());
        // setValorBaixa(0);
        // setFornecedor('');
        // setJurosMulta(0),
        setTimeout(() => {
            navigation.navigate('Home', { vendedor: vendedor });
        }, 1000);
    };
    //GET conta bancaria
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
    const getCentroCusto = async () => {
        setLoading(true);
        const headers = {
          'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
          'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        };
        try {
          const response = await fetch('/api/centros-custo', {
            method: 'GET',
            headers,
          });
      
          const json = await response.json();

          if (json.data === "Nenhum centro de custo encontrado!") {
            setDataCentroCusto([]); // Define como uma lista vazia
          } else {
            setDataCentroCusto(json.data); // Define com os dados recebidos
          }
        } catch (error) {
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
        // setDataProdutos(dataProdutoMock);
    };
    const handleChangeTextJurosMulta = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setJurosMulta(valorFormatado)
    };
    const handleChangeTextDesconto = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setDesconto(valorFormatado)
    };
    const handleChangeTextTaxa = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setTaxa(valorFormatado)
    };
    const handleChangeTextValor = (texto: any) => {
        const valorFormatado = formatarValor(texto);
        setValorBaixa(valorFormatado)
    };
    // Função principal para criar o despesa.
    const criaNovaDespesa = async () => {
    setLoading(true);
    const despesa: TDespesas = {
        nome_conta: nomeDespesa,
        id_banco: contaBancaria ? contaBancaria.id_banco_cad : 0,
        vencimento_pag: formatDate(vencimento), // Formato "YYYY-MM-DD"
        valor_pag: parseFloat(valorBaixa), // Formato "00.00"
        valor_pago: (parseFloat(formatarValor(valorBaixa))
        - parseFloat(formatarValor(desconto))
        + parseFloat(formatarValor(taxa))
        + parseFloat(formatarValor(jurosMulta))
        || 0), // Formato "00.00"
        nome_fornecedor: fornecedor,
        data_emissao: formatDate(dataEmissao), // Corrigido para evitar caracteres especiais
        observacoes_pag: observacao,
        liquidado_pag: checked ? 'Sim' : 'Nao', // Corrigido "Não" para "Nao" sem acento
        data_pagamento: formatDate(dataPagamento), // Formato "YYYY-MM-DD"
        forma_pagamento: formaPagamento, // Ex: "Cartão"
        valor_juros: parseFloat(jurosMulta), // Formato "00.00"
        valor_taxa: parseFloat(String(taxa)), // Formato "00.00"
        valor_desconto: parseFloat(desconto),
        id_centro_custos: centroCusto?.id_centro_custos,
		centro_custos_pag: centroCusto?.desc_centro_custos,
        n_documento_pag: `${vendedor.id_vendedor}`,
        obs_pagamento: `Despesa de ${vendedor.razao_vendedor}`
    };
    
    try {
        const despesaResponse = await fetch(`/api/contas-pagar`, {
            method: 'POST',
            headers: {
                'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
                'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
            },
            body: JSON.stringify(despesa),
        });
        if (!despesaResponse.ok) {
            throw new Error('Erro ao cadastrar despesas');
        }
        const data = await despesaResponse.json();
        
        // Supondo que a data esteja em um campo chamado "data" no response
        console.log('Data do response:', data.data);
        setVisible(true);

    } catch (error) {
        console.error('Erro ao criar contas a pagar:', error);
    } finally {
        clearPainel();
    }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
            <View>
                <ActivityIndicator size={'large'} color="#145B91"/>
            </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {/* Dados do pagamento */}
                    <Text style={[styles.h3, {margin:10, fontSize: 18}]}>Dados da despesa</Text>
                    <Card mode="elevated" style={styles.cardPanel}>
                        {/*Nome da despesa, conta bancaria*/}
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                style={{ marginHorizontal: 5, width: 190, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                value={nomeDespesa}
                                onChangeText={setNomeDespesa}
                                mode="outlined"
                                label="Nome da despesa*"
                            />
                            <Picker
                                dropdownIconColor="#9E9E9E"
                                style={styles.selectPicker}
                                selectedValue={contaBancaria?.nome_banco_cad}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedItem = dataContaBancaria[itemIndex - 1];
                                    setContaBancaria(selectedItem || null);
                                } }>
                                <Picker.Item label='Conta Bancária' value='Conta Bancária' />
                                {dataContaBancaria.map((item) => {
                                    return <Picker.Item label={truncateText(item.nome_banco_cad, 17)} value={item.nome_banco_cad} key={item.id_banco_cad} />;
                                })}
                            </Picker>
                        </View>
                        {/*Centro custo, Forma pagamento*/}
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <Picker
                                dropdownIconColor="#9E9E9E"
                                placeholder="Centro de custo"
                                style={[styles.selectPicker, {height: 50,}]}
                                selectedValue={centroCusto?.desc_centro_custos}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedItem = dataCentroCusto[itemIndex - 1];
                                    setCentroCusto(selectedItem || null);
                                }}
                            >
                                <Picker.Item label="Centro de custo" />
                                {dataCentroCusto.map((item) => {
                                    return <Picker.Item label={item.desc_centro_custos} value={item.desc_centro_custos} key={item.id_centro_custos} />;
                                })}
                            </Picker>
                            <Picker
                                dropdownIconColor="#9E9E9E"
                                placeholder="Forma de pagamento"
                                style={[styles.selectPicker, {height: 50,}]}
                                selectedValue={formaPagamento}
                                onValueChange={(itemValue) => { setFormaPagamento(itemValue); } }
                            >
                                <Picker.Item label="Forma de pagamento" />
                                {dataFormaPagamento.map((item) => {
                                    return <Picker.Item label={item} value={item} key={item} />;
                                })}
                            </Picker>
                        </View>
                        {/*Vencimento, data de emissão*/}
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <View style={[styles.cardInputs, {marginHorizontal: 5}]}>
                                <Text>Vencimento*</Text>
                                <DatePicker date={vencimento} setDate={setVencimento} />
                            </View>
                            <View style={[styles.cardInputs, {marginHorizontal: 5}]}>
                                <Text>Data de emissão</Text>
                                <DatePicker date={dataEmissao} setDate={setDataEmissao} />
                            </View>
                        </View>
                        {/*Fornecedor, valor*/}
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                mode="outlined"
                                label="Forncedor*"
                                style={{ marginHorizontal: 5, flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                value={fornecedor}
                                onChangeText={setFornecedor}
                            />
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                mode="outlined"
                                style={{marginHorizontal: 5, flexShrink:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                label="Valor"
                                value={valorBaixa}
                                keyboardType="numeric"
                                onChangeText={handleChangeTextValor}
                            />
                        </View>
                        {/*checkbox pago*/}
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <Checkbox
                                color='#145B91'
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                  setChecked(!checked);
                                }}
                            />
                            <Text>Caso essa opção esteja marcada, o lançamento será criado e pago ao mesmo tempo.</Text>
                        </View>
                        { checked ?
                        //valor, juros/multa, desconto, taxa, valor pago
                        (<>
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <View style={styles.cardInputs}>
                                <Text>Data de pagamento</Text>
                                <DatePicker date={dataPagamento} setDate={setDataPagamento} />
                            </View>
                            <TextInput
                                outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Valor da baixa"
                                    style={{ marginHorizontal: 5, flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto', marginTop: 19 }}
                                    value={valorBaixa}
                                    onChangeText={handleChangeTextValor}
                                    keyboardType="numeric"
                                />
                        </View>
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <TextInput
                                outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Juros/multa"
                                    style={{ marginHorizontal: 5, flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={jurosMulta}
                                    onChangeText={handleChangeTextJurosMulta}
                                    keyboardType="numeric"
                                />
                            <TextInput
                                outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Desconto"
                                    style={{ marginHorizontal: 5, flexShrink:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                    value={desconto}
                                    onChangeText={handleChangeTextDesconto}
                                    keyboardType="numeric"
                            />
                        </View>
                        <View style={[styles.cardPanelContent, {marginVertical: 10}]}>
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                mode="outlined"
                                label="Taxa"
                                style={{ flexShrink:1, marginHorizontal: 5, flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                value={taxa}
                                onChangeText={handleChangeTextTaxa}
                                keyboardType="numeric"
                            />
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                mode="outlined"
                                label="Valor pago"
                                style={{flexShrink:1, marginHorizontal: 5, flexGrow:1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                value={String(parseFloat(formatarValor(valorBaixa))
                                    - parseFloat(formatarValor(desconto))
                                    + parseFloat(formatarValor(taxa))
                                    + parseFloat(formatarValor(jurosMulta))
                                    || 0)}
                                disabled
                            />
                        </View>
                        </>) : null}   
                        {/* Observação */}
                        <View style={[styles.cardPanelContent, {marginVertical: 10, flexDirection:'column'}]}>
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
                                    multiline
                                />
                            </View>
                    </View>                         
                    </Card>
                </ScrollView>
                )}
                <View style={styles.footer}>
                    <Button
                        style={{ marginHorizontal: 60, marginVertical:10 }}
                        disabled={!(vencimento && contaBancaria && nomeDespesa && (checked ? (checked&&valorBaixa):valorBaixa)&& fornecedor)}
                        labelStyle={{ fontSize: 15, fontWeight: "600" }}
                        buttonColor='white'
                        textColor="#145B91"
                        mode="contained"
                        onPress={criaNovaDespesa}
                    >
                        Salvar
                    </Button>
                    <Button
                        style={{ marginHorizontal: 60 }}
                        labelStyle={{ fontSize: 15, fontWeight: "600" }}
                        buttonColor='transparent'
                        textColor="white"
                        mode="outlined"
                        onPress={clearPainel}
                    >
                        Cancelar
                    </Button>
                </View>
                <Snackbar
                    style={{backgroundColor: 'green'}}
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    duration={1000}
                    >
                    Despesa criada com sucesso.
                </Snackbar>
        </SafeAreaView>
    );
  };

  