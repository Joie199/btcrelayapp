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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
import { auth } from "config/firebase";

type NavProps = NativeStackNavigationProp<RootStackParamList, "Signup">;

const Signup = () => {
  const navigation = useNavigation<NavProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (e: any) {
      setIsLoading(false);
      let code = e.code;
      switch (code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/weak-password":
          setError(
            "Your password is too short, please make it 6 characters or more."
          );
          break;
        case "auth/network-request-failed":
          setError("Network request failed. Please check your connection.");
          break;
        case "auth/too-many-requests":
          setError(
            "Access to this account has been temporarily disabled due to many failed signup attempts. You can immediately restore it by resetting your password or try again later."
          );
          break;
        default:
          setError("There was a problem with your request.");
      }
    }
    setIsLoading(false);
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
            <Icon name="person-add" type="material" color="#1DB954" size={60} />
            <Text style={localStyles.title}>Sign Up</Text>
          </View>

          <Text style={localStyles.label}>Email</Text>
          <TextInput
            style={localStyles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={localStyles.label}>Password</Text>
          <View style={localStyles.inputWithIcon}>
            <TextInput
              style={[localStyles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Create a password"
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

          <Pressable
            style={localStyles.button}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={localStyles.buttonText}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Text>
          </Pressable>

          <Pressable
            style={localStyles.signupLink}
            onPress={() => navigation.navigate("LoginPage" as never)}
          >
            <Text style={localStyles.signupText}>
              Already have an account?{" "}
              <Text style={{ color: "#1DB954", fontWeight: "bold" }}>
                Sign In
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
    color: "#222",
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
    textAlign: "center",
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

export default Signup;
