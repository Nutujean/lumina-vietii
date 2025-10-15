import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneDimineata() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune de dimineață</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, îți mulțumesc că m-ai trezit la o nouă zi
          sub ocrotirea Ta. Binecuvântează începutul acestei zile și luminează-mi
          mintea, inima și pașii, ca tot ce voi face să fie spre slava Ta și
          spre binele celor din jurul meu.
        </Text>

        <Text style={styles.prayerText}>
          Dă-mi, Doamne, înțelepciune și putere să urmez voia Ta, curăție a
          inimii și răbdare în toate încercările. Păzește-mă de ispite, de rău
          și de gânduri necurate.
        </Text>

        <Text style={styles.prayerText}>
          Ajută-mă să fiu blând cu cei din jur, răbdător în necazuri și recunoscător
          pentru fiecare dar pe care mi-l dăruiești. Fă ca ziua de astăzi să fie
          plină de pace, credință și fapte bune.
        </Text>

        <Text style={styles.prayerText}>
          Fii cu mine, Doamne, în tot ce voi lucra, în tot ce voi spune și în tot
          ce voi gândi, ca să nu mă abat de la calea adevărului Tău.
        </Text>

        <Text style={styles.prayerText}>
          Îți mulțumesc, Doamne, pentru dragostea Ta nesfârșită, pentru lumină,
          pentru aer, pentru viață și pentru toate binefacerile Tale.
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
