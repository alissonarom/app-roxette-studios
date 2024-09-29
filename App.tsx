import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from './src/screens/login'
import Cliente from './src/screens/cliente'
import Vendedor from './src/screens/vendedor'
import Tabs from './src/painel'
import { RootStackParamList } from './src/types';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Vendedor'>
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> */}
        <Stack.Screen name='Vendedor' component={Vendedor} options={{headerShown: false}}/>
        <Stack.Screen name='Cliente' component={Cliente} options={{headerShown: false}}/>
         <Stack.Screen name='Painel' component={Tabs} options={{title: 'Painel do Pedido'}}/>
        {/* <Stack.Screen name="CadastroCliente" component={CadastroCliente} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
