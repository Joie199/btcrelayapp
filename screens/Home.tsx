import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import style from './styles/HomePage.styles';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<NavProps>();

  return (
    <ImageBackground source={require('../assets/bitcoin.jpg')} style={style.background}>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.title}>bitcoin innovatiob hub win</Text>

        <TouchableOpacity style={style.button}
                  onPress={() => navigation.navigate('PayBill')}>
          <Icon name="send" type="feather" color="#007BFF" />
          <Text style={style.buttonText}>Pay Bill</Text>
        </TouchableOpacity>
		
		<TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('SendMoney')} >
          <Icon name="arrow-right-circle" type="feather" color="#007BFF" />
          <Text style={style.buttonText}>Send Money</Text>
        </TouchableOpacity>
		
        <TouchableOpacity style={style.button} >
          <Icon name="maximize" type="feather" color="#007BFF" />
          <Text style={style.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button}>
          <Icon name="smartphone" type="feather" color="#007BFF" />
          <Text style={style.buttonText}>MoMo Payout</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </ImageBackground>
  );
};
