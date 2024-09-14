import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { ClienteScreenProps } from '../types';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { ClienteResponse } from '../types';

var {width} = Dimensions.get('window');

export default function Cliente({route, navigation}:ClienteScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<ClienteResponse[]>([]);

  const getClientes = async () => {
    try {
      const response = await fetch('https://api.vhsys.com/v2/clientes', {
        method: 'GET',
        headers: {
          'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
          'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        },
      });
      console.log('response', response);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  function handleSignIn() {
    return navigation.navigate("Painel")
  }

  useEffect(() => {
    getClientes();
  }, []);
      
    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={styles.tinyLogo}
          source={require('../../assets/logo-efrata.png')}
        />
        <Text style={styles.text} >Selecione ou cadastre um cliente</Text>      
        <Picker
          style={styles.selectPicker}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
          <Picker.Item label="Fulano da Silva" value="Fulano da Silva" />
          <Picker.Item label="Beltrano Junior" value="Beltrano Junior" />
        </Picker>
        <Button style={styles.button} buttonColor="#1F88D9" mode="contained" onPress={handleSignIn}>
          Avançar
        </Button>
        <Button style={styles.button} textColor="white" mode="text" onPress={() => console.log('Pressed')}>
          Cadastrar
        </Button>
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
  