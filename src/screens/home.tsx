import React, {useState} from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { styles } from "../styles/styles";

export default function Home({ navigation}:any) {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const [nome, onChangeNome] = useState('');
  const [niver, onChangeNiver] = useState('');
  const [cidade, onChangecidade] = useState('');
  const [cel, onChangeCel] = useState('');
  const [instagram, onChangeInstagram] = useState('');

  function handleSignIn() {
    const cliente = { nome: nome, niver: niver, cidade: cidade, cel: cel, instagram: instagram, };
    return navigation.navigate('Servicos', { cliente: cliente });
  }
  
    return (
      <ImageBackground
        source={require('../../assets/image-background-home.png')} // Substitua pelo caminho da sua imagem
        style={styles.backgroundImage}
      >
      <View style={styles.container}>
        {/* <View>
          <Image
            resizeMode='contain'
            style={styles.tinyLogo}
            source={require('../../assets/Roxy-avatar-oi.png')}
          />
          </View> */}
        <Text style={[styles.texth1, {marginBottom: 100, color: '#ffe7db'}]}>Para te conhecermos melhor vamos começar pelo básico!</Text>
        <Text style={styles.texth2Form}>Nome *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#00000069', color: 'rgb(109 109 109)', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 16}]}
          onChangeText={onChangeNome}
          value={nome}
          placeholder="Seu nome completo"
        />
        <View style={[{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop: 20}]}>
          <View style={{flexGrow:1}}>
            <Text style={styles.texth2Form}>Aniversário</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#00000069', color: 'rgb(109 109 109)', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 16}]}
              onChangeText={onChangeNiver}
              value={niver}
              placeholder="Data do seu aniversário"
              keyboardType='numeric'
            />
          </View>
          <View style={{flexGrow:3, marginLeft: 20}}>
            <Text style={styles.texth2Form}>Cidade</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#00000069', color: 'rgb(109 109 109)', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 16}]}
              onChangeText={onChangecidade}
              value={cidade}
              placeholder="A cidade onde vc mora"
            />
          </View>
        </View>
        <View style={[{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop: 20}]}>
          <View style={{flexGrow:1}}>
            <Text style={styles.texth2Form}>Whatsapp *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#00000069', color: 'rgb(109 109 109)', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 16}]}
              onChangeText={onChangeCel}
              value={cel}
              placeholder="(43) 9 0000-0000"
              keyboardType='numeric'
            />
          </View>
          <View style={{flexGrow:3, marginLeft: 20}}>
            <Text style={styles.texth2Form}>Instagram</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#00000069', color: 'rgb(109 109 109)', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 16}]}
              onChangeText={onChangeInstagram}
              value={instagram}
              placeholder="seu.instagram"
            />
          </View>
        </View>
        <TouchableOpacity disabled={!(cel && nome)} style={[styles.button, {marginTop: 'auto'}]} onPress={handleSignIn}>Avançar</TouchableOpacity>
      </View>
      </ImageBackground>
    );
  };