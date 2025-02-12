import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
    // Login: any;
    Home: any;
    Servicos: { cliente: any};
    Anamnese: { cliente: any, selectedServices: any};

};

export type HomeScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'Home'
>;

export type ServicosScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'Servicos'
>;

export type AnamneseScreenProps = NativeStackScreenProps<
 RootStackParamList,
 'Anamnese'
>;

  