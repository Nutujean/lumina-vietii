import { View, Text, Pressable, Alert, ScrollView, Linking } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function AbonamentScreen() {
  const router = useRouter();

  // 🔹 funcție pentru deschiderea linkului Revolut și activare Premium
  const handleDonate = async (suma: number, plan: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const url = `https://revolut.me/p/Zwx3OJmjhr/${suma}`;
    Linking.openURL(url);

    try {
      const email = "utilizator@exemplu.ro"; // înlocuiește ulterior cu email real
      const res = await fetch(`${API_URL}/premium`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isPremium: true, plan }),
      });
      if (res.ok) {
        Alert.alert(
          "✨ Mulțumim!",
          `Ai activat planul ${plan}. Contul tău va deveni Premium după confirmarea plății.`,
          [{ text: "OK", onPress: () => router.push("cont") }]
        );
      } else {
        Alert.alert("Eroare", "Nu s-a putut actualiza abonamentul.");
      }
    } catch (err) {
      Alert.alert("Eroare", "Verifică conexiunea la internet.");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF8E1" }}
      contentContainerStyle={{ alignItems: "center", paddingVertical: 30 }}
    >
      {/* 🔙 Buton Înapoi */}
      <View style={{ width: "100%", paddingHorizontal: 15, marginBottom: 10 }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#fff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            alignSelf: "flex-start",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2A78" />
          <Text style={{ color: "#1E2A78", fontWeight: "600" }}>Înapoi</Text>
        </Pressable>
      </View>

      {/* Titlu */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          color: "#1E2A78",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Devino membru Premium 🌟
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          color: "#444",
          width: "85%",
          marginBottom: 25,
        }}
      >
        Susține aplicația și bucură-te de funcții speciale:
        {"\n"}• lumânări nelimitate{"\n"}• rugăciuni zilnice Premium{"\n"}• notificări{"\n"}• teme exclusive
      </Text>

      {/* CARDURI PLANURI */}
      <View style={{ width: "90%", gap: 18 }}>
        {/* Lunar */}
        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 16,
            padding: 20,
            borderWidth: 2,
            borderColor: "#F9C846",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1E2A78" }}>
            🌿 Plan Lunar
          </Text>
          <Text style={{ fontSize: 32, fontWeight: "900", color: "#1E2A78", marginVertical: 8 }}>
            19,99 lei
          </Text>
          <Text style={{ color: "#666", marginBottom: 10 }}>Valabil 30 de zile</Text>
          <Pressable
            onPress={() => handleDonate(19.99, "Lunar")}
            style={{
              backgroundColor: "#F9C846",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ color: "#1E2A78", fontWeight: "700" }}>Activează</Text>
          </Pressable>
        </View>

        {/* 3 Luni */}
        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 16,
            padding: 20,
            borderWidth: 2,
            borderColor: "#F9C846",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1E2A78" }}>
            🌸 Plan 3 Luni
          </Text>
          <Text style={{ fontSize: 32, fontWeight: "900", color: "#1E2A78", marginVertical: 8 }}>
            49,99 lei
          </Text>
          <Text style={{ color: "#666", marginBottom: 10 }}>Valabil 90 de zile</Text>
          <Pressable
            onPress={() => handleDonate(49.99, "3 Luni")}
            style={{
              backgroundColor: "#F9C846",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ color: "#1E2A78", fontWeight: "700" }}>Activează</Text>
          </Pressable>
        </View>

        {/* Pe viață */}
        <View
          style={{
            backgroundColor: "#FFF7D4",
            borderRadius: 20,
            padding: 25,
            borderWidth: 3,
            borderColor: "#F9C846",
            alignItems: "center",
            shadowColor: "#F9C846",
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#1E2A78" }}>
            🌞 Pe viață
          </Text>
          <Text style={{ fontSize: 36, fontWeight: "900", color: "#1E2A78", marginVertical: 8 }}>
            99 lei
          </Text>
          <Text style={{ color: "#666", marginBottom: 10 }}>Plată unică, acces permanent</Text>
          <Pressable
            onPress={() => handleDonate(99, "Pe viață")}
            style={{
              backgroundColor: "#F9C846",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 40,
            }}
          >
            <Text style={{ color: "#1E2A78", fontWeight: "800" }}>Activează</Text>
          </Pressable>
        </View>
      </View>

      <Text
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "#666",
          fontSize: 13,
        }}
      >
        Toate sumele sunt destinate întreținerii aplicației și dezvoltării continue. 🙏
      </Text>
    </ScrollView>
  );
}
