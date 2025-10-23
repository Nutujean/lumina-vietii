import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AbonamentScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const status = await AsyncStorage.getItem("isPremium");
      setIsPremium(status === "true");
      setLoading(false);
    })();
  }, []);

  const activatePremium = async () => {
    try {
      await AsyncStorage.setItem("isPremium", "true");
      router.push("/(tabs)/premium-succes");
    } catch (err) {
      Alert.alert("Eroare", "A apărut o problemă la activare. Încearcă din nou.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF8E1", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={{ marginTop: 10, color: "#1E2A78" }}>Se verifică statusul contului...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara superioară */}
      <View
        style={{
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
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            borderRadius: 50,
            padding: 6,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>‹</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Susține aplicația</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* 🔸 Conținut principal */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        <Text
          style={{
            color: "#1E2A78",
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Mulțumim că susții aplicația Lumina Vieții ✨
        </Text>

        <Text style={{ color: "#333", textAlign: "center", fontSize: 16, marginBottom: 20 }}>
          Versiunea Premium te ajută să te apropii mai mult de credință, având acces complet la conținutul spiritual.
        </Text>

        {/* 🔹 Beneficii Premium */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#F9C846",
            padding: 20,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E2A78", marginBottom: 10 }}>
            Ce primești cu Premium:
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 8 }}>✅ Toate rugăciunile speciale (copii, familie, sănătate...)</Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>✅ Biblia completă (Noul și Vechiul Testament)</Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>✅ Posibilitatea de a aprinde mai multe lumânări</Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>✅ Acces nelimitat la notițe spirituale</Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>✅ Sprijini direct dezvoltarea aplicației fără reclame</Text>
        </View>

        {/* 🔸 Stare cont */}
        {isPremium ? (
          <View
            style={{
              backgroundColor: "#DFF0D8",
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#2E7D32", fontSize: 18, fontWeight: "700" }}>
              🕊️ Ai deja cont Premium activ!
            </Text>
            <Text style={{ color: "#2E7D32", marginTop: 5 }}>
              Bucură-te de întreaga experiență Lumina Vieții!
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#1E2A78",
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 15,
              }}
            >
              Alege una dintre opțiunile de susținere:
            </Text>

            <TouchableOpacity
              onPress={activatePremium}
              style={{
                backgroundColor: "#F9C846",
                paddingVertical: 14,
                borderRadius: 12,
                width: "80%",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#1E2A78", fontWeight: "700", fontSize: 16 }}>
                Activează Premium (19,99 lei/lună)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert("Plată Revolut", "Poți dona direct prin Revolut: revolut.me/p/Zwx3OJmjhr")
              }
              style={{
                backgroundColor: "#1E2A78",
                paddingVertical: 14,
                borderRadius: 12,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                Donație unică prin Revolut 💛
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
