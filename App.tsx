import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/login'
import Cliente from './src/screens/cliente'
import Tabs from './src/painel'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Cliente" component={Cliente} options={{headerShown: false}}/>
         <Stack.Screen name="Painel" component={Tabs} />
        {/* <Stack.Screen name="CadastroCliente" component={CadastroCliente} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
