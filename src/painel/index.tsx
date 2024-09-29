import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Financeiro from './tabs//Financeiro'
import NovoPedido from './tabs/NovoPedido'
import { RootStackParamList } from '../types/index';
import { useRoute, RouteProp } from '@react-navigation/native'; 

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function Tabs() {
  const route = useRoute<RouteProp<RootStackParamList, 'Painel'>>();
  const { cliente, vendedor } = route.params;  // Aqui você acessa o parâmetro 'cliente'

  return (
    <Tab.Navigator>
      <Tab.Screen name="Pedido" component={NovoPedido} initialParams={{ cliente, vendedor }}/>
      <Tab.Screen name="Financeiro" component={Financeiro} initialParams={{ cliente, vendedor }}/>
    </Tab.Navigator>
  );
}