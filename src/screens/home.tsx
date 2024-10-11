import React from 'react';
import { View, StyleSheet,Text } from "react-native";
import { HomeScreenProps, RootStackParamList } from '../types';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';

export default function Home({navigation}:HomeScreenProps) {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { vendedor } = route.params || {};

  function handleClienteScreen() {
    if(vendedor){
      return navigation.navigate('Cliente', {vendedor: vendedor})
    }
  }

  function handleDespesasScreen() {
    if(vendedor){
      return navigation.navigate('Despesas', {vendedor: vendedor})
    }
  }
      
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Olá {vendedor ? vendedor.razao_vendedor.split(' ')[0] : ''}!</Text>
        <View style={styles.container}>
          <Card onPress={() => {handleClienteScreen()}} mode='contained' style={{backgroundColor: 'white', marginVertical: 10}}>
            <Card.Title
              title="Iniciar venda"
              titleVariant={'titleLarge'}
              leftStyle={{backgroundColor:'white'}}
              titleStyle={{color:'#145B91'}}
              left={(props) => <Avatar.Icon {...props} icon="account-check" style={{backgroundColor: '#145B91'}} color='white'/>}
            />
          </Card>
          <Card onPress={() => {handleDespesasScreen()}} mode='contained' style={{backgroundColor: 'white', marginVertical: 10}}>
            <Card.Title
              title="Lançar despesas"
              titleVariant={'titleLarge'}
              leftStyle={{backgroundColor:'white'}}
              titleStyle={{color:'#145B91'}}
              left={(props) => <Avatar.Icon {...props} icon="account-arrow-down" style={{backgroundColor: '#145B91'}} color='white'/>}
            />
          </Card>
        </View>
      </View>
    );
  };

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 32,
      backgroundColor: "#145B91"
    },
    text: {
      fontSize: 20,
      color: "white",
      marginVertical: 15,
      textAlign: 'center'
    },
  })
  