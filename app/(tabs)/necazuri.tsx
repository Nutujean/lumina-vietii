import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneNecazuri() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru necazuri</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, Tu ești ajutorul celor necăjiți și mângâierea
          celor întristați. Vezi durerea și slăbiciunea mea și nu mă lăsa singur
          în greutățile care mă apasă.
        </Text>

        <Text style={styles.prayerText}>
          Dă-mi, Doamne, puterea să port crucea mea cu răbdare și credință.
          Luminează-mi mintea, ca să înțeleg că și necazurile sunt trimise spre
          îndreptare și mântuire.
        </Text>

        <Text style={styles.prayerText}>
          Tu, Cel ce ai suferit pentru noi pe Cruce, șterge lacrimile mele și
          alin-mi durerea inimii. Nu mă lăsa, Doamne, să cad în deznădejde,
          ci ridică-mă prin harul Tău.
        </Text>

        <Text style={styles.prayerText}>
          Fii alături de toți cei aflați în suferință, în lipsuri sau singurătate.
          Umple inimile noastre de pace, nădejde și credință, ca să Te slăvim în
          toate zilele vieții noastre.
        </Text>

        <Text style={styles.prayerText}>
          Fă, Doamne, ca din încercările acestea să ieșim mai buni, mai curați și
          mai aproape de Tine, iar pacea Ta cea sfântă să rămână pururea în noi.
        </Text>

        <Text style={[styles.prayerText, { fontWeight: "700", marginTop: 10 }]}>
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
