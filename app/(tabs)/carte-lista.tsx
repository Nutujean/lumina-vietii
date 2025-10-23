import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import biblia_full from "../../constants/biblia_full.json";

export default function CarteLista() {
  const { tip } = useLocalSearchParams();
  const router = useRouter();

  const carti =
    tip === "noul"
      ? biblia_full["Noul Testament"] || []
      : biblia_full["Vechiul Testament"] || [];

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
          paddingVertical: 10,
          marginTop: 40,
          borderRadius: 12,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
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
        </TouchableOpacity>

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
          {tip === "noul" ? "Noul Testament" : "Vechiul Testament"}
        </Text>
      </View>

      {/* 🔸 Lista de cărți */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {carti.map((carte) => (
          <TouchableOpacity
            key={carte.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/carte",
                params: { tip: tip, titlu: carte.name },
              })
            }
            style={{
              backgroundColor: "#fff",
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 12,
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#F9C846",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={22} color="#1E2A78" />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#1E2A78",
                  marginLeft: 10,
                }}
              >
                {carte.name}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#1E2A78" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
