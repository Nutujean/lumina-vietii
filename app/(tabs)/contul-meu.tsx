import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function ContulMeuScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("Nelogat");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync("userEmail");
        if (!savedEmail) {
          setEmail("Nelogat");
          setIsPremium(false);
          setLoading(false);
          return;
        }

        setEmail(savedEmail);

        const res = await fetch(`${API_URL}/${savedEmail}`);
        const data = await res.json();
        console.log("🔹 Date utilizator:", data);

        setIsPremium(data.isPremium || false);
      } catch (err) {
        console.error("❌ Eroare la verificarea contului:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Deconectare", "Sigur vrei să te deconectezi?", [
      { text: "Anulează", style: "cancel" },
      {
        text: "Da, deconectează-mă",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("userEmail");
          router.replace("/auth/login");
        },
      },
    ]);
  };

  if (loading) {
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
        <Text style={{ color: "#1E2A78", marginTop: 10 }}>
          Se încarcă datele contului...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            flex: 1,
            marginRight: 40,
          }}
        >
          Contul meu
        </Text>
      </View>

      {/* 🟡 Secțiune specială pentru conturi Premium */}
      {isPremium && (
        <View
          style={{
            backgroundColor: "#FFF9E5",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: "#F9C846",
            margin: 20,
            padding: 20,
            alignItems: "center",
            shadowColor: "#F9C846",
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Image
            source={require("../../assets/icons/coroana.png")}
            style={{ width: 70, height: 50, marginBottom: 10 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: "#B8860B",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            👑 Mulțumim pentru susținere!
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#1E2A78",
              textAlign: "center",
            }}
          >
            Ai acces complet la toate funcțiile aplicației Lumina Vieții.
          </Text>
        </View>
      )}

      {/* 🔸 Informații cont */}
      <View style={{ padding: 20, alignItems: "center" }}>
        <Ionicons
          name="person-circle-outline"
          size={90}
          color="#1E2A78"
          style={{ marginBottom: 10 }}
        />

        <Text
          style={{
            fontSize: 16,
            color: "#1E2A78",
            fontWeight: "600",
            marginBottom: 6,
          }}
        >
          Email: {email}
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "800",
            color: isPremium ? "green" : "red",
            marginBottom: 10,
          }}
        >
          {isPremium ? "Cont Premium" : "Cont Gratuit"}
        </Text>

        {/* Buton Premium */}
        {!isPremium && (
          <Pressable
            onPress={() => router.push("/(tabs)/donatii")}
            style={{
              backgroundColor: "#F9C846",
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 25,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#1E2A78",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Susține aplicația ❤️
            </Text>
          </Pressable>
        )}
      </View>

      {/* 🔹 Alte informații */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#F9C846",
          marginHorizontal: 20,
          padding: 15,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 22,
            textAlign: "center",
          }}
        >
          În contul tău poți gestiona funcțiile aplicației Lumina Vieții.
          {"\n\n"}
          Versiunea Premium îți oferă acces complet la notițe nelimitate, mai
          multe lumânări, rugăciuni suplimentare și actualizări speciale.
        </Text>
      </View>

      {/* 🔴 Buton de delogare */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 60 }}>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: "#B22222",
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Deconectează-te
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
