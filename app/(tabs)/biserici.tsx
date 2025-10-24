import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
// import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

export default function BisericiScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<any>(null);
  const [churches, setChurches] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // 🔹 Cerem permisiune pentru locație
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permisiune necesară", "Te rog permite accesul la locație.");
          setLoading(false);
          return;
        }

        // 🔹 Obținem coordonatele curente
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({ latitude, longitude });

        // 🔹 Căutăm biserici în raza de 5 km (5000m)
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=place_of_worship];out;`;
        const response = await fetch(overpassUrl);
        const data = await response.json();

        const filtered = data.elements.filter((el: any) => el.lat && el.lon);
        setChurches(filtered);
      } catch (error) {
        console.error(error);
        Alert.alert("Eroare", "Nu s-au putut încărca bisericile din apropiere.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openMaps = (lat: number, lon: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    Linking.canOpenURL(url)
      .then((supported) => supported && Linking.openURL(url))
      .catch(() =>
        Alert.alert("Eroare", "Nu s-a putut deschide Google Maps pe acest dispozitiv.")
      );
  };

  return (
    <View style={styles.container}>
      {/* 🔵 Bara albastră */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biserici din apropiere</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#b8860b" />
          <Text style={{ color: "#555", marginTop: 10 }}>
            Se caută bisericile din apropiere...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {churches.length > 0 ? (
            churches.map((ch, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => openMaps(ch.lat, ch.lon)}
              >
                <Ionicons name="location" size={22} color="#1E2A78" />
                <Text style={styles.cardText}>
                  {ch.tags?.name || "Biserică neidentificată"}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "#555", marginTop: 30, textAlign: "center" }}>
              Nu s-au găsit biserici în apropiere.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },
  header: {
    backgroundColor: "#1E2A78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  backButton: {
    backgroundColor: "#F9C846",
    padding: 6,
    borderRadius: 50,
  },
  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
