import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import biblia_full from "../../../constants/biblia_full.json";

export default function BookScreen() {
  const { book } = useLocalSearchParams();
  const router = useRouter();
  const [carte, setCarte] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Caută cartea în ambele testamente
      const toateCartile = [
        ...biblia_full["Vechiul Testament"],
        ...biblia_full["Noul Testament"],
      ];
      const gasita = toateCartile.find(
        (c) => c.name.toLowerCase() === String(book).toLowerCase()
      );
      setCarte(gasita || null);
    } catch (err) {
      console.error("Eroare la încărcarea cărții:", err);
    } finally {
      setLoading(false);
    }
  }, [book]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF8E1" }}>
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={{ color: "#1E2A78", marginTop: 10 }}>Se încarcă...</Text>
      </View>
    );
  }

  if (!carte) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF8E1" }}>
        <Text style={{ color: "#B22222", fontWeight: "700", fontSize: 18 }}>
          Cartea nu a fost găsită.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 12,
          marginTop: 40,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            borderRadius: 50,
            padding: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>‹</Text>
        </Pressable>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
          {carte.name}
        </Text>
        <View style={{ width: 30 }} />
      </View>

      {/* 🔸 Lista capitolelor */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {carte.chapters.map((_, idx) => (
          <Pressable
            key={idx}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/carte/view",
                params: { titlu: carte.name, capitol: String(idx + 1) },
              })
            }
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#F9C846",
            }}
          >
            <Text style={{ color: "#1E2A78", fontWeight: "700", fontSize: 16 }}>
              Capitolul {idx + 1}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
