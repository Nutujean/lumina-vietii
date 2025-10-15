import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneExamene() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru examene</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, izvor al înțelepciunii și al cunoașterii,
          luminează mintea mea și ajută-mă să folosesc darurile pe care mi le-ai
          dăruit. Întărește-mă în vremea examenelor, ca să pot răspunde cu minte
          limpede și cu inimă liniștită.
        </Text>

        <Text style={styles.prayerText}>
          Dă-mi, Doamne, putere să nu mă tem și să nu mă tulbur, ci să am
          încredere că Tu ești cu mine și mă povățuiești în tot ceea ce fac.
          Îndepărtează de la mine grija cea rea, lenevirea și uitarea.
        </Text>

        <Text style={styles.prayerText}>
          Trimite asupra mea Duhul Tău cel Sfânt, ca să-mi lumineze mintea și
          să-mi îndrume cugetul spre adevăr, pentru ca tot ceea ce voi spune și
          voi face să fie spre slava Ta și spre binele meu.
        </Text>

        <Text style={styles.prayerText}>
          Fă, Doamne, ca roadele învățăturii mele să fie binecuvântate și să-mi
          aducă bucurie și împlinire, iar dacă voi greși, să mă ridic cu
          nădejde și să învăț din nou cu răbdare.
        </Text>

        <Text style={styles.prayerText}>
          Dă-mi, Doamne, minte curată, suflet smerit și inimă recunoscătoare
          pentru toate binefacerile Tale.
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
