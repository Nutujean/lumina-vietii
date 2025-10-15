import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneParinti() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru părinți</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, binecuvântează pe părinții mei, care mi-au
          dat viață cu voia Ta și care m-au crescut cu dragoste și osteneală.
          Răsplătește-le, Doamne, pentru toate jertfele lor și păzește-i întru
          sănătate, pace și îndelungă viețuire.
        </Text>

        <Text style={styles.prayerText}>
          Dă-le, Doamne, răbdare și înțelepciune, bucurie în inimă și credință
          tare, ca să-și ducă viața cu nădejde și cu pace sufletească.
        </Text>

        <Text style={styles.prayerText}>
          Iartă-le, Doamne, greșelile făcute din neputință sau neștiință și
          revarsă asupra lor binecuvântările Tale cele bogate. Fă-i să simtă
          mereu ocrotirea Ta și dragostea Ta cea nemărginită.
        </Text>

        <Text style={styles.prayerText}>
          Dacă au adormit întru nădejdea Învierii, odihnește-i, Doamne, în
          lumina și pacea Ta cerească, iar dacă sunt încă în viață, apără-i de
          primejdii și de tot răul.
        </Text>

        <Text style={styles.prayerText}>
          Ajută-mă, Doamne, să le fiu recunoscător, ascultător și plin de
          dragoste, în toate zilele vieții mele. Prin rugăciunile lor și prin
          mila Ta, mântuiește sufletul meu.
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
