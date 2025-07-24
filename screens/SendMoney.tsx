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
import  style  from './styles/SendMoney.styles';
 import {convertUGXToBTC, createLightningInvoice } from './api/bitnobApi';

export default function SendMoney() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSend = async () => {
    const regex = /^7\d{8}$/; // Only 9 digits starting with 7
    if (!regex.test(phone)) {
      setError('Invalid phone number');
      return;
    }try{
    
    alert(`Sending UGX ${amount} to +256${phone}`);
    const sats = await convertUGXToBTC(Number(amount));
    const invoice = await createLightningInvoice(sats, 'Payment for BTC Relay');
    }catch (err) {
    console.error(err);
    alert('Error');
  }
  };

  const handleFocus = () => {
    setError('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.container}>
        <Text style={style.title}>Send Money</Text>

        <Text style={style.label}>Phone Number</Text>
        <View style={style.inputGroup}>
          <Text style={style.suffix}>+256</Text>
		  
          <TextInput 
            style={[style.input, error && style.inputError]}
            keyboardType="number-pad"
            placeholder="7xxxxxxxx"
            value={phone}
            onChangeText={setPhone}
            onFocus={handleFocus}
            maxLength={9}
          />
        </View>
        {error ? <Text style={style.error}>{error}</Text> : null}

        <Text style={style.label}>Amount</Text>
        <View style={style.inputGroup}>
          <TextInput
            style={style.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={style.suffix}>UGX</Text>
        </View>

        <Pressable onPress={handleSend} style={style.button}>
          <Text style={style.buttonText}>Send</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
