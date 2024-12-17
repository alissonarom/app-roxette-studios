import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { BaixaScreenPorps, RootStackParamList } from "../../src/types/index";
import { Button, Card, TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import { styles } from "./styles"
import { SafeAreaView } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';
// utils
import { headers } from "../utils";

export default function Baixa({navigation}:BaixaScreenPorps) {
    const [dataNota, setDataNota] = useState<any>();
    const [visibleOk, setVisibleOk] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [visibleErrorPedido, setVisibleErrorPedido] = useState(false);
    const [numberNota, setNumberNota] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    //observação
    const [checked, setChecked] = useState(false);
    
    //route params
    const route = useRoute<RouteProp<RootStackParamList, 'Pedido'>>();
    const { vendedor, cliente } = route.params;
    //loading
    const [isLoading, setLoading] = useState(false);
    const [isLoadingConfirm, setLoadingConfirm] = useState(false);

    //clear function
    const clearPainel = () => {
        setTimeout(() => {
            navigation.navigate('Home', { cliente: cliente, vendedor: vendedor });
        }, 2000);
    };

    const getNota = async () => {
        setLoading(true);
        try {
            const getNotas = await fetch(`/api/notas-fiscais`,{
                method: 'GET',
                headers,
            });
          
            const json = await getNotas.json();
            
            const notasFiltradas = json.data.filter((pedido: any) => 
                pedido.id_pedido == numberNota
            );

            if (!getNotas.ok) {
                setVisibleErrorPedido(!visibleErrorPedido)
                throw new Error('Erro ao Buscar Notas');
            };

            setDataNota(notasFiltradas);
            setChecked(true);

        } catch (error) {
            console.error('Erro:', error);
          } finally {
            setLoading(false);
          }
    }

    const putPedido = async () => {
        const pedidoAtualizado = {
            prazo_entrega: new Date().toISOString().split('T')[0],
            obs_interno_pedido: `Pedido entregue nota ${dataNota[0].id_venda}, data: ${new Date().toISOString().split('T')[0]}`,
            status_pedido: 'Atendido'
        };
        setLoadingConfirm(true);
        try {
            const putPedido = await fetch(`/api/pedidos/${dataNota[0].id_pedido_ref}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(pedidoAtualizado),
            });
    
            if (putPedido.status !== 200) { // Verificação ajustada para comparar o status com 200
                setVisibleError(!visibleError);
                const errorMessage = await putPedido.text();
                setErrorMessage(errorMessage);
                setLoadingConfirm(false);
                throw new Error('Erro ao atualizar Pedido');
            };
            setVisibleOk(!visibleOk);
            clearPainel();
    
        } catch (error) {
            console.error('Erro:', error);
            setVisibleError(!visibleError);
        } finally {
            setLoadingConfirm(false);
        };
    };
    
    const handleChangeNumberNota = (numeroNota: any) => {
        setNumberNota(numeroNota)
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Card mode="elevated" style={styles.cardPanel}>
                    <View style={[styles.cardPanelContent, { marginVertical: 10, justifyContent: 'space-between' }]}>
                        <View style={{ marginVertical: 10, display: "flex", flexDirection: 'row', flexWrap: "nowrap" }}>
                            <TextInput
                                outlineColor='#145B91'
                                activeOutlineColor='#145B91'
                                style={{ marginHorizontal: 5, width: 190, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto' }}
                                value={numberNota}
                                onChangeText={handleChangeNumberNota}
                                mode="outlined"
                                keyboardType="numeric"
                                label="Digite o numero da nota" />
                                <Button
                                    style={{ marginVertical: 10 }}
                                    disabled={!numberNota}
                                    labelStyle={{ fontSize: 15, fontWeight: "600" }}
                                    buttonColor='#145B91'
                                    textColor='white'
                                    mode="contained"
                                    onPress={() => getNota()}
                                    loading={isLoading}>
                                    Buscar Nota
                                </Button>
                        </View>
                    </View>
                    {checked ?
                        (<>
                            <View style={[styles.cardPanelContent, { marginVertical: 10, display: "flex", flexDirection: 'column', flexWrap: "nowrap" }]}>
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Valor total da nota"
                                    style={{ marginHorizontal: 5, flexGrow: 1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto', marginTop: 19 }}
                                    value={`R$ ${dataNota[0].valor_total_nota}`}
                                    disabled />
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Cliente"
                                    style={{ marginHorizontal: 5, flexGrow: 1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto', marginTop: 19 }}
                                    value={dataNota[0].nome_cliente}
                                    disabled />
                                <TextInput
                                    outlineColor='#145B91'
                                    activeOutlineColor='#145B91'
                                    mode="outlined"
                                    label="Data do pedido"
                                    style={{ marginHorizontal: 5, flexGrow: 1, backgroundColor: 'white', fontSize: 14, fontFamily: 'Roboto', marginTop: 19 }}
                                    value={dataNota[0].data_pedido}
                                    disabled />
                            </View>
                        </>) : null}
                </Card>
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    style={{ marginHorizontal: 60, marginVertical: 10 }}
                    disabled={!checked}
                    labelStyle={{ fontSize: 15, fontWeight: "600" }}
                    buttonColor='white'
                    textColor="#145B91"
                    mode="contained"
                    onPress={() => checked ? putPedido() : getNota()}
                    loading={isLoadingConfirm}>
                    Confirmar Entrega
                </Button>
            </View>
            <Snackbar
                style={{ backgroundColor: 'green' }}
                visible={visibleOk}
                onDismiss={() => setVisibleOk(false)}
                duration={3000}
            >
                Entrega confirmada com sucesso.
            </Snackbar>
            <Snackbar
                style={{ backgroundColor: 'red' }}
                visible={visibleError}
                onDismiss={() => setVisibleError(false)}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
            <Snackbar
                style={{ backgroundColor: 'red' }}
                visible={visibleErrorPedido}
                onDismiss={() => setVisibleErrorPedido(false)}
                duration={3000}
            >
                Erro ao Buscar Nota!
            </Snackbar>
        </SafeAreaView>
    );
  };

  