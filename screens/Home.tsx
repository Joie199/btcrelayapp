import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { onAuthStateChanged, signOut, User } from "@firebase/auth";
import { auth } from "config/firebase";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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
  const [invoices, setInvoices] = useState<any[]>([]);
  const [fetchingInvoices, setFetchingVoices] = useState(true);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginPage");
    } catch (e) {
      alert("Failed to log out. Please try again.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          try {
            setFetchingVoices(true);
            const db = getFirestore();
            const q = query(
              collection(db, "invoices"),
              where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            const invoiceDocs = querySnapshot.docs.map((doc) => doc.data());

            // Parallel requests to Bitnob API
            const results = await Promise.all(
              invoiceDocs.map(async (inv) => {
                const res = await fetch(
                  "https://sandboxapi.bitnob.co/api/v1/wallets/ln/getinvoice",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${process.env.BITNOB_SECRET_KEY}`,
                    },
                    body: JSON.stringify({ request: inv.request }),
                  }
                );
                const data = await res.json();
                // Only include if status is not "expired"
                if (data.status && data.data.status !== "expired") {
                  return data.data;
                }
                return null;
              })
            );

            setInvoices(results.filter(Boolean));
            setFetchingVoices(false);
          } catch (e) {
            setInvoices([]);
            setFetchingVoices(false);
            console.log(e);
          }
        } else {
          navigation.replace("LoginPage");
        }
      });
      return () => unsubscribe();
    }, [])
  );

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

      <Text style={styles.sectionTitle}>Recent Invoices</Text>
      {fetchingInvoices ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Loading invoices...</Text>
        </View>
      ) : invoices.length === 0 ? (
        <Text style={styles.emptyText}>No invoices found.</Text>
      ) : (
        invoices
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2)
          .map((inv) => (
            <View key={inv.id} style={styles.invoiceCard}>
              <View style={styles.invoiceTopRow}>
                <Text style={styles.invoiceDesc}>{inv.description}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    inv.status === "paid"
                      ? { backgroundColor: "#1DB954" }
                      : inv.status === "unpaid"
                      ? { backgroundColor: "#FF9900" }
                      : { backgroundColor: "#888" },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {inv.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.invoiceMidRow}>
                <Icon name="bolt" type="material" color="#FFD600" size={22} />
                <Text style={styles.invoiceAmount}>{inv.tokens} sats</Text>
              </View>
              <Text style={styles.invoiceDate}>
                <Icon name="calendar-today" type="material" color="#888" size={14} />{" "}
                {new Date(inv.createdAt).toLocaleString()}
              </Text>
              {/* <Text style={styles.invoiceRequest} selectable numberOfLines={1}>
                {inv.request}
              </Text> */}
            </View>
          ))
      )}
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
  loadingBox: {
    alignItems: "center",
    marginVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    color: "#888",
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 24,
  },
  invoiceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  invoiceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
  invoiceDesc: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    flex: 1,
  },
  invoiceMidRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  invoiceAmount: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
  invoiceDate: {
    color: "#888",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 2,
  },
  invoiceRequest: {
    color: "#222",
    fontSize: 12,
    marginTop: 4,
    backgroundColor: "#f7f8fa",
    padding: 6,
    borderRadius: 6,
  },
});
