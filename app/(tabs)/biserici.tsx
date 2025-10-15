import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
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
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

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

  // 🔹 Deschide Google Maps pentru navigare
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
        <Text style={styles.headerTitle}>Harta bisericilor apropiate</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading || !region ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#b8860b" />
          <Text style={{ color: "#555", marginTop: 10 }}>
            Se încarcă harta și locațiile...
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* 🔹 Marker pentru fiecare biserică */}
          {churches.map((ch, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: ch.lat, longitude: ch.lon }}
              title={ch.tags?.name || "Biserică"}
              description="Apasă pentru navigare"
              onCalloutPress={() => openMaps(ch.lat, ch.lon)}
              pinColor="#1E2A78"
            />
          ))}
        </MapView>
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
  map: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
