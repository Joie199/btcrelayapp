import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth } from "config/firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Receive() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [invoice, setInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  let logoFromFile = require("../assets/bitcoin.png");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleGenerateInvoice = async () => {
    setError("");
    setInvoice("");
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Enter a valid amount in sats.");
      return;
    }
    if (!description) {
      setError("Enter a description.");
      return;
    }
    if (!userEmail) {
      setError("User not authenticated.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.BITNOB_API}/api/v1/wallets/ln/createinvoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BITNOB_SECRET_KEY}`,
          },
          body: JSON.stringify({
            satoshis: Number(amount),
            customerEmail: userEmail,
            description: description,
            // expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(), // Example: 1 hour expiry
          }),
        }
      );
      const resData = await res.json();

      if (resData.status) {
        setInvoice(resData.data.request);

        // Store in Firestore
        const db = getFirestore();
        const userId = auth.currentUser?.uid;
        if (userId) {
          await addDoc(collection(db, "invoices"), {
            request: resData.data.request,
            userId: userId,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setError(resData.message || "Failed to generate invoice.");
      }
    } catch (err) {
      setError("Failed to generate invoice.");
    }
    setLoading(false);
  };

  const handleCopyInvoice = async () => {
    await Clipboard.setStringAsync(invoice);
    alert("Invoice copied to clipboard!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.title}>Receive Lightning Payment</Text>

        <Text style={styles.label}>Amount (sats)</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          keyboardType="numeric"
          placeholder="Enter amount in satoshis"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={styles.generateButton}
          onPress={handleGenerateInvoice}
          disabled={loading}
        >
          <Text style={styles.generateButtonText}>
            {loading ? "Generating..." : "Generate Invoice"}
          </Text>
        </Pressable>

        {invoice ? (
          <View style={styles.invoiceBox}>
            <Text style={styles.invoiceLabel}>Lightning Invoice</Text>
            <QRCode
              value={invoice}
              size={160}
              logo={logoFromFile}
            />
            <Text selectable style={styles.invoiceText}>
              {invoice}
            </Text>
            <Pressable style={styles.copyButton} onPress={handleCopyInvoice}>
              <Text style={styles.copyButtonText}>Copy Invoice</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    padding: 16,
    // justifyContent: "center",
  },
  title: {
    // fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#222",
    // textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff5252",
  },
  error: {
    color: "#ff5252",
    marginBottom: 8,
    // textAlign: "center",
  },
  generateButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  generateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  invoiceBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FF9900",
    flex: 1,
    alignItems: "center",
  },
  invoiceLabel: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FF9900",
    textAlign: "center",
  },
  invoiceText: {
    color: "#222",
    fontSize: 10,
    marginTop: 6,
    // wordBreak: "break-all",
  },
  copyButton: {
    backgroundColor: "#f7f8fa",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 15,
  },
});
