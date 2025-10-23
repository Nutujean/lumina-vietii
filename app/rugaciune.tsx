import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RugaciuneView() {
  const { titlu, continut } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră sus */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 14,
        }}
      >
        {/* Buton Înapoi */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            padding: 8,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Titlu centrat */}
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            flex: 1,
            marginRight: 40,
          }}
          numberOfLines={1}
        >
          Rugăciune
        </Text>
      </View>

      {/* 🔸 Conținutul rugăciunii */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Text
          style={{
            color: "#1E2A78",
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {titlu}
        </Text>

        <Text
          style={{
            color: "#1E2A78",
            fontSize: 17,
            lineHeight: 25,
            textAlign: "justify",
          }}
        >
          {continut}
        </Text>
      </ScrollView>
    </View>
  );
}
