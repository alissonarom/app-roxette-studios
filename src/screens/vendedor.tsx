import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { VendedorScreenPorps } from '../types';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { TVendedorResponse } from '../types';
import { headers } from "../utils";

var {width} = Dimensions.get('window');

export default function Vendedor({route, navigation}:VendedorScreenPorps) {
  const [vendedor, setVendedor] = useState<TVendedorResponse>();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<TVendedorResponse[]>([]);

  const getVendedores = async () => {
    try {
      const response = await fetch('/api/vendedores', {
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
    // setData(dataVendedor)
    setLoading(false);
  };

  function handleSignIn() {
    if(vendedor){
      return navigation.navigate('Cliente', { vendedor: vendedor})
    }
  }

  useEffect(() => {
    getVendedores();
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
        <Text style={styles.text}>Para iniciar selecione o vendedor</Text>
        <Picker
          style={styles.selectPicker}
          selectedValue={vendedor?.razao_vendedor}
          onValueChange={(itemValue, itemIndex) => {
            const selectedItem = data[itemIndex - 1];
            setVendedor(selectedItem || null);
        }}>
            <Picker.Item label='Selecione um vendedor' value='Selecione um vendedor' />
          {data.map((item) => {
            return <Picker.Item label={item.razao_vendedor} value={item.razao_vendedor} key={item.id_vendedor} />
          })}
        </Picker>
        <Button style={styles.button} buttonColor="#1F88D9" mode="contained" onPress={handleSignIn}>Iniciar</Button>
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
  