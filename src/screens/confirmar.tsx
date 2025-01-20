import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Switch } from "react-native";
import { RootStackParamList } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { styles } from "../styles/styles";

export default function Confirmar({ navigation }: any) {
  const route = useRoute<RouteProp<RootStackParamList, 'Servicos'>>();
  const { cliente } = route.params;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Função para navegar para a próxima página
  const handleNext = () => {
    console.log('selectedServices', selectedServices)
    navigation.navigate('Anamnese', {
      cliente, // Valores do cliente vindos da página anterior
      selectedServices // Array de serviços selecionados
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/image-background-home.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={[styles.texth1, { marginBottom: 50, color: '#ffe7db' }]}>
          Para finalizar, leia com atenção os termos de conscentimento e, se você concorda, assine para finalizar sua anamnese.
        </Text>
        <Text style={[styles.texth2Form, { marginLeft: 40 }]}>
          Autorizo a realização do procedimento de 
          {selectedServices.map((service: any, index: any) => (
            <Text style={[styles.texth2Form, { marginLeft: 40 }]} key={index}>
              {service}
              {index < selectedServices.length - 1 ? ' e ' : '.'}
            </Text>
          ))}. Autorizo o registro fotográfico do 'antes' e 'depois', para documentação e divulgação da profissional. As declarações acima são verdadeiras, não cabendo ao profissional a responsabilidade por informações omitidas nesta avaliação. Me comprometo a seguir todos os cuidados necessários após o procedimento
        </Text>
      </View>
      <TouchableOpacity
        disabled={selectedServices.length === 0} // Desabilita se nenhum serviço foi selecionado
        style={[styles.button, { marginTop: 'auto', backgroundColor: selectedServices.length === 0 ? 'grey' : 'rgb(156 74 76)', opacity: selectedServices.length === 0 ? 0.2 : 1}]}
        onPress={handleNext}
      >
        <Text style={styles.texth2}>Finalizar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
