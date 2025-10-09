import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // pentru iconița aurie 💎

export default function ContScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fffaf0" }}>
      {/* 🔹 Bara de sus cu titlu și buton Premium */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contul meu</Text>
        <TouchableOpacity onPress={() => router.push("/sustine")} style={styles.premiumIconContainer}>
          <Ionicons name="diamond" size={26} color="#d4af37" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Secțiune: informații utilizator */}
        <View style={styles.profileSection}>
          <Image source={require("../../assets/icon.png")} style={styles.avatar} />
          <Text style={styles.username}>Utilizator anonim</Text>
          <Text style={styles.info}>Conectat în modul vizitator</Text>
        </View>

        {/* Secțiune: opțiuni cont */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Setări cont</Text>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Editează profilul</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Schimbă parola</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Ieși din cont</Text>
          </TouchableOpacity>
        </View>

        {/* 🔸 Secțiune Premium */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💎 Susține aplicația</Text>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() => router.push("/sustine")}
          >
            <Text style={styles.premiumButtonText}>Activează Premium</Text>
          </TouchableOpacity>
          <Text style={styles.premiumNote}>
            Accesează funcții speciale și susține dezvoltarea aplicației Lumina Vieții.
          </Text>
        </View>

        {/* Politici și informații */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📜 Politici & Informații</Text>

          <TouchableOpacity onPress={() => router.push("/politica-confidentialitate")}>
            <Text style={styles.linkText}>Politica de confidențialitate</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/termeni")}>
            <Text style={styles.linkText}>Termeni și condiții</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/despre")}>
            <Text style={styles.linkText}>Despre aplicație</Text>
          </TouchableOpacity>
        </View>

        {/* Footer versiune */}
        <Text style={styles.footer}>Versiunea 1.0.0 © 2025 Lumina Vieții</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003366",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  premiumIconContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  scrollContent: { padding: 20 },
  profileSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold", color: "#333" },
  info: { color: "#777", fontSize: 14, marginTop: 4 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#003366", marginBottom: 10 },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionText: { fontSize: 16, color: "#333" },
  premiumButton: {
    backgroundColor: "#b8860b",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  premiumButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  premiumNote: {
    color: "#555",
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
});
