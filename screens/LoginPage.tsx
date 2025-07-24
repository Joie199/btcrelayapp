import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import styles from './styles/loginPage.styles';
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
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={Email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        keyboardType="default"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;
