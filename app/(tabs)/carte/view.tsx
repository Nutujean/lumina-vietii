import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import biblia_full from "../../../constants/biblia_full.json";

export default function ViewCapitol() {
  const { titlu, capitol } = useLocalSearchParams();
  const router = useRouter();

  let book =
    biblia_full["Free"]["Vechiul Testament"].find((b) => b.name === titlu) ||
    biblia_full["Free"]["Noul Testament"].find((b) => b.name === titlu) ||
    biblia_full["Premium"]["Vechiul Testament"].find((b) => b.name === titlu) ||
    biblia_full["Premium"]["Noul Testament"].find((b) => b.name === titlu);

  const textCapitol = book?.chapters?.[Number(capitol) - 1] || [];

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
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
          {titlu} — Capitolul {capitol}
        </Text>
        <View style={{ width: 30 }} />
      </View>

      {/* 🔸 Textul capitolului */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 40 }}>
        {textCapitol.length > 0 ? (
          textCapitol.map((vers, i) => (
            <Text
              key={i}
              style={{
                color: "#1E2A78",
                fontSize: 16,
                marginBottom: 10,
                lineHeight: 22,
              }}
            >
              <Text style={{ color: "#B22222", fontWeight: "bold" }}>{i + 1}. </Text>
              {vers}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#1E2A78", textAlign: "center", marginTop: 50 }}>
            Capitolul nu este disponibil.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
