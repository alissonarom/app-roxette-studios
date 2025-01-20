import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Switch } from "react-native";
import { RootStackParamList } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { styles } from "../styles/styles";

export default function Servicos({ navigation }: any) {
  const route = useRoute<RouteProp<RootStackParamList, 'Servicos'>>();
  const { cliente } = route.params;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Lista de serviços para exibir switches dinamicamente
  const services = [
    "Extensão de cílios",
    "Lash Lifting",
    "Design de Sobrancelhas",
    "Depilação Facial"
  ];

  // Função para alternar o valor do switch e atualizar o array de serviços selecionados
  const toggleSwitch = (service: string, value: boolean) => {
    setSelectedServices((prevSelected) => {
      if (value) {
        // Adiciona o serviço ao array
        return [...prevSelected, service];
      } else {
        // Remove o serviço do array
        return prevSelected.filter((s) => s !== service);
      }
    });
  };

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
        <Text style={[styles.texth1, { marginBottom: 100, color: '#ffe7db' }]}>
          Perfeito, {cliente.nome.split(' ')[0]}!
        </Text>
        <Text style={[styles.texth1, { marginBottom: 100, color: '#ffe7db' }]}>
          Agora escolha quais serviços você pretende fazer nesta sessão
        </Text>

        {/* Renderiza switches dinamicamente */}
        {services.map((service) => (
          <View key={service} style={styles.switchContainer}>
            <Switch
              trackColor={{ false: 'white', true: 'rgb(199, 170, 154)' }}
              thumbColor={selectedServices.includes(service) ? 'blue' : 'grey'}
              onValueChange={(value) => toggleSwitch(service, value)}
              value={selectedServices.includes(service)}
            />
            <Text style={[styles.texth2Form, { marginLeft: 40 }]}>
              {service}
            </Text>
          </View>
        ))}
        <TouchableOpacity
          disabled={selectedServices.length === 0} // Desabilita se nenhum serviço foi selecionado
          style={[styles.button, { marginTop: 'auto', backgroundColor: selectedServices.length === 0 ? 'grey' : 'rgb(156 74 76)', opacity: selectedServices.length === 0 ? 0.2 : 1}]}
          onPress={handleNext}
        >
          <Text style={styles.texth2}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
