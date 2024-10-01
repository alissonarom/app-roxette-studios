import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { ClienteScreenProps, RootStackParamList } from '../types';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { TClienteResponse } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { dataClientes } from '../Mocks/produtoMock';

var {width} = Dimensions.get('window');

export default function Cliente({navigation}:ClienteScreenProps) {
  const [client, setClient] = useState<TClienteResponse>();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<TClienteResponse[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'Cliente'>>();
  const { vendedor } = route.params || {};

  const getClientes = async () => {
    const headers = {
      'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
      'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    };
    try {
      const response = await fetch('/api/clientes', {
        method: 'GET',
        headers,
      });
  
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
    // setData(dataClientes);
    setLoading(false);
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
            <Picker.Item label='Clientes' value='Clientes' />
          {data.map((item) => {
            return <Picker.Item label={item.razao_cliente} value={item.razao_cliente} key={item.id_cliente} />
          })}
        </Picker>
        <Button style={styles.button} buttonColor="#1F88D9" mode="contained" onPress={handleSignIn}>Avançar</Button>
        <Button style={styles.button} textColor="white" mode="text" onPress={() => console.log('Pressed')}>Cadastrar</Button>
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
      marginHorizontal: 30
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
  