import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { auth } from "config/firebase";
import { StatusBar } from "expo-status-bar";

const recentTransactions = [
  { id: 1, type: "Received", amount: "0.05 BTC", date: "2025-07-23" },
  { id: 2, type: "Sent", amount: "0.01 BTC", date: "2025-07-22" },
  { id: 3, type: "Withdrawn", amount: "0.02 BTC", date: "2025-07-21" },
  { id: 4, type: "Received", amount: "0.03 BTC", date: "2025-07-20" },
  { id: 5, type: "Sent", amount: "0.005 BTC", date: "2025-07-19" },
];

type NavProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Dasboard() {
  const walletBalance = "0.123 BTC";
  const navigation = useNavigation<NavProps>();
  const [showBalance, setShowBalance] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginPage");
    } catch (e) {
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      {/* Greeting & Logout */}
      <View style={styles.greetingRow}>
        <Text style={styles.greetingText}>Hello 👋</Text>
        <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
          <Icon name="logout" type="material" color="#1DB954" size={28} />
        </TouchableOpacity>
      </View>

      {/* Top Section: Wallet Balance */}
      <View style={styles.balanceSection}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowBalance((prev) => !prev)}
          >
            <Icon
              name={showBalance ? "visibility-off" : "visibility"}
              type="material"
              color="#fff"
              size={26}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceValue}>
          {showBalance ? walletBalance : "••••••••"}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Receive")}
          >
            <Icon name="call-received" type="material" color="#1DB954" />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("SendLightning")}
          >
            <Icon name="send" type="material" color="#1DB954" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("SendMoney")}
          >
            <Icon
              name="account-balance-wallet"
              type="material"
              color="#1DB954"
            />
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map((tx) => (
          <View key={tx.id} style={styles.transactionItem}>
            <Text style={styles.transactionType}>{tx.type}</Text>
            <Text style={styles.transactionAmount}>{tx.amount}</Text>
            <Text style={styles.transactionDate}>{tx.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    padding: 16,
    marginTop: 24,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  logoutIconBtn: {
    padding: 6,
  },
  balanceSection: {
    backgroundColor: "#FF9900",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  balanceHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  eyeButton: {
    padding: 4,
    marginBottom: 8,
  },
  balanceValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 8,
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    width: "30%",
  },
  actionText: {
    color: "#1DB954",
    marginTop: 8,
    fontWeight: "600",
  },
  transactionsSection: {
    marginBottom: 24,
  },
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionType: {
    color: "#222",
    flex: 1,
  },
  transactionAmount: {
    textAlign: "center",
  },
  transactionDate: {
    color: "#888",
    flex: 1,
    textAlign: "right",
  },
});
