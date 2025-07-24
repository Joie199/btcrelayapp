import React from "react";
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

  return (
    <ScrollView style={styles.container}>
      {/* Top Section: Wallet Balance */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceValue}>{walletBalance}</Text>
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
            <Icon name="account-balance-wallet" type="material" color="#1DB954" />
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
  balanceSection: {
    // backgroundColor: "#222",
    // backgroundColor:"#1DB954",
    backgroundColor:"#FF9900",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  balanceValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
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
    // backgroundColor: "#007AFF",
    backgroundColor:"#fff",
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
    // elevation: 1,
  },
  transactionType: {
    // fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  transactionAmount: {
    // color: "#007AFF",
    // flex: 1,
    textAlign: "center",
  },
  transactionDate: {
    color: "#888",
    flex: 1,
    textAlign: "right",
  },
});
