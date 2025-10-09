import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function DespreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Buton înapoi */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Înapoi</Text>
      </TouchableOpacity>

      {/* Logo aplicație */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>Lumina Vieții</Text>
      </View>

      {/* Text introductiv */}
      <Text style={styles.text}>
        Aplicația <Text style={styles.bold}>Lumina Vieții</Text> a fost creată
        cu scopul de a aduce liniște sufletească și un loc de rugăciune în
        mediul digital. Este dedicată tuturor celor care își doresc un moment de
        reculegere, speranță și credință.
      </Text>

      {/* Citat frumos */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.quote}>
          „Lumina credinței nu se stinge niciodată, ea se aprinde din inimă în inimă.”
        </Text>
        <Text style={styles.quoteAuthor}>– Necunoscut</Text>
      </View>

      {/* Secțiune despre */}
      <Text style={styles.subtitle}>📖 Ce oferă aplicația</Text>
      <Text style={styles.text}>
        • Calendar ortodox actualizat zilnic {"\n"}
        • Rugăciuni pentru toate momentele vieții {"\n"}
        • Lumânare virtuală pentru vii și adormiți {"\n"}
        • Notițe spirituale {"\n"}
        • Conținut premium pentru susținători {"\n"}
      </Text>

      {/* Autor */}
      <Text style={styles.subtitle}>👤 Autor</Text>
      <Text style={styles.text}>
        Realizată cu pasiune de <Text style={styles.bold}>Florin Jean</Text>,
        dezvoltator independent, cu dorința de a aduce credința mai aproape de oameni.
      </Text>

      {/* Contact */}
      <Text style={styles.subtitle}>📬 Contact</Text>
      <Text style={styles.text}>
        Email: <Text style={styles.bold}>contact@luminavietii.ro</Text>
      </Text>

      {/* Versiune */}
      <Text style={styles.footer}>Versiunea 1.0.0 © 2025 Lumina Vieții</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf0", padding: 20 },
  back: { fontSize: 18, color: "#007AFF", marginBottom: 15, fontWeight: "600" },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 90, height: 90, marginBottom: 10, borderRadius: 20 },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#b8860b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  text: { fontSize: 16, color: "#444", lineHeight: 22, marginTop: 8 },
  bold: { fontWeight: "bold", color: "#b8860b" },
  quoteContainer: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#b8860b",
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  quoteMark: {
    fontSize: 32,
    color: "#b8860b",
    fontWeight: "bold",
    position: "absolute",
    top: -10,
    left: 10,
  },
  quote: { fontSize: 16, fontStyle: "italic", color: "#333", marginTop: 10 },
  quoteAuthor: { textAlign: "right", color: "#555", marginTop: 8 },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginTop: 30,
  },
});
