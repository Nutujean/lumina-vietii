import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users/login";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Eroare", "Completează toate câmpurile.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔹 Răspuns login:", data);

      if (!res.ok) {
        throw new Error(data.message || "Eroare la autentificare");
      }

      // ✅ Salvăm tokenul și emailul pentru sesiunea curentă
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("userEmail", data.email);

      Alert.alert("Bine ai revenit!", "Autentificare reușită.");
      router.push("/(tabs)/index"); // redirecționează spre pagina principală
    } catch (err: any) {
      Alert.alert("Eroare", err.message || "Autentificare eșuată.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autentificare</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Parolă"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Conectează-te</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/auth/register")}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.linkText}>
          Nu ai cont? <Text style={{ fontWeight: "bold" }}>Înregistrează-te</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E2A78",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "90%",
    backgroundColor: "#1E2A78",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkText: {
    color: "#1E2A78",
    fontSize: 15,
    textAlign: "center",
  },
});
