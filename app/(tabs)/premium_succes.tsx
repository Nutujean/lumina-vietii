import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function PremiumSucces() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/index"); // revine automat la pagina principală
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF8E1",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <Text
        style={{
          color: "#1E2A78",
          fontSize: 24,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        ✨ Premium activat cu succes!
      </Text>

      <Text
        style={{
          color: "#1E2A78",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Dumnezeu să te binecuvânteze pentru susținerea aplicației Lumina Vieții 🙏
      </Text>

      <ActivityIndicator size="large" color="#1E2A78" />
      <Text style={{ color: "#1E2A78", marginTop: 10 }}>Se revine la pagina principală...</Text>
    </View>
  );
}
