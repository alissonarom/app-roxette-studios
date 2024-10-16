import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { ClienteScreenProps, RootStackParamList } from '../types';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { TClienteResponse } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';

var {width} = Dimensions.get('window');

export default function Cliente({navigation}:ClienteScreenProps) {
  const [client, setClient] = useState<TClienteResponse>();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<TClienteResponse[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'Cliente'>>();
  const { vendedor } = route.params || {};

  function handleDespesasScreen() {
    if(vendedor){
      return navigation.navigate('Despesas', {vendedor: vendedor})
    }
  } 

  function changeCliente() {
      return navigation.navigate('Vendedor')
  } 

  const getClientes = async () => {
    setLoading(true);
    const headers = {
      'access-token': 'UHUUVNLSbSSbCbIUMdAaMADRPfaYab',
      'secret-access-token': 'W8J1kLAGNDlIwzPkaM2Ht78Mo4h7MG',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    };
    
    let allClientes: TClienteResponse[] = [];
    let offset = 0;
    const limit = 50; // Definindo um limite de 50 clientes por página (ajustável conforme necessidade)
  
    try {
      let hasMore = true;
      
      // Continuar enquanto houver mais páginas
      while (hasMore) {
        const response = await fetch(`/api/clientes?offset=${offset}&limit=${limit}`, {
          method: 'GET',
          headers,
        });
  
        const json = await response.json();
        
        // Adicionar clientes da página atual ao array total
        allClientes = [...allClientes, ...json.data];
  
        // Verificar se há mais clientes para buscar
        const { total, offset: currentOffset, total_count } = json.paging;
        offset = currentOffset + total_count;
  
        // Se o total de clientes obtidos for igual ao total disponível, parar a busca
        hasMore = allClientes.length < total;
      }
  
      // Filtrar clientes que têm o vendedor_cliente_id igual ao id_vendedor
      // let clientesFiltrados = allClientes.filter((cliente) => cliente.vendedor_cliente_id === vendedor.id_vendedor);

      // Ordenar clientes filtrados em ordem alfabética (por nome do cliente)
      const clientesFiltrados = allClientes.sort((a, b) =>
      a.razao_cliente.localeCompare(b.razao_cliente)
    );
      
      setData(clientesFiltrados); // Definir o estado apenas com os clientes filtrados
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };
  
  function handleSignIn() {
    if(client){
      return navigation.navigate('Painel', { cliente: client, vendedor: vendedor})
    }
  }

  useEffect(() => {
    getClientes();
  }, []);
      
    return (
      <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        <Image
          resizeMode='contain'
          style={styles.tinyLogo}
          source={require('../../assets/logo-no-background.png')}
        />
        <Text style={styles.text}>Olá {vendedor ? vendedor.razao_vendedor.split(' ')[0] : ''}!</Text>
        <Text style={styles.text}>Selecione um cliente</Text>
        <Picker
          style={styles.selectPicker}
          selectedValue={client?.razao_cliente}
          onValueChange={(itemValue, itemIndex) => {
            const selectedItem = data[itemIndex - 1];
            setClient(selectedItem || null);
        }}>
            <Picker.Item label='Clientes' value='Clientes' style={{fontSize:12}} />
          {data.map((item) => {
            return <Picker.Item label={item.razao_cliente} value={item.razao_cliente} key={item.id_cliente} />
          })}
        </Picker>
        <Button style={styles.button} buttonColor="#1F88D9" mode="contained" onPress={handleSignIn}>Avançar</Button>
        <Button style={[styles.button, {borderColor:"white", marginVertical: 0}]} textColor="white" mode="outlined" onPress={handleDespesasScreen}>Lançar despesas</Button>
        <Button style={styles.button} textColor="white" mode="text" onPress={changeCliente}>Trocar de vendedor</Button>
        </>)}
      </View>
    );
  };

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 32,
      backgroundColor: "#145B91"
    },
    input: {
      height: 54,
      width: "100%",
      backgroundColor: "#E3E3E3E3",
      borderRadius: 5,
      padding: 16,
    },
    button: {
      height: 50,
      borderRadius: 5,
      justifyContent: "center",
      marginHorizontal: 20,
      marginVertical:10
    },
    text: {
      fontSize: 20,
      color: "white",
      marginVertical: 15,
      textAlign: 'center'
    },
    selectPicker: {
      backgroundColor: 'white',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    tinyLogo: {
      width: width * 0.5,
      height: 200,
      alignSelf: 'center'
    },
  })
  