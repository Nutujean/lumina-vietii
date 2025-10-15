import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function ContulMeuScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedEmail = await SecureStore.getItemAsync("userEmail");
        if (!storedEmail) {
          setEmail(null);
          setIsPremium(false);
          setLoading(false);
          return;
        }

        setEmail(storedEmail);

        const res = await fetch(`${API_URL}/${storedEmail}`);
        const data = await res.json();

        if (data && typeof data.isPremium === "boolean") {
          setIsPremium(data.isPremium);
        } else {
          setIsPremium(false);
        }
      } catch (err) {
        console.log("❌ Eroare la verificarea contului:", err);
        Alert.alert("Eroare", "Nu s-a putut verifica statusul contului.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userEmail");
    Alert.alert("Deconectat", "Ai fost deconectat cu succes.");
    router.replace("index");
  };

  const handleSupport = () => {
    router.push("donatii");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={styles.loadingText}>Se încarcă datele contului...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră sus */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contul meu</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Adresa de email:</Text>
        <Text style={styles.value}>{email || "Necunoscut"}</Text>

        <Text style={styles.label}>Status cont:</Text>
        <Text
          style={[
            styles.value,
            { color: isPremium ? "#b8860b" : "#B22222", fontWeight: "700" },
          ]}
        >
          {isPremium ? "Premium activ" : "Gratuit"}
        </Text>

        <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
          <Text style={styles.supportText}>💎 Susține aplicația</Text>
        </TouchableOpacity>

        {email && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Deconectare</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A78",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  backButton: {
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 17,
    color: "#1E2A78",
    marginBottom: 10,
    textAlign: "center",
  },
  supportButton: {
    backgroundColor: "#b8860b",
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    marginTop: 25,
  },
  supportText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#B22222",
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
  },
  loadingText: {
    marginTop: 10,
    color: "#1E2A78",
    fontSize: 16,
  },
});
