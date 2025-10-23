import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

/** ---- CONTROL FIN: ajustează ușor dacă vrei micro-diferențe ---- */
const COLS = 3;
const PAD_H = 18;                 // padding lateral ecran
const GAP = 14;                   // spațiu între carduri
const CARD = Math.floor((width - PAD_H * 2 - GAP * (COLS - 1)) / COLS); // latura cardului
const ICON = Math.round(CARD * 0.69);      // mărimea iconului din card
const TEXT_FS = Math.round(CARD * 0.10);   // mărimea textului din card
const TITLE_FS = 36;                        // „Lumina Vieții” – mare, ca în poză
const SUBTITLE_FS = 10;
/** --------------------------------------------------------------- */

export default function HomeScreen() {
  const router = useRouter();
  const [temp, setTemp] = useState<number | null>(null);

  // Vreme – Oltenița
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=44.083&longitude=26.633&current_weather=true"
        );
        const data = await res.json();
        if (data?.current_weather?.temperature !== undefined) {
          setTemp(data.current_weather.temperature);
        }
      } catch {}
    })();
  }, []);

  const cards = [
    { title: "Calendar", image: require("../../assets/icons/calendar.png"), path: "/(tabs)/calendar" },
    {
      title: temp !== null ? `Vremea ${Math.round(temp)}°C` : "Vremea",
      image: require("../../assets/icons/vremea.png"),
      path: "/(tabs)/vremea",
    },
    { title: "Biblia", image: require("../../assets/icons/biblia.png"), path: "/(tabs)/biblia" },
    { title: "Notițe", image: require("../../assets/icons/notite.png"), path: "/(tabs)/notite" },
    { title: "Rugăciuni", image: require("../../assets/icons/rugaciuni.png"), path: "/(tabs)/rugaciuni" },
    { title: "Lumânare", image: require("../../assets/icons/lumanare.png"), path: "/(tabs)/lumanare" },
    { title: "Susține", image: require("../../assets/icons/sustine.png"), path: "/(tabs)/donatii" },
    { title: "Biserici", image: require("../../assets/icons/biserici.png"), path: "/(tabs)/biserici" },
    { title: "Contul meu", image: require("../../assets/icons/contulmeu.png"), path: "/(tabs)/contul-meu" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* header crem + titlu mare */}
      <View style={styles.headerWrap}>
        <Text style={styles.title}>Lumina Vieții</Text>
        <Text style={styles.subtitle}>Ghid de credință și speranță</Text>
      </View>

      {/* grilă 3×3 – cardul conține icon + text */}
      <View style={styles.grid}>
        {cards.map((c, i) => (
          <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => router.push(c.path as any)}>
            <LinearGradient
              colors={["#f6d36a", "#efb83c"]} // auriu saturat ca în poză
              start={{ x: 0.08, y: 0.08 }}
              end={{ x: 0.95, y: 0.95 }}
              style={styles.card}
            >
              <Image source={c.image} style={styles.icon} />
              <Text style={styles.cardText} numberOfLines={2}>{c.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* card „Rugăciunea Tatăl Nostru” */}
      <View style={styles.prayerBox}>
        <Text style={styles.prayerTitle}>Rugăciunea Tatăl Nostru</Text>
        <Text style={styles.prayerText}>
          Tatăl nostru care ești în ceruri, sfințească-se Numele Tău, vie împărăția Ta, facă-se voia Ta, precum în cer așa și pe pământ.
          Pâinea noastră cea de toate zilele dă-ne-o noua astazi si ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri.
          Amin.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff8e8", // crem cald pe tot ecranul
    alignItems: "center",
    paddingBottom: 28,
  },
  headerWrap: {
    width: "100%",
    backgroundColor: "#fff3d1", // bandă crem mai accentuată
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
  },
  title: {
    fontSize: TITLE_FS,
    fontWeight: "800",
    color: "#11235e", // albastru închis
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 6,
    fontSize: SUBTITLE_FS,
    color: "#666b78",
    fontWeight: "600",
  },

  grid: {
    marginTop: 14,
    paddingHorizontal: PAD_H,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: GAP,
    rowGap: GAP,
    justifyContent: "space-between",
  },
  card: {
    width: CARD,
    height: CARD,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  icon: {
    width: ICON,
    height: ICON,
    marginBottom: 6,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: TEXT_FS,          // mare – ca în poză
    lineHeight: TEXT_FS + 2,
    fontWeight: "800",
    color: "#11235e",
    textAlign: "center",
  },

  prayerBox: {
    width: width - 32,
    marginTop: 18,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  prayerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#11235e",
    marginBottom: 8,
  },
  prayerText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2d2d2d",
    textAlign: "justify",
  },
});

