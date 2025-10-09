import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TermeniSiConditii() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Înapoi</Text>
      </TouchableOpacity>

      <Text style={styles.title}>⚖️ Termeni și condiții</Text>

      <Text style={styles.text}>
        Utilizarea aplicației <Text style={styles.bold}>Lumina Vieții</Text> implică
        acceptarea prezentelor termeni și condiții.
      </Text>

      <Text style={styles.subtitle}>1. Scopul aplicației</Text>
      <Text style={styles.text}>
        Aplicația oferă conținut spiritual, rugăciuni și posibilitatea de a
        aprinde simbolic lumânări virtuale. Scopul este de a sprijini rugăciunea
        și reflecția personală.
      </Text>

      <Text style={styles.subtitle}>2. Utilizarea responsabilă</Text>
      <Text style={styles.text}>
        Utilizatorii sunt rugați să folosească aplicația într-un mod respectuos,
        fără abuzuri, fără conținut jignitor și fără utilizări comerciale.
      </Text>

      <Text style={styles.subtitle}>3. Servicii premium</Text>
      <Text style={styles.text}>
        Accesul la funcții suplimentare (ex: mai multe lumânări, conținut audio)
        este opțional și presupune o contribuție voluntară prin sistemele
        integrate (ex: Revolut, Stripe).
      </Text>

      <Text style={styles.subtitle}>4. Limitarea răspunderii</Text>
      <Text style={styles.text}>
        Dezvoltatorul aplicației nu este responsabil pentru erori de funcționare
        cauzate de factori externi (internet, dispozitiv, setări locale).
      </Text>

      <Text style={styles.subtitle}>5. Contact</Text>
      <Text style={styles.text}>
        Pentru întrebări, sesizări sau sugestii:{" "}
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
