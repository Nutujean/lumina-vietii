import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneSanatate() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru sănătate</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne Iisuse Hristoase, Doctorul sufletelor și al trupurilor noastre,
          vino cu milostivirea Ta asupra mea și asupra celor bolnavi din casa mea.
          Dă-ne, Doamne, sănătate trupească și sufletească, răbdare și nădejde
          în voia Ta cea sfântă.
        </Text>

        <Text style={styles.prayerText}>
          Tu, Care ai vindecat pe cei slabi, ai înviat pe cei morți și ai dat
          vedere orbilor, vindecă și durerile noastre, trupești și sufletești,
          și dă-ne puterea de a purta cu demnitate încercările vieții.
        </Text>

        <Text style={styles.prayerText}>
          Păzește-ne, Doamne, de boli și primejdii, de neliniște și deznădejde.
          Umple inimile noastre cu pace și credință, și întărește-ne ca să Te
          slăvim în toate zilele vieții noastre.
        </Text>

        <Text style={styles.prayerText}>
          Îți mulțumim, Doamne, pentru toate binefacerile Tale și pentru fiecare
          clipă în care ne dai putere și alinare. Fie voia Ta, Doamne, peste noi,
          acum și pururea și în vecii vecilor.
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
