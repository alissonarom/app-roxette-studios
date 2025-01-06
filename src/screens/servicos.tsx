import React, {useState} from 'react';
import { View, ImageBackground, TouchableOpacity, Switch } from "react-native";
import { RootStackParamList } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { styles } from "../styles/styles";

export default function Servicos({ navigation}:any) {
  const route = useRoute<RouteProp<RootStackParamList, 'Servicos'>>();
  const { cliente } = route.params;
  const [nome, onChangeNome] = useState('');
  const [niver, onChangeNiver] = useState('');
  const [cidade, onChangecidade] = useState('');
  const [cel, onChangeCel] = useState('');
  const [instagram, onChangeInstagram] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function handleSignIn() {
    return navigation.navigate('Servicos')
  }
  
    return (
      <ImageBackground
        source={require('../../assets/image-background-home.png')}
        style={styles.backgroundImage}
      >
      <View style={styles.container}>
        <Text style={[styles.texth1, {marginBottom: 100, color: '#ffe7db'}]}>Perfeito, {cliente.nome.split(' ')[0]}!</Text>
        <Text style={[styles.texth1, {marginBottom: 100, color: '#ffe7db'}]}>Agora escolha quais serviços você pretende fazer nesta sessão</Text>
        <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: 'white', true: 'rgb(199, 170, 154)'}}
              thumbColor={isEnabled ? 'blue' : 'grey'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.texth2Form, {marginLeft: 40}]}>Extenção de cílios</Text>
        </View>
        <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: 'white', true: 'rgb(199, 170, 154)'}}
              thumbColor={isEnabled ? 'blue' : 'grey'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.texth2Form, {marginLeft: 40}]}>Lash Lifting</Text>
        </View>
        <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: 'white', true: 'rgb(199, 170, 154)'}}
              thumbColor={isEnabled ? 'blue' : 'grey'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.texth2Form, {marginLeft: 40}]}>Design de Sobrancelhas</Text>
        </View>
        <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: 'white', true: 'rgb(199, 170, 154)'}}
              thumbColor={isEnabled ? 'blue' : 'grey'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.texth2Form, {marginLeft: 40}]}>Depilação Facial</Text>
        </View>
        <TouchableOpacity disabled={!(cel && nome)} style={[styles.button, {marginTop: 'auto'}]} onPress={handleSignIn}>Avançar</TouchableOpacity>
      </View>
      </ImageBackground>
    );
  };