import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Pressable,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "config/firebase";

type NavProps = NativeStackNavigationProp<RootStackParamList, "LoginPage">;

const LoginPage = () => {
  const navigation = useNavigation<NavProps>();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(Email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, Email, password);
      navigation.replace("Home");
      setError("");
    } catch (e: any) {
      setIsLoading(false);
      let code = e.code;
      console.log(code);
      switch (code) {
        case "auth/invalid-email":
          setError("Invalid credentials.");
          break;
        case "auth/wrong-password":
          setError("Invalid credentials.");
          break;
        case "auth/user-not-found":
          setError("Incorrect email or password.");
          break;
        case "auth/invalid-credential":
          setError("Invalid credentials.");
          break;
        case "auth/network-request-failed":
          setError("Network request failed. Please check your connection.");
          break;
        case "auth/too-many-requests":
          setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or try again later."
          );
          break;
        default:
          setError("There was a problem with your request.");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={localStyles.container}>
          <View style={localStyles.header}>
            <Icon
              name="account-circle"
              type="material"
              color="#1DB954"
              size={60}
            />
            <Text style={localStyles.title}>Sign In</Text>
          </View>

          <Text style={localStyles.label}>Email</Text>
          <TextInput
            style={localStyles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={Email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={localStyles.label}>Password</Text>
          <View style={localStyles.inputWithIcon}>
            <TextInput
              style={[localStyles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Enter your password"
              keyboardType="default"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={localStyles.showPasswordBtn}
            >
              <Icon
                name={showPassword ? "visibility-off" : "visibility"}
                type="material"
                color="#888"
                size={24}
              />
            </Pressable>
          </View>

          {error ? <Text style={localStyles.error}>{error}</Text> : null}

          <Pressable style={localStyles.button} onPress={handleLogin}>
            <Text style={localStyles.buttonText}>
              {isLoading ? "Loading..." : "Login"}
            </Text>
          </Pressable>

          <Pressable
            style={localStyles.signupLink}
            onPress={() => navigation.navigate("Signup" as never)}
          >
            <Text style={localStyles.signupText}>
              Don't have an account?{" "}
              <Text style={{ color: "#1DB954", fontWeight: "bold" }}>
                Sign Up
              </Text>
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f7f8fa",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#e0e0e0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#222", // <-- add this line
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#e0e0e0",
    marginBottom: 16,
    paddingRight: 8,
  },
  showPasswordBtn: {
    padding: 4,
    marginLeft: 2,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  error: {
    color: "#ff5252",
    marginBottom: 8,
    fontSize: 15,
  },
  signupLink: {
    alignItems: "center",
    marginTop: 8,
  },
  signupText: {
    color: "#222",
    fontSize: 15,
  },
});

export default LoginPage;
