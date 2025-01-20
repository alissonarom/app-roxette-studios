import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Anamnese from './src/screens/anamnese';
import Servicos from './src/screens/servicos';
import { RootStackParamList } from './src/types';
import { PedidosProvider } from './src/utils/PedidoContext';
import Welcome from './src/screens/welcome';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <PedidosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Servicos"
            component={Servicos}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Anamnese"
            component={Anamnese}
            options={{ headerShown: false }}
          />
          {/*<Stack.Screen
            name="Cliente"
            component={Cliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Painel"
            component={Tabs}
            options={{ title: 'Painel do Pedido' }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PedidosProvider>
  );
}
