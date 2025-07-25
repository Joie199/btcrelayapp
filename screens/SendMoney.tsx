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
import { convertUGXToBTC, createLightningInvoice } from "./api/bitnobApi";
import { StatusBar } from "expo-status-bar";

export default function SendMoney() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false); //display minimum amount
  const [selectedNetwork, setSelectedNetwork] = useState<
    "MTN" | "AIRTEL" | null
  >(null); //choosing mobile Network

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const handleSend = async () => {
    const regex = /^7\d{8}$/; // Only 9 digits starting with 7
    if (!regex.test(phone)) {
      setError("Invalid phone number");
      return;
    }

    if (!selectedNetwork) {
      setError("Choose Mobile Network");
      return;
    }

    if (Number(amount) < 5000) {
      setError("Minimum amount is UGX 5000");
      return
    }
    setError("")
    setLoading(true);
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
                network: selectedNetwork,
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
            setLoading(false);
          } else {
            setLoading(false);

            if (finalizeData.message) {
              alert(finalizeData.message);
              console.log(finalizeData);
            } else {
              alert("Failed to withdraw");
            }
          }
        } else {
          setLoading(false);

          if (resData.message) {
            alert(resData.message);
            console.log(resData);
          } else {
            alert("Try again");
          }
        }
      } else {
        setLoading(false);

        if (quoteData.message) {
          alert(quoteData.message);
          console.log(quoteData);
        } else {
          alert("Try again");
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setError("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[style.container, { backgroundColor: "#f7f8fa" }]}>
        <StatusBar style="dark" />
        <Text style={style.title}>Send to mobile money</Text>
        {error ? <Text style={style.error}>{error}</Text> : null}

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

        <View style={styles.networkRow}>
          <TouchableOpacity onPress={() => setSelectedNetwork("MTN")}>
            <Image
              source={require("../assets/mtn.jpeg")}
              style={[
                styles.networkImage,
                selectedNetwork === "MTN" && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedNetwork("AIRTEL")}>
            <Image
              source={require("../assets/airtel.jpg")}
              style={[
                styles.networkImage,
                selectedNetwork === "AIRTEL" && styles.selectedImage,
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
            onBlur={() => setIsFocused(false)}
          />
          <Text style={style.suffix}>UGX</Text>
        </View>
        {isFocused && (
          <Text style={styles.hint}>Minimum amount is 5000 UGX</Text>
        )}

        <Pressable onPress={handleSend} style={style.button}>
          <Text style={style.buttonText}>
            {loading ? "Sending..." : "Send"}
          </Text>
        </Pressable>

        {/* Success Modal */}
        <Modal visible={success} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.successText}>
                You should receive a notification soon!
              </Text>
              <Pressable
                style={styles.homeButton}
                onPress={() => {
                  setSuccess(false);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.homeButtonText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    width: "80%",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DB954",
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  hint: {
    marginTop: -1,
    color: "gray",
    fontSize: 14,
  },
  networkRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
    marginBottom: 24,
    gap: 28,
    // paddingLeft: 30,
    marginVertical: 8,
  },

  networkImageWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },

  selectedWrapper: {
    borderColor: "#1DB954",
    backgroundColor: "#E8F5E9",
  },

  networkImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0, // For Android shadow
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "#1DB954",
  },
});
