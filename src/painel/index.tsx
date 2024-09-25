import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Financeiro from './tabs//Financeiro'
import NovoPedido from './tabs/NovoPedido'
import { RootStackParamList } from '../types/index';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Financeiro" component={Financeiro} />
      <Tab.Screen name="Pedido" component={NovoPedido} />
    </Tab.Navigator>
  );
}