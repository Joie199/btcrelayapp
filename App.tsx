import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './screens/Home';
import SendMoney from './screens/SendMoney';
import PayBill from './screens/PayBill';
import LoginPage from'./screens/LoginPage';
//import ScanQrCode from './screens/ScanQrCode'; 

export type RootStackParamList = {
  Home: undefined;
  SendMoney: undefined;
  //ScanQRCode: undefined;
  PayBill: undefined;
  LoginPage:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
		      <Stack.Screen name="PayBill" component={PayBill} />
          <Stack.Screen name="LoginPage" component={LoginPage} />        
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
