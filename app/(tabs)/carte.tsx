import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import biblia_full from "../../constants/biblia_full.json";

export default function CarteScreen() {
  const { tip } = useLocalSearchParams();
  const router = useRouter();

  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carti, setCarti] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const premium = await AsyncStorage.getItem("isPremium");
      setIsPremium(premium === "true");

      if (tip === "noul") {
        const free = biblia_full["Free"]["Noul Testament"] || [];
        const premiumBooks = biblia_full["Premium"]["Noul Testament"] || [];
        setCarti([...free, ...premiumBooks]);
      } else {
        const free = biblia_full["Free"]["Vechiul Testament"] || [];
        const premiumBooks = biblia_full["Premium"]["Vechiul Testament"] || [];
        setCarti([...free, ...premiumBooks]);
      }

      setLoading(false);
    })();
  }, [tip]);

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
        <Text style={{ marginTop: 10, color: "#1E2A78" }}>Se încarcă...</Text>
      </View>
    );
  }

  const handleSelect = (book: any, locked: boolean) => {
    if (locked && !isPremium) {
      router.push("/abonament");
    } else {
      router.push({
        pathname: "/carte/view",
        params: { titlu: book.name, capitol: 1 },
      });
    }
  };

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
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          {tip === "noul" ? "Noul Testament" : "Vechiul Testament"}
        </Text>
      </View>

      {/* 🔸 Lista cărților */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {carti.map((book) => {
          const locked =
            (biblia_full["Premium"]["Noul Testament"]?.some(
              (b) => b.name === book.name
            ) ||
              biblia_full["Premium"]["Vechiul Testament"]?.some(
                (b) => b.name === book.name
              )) &&
            !isPremium;

          return (
            <TouchableOpacity
              key={book.id}
              onPress={() => handleSelect(book, locked)}
              style={{
                backgroundColor: locked ? "#ddd" : "#F9C846",
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 12,
                marginBottom: 12,
                alignItems: "center",
                borderWidth: locked ? 1 : 0,
                borderColor: "#1E2A78",
              }}
            >
              <Text
                style={{
                  color: locked ? "#777" : "#1E2A78",
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                {book.name} {locked ? "🔒" : ""}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* 🟨 Banner pentru utilizatorii Free */}
        {!isPremium && (
          <View
            style={{
              marginTop: 30,
              backgroundColor: "#1E2A78",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 8,
                fontSize: 16,
              }}
            >
              ✝️ Versiunea completă a Bibliei este disponibilă în Premium
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/abonament")}
              style={{
                backgroundColor: "#F9C846",
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#1E2A78",
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Activează Premium
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
