import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Eroare", "Te rugăm să introduci un email valid.");
      return;
    }

    setLoading(true);
    try {
      // 🔹 Salvăm emailul local pentru identificare ulterioară
      await SecureStore.setItemAsync("userEmail", email);

      // 🔹 Verificăm statusul Premium de pe backend
      const res = await fetch(`${API_URL}/${email}`);
      const data = await res.json();

      if (data && data.success) {
        if (data.isPremium) {
          Alert.alert("✨ Bun venit!", "Cont Premium activ! Mulțumim pentru susținere 🙏");
        } else {
          Alert.alert("Bun venit!", "Cont gratuit activ. Poți trece oricând la Premium ❤️");
        }
      } else {
        Alert.alert("Eroare", "Nu am putut verifica contul. Încearcă din nou.");
      }

      // 🔹 Navigăm către pagina principală
      router.replace("/(tabs)/index");
    } catch (err) {
      console.error("❌ Eroare la login:", err);
      Alert.alert("Eroare", "Conexiune eșuată la server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFF8E1", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 25,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#F9C846",
          padding: 25,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#1E2A78",
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          Autentificare
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: "#FFF",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#F9C846",
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            color: "#1E2A78",
            marginBottom: 20,
          }}
        />

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#F9C846",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#1E2A78" />
          ) : (
            <Text
              style={{
                color: "#1E2A78",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Conectează-te
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
