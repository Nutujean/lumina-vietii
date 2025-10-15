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

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users/register";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Eroare", "Te rugăm să completezi toate câmpurile.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Eroare", "Parolele nu coincid.");
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
      console.log("🔹 Răspuns înregistrare:", data);

      if (!res.ok) {
        throw new Error(data.message || "Eroare la înregistrare.");
      }

      // ✅ Salvăm token + email pentru sesiunea curentă
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("userEmail", data.email);

      Alert.alert("Cont creat cu succes!", "Bine ai venit în Lumina Vieții!");
      router.push("/(tabs)/index"); // redirecționează spre pagina principală
    } catch (err: any) {
      Alert.alert("Eroare", err.message || "Nu s-a putut crea contul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creează un cont</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirmă parola"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Înregistrează-te</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/auth/login")}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.linkText}>
          Ai deja un cont? <Text style={{ fontWeight: "bold" }}>Autentifică-te</Text>
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
