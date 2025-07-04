import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles/PayBill.styles';
import { fetchOwnerName } from './api/PayBill.api';

export default function PayBill() {
  const [billNumber, setBillNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);     // for owner name
  const [invoiceLoading, setInvoiceLoading] = useState(false); // for invoice generation
 
  const [billNumberFocused, setBillNumberFocused] = useState(false);

  const handleFetchOwnerName = async () => {
    if (billNumber.length < 3) return;
    setNameLoading(true);
    setOwnerName('');
    const name = await fetchOwnerName(billNumber);
    setOwnerName(name);
   
	setNameLoading(false);
  };
  
  //creating invoice here 
const [showInvoice, setShowInvoice] = useState(false);
const [invoiceData, setInvoiceData] = useState<{
  billNumber: string;
  accountNumber: string;
  ownerName: string;
  amount: string;
  referenceId: string;
  date: string;
} | null>(null);

const handlePay = () => {
  if (!billNumber || !accountNumber || !amount || parseFloat(amount) <= 0) {
    alert('Please complete all fields with valid data');
    return;
  }
  if (nameLoading) {
    alert('Please wait while we fetch the bill owner');
    return;
  }

  setInvoiceLoading(true);
  setShowInvoice(false); // Clear any previous invoice

  setTimeout(() => {
    const generatedReferenceId = `REF-${Date.now().toString().slice(-6)}`;
    const date = new Date().toLocaleString();

    setInvoiceData({
      billNumber,
      accountNumber,
      ownerName: ownerName || 'Unknown Owner',
      amount,
      referenceId: generatedReferenceId,
      date,
    });

    setInvoiceLoading(false);
    setShowInvoice(true);
  }, 1500); // simulate delay
};


  return (
    <KeyboardAvoidingView

      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" 
	  showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pay Bill</Text>

		   {!billNumberFocused && (
			  nameLoading ? (
				<ActivityIndicator size="large" color="#007BFF" style={{ marginBottom: 16 }} />
			  ) : (
				ownerName !== '' && <Text style={styles.owner}>{ownerName}</Text>
			  )
			)}


        <Text style={styles.label}>Bill Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter bill number"
          value={billNumber}
          onChangeText={(text) => {
            setBillNumber(text);
            setOwnerName('');
          }}
          onBlur={() => setBillNumberFocused(false)}
          onFocus={() =>  {
					setBillNumberFocused(true);
					setShowInvoice(false); // Clear invoice
				  }}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          onFocus={() => {
			setShowInvoice(false); // Clear invoice
            if (billNumber.length >= 3) {
              handleFetchOwnerName();
            }
          }}
        />

        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            onFocus={() => {setShowInvoice(false); // Clear invoice
			}}
          />
          <Text style={styles.suffix}>UGX</Text>
        </View>

        <Pressable onPress={handlePay}
			  style={[styles.button,
				(!ownerName || nameLoading) && { opacity: 0.5 } ]}
			  disabled={!ownerName || nameLoading}>
				<Text style={styles.buttonText}>Pay</Text>
        </Pressable>
		
		{invoiceLoading && (
			  <View style={styles.invoiceBox}>
				<ActivityIndicator size="large" color="#007BFF" />
			  </View>
			)}

			{showInvoice && invoiceData && !invoiceLoading && (
			  <View style={styles.invoiceBox}>
				<Text style={styles.invoiceTitle}>Payment Invoice</Text>
				<Text style={styles.invoiceText}>Reference ID: {invoiceData.referenceId}</Text>
				<Text style={styles.invoiceText}>Date: {invoiceData.date}</Text>
				<Text style={styles.invoiceText}>Bill Number: {invoiceData.billNumber}</Text>
				<Text style={styles.invoiceText}>Account Number: {invoiceData.accountNumber}</Text>
				<Text style={styles.invoiceText}>Owner: {invoiceData.ownerName}</Text>
				<Text style={styles.invoiceText}>Amount Paid: UGX {invoiceData.amount}</Text>
			  </View>
			)}


      </ScrollView>
    </KeyboardAvoidingView>
  );
}
