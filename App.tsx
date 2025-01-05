import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cliente from './src/screens/cliente';
import Vendedor from './src/screens/vendedor';
import Home from './src/screens/home';
import Despesas from './src/screens/despesas';
import Baixa from './src/screens/baixa';
import Tabs from './src/painel';
import { RootStackParamList } from './src/types';
import { PedidosProvider } from './src/utils/PedidoContext';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <PedidosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Vendedor">
          <Stack.Screen
            name="Vendedor"
            component={Vendedor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Baixa"
            component={Baixa}
            options={{ title: 'Confirmar Entrega' }}
          />
          <Stack.Screen
            name="Despesas"
            component={Despesas}
            options={{ title: 'Lançar Despesa' }}
          />
          <Stack.Screen
            name="Cliente"
            component={Cliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Painel"
            component={Tabs}
            options={{ title: 'Painel do Pedido' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PedidosProvider>
  );
}
