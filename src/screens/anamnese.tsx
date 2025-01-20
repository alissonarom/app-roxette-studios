import React, {useState} from 'react';
import { View, ImageBackground, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { RootStackParamList } from '../types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { styles } from "../styles/styles";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

export default function Anamnese({ navigation}:any) {
  const route = useRoute<RouteProp<RootStackParamList, 'Anamnese'>>();
  // Estado para os switches de cada pergunta
  const [respostas, setRespostas] = useState<any>({});

  const { cliente, selectedServices } = route.params;
  
  const handleSelectChange = (servico: string, pergunta: string, selectedValues: string[]) => {
    setRespostas((prev: any) => ({
      ...prev,
      [servico]: {
        ...prev[servico],
        [pergunta]: selectedValues,
      },
    }));
  };
  
  const perguntasPorServico:any = {
    'Extensão de cílios': [
      {
        tipo: 'composta',
        content: 'Você já realizou este procedimento antes? Se sim, quando foi a última vez?',
        boolean: [
          {
            id: 0,
            text: 'não',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 1,
            text: '1 mês',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 3,
            text: '3 meses',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 4,
            text: 'séculos😲',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        ],
      },
      { tipo: 'boolean', content: 'Está de rímel?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'boolean', content: 'Usa lentes de contato?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'boolean', content: 'Fez algum procedimento recentemente nos olhos?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'justificada', content: 'Possui alergia à esmaltes, cosméticos ou cianocrilato? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }], },
      { tipo: 'boolean', content: 'Possui problema de tireóide?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'justificada', content: 'Possui glaucoma, blefarite ou algum outro problema ocular? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }], },
      { tipo: 'composta', content: 'Dorme de lado? Se sim, qual lado?', boolean: [{
        id: 0,
        text: 'não',
        fillColor: '#ff6961',
        unFillColor: '#edbad1',
        textStyle: {textDecorationLine: 'none', color: 'white'},
        style: {marginRight: 20, marginVertical: 15}
        },{
          id: 1,
          text: 'esquerdo',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
        },{
          id: 2,
          text: 'direito',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
        },] },
      {
        tipo: 'multipla-escolha',
        content: 'Tem preferência por qual estilo?',
        boolean: [
          {
            id: 0,
            text: 'natural',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 1,
            text: 'glamuroso',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 2,
            text: 'volumoso',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        }
        ],
      },
      {
        tipo: 'justificada',
        content: 'Existe algum problema que julgue ser necessário informar ao profissional antes do procedimento? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }], },
    ],
    'Depilação Facial': [
      {
        tipo: 'composta',
        content: 'Já fez depilação facial antes? Se sim, qual método foi utilizado?',
        boolean: [
          {
            id: 0,
            text: 'cera',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 1,
            text: 'linha',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 2,
            text: 'creme depilatório',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        }
        ]
      },
      { tipo: 'justificada', content: 'Tem alguma alergia conhecida a produtos de beleza? Se sim, indique quais? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }],
      condicional: 'Lash Lifting' },
      { tipo: 'justificada', content: 'Tem alguma condição de pele (ex.: rosácea, acne)? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }], condicional: 'Design de Sobrancelhas' },
      { tipo: 'justificada', content: 'Usa algum tratamento dermatológico no rosto (ex.: ácidos, peelings)? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }], },
    ],
    'Lash Lifting': [
      {
        tipo: 'composta',
        content: 'Já fez lash lifting antes? Se sim, quando foi a última vez?',
        boolean: [
          {
            id: 0,
            text: 'Não',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
          },
          {
            id: 1,
            text: '1 mês',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
          },
          {
            id: 2,
            text: 'uns 3 meses',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
          },
          {
            id: 3,
            text: 'séculos😲',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
          }
      ]
      },
      { tipo: 'boolean', content: 'Está usando algum produto que altera a curvatura dos cílios?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'justificada', content: 'Tem alguma alergia conhecida a produtos de beleza? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }],
      condicional: 'Extensão de cílios' },
      { tipo: 'boolean', content: 'Usa lentes de contato?', condicional: 'Extensão de cílios', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      },
      {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }
      ] },
      { tipo: 'justificada', content: 'Possui glaucoma, blefarite ou algum outro problema ocular? Se sim, preencha o campo abaixo?', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }] },
    ],
    'Design de Sobrancelhas': [
      {
        tipo: 'composta',
        content: 'Já fez design de sobrancelhas anteriormente? Se sim, qual método foi utilizado?',
        boolean: [
          {
            id: 0,
            text: 'pinça',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 1,
            text: 'cera',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
        {
            id: 2,
            text: 'linha',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        }
        ]
      },
      { tipo: 'justificada', content: 'Possui alergia a algum tipo de tinta ou henna? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }] },
      { tipo: 'justificada', content: 'Tem alguma condição de pele (ex.: rosácea, acne)? Se sim, preencha o campo abaixo', boolean: [
        {
          id: 0,
          text: 'Não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
      }]},
      { tipo: 'boolean', content: 'Usa maquiagem diariamente nas sobrancelhas?', boolean: [
        {
          id: 0,
          text: 'não',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
        }, 
        {
          id: 1,
          text: 'sim',
          fillColor: '#ff6961',
          unFillColor: '#edbad1',
          textStyle: {textDecorationLine: 'none', color: 'white'},
          style: {marginRight: 20, marginVertical: 15}
        }] },
      {
        tipo: 'multipla-escolha',
        content: 'Tem preferência por qual estilo?',
        boolean: [
          {
            id: 0,
            text: 'arqueada',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
          {
            id: 1,
            text: 'reta',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
          {
            id: 2,
            text: 'natural',
            fillColor: '#ff6961',
            unFillColor: '#edbad1',
            textStyle: {textDecorationLine: 'none', color: 'white'},
            style: {marginRight: 20, marginVertical: 15}
        },
    ],
    }]};

  const handleConcluir = () => {
    navigation.navigate('Confirmar', { respostas });
  };
  
    return (
      <ImageBackground
        source={require('../../assets/image-background-home.png')} // Substitua pelo caminho da sua imagem
        style={styles.backgroundImage}
      >
      <View style={styles.container}>
        <Text style={[styles.texth1, { marginBottom: 50, color: '#ffe7db' }]}>
          Muito bom!
        </Text>
        <Text style={[styles.texth1, { marginBottom: 50, color: '#ffe7db', fontSize: 30 }]}>
          Agora que eu sei que você quer fazer {selectedServices.map((service: any, index: any) => (
            <Text style={[styles.texth1, { marginBottom: 100, color: '#ffe7db' }]} key={index}>
              {service}
              {index < selectedServices.length - 1 ? ' e ' : ''}
            </Text>
          ))}
        </Text>
        <ScrollView>
        {Object.keys(perguntasPorServico).map((servico) => (
          <View key={servico}>
            <Text style={styles.servicoTitle}>{servico}</Text>
            {perguntasPorServico[servico].map((pergunta: any, index: any) => (
              <View key={`${servico}-${index}`} style={styles.perguntaContainer}>
                <Text style={styles.pergunta}>{pergunta.content}</Text>
                {(pergunta.tipo === 'boolean' || pergunta.tipo === 'composta' || pergunta.tipo === 'multipla-escolha') && (
                  <BouncyCheckboxGroup
                    data={pergunta.boolean}
                    onChange={(selectedItem: any) => {
                      handleSelectChange(
                        servico,
                        pergunta.content,
                        [selectedItem.text] // Captura o texto da opção selecionada
                      );
                    }}
                  />
                )}

                {/* Renderização para perguntas justificadas */}
                {pergunta.tipo === 'justificada' && (
                  <><BouncyCheckboxGroup
                    data={pergunta.boolean}
                    onChange={(selectedItem: any) => {
                      handleSelectChange(
                        servico,
                        pergunta.content,
                        [selectedItem.text] // Captura o texto da opção selecionada
                      );
                    } } /><TextInput
                      style={styles.textInput}
                      placeholder="Se sim , justifique..."
                      placeholderTextColor='#9f9f9f'
                      onChangeText={(text) => setRespostas((prev: any) => ({
                        ...prev,
                        [servico]: {
                          ...prev[servico],
                          [pergunta.content]: text,
                        },
                      }))} /></>
                )}
              </View>
            ))}
          </View>
        ))}

      </ScrollView>
        <TouchableOpacity disabled={false} style={[styles.button, {marginTop: 'auto', backgroundColor: 'rgb(156 74 76)', opacity: 1}]} onPress={handleConcluir}><Text style={styles.texth2}>Concluir questionário</Text></TouchableOpacity>
      </View>
      </ImageBackground>
    );
  };