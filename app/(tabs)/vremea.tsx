// app/(tabs)/vremea.tsx
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VremeaScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API_KEY = "8f6e4df06f7fefcb2b64cb2c4a9e3a92"; // OpenWeatherMap test key

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Accesul la locație a fost refuzat.");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ro&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setErrorMsg("Nu s-a putut obține prognoza meteo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră identică cu celelalte pagini */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vremea</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#1E2A78" />
        ) : errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : weather && weather.main ? (
          <View style={styles.weatherCard}>
            <Text style={styles.cityName}>{weather.name || "Locație necunoscută"}</Text>
            <Text style={styles.temp}>
              {weather.main?.temp ? `${Math.round(weather.main.temp)}°C` : "--°C"}
            </Text>
            <Text style={styles.desc}>
              {weather.weather?.[0]?.description || "Fără descriere"}
            </Text>

            <View style={styles.detailsRow}>
              <Text style={styles.detail}>
                💨 Vânt: {weather.wind?.speed ?? "?"} m/s
              </Text>
              <Text style={styles.detail}>
                💧 Umiditate: {weather.main?.humidity ?? "?"}%
              </Text>
            </View>

            <Text style={styles.detailSmall}>
              🌡️ Max:{" "}
              {weather.main?.temp_max ? Math.round(weather.main.temp_max) : "--"}°C | Min:{" "}
              {weather.main?.temp_min ? Math.round(weather.main.temp_min) : "--"}°C
            </Text>
          </View>
        ) : (
          <Text style={styles.error}>Nu s-au găsit date despre vreme.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },

  // 🔹 Bară identică cu Rugăciuni / Notițe
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A78",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    left: 12,
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  cityName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A78",
    marginBottom: 6,
  },

  temp: {
    fontSize: 48,
    fontWeight: "900",
    color: "#b8860b",
  },

  desc: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    textTransform: "capitalize",
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },

  detail: {
    fontSize: 15,
    color: "#1E2A78",
  },

  detailSmall: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },

  error: {
    textAlign: "center",
    color: "#B22222",
    fontSize: 16,
    marginTop: 20,
  },
});
