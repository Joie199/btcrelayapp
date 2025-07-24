import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import SendMoney from './screens/SendMoney';
import PayBill from './screens/PayBill';
//import ScanQrCode from './screens/ScanQrCode'; 

export type RootStackParamList = {
  Home: undefined;
  SendMoney: undefined;
  //ScanQRCode: undefined;
  PayBill: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
		      <Stack.Screen name="PayBill" component={PayBill} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
