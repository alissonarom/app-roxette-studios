import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Button } from 'react-native-paper';

var {width} = Dimensions.get('window');

export default function Welcome({ navigation}:any) {

  function handleSignIn() {
    return navigation.navigate('Home')
  }
      
    return (
      <ImageBackground
      source={require('../../assets/image-background-welcome.png')} // Substitua pelo caminho da sua imagem
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={styles.tinyLogo}
          source={require('../../assets/logo-white-bg-transparente.png')}
        />
        <Text style={styles.texth1}>Bem-vinda!</Text>
        <Text style={styles.texth2}>É um prazer tê-la aqui! 💕</Text>
        <Button style={styles.button} buttonColor="rgb(156 74 76)" mode="contained" labelStyle={{fontSize:30}} onPress={handleSignIn}>PREENCHER ANAMNESE</Button>
      </View>
      </ImageBackground>
    );
  };

export const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 80,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    input: {
      height: 54,
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 16,
    },
    button: {
      height: 80,
      borderRadius: 5,
      justifyContent: "center",
      margin: 30,
    },
    texth3: {
      fontSize: 23,
      color: "white",
      marginVertical: 15,
      textAlign: 'center',
    },
    texth2: {
      fontSize: 30,
      color: "white",
      marginVertical: 15,
      textAlign: 'center',
    },
    texth1: {
      fontSize: 40,
      color: "white",
      marginVertical: 15,
      textAlign: 'center',
    },
      tinyLogo: {
      width: width * 0.5,
      height: 200,
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 300,
    },
  })
  