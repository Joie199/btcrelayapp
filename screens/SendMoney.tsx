import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import style from "./styles/SendMoney.styles";

//import { convertUGXToBTC, createLightningInvoice } from "./api/bitnobApi";

export default function SendMoney() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation<any>();
  const [isFocused, setIsFocused] = useState(false); //display minimum amount
  const [selectedNetwork, setSelectedNetwork] = useState<'MTN' | 'AIRTEL' | null>(null); //choosing mobile Network

  const handleSend = async () => {
    const regex = /^7\d{8}$/; // Only 9 digits starting with 7
    
    if (!regex.test(phone)) {
      setError("Invalid phone number");
      return;
    }

    try {
      // Step 1: Get quote
      const quoteRes = await fetch(
        `${process.env.BITNOB_API}/api/v1/payouts/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BITNOB_SECRET_KEY}`,
          },
          body: JSON.stringify({
            source: "offchain",
            fromAsset: "usdt",
            toCurrency: "ugx",
            settlementAmount: Number(amount) * 100,
          }),
        }
      );
      const quoteData = await quoteRes.json();

      if (quoteData.status) {
        // Step 2: Initialize payout
        const quoteId = quoteData.data.quoteId;
        const res = await fetch(
          `${process.env.BITNOB_API}/api/v1/payouts/initialize`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.BITNOB_SECRET_KEY}`,
            },
            body: JSON.stringify({
              quoteId,
              customerId: "e22795d9-23f6-48e6-8b30-be5718abd876", // use email
              country: "UG",
              reference: Math.random().toString(36).substring(2),
              paymentReason: "Mobile MOney",
              beneficiary: {
                type: "MOBILEMONEY",
                accountName: "Btc Hub", // Replace with actual name if available
                network: "AIRTEL",
                accountNumber: `256${phone}`,
              },
            }),
          }
        );

        const resData = await res.json();

        if (resData.status) {
          // Step 3: Finalize payout
          const finalizeRes = await fetch(
            `${process.env.BITNOB_API}/api/v1/payouts/finalize`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.BITNOB_SECRET_KEY}`,
              },
              body: JSON.stringify({ quoteId }),
            }
          );
          const finalizeData = await finalizeRes.json();

          if (finalizeData.status) {
            setSuccess(true);
          } else {
            if (finalizeData.message) {
              alert(finalizeData.message);
              console.log(finalizeData);
            } else {
              alert("Failed to withdraw");
            }
          }
        } else {
          if (resData.message) {
            alert(resData.message);
            console.log(resData);
          } else {
            alert("Try again");
          }
        }
      } else {
        if (quoteData.message) {
          alert(quoteData.message);
          console.log(quoteData);
        } else {
          alert("Try again");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFocus = () => {
    setError("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[style.container, { backgroundColor: "#f7f8fa" }]}>
        <Text style={style.title}>Send to mobile money</Text>

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
      
        <View style={style.networkRow}>
              <TouchableOpacity onPress={() => setSelectedNetwork('MTN')}>
                      <Image
                        source={require('../assets/mtn.jpg')}
                        style={[
                          style.networkImage,
                          selectedNetwork === 'MTN' && style.selectedImage,
                        ]}
                      />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedNetwork('AIRTEL')}>
                  <Image
                    source={require('../assets/airtel.jpg')}
                    style={[
                      style.networkImage,
                      selectedNetwork === 'AIRTEL' && style.selectedImage,
                    ]}
                  />
                </TouchableOpacity>
            </View>


        <Text style={style.label}>Amount</Text>
        <View style={style.inputGroup}>
          <TextInput
            style={style.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}/>
          <Text style={style.suffix}>UGX</Text>
        </View>
         <View style={style.container}>
              {isFocused && (
                <Text style={style.hint}>Minimum amount is 1000 UGX</Text>
              )}
          </View>   
            <Pressable onPress={handleSend} style={style.button}>
              <Text style={style.buttonText}>Send</Text>
            </Pressable>

        {/* Success Modal */}
        <Modal visible={success} transparent animationType="fade">
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.successText}>
                You should receive a notification soon!
              </Text>
              <Pressable
                style={style.homeButton}
                onPress={() => {
                  setSuccess(false);
                  navigation.navigate("Home");
                }}>
                <Text style={style.homeButtonText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};