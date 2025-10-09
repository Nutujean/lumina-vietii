import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SustineScreen() {
  const router = useRouter();
  const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("isPremium").then((val) => {
      setPremium(val === "true");
    });
  }, []);

  const donatii = [
    {
      titlu: "🙏 Susținător",
      suma: "10 lei",
      descriere: "Poți aprinde până la 5 lumânări zilnic.",
      mesaj:
        "Această contribuție ne ajută să păstrăm aplicația gratuită pentru toți.",
      culoare: "#FFD700",
      link: "https://revolut.me/p/Zwx3OJmjhr",
    },
    {
      titlu: "✨ Credincios",
      suma: "20 lei",
      descriere:
        "Lumânări nelimitate, rugăciuni zilnice și acces prioritar la noutăți.",
      mesaj:
        "Sprijinul tău ne permite să adăugăm conținut nou și să îmbunătățim aplicația.",
      culoare: "#FFA500",
      link: "https://revolut.me/p/Zwx3OJmjhr",
    },
    {
      titlu: "💖 Binefăcător",
      suma: "50 lei",
      descriere:
        "Lumânări nelimitate + recunoștință specială în aplicație și în paginile de rugăciuni.",
      mesaj:
        "Prin generozitatea ta, „Lumina Vieții” va ajunge la cât mai mulți credincioși.",
      culoare: "#FF4500",
      link: "https://revolut.me/p/Zwx3OJmjhr",
    },
  ];

  const handleDonate = async (link: string) => {
  await AsyncStorage.setItem("isPremium", "true");

  // ✅ trimitem și pe serverul online
  const email = "user@example.com"; // deocamdată e generic
  await fetch(`${API_URL}/premium`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, isPremium: true }),
  });

  Alert.alert(
    "🙏 Mulțumim!",
    "Sprijinul tău ajută la menținerea aplicației și la dezvoltarea conținutului pentru comunitatea de credincioși.",
    [
      {
        text: "Deschide Revolut",
        onPress: () => Linking.openURL(link),
      },
      {
        text: "Anulează",
        style: "cancel",
      },
    ]
  );
};

  const handleReset = async () => {
    await AsyncStorage.removeItem("isPremium");
    setPremium(false);
    Alert.alert("Cont resetat", "Ai revenit la versiunea gratuită.");
  };

  return (
    <ScrollView style={{ backgroundColor: "#fffaf0" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>

        <Text style={styles.title}>💖 Susține aplicația</Text>
        <Text style={styles.subtitle}>
          Mulțumim din inimă pentru sprijinul tău! Ajutorul tău menține „Lumina Vieții”
          vie pentru toți cei care se roagă cu credință.
        </Text>

        {premium && (
          <View style={styles.premiumBox}>
            <Text style={styles.premiumTitle}>🌟 Cont Premium activ</Text>
            <Text style={styles.premiumText}>
              Ai acces complet la toate capitolele din Biblie și funcțiile speciale!
            </Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <Text style={styles.resetText}>Revocă Premium</Text>
            </TouchableOpacity>
          </View>
        )}

        {!premium &&
          donatii.map((d, index) => (
            <View key={index} style={[styles.card, { borderColor: d.culoare }]}>
              <Text style={[styles.cardTitle, { color: d.culoare }]}>{d.titlu}</Text>
              <Text style={styles.cardSum}>{d.suma}</Text>
              <Text style={styles.cardText}>{d.descriere}</Text>
              <Text style={styles.cardMessage}>{d.mesaj}</Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: d.culoare }]}
                onPress={() => handleDonate(d.link)}
              >
                <Text style={styles.buttonText}>Donează acum</Text>
              </TouchableOpacity>
            </View>
          ))}

        <Text style={styles.footerText}>
          🙏 „Dumnezeu să răsplătească pe fiecare dătător de bunăvoie.”
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  backButton: { alignSelf: "flex-start", marginBottom: 15 },
  backText: { color: "#003366", fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 26, fontWeight: "bold", color: "#b8860b", marginBottom: 15 },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  premiumBox: {
    backgroundColor: "#fff7d1",
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFD700",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  premiumTitle: { fontSize: 20, fontWeight: "bold", color: "#9A3412", marginBottom: 10 },
  premiumText: { textAlign: "center", color: "#333", fontSize: 16, marginBottom: 10 },
  resetBtn: {
    backgroundColor: "#888",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  resetText: { color: "white", fontWeight: "bold" },
  card: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  cardSum: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
  cardText: { fontSize: 16, color: "#555", marginBottom: 10 },
  cardMessage: { fontSize: 14, color: "#666", fontStyle: "italic", marginBottom: 15 },
  button: { paddingVertical: 10, borderRadius: 10 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" },
  footerText: {
    fontSize: 16,
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
