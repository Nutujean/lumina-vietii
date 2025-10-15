import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function SustineScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDonate = async (suma: number) => {
    try {
      const url = `https://revolut.me/p/Zwx3OJmjhr/${suma}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) await Linking.openURL(url);
      else Alert.alert("Deschide manual linkul:", url);
    } catch {
      Alert.alert("Eroare", "Nu s-a putut deschide pagina Revolut.");
    }
  };

  const activatePremium = async (durata: string, price: number) => {
    setLoading(true);
    try {
      const savedEmail = await SecureStore.getItemAsync("userEmail");
      if (!savedEmail) {
        Alert.alert("Conectare necesară", "Te rog să te conectezi în 'Contul meu'.");
        return;
      }

      const res = await fetch(`${API_URL}/premium`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: savedEmail }),
      });

      const data = await res.json();
      if (data.success) {
        Alert.alert("Succes 🎉", `Premium activat pentru ${durata}!`);
      } else {
        Alert.alert("Eroare ❌", "Nu s-a putut activa Premium-ul.");
      }
    } catch {
      Alert.alert("Eroare de rețea", "Verifică conexiunea la internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră sus */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Susține aplicația</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>💎 Mulțumim că susții Lumina Vieții</Text>
        <Text style={styles.subtitle}>
          Poți face o donație rapidă sau poți activa Premium pentru beneficii complete.
        </Text>

        {loading && <ActivityIndicator size="large" color="#b8860b" />}

        {/* 🔸 Donații simple */}
        <Text style={styles.sectionTitle}>Donații rapide</Text>
        {[20, 50, 100].map((suma) => (
          <TouchableOpacity
            key={suma}
            style={styles.donationCard}
            onPress={() => handleDonate(suma)}
          >
            <Ionicons name="heart" size={20} color="#b8860b" />
            <Text style={styles.donationText}>Donează {suma} lei</Text>
          </TouchableOpacity>
        ))}

        {/* 🔸 Abonamente Premium */}
        <Text style={styles.sectionTitle}>Abonamente Premium</Text>

        {/* Plan lunar */}
        <TouchableOpacity
          style={[styles.premiumCard, { backgroundColor: "#1E88E5" }]}
          onPress={() => activatePremium("1 lună", 19.99)}
          disabled={loading}
        >
          <Text style={styles.premiumLabel}>Plan lunar</Text>
          <Text style={styles.premiumPrice}>19,99 lei / lună</Text>
        </TouchableOpacity>

        {/* Plan 3 luni ⭐ Recomandat */}
        <View style={styles.ribbonContainer}>
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>⭐ Recomandat</Text>
          </View>
          <TouchableOpacity
            style={[styles.premiumCard, { backgroundColor: "#F9C846", marginTop: 12 }]}
            onPress={() => activatePremium("3 luni", 49.99)}
            disabled={loading}
          >
            <Text style={[styles.premiumLabel, { color: "#1E2A78" }]}>
              Plan 3 luni
            </Text>
            <Text style={[styles.premiumPrice, { color: "#1E2A78" }]}>
              49,99 lei / 3 luni
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plan pe viață */}
        <TouchableOpacity
          style={[styles.premiumCard, { backgroundColor: "#8E24AA" }]}
          onPress={() => activatePremium("pe viață", 99.99)}
          disabled={loading}
        >
          <Text style={styles.premiumLabel}>Acces pe viață 💜</Text>
          <Text style={styles.premiumPrice}>99,99 lei / viață</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },

  // 🔵 Bara albastră
  header: {
    backgroundColor: "#1E2A78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  backButton: {
    backgroundColor: "#F9C846",
    padding: 7,
    borderRadius: 50,
  },

  scroll: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E2A78",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E2A78",
    marginVertical: 10,
  },

  // 💛 Donații
  donationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 12,
    width: "90%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  donationText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E2A78",
    marginLeft: 8,
  },

  // 💎 Premium
  premiumCard: {
    width: "90%",
    borderRadius: 15,
    paddingVertical: 18,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  premiumLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  premiumPrice: {
    fontSize: 17,
    fontWeight: "900",
    color: "#fff",
    marginTop: 3,
  },

  // ⭐ Ribbon recomandat
  ribbonContainer: {
    width: "90%",
    alignItems: "center",
  },
  ribbon: {
    position: "absolute",
    top: -8,
    right: 12,
    backgroundColor: "#FF6F00",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  ribbonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },
});
