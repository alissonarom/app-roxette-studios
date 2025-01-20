import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

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
        <TouchableOpacity
          style={[styles.button, { marginTop: 'auto', backgroundColor: 'rgb(156 74 76)'}]}
          onPress={handleSignIn}
        >
          <Text style={styles.texth2}>Preencher Anamnese</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  };

