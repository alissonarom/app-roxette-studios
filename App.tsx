import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from './src/screens/login'
import Cliente from './src/screens/cliente'
import Vendedor from './src/screens/vendedor'
import Home from './src/screens/home';
import Despesas from './src/screens/despesas';
import Tabs from './src/painel'
import { RootStackParamList } from './src/types';
import { PedidosProvider } from './src/utils/PedidoContext';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <PedidosProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Vendedor'>
          <Stack.Screen name='Vendedor' component={Vendedor} options={{headerShown: false}}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Despesas" component={Despesas} options={{headerShown: false}}/>
          <Stack.Screen name='Cliente' component={Cliente} options={{headerShown: false}}/>
          <Stack.Screen name='Painel' component={Tabs} options={{title: 'Painel do Pedido'}}/>
          {/* <Stack.Screen name="CadastroCliente" component={CadastroCliente} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PedidosProvider>
  );
}
