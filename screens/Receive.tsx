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
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Receive() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [invoice, setInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();

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
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await fetch(`${process.env.LIGHTNING_API}/generate-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          description,
        }),
      });
      const data = await res.json();
      if (data.invoice) {
        setInvoice(data.invoice);
      } else {
        setError(data.message || "Failed to generate invoice.");
      }
    } catch (err) {
      setError("Failed to generate invoice.");
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <Text style={styles.invoiceLabel}>Lightning Invoice:</Text>
            <Text selectable style={styles.invoiceText}>{invoice}</Text>
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
    textAlign: "center",
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
  },
  invoiceLabel: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FF9900",
  },
  invoiceText: {
    color: "#222",
    fontSize: 14,
    // wordBreak: "break-all",
  },
});