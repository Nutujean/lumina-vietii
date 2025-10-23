import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const API_KEY = "5eba6a691658771bc5536af90562b04c";

export default function VremeaScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // 🔹 Permisiune locație
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permisiunea pentru locație a fost refuzată.");
          setLoading(false);
          return;
        }

        // 🔹 Obține locația curentă
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // 🔹 Vreme actuală
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ro&appid=${API_KEY}`
        );
        const data = await res.json();
        console.log("✅ weather =", data);
        if (!res.ok || !data.main)
          throw new Error(data.message || "Eroare la datele meteo.");
        setWeather(data);

        // 🔹 Prognoză 5 zile
        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=ro&appid=${API_KEY}`
        );
        const dataForecast = await resForecast.json();
        console.log("✅ forecast =", dataForecast);

        if (!resForecast.ok || !dataForecast.list)
          throw new Error(
            dataForecast.message ||
              "Eroare la preluarea prognozei meteo (list lipsă)."
          );

        const uniqueDays: Record<string, any> = {};
        dataForecast.list.forEach((entry: any) => {
          const date = new Date(entry.dt_txt);
          const day = date.toISOString().split("T")[0];
          if (date.getHours() === 12 && !uniqueDays[day]) {
            uniqueDays[day] = entry;
          }
        });
        setForecast(Object.values(uniqueDays).slice(0, 5));
      } catch (err: any) {
        console.log("❌ Detalii eroare:", err);
        setError(err.message || "Eroare la preluarea datelor meteo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Loading
  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF8E1",
        }}
      >
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={{ marginTop: 0.8, color: "#1E2A78" }}>
          Se încarcă vremea...
        </Text>
      </View>
    );

  // 🔹 Eroare
  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF8E1",
          padding: 20,
        }}
      >
        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );

  // 🔹 Afișare vreme + prognoză
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔷 Bara albastră + buton galben */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
          elevation: 3,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            padding: 6,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
          Vremea
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔸 Conținut */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingVertical: 25,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1E2A78",
            textAlign: "center",
          }}
        >
          {weather?.name || "Locația ta"}
        </Text>

        {/* 🔹 Temperatura principală */}
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: "#F9C846",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontSize: 48,
              fontWeight: "800",
              color: "#1E2A78",
              marginVertical: 6,
            }}
          >
            {Math.round(weather?.main?.temp)}°C
          </Text>
          <Text style={{ fontSize: 18, color: "#333" }}>
            {weather?.weather?.[0]?.description}
          </Text>
        </View>

        {/* 🔹 Prognoză 5 zile */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E2A78",
            marginBottom: 10,
          }}
        >
          Prognoză 5 zile
        </Text>

        {forecast.map((day: any, i) => {
          const date = new Date(day.dt_txt);
          const dayName = date.toLocaleDateString("ro-RO", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 10,
                padding: 12,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: "#F9C846",
              }}
            >
              <Text style={{ fontSize: 16, color: "#1E2A78", flex: 1 }}>
                {dayName}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
                }}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{
                  color: "#333",
                  width: 90,
                  textAlign: "right",
                }}
              >
                {Math.round(day.main.temp_min)}° /{" "}
                <Text style={{ fontWeight: "700" }}>
                  {Math.round(day.main.temp_max)}°C
                </Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
