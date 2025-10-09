import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function PoliticaConfidentialitate() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Înapoi</Text>
      </TouchableOpacity>

      <Text style={styles.title}>📜 Politica de confidențialitate</Text>

      <Text style={styles.text}>
        Aplicația <Text style={styles.bold}>Lumina Vieții</Text> respectă
        confidențialitatea utilizatorilor și protejează datele personale în
        conformitate cu legislația în vigoare (GDPR - Regulamentul UE 2016/679).
      </Text>

      <Text style={styles.subtitle}>1. Ce date colectăm</Text>
      <Text style={styles.text}>
        Nu colectăm date personale sensibile. Aplicația poate solicita permisiuni
        pentru notificări și acces la internet doar pentru funcționarea corectă
        (calendar, actualizări, rugăciuni și conținut informativ).
      </Text>

      <Text style={styles.subtitle}>2. Cum sunt folosite datele</Text>
      <Text style={styles.text}>
        Datele introduse (ex. nume pentru aprinderea unei lumânări) sunt folosite
        doar local în aplicație și nu sunt trimise către niciun server extern.
      </Text>

      <Text style={styles.subtitle}>3. Securitatea datelor</Text>
      <Text style={styles.text}>
        Toate datele rămân stocate pe dispozitivul tău. Nu transmitem, nu vindem
        și nu partajăm informațiile tale către terți.
      </Text>

      <Text style={styles.subtitle}>4. Contact</Text>
      <Text style={styles.text}>
        Pentru întrebări sau solicitări legate de confidențialitate, ne poți
        contacta la:{" "}
        <Text style={styles.bold}>contact@luminavietii.ro</Text>
      </Text>

      <Text style={styles.footer}>
        Ultima actualizare: Octombrie 2025
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf0", padding: 20 },
  back: { fontSize: 18, color: "#007AFF", marginBottom: 20, fontWeight: "600" },
  title: { fontSize: 24, color: "#b8860b", fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", color: "#333", marginTop: 15 },
  text: { fontSize: 16, color: "#444", lineHeight: 22, marginTop: 5 },
  bold: { fontWeight: "bold", color: "#b8860b" },
  footer: { textAlign: "center", color: "#777", marginTop: 30, fontSize: 14 },
});
