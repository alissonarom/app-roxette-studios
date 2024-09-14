import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { NovoPedidoScreenPorps } from "../../types/index";
import { Button, Card, TextInput } from 'react-native-paper';
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import datePicker from '../../components/datePicker'
import {Picker} from '@react-native-picker/picker';

const NovoPedido: React.FC<NovoPedidoScreenPorps> = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [parcelas, setParcelas] = useState("");
    // TODO criar lógica do botão de 'Adicionar' e o restante dos cards expandidos
    // TODO criar funções de requests
    // TODO criar função montar contrato do pedido
    // TODO lógica do número do pedido exclusivo
    return (
        <SafeAreaView style={styles.container}>
            <View style={{display: "flex", flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <View>
                    <Text style={[styles.title, {fontWeight: '500'}]}>Cliente</Text>
                    <Text>Fulano da Silva</Text>
                </View>
                <View>
                    <Text style={[styles.title, {fontWeight: '500'}]}>Vendedor</Text>
                    <Text>Beltrano Vendedor</Text>
                </View>
                <View>
                    <Text style={[styles.title, {fontWeight: '700'}]}>Pedido</Text>
                    <Text style={styles.h5}>00125</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {/* Produtos */}
                <Card mode="elevated" contentStyle={styles.cardPanelContent} style={styles.cardPanel}>
                    <Card.Content style={{padding: 10}}>
                        <Text style={styles.h3}>Produtos</Text>
                        <Text style={{color: "#9E9E9E"}} >Adicione um produto</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button labelStyle={{fontSize: 15, fontWeight: "600"}} textColor="#145B91" mode="text">Adicionar</Button>
                    </Card.Actions>
                </Card>
                {/* Frete */}
                <Card mode="elevated" contentStyle={styles.cardPanelContent} style={styles.cardPanel}>
                    <Card.Content style={{padding: 10}}>
                        <Text style={styles.h3}>Frete</Text>
                        <Text style={{color: "#9E9E9E"}}>Adicione o frete</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button labelStyle={{fontSize: 15, fontWeight: "600"}} textColor="#145B91" mode="text">Adicionar</Button>
                    </Card.Actions>
                </Card>
                {/* Prazo */}
                {/* TODO criar máscara para datas */}
                <Card mode="elevated" style={styles.cardPanel}>
                    <Card.Content>
                        <Text style={styles.h3}>Prazo</Text>
                        <View style={styles.cardPanelContent}>
                            <View style={styles.cardInputs}>
                                <Text>Data do pedido</Text>
                                <TextInput
                                    editable={false}
                                    style={{height: 30 }}
                                    contentStyle={{borderBottomColor: '#145B91', backgroundColor: 'white'}}
                                    placeholder={`${new Date()}`}
                                />
                            </View>
                            <View style={styles.cardInputs}>
                                <Text>Prazo de entrega</Text>
                                {datePicker()}
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                {/* Pagamento */}
                <Card mode="elevated" style={styles.cardPanel}>
                    <Card.Content>
                        <Text style={styles.h3}>Pagamento</Text>
                        <View style={styles.cardPanelContent}>
                            <View style={styles.cardInputs}>
                                <Text>Forma pagamento</Text>
                                <Picker
                                    placeholder="Selecione"
                                    style={styles.selectPicker}
                                    selectedValue={selectedLanguage}
                                    onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                    }>
                                    <Picker.Item label="Boleto" value="Boleto" />
                                    <Picker.Item label="PIX" value="PIX" />
                                    <Picker.Item label="Dinheiro" value="Dinheiro" />
                                    <Picker.Item label="Cheque" value="Cheque" />
                                    <Picker.Item label="Permuta" value="Permuta" />
                                </Picker>
                            </View>
                            <Text style={{alignContent: 'space-around'}}>ou</Text>
                            <View style={styles.cardInputs}>
                                <Text>Qtde. parcelas</Text>
                                <TextInput
                                    style={{height: 30 }}
                                    contentStyle={{borderBottomColor: '#145B91', backgroundColor: 'white'}}
                                    onChangeText={setParcelas}
                                />
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                {/* Observação */}
                {/* TODO puxar lista de cond. Pgto */}
                <Card mode="elevated" contentStyle={styles.cardPanelContent} style={styles.cardPanel}>
                    <Card.Content style={{padding: 10}}>
                        <Text style={styles.h3}>Observação</Text>
                        <Text style={{color: "#9E9E9E"}}>Adicione uma observação</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button labelStyle={{fontSize: 15, fontWeight: "600"}} textColor="#145B91" mode="text">Adicionar</Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
            {/* TODO realizar a lógica da soma */}
            <View style={styles.footer}>
                <View style={styles.subFooter}>
                    <Text>Produto</Text>
                    <Text>R$ 125,00</Text>
                </View>
                <View style={styles.subFooter}>
                    <Text>Frete</Text>
                    <Text>R$ 30,00</Text>
                </View>
                <View style={styles.subFooter}>
                    <Text>Desconto</Text>
                    <Text style={{color:'red'}}>R$ 100,00</Text>
                </View>
                <View style={styles.subFooter}>
                    <Text style={styles.h3}>Total</Text>
                    <Text style={styles.h3}>R$ 1500,00</Text>
                </View>
            <Button
             style={{marginHorizontal: 40, marginTop: 10}}
             disabled={false}
             labelStyle={{fontSize: 15, fontWeight: "600"}}
             buttonColor='#145B91'
             textColor="white"
             mode="contained">
                Criar Pedido
            </Button>
            </View>
            {/* TODO criar lógica disabled */}
    </SafeAreaView>
    );
  };

  export default NovoPedido;
  