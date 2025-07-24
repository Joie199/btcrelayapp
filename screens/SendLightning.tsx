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
// import { BarCodeScanner } from "expo-barcode-scanner";

export default function SendLightning() {
  const [invoice, setInvoice] = useState("");
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanning(false);
    setInvoice(data);
  };

  const handleSend = async () => {
    if (!invoice || !invoice.startsWith("ln")) {
      setError("Please enter a valid Lightning invoice.");
      return;
    }
    setError("");
    try {
      // TODO: Replace with actual API call to pay Lightning invoice
      // Example:
      // await fetch("/api/pay-lightning", { method: "POST", body: JSON.stringify({ invoice }) });
      setSuccess(true);
    } catch (err) {
      setError("Failed to send payment.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Send Lightning Payment</Text> */}

        <Text style={styles.label}>Lightning Invoice</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Paste Lightning invoice"
          value={invoice}
          onChangeText={setInvoice}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* <Pressable
          style={styles.scanButton}
          onPress={() => setScanning(true)}
        >
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </Pressable> */}

        <Pressable
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send Payment</Text>
        </Pressable>

        {/* QR Scanner Modal */}
        <Modal visible={scanning} transparent animationType="slide">
          <View style={styles.scannerOverlay}>
            {/* <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            /> */}
            <Pressable
              style={styles.closeScanner}
              onPress={() => setScanning(false)}
            >
              <Text style={styles.closeScannerText}>Cancel</Text>
            </Pressable>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal visible={success} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.successText}>Payment sent successfully!</Text>
              <Pressable
                style={styles.homeButton}
                onPress={() => {
                  setSuccess(false);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.homeButtonText}>Go to Home</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    marginTop:14
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
  scanButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeScanner: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  closeScannerText: {
    color: "#fff",
    fontSize: 18,
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
  },
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
});