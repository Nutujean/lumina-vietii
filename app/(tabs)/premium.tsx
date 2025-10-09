import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PremiumScreen() {
  const router = useRouter();
  const [premiumActiv, setPremiumActiv] = useState(false);

  const activeazaPremium = async () => {
    try {
      await AsyncStorage.setItem("premium", "true");
      setPremiumActiv(true);
      Alert.alert("💎 Premium activat", "Îți mulțumim pentru susținerea ta sinceră!");
    } catch (error) {
      console.error("Eroare la activarea premium:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💎 Lumina Vieții Premium</Text>
      <Text style={styles.subtitle}>
        O experiență completă, fără limitări. Susține aplicația și deblochează funcții speciale:
      </Text>

      {/* Lista de beneficii */}
      <View style={styles.benefits}>
        <Text style={styles.benefit}>🔥 Aprinde un număr nelimitat de lumânări</Text>
        <Text style={styles.benefit}>📿 Accesează rugăciuni extinse și audio</Text>
        <Text style={styles.benefit}>🕯️ Primești notificări la sărbători și zile de post</Text>
        <Text style={styles.benefit}>🌙 Interfață personalizată Premium</Text>
      </View>

      {/* Buton activare */}
      {!premiumActiv ? (
        <TouchableOpacity style={styles.activateButton} onPress={activeazaPremium}>
          <Text style={styles.activateText}>Activează Premium</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.activeBox}>
          <Text style={styles.activeText}>✅ Premium activ</Text>
        </View>
      )}

      {/* Revenire */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅️ Înapoi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf0", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  benefits: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },
  benefit: {
    fontSize: 16,
    color: "#222",
    marginBottom: 10,
  },
  activateButton: {
    backgroundColor: "#b8860b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  activateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  activeBox: {
    backgroundColor: "#e6ffe6",
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  activeText: {
    color: "#2e7d32",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
