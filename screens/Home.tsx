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

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<NavProps>();

  return (
    <ImageBackground source={require('../assets/bitcoin.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>BTC Relay</Text>

        <TouchableOpacity style={styles.button}
  onPress={() => navigation.navigate('PayBill')}>
          <Icon name="send" type="feather" color="#007BFF" />
          <Text style={styles.buttonText}>Pay Bill</Text>
        </TouchableOpacity>
		
		<TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SendMoney')} >
          <Icon name="arrow-right-circle" type="feather" color="#007BFF" />
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
		
        <TouchableOpacity style={styles.button} >
          <Icon name="maximize" type="feather" color="#007BFF" />
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon name="smartphone" type="feather" color="#007BFF" />
          <Text style={styles.buttonText}>MoMo Payout</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffffcc',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    width: '85%',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#007BFF',
    fontWeight: '600',
  },
});
