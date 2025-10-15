import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RugaciuneFamilie() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rugăciune pentru familie</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔹 Conținut */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prayerText}>
          Doamne, Iisuse Hristoase, Cel ce ai binecuvântat nunta din Cana
          Galileii și ai sfințit legătura dintre bărbat și femeie, binecuvântează
          și familia mea, pe toți cei ce locuim sub același acoperiș.
        </Text>

        <Text style={styles.prayerText}>
          Revarsă peste noi pacea și dragostea Ta cea sfântă, înțelegerea și
          răbdarea, ca să putem trăi uniți și în armonie. Îndepărtează din casa
          noastră certurile, mânia și necazurile, și ne întărește în iubire
          curată și jertfelnică.
        </Text>

        <Text style={styles.prayerText}>
          Dă-ne, Doamne, înțelepciune ca părinți, ascultare și bunătate ca fii,
          și ajută-ne ca prin toate să Te slăvim pe Tine, Cel ce ești începutul
          și sfârșitul iubirii adevărate.
        </Text>

        <Text style={styles.prayerText}>
          Ocrotește-i pe toți membrii familiei noastre, pe cei de aproape și pe
          cei de departe. Ferește-i de primejdii, de boli și de ispite, și
          păzește casa noastră în pace și credință.
        </Text>

        <Text style={styles.prayerText}>
          Îți mulțumim, Doamne, pentru darul familiei și pentru dragostea ce ne
          unește. Fă ca fiecare zi petrecută împreună să fie un pas mai aproape
          de Tine și de împărăția Ta.
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
