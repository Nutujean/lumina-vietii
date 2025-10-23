import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loadFullBook } from "../../../../constants/biblia";

export default function ChapterScreen() {
  const { book, chapter } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  const MAX_FREE_CHAPTERS = 2; // primele 2 capitole gratuite

  useEffect(() => {
    (async () => {
      try {
        const premium = await AsyncStorage.getItem("isPremium");
        setIsPremium(premium === "true");

        const currentBook = loadFullBook(String(book));
        setSelectedBook(currentBook);

        if (currentBook) {
          const chap = currentBook.chapters[Number(chapter) - 1];
          setSelectedChapter(chap || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [book, chapter]);

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
        <Text style={{ marginTop: 10, color: "#1E2A78" }}>
          Se încarcă...
        </Text>
      </View>
    );
  }

  if (!selectedBook) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF8E1",
        }}
      >
        <Text style={{ color: "#B22222", fontWeight: "700" }}>
          Cartea nu a fost găsită.
        </Text>
      </View>
    );
  }

  const currentChapterIndex = Number(chapter);
  const canAccess = isPremium || currentChapterIndex <= MAX_FREE_CHAPTERS;

  const handleAccess = () => {
    if (canAccess) {
      router.push({
        pathname: "/biblia/view",
        params: {
          titlu: String(book),
          capitol: String(chapter),
        },
      });
    } else {
      Alert.alert(
        "Funcție Premium",
        "Pentru a citi capitolele complete din această carte, trebuie să activezi versiunea Premium.",
        [
          { text: "Anulează", style: "cancel" },
          { text: "Activează Premium", onPress: () => router.push("/abonament") },
        ]
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră cu titlu */}
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
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
          {selectedBook?.name} — Capitolul {chapter}
        </Text>
        <View style={{ width: 30 }} />
      </View>

      {/* 🔸 Lista versetelor */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 18, paddingBottom: 40 }}>
        {canAccess ? (
          selectedChapter.map((verse, idx) => (
            <Text
              key={idx}
              style={{
                marginBottom: 10,
                color: "#1E2A78",
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              <Text style={{ color: "#B22222", fontWeight: "700" }}>
                {idx + 1}.{" "}
              </Text>
              {verse}
            </Text>
          ))
        ) : (
          <>
            {selectedChapter.slice(0, 5).map((verse, idx) => (
              <Text
                key={idx}
                style={{
                  marginBottom: 10,
                  color: "#1E2A78",
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                <Text style={{ color: "#B22222", fontWeight: "700" }}>
                  {idx + 1}.{" "}
                </Text>
                {verse}
              </Text>
            ))}
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#F9C846",
                padding: 20,
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#1E2A78",
                  textAlign: "center",
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                🔒 Restul capitolului este disponibil doar pentru utilizatorii
                Premium.
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/abonament")}
                style={{
                  backgroundColor: "#F9C846",
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#1E2A78", fontWeight: "700" }}>
                  Activează Premium
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* 🔹 Buton pentru vizualizare completă */}
      {canAccess && (
        <TouchableOpacity
          onPress={handleAccess}
          style={{
            backgroundColor: "#F9C846",
            paddingVertical: 12,
            borderRadius: 12,
            marginHorizontal: 20,
            marginBottom: 25,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#1E2A78",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Deschide capitolul complet 📖
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
