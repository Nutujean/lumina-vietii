import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function RugaciuniScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificaPremium = async () => {
      try {
        const email = await SecureStore.getItemAsync("userEmail");
        if (!email) {
          setIsPremium(false);
          setLoading(false);
          return;
        }
        const res = await fetch(`${API_URL}/${email}`);
        const data = await res.json();
        setIsPremium(data.isPremium === true);
      } catch (err) {
        console.log("❌ Eroare verificare Premium:", err);
      } finally {
        setLoading(false);
      }
    };
    verificaPremium();
  }, []);

  const rugaciuniGratuite = [
    {
      titlu: "Tatăl Nostru",
      text: `Tatăl nostru care ești în ceruri,
sfințească-se Numele Tău,
vie împărăția Ta,
facă-se voia Ta,
precum în cer așa și pe pământ.
Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi
și ne iartă nouă greșelile noastre
precum și noi iertăm greșiților noștri.
Și nu ne duce pe noi în ispită,
ci ne izbăvește de cel rău. Amin.`,
    },
    {
      titlu: "Rugăciune de dimineață",
      text: `Doamne, Atotțiitorule, binecuvântează începutul zilei mele
și dă-mi putere să urmez voia Ta. Amin.`,
    },
  ];

  const categoriiPremium = [
    { titlu: "Rugăciuni pentru copii", path: "rugaciuni-copii" },
    { titlu: "Rugăciune pentru familie", path: "familie" },
    { titlu: "Rugăciune pentru sănătate", path: "sanatate" },
    { titlu: "Rugăciune pentru necazuri", path: "necazuri" },
    { titlu: "Rugăciune pentru părinți", path: "parinti" },
    { titlu: "Rugăciune de seară", path: "seara" },
    { titlu: "Rugăciune pentru examene", path: "examene" },
  ];

  const handlePremiumAccess = () => {
    Alert.alert(
      "Funcție Premium 💎",
      "Pentru a accesa această rugăciune, trebuie să devii membru Premium.",
      [
        { text: "Anulează", style: "cancel" },
        { text: "Devino Premium", onPress: () => router.push("/donatii") },
      ]
    );
  };

  const handleOpen = (path: string) => {
    if (isPremium) router.push(path);
    else handlePremiumAccess();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={styles.loadingText}>Se verifică accesul Premium...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciuni</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {rugaciuniGratuite.map((r, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{r.titlu}</Text>
            <Text style={styles.cardText}>{r.text}</Text>
          </View>
        ))}

        <View style={styles.premiumSection}>
          <Text style={styles.premiumTitle}>
            Rugăciuni speciale {isPremium ? "(Premium activ)" : "(doar pentru Premium)"}
          </Text>

          {categoriiPremium.map((cat, i) => (
            <TouchableOpacity key={i} style={styles.premiumItem} onPress={() => handleOpen(cat.path)}>
              <Ionicons
                name={isPremium ? "book-outline" : "lock-closed-outline"}
                size={22}
                color={isPremium ? "#1E2A78" : "#b8860b"}
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.premiumItemText, { color: isPremium ? "#1E2A78" : "#555" }]}>
                {cat.titlu}
              </Text>
            </TouchableOpacity>
          ))}

          {!isPremium && (
            <TouchableOpacity style={styles.unlockButton} onPress={handlePremiumAccess}>
              <Text style={styles.unlockText}>🔓 Activează Premium</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
  },
  loadingText: { marginTop: 10, color: "#1E2A78" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1E2A78",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E2A78",
    marginBottom: 8,
    textAlign: "center",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    textAlign: "center",
  },
  premiumSection: {
    backgroundColor: "#fff9e6",
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#F9C846",
  },
  premiumTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E2A78",
    textAlign: "center",
    marginBottom: 10,
  },
  premiumItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  premiumItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  unlockButton: {
    backgroundColor: "#1E2A78",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  unlockText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
