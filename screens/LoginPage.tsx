import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import style from './styles/loginPage.styles';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'LoginPage'>;

const LoginPage = () => {
  const navigation = useNavigation<NavProps>(); 
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(Email)) {
         navigation.replace('Home');
      Alert.alert('Invalid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }

    Alert.alert('Login Success', `Welcome, ${Email}`);
    navigation.replace('Home');
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>Email</Text>
      <TextInput
        style={style.input}
        placeholder="Email"
        keyboardType="email-address"
        value={Email}
        onChangeText={setEmail}
      />

      <Text style={style.label}>Password</Text>
      <TextInput
        style={style.input}
        placeholder="Enter your password"
        keyboardType="default"
        secureTextEntry
        value={password}
        onChangeText={setPassword}  />
      
       <TouchableOpacity style={style.button} onPress={handleLogin}>
              <Text style={style.buttonText}>Login</Text>
            </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={style.registerLink}>
              New member? <Text style={style.registerLinkBold}>Register</Text>
            </Text>
       </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
