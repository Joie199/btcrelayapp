import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export default function SendMoney() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    const regex = /^7\d{8}$/; // Only 9 digits starting with 7
    if (!regex.test(phone)) {
      setError('Invalid phone number');
      return;
    }
    setError('');
    alert(`Sending UGX ${amount} to +256${phone}`);
  };

  const handleFocus = () => {
    setError('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Send Money</Text>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.suffix}>+256</Text>
		  
          <TextInput 
            style={[styles.input, error && styles.inputError]}
            keyboardType="number-pad"
            placeholder="7xxxxxxxx"
            value={phone}
            onChangeText={setPhone}
            onFocus={handleFocus}
            maxLength={9}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.suffix}>UGX</Text>
        </View>

        <Pressable onPress={handleSend} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    paddingRight: 60,
    paddingLeft: 60,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  suffix: {
    position: 'absolute',
    left: 10,
    top: 16,
    fontWeight: 'bold',
    color: '#000',
	zIndex:1,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
