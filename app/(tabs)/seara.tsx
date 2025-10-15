import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneSeara() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune de seară</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, mulțumescu-Ți pentru ziua care a trecut și
          pentru toate binefacerile pe care mi le-ai dăruit. Fii binecuvântat
          pentru că m-ai ocrotit și mi-ai dat puterea să ajung cu pace la
          sfârșitul acestei zile.
        </Text>

        <Text style={styles.prayerText}>
          Iartă, Doamne, toate greșelile pe care le-am făcut astăzi cu gândul,
          cuvântul sau fapta. Curățește-mă de tot ce am greșit din slăbiciune și
          dă-mi liniște sufletului meu.
        </Text>

        <Text style={styles.prayerText}>
          Păzește-mă, Doamne, în această noapte de toată primejdia și de
          ispitele celui rău. Trimite îngerii Tăi să vegheze asupra mea, asupra
          casei mele și asupra tuturor celor dragi.
        </Text>

        <Text style={styles.prayerText}>
          Dă-mi, Doamne, somn odihnitor și minte liniștită, pentru ca mâine să
          mă pot trezi cu putere, bucurie și recunoștință, ca să Te slăvesc din
          nou pentru toate binecuvântările Tale.
        </Text>

        <Text style={styles.prayerText}>
          În mâinile Tale, Doamne, îmi încredințez viața, trupul și sufletul.
          Fie voia Ta peste mine și peste toată lumea Ta.
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
