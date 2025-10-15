import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneCopii() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru copii</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținutul */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, Fiule al lui Dumnezeu, binecuvântează pe copiii noștri,
          lumina ochilor noștri și bucuria inimilor noastre.
        </Text>

        <Text style={styles.prayerText}>
          Dă-le lor înțelepciune și blândețe, iubire de Tine și de oameni,
          curăție a inimii și bucurie în faptele bune.
        </Text>

        <Text style={styles.prayerText}>
          Păzește-i, Doamne, de primejdii, de boli, de ispite și de tot răul cel din lume.
          Întărește-i în credință, în nădejde și în dragoste.
        </Text>

        <Text style={styles.prayerText}>
          Fă-i ascultători de părinți, respectuoși față de dascăli și binevoitori către toți oamenii.
          Umple inimile lor de pace și de lumină.
        </Text>

        <Text style={styles.prayerText}>
          Iar pe noi, părinții lor, ne învață să fim pildă bună și sprijin neclintit pentru sufletele lor.
          Ajută-ne să-i creștem în frica și dragostea Ta, pentru ca prin ei să se slăvească Numele Tău.
        </Text>

        <Text style={[styles.prayerText, { marginTop: 10, fontWeight: "700" }]}>
          Amin.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },

  // 🔵 Bara albastră cu buton galben
  header: {
    backgroundColor: "#1E2A78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
  },
  backButton: {
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  // 📖 Conținut
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  prayerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#1E2A78",
    textAlign: "center",
    marginBottom: 12,
  },
});
