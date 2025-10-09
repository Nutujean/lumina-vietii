import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBookById, loadFullBook } from "../../../../constants/biblia";

export default function ChapterScreen() {
  const { book, chapter } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  const MAX_FREE_CHAPTERS = 3;

  // Încarcă datele cărții și verifică dacă userul e Premium
  useEffect(() => {
    (async () => {
      try {
        // Citește din storage dacă e Premium (setat la plată)
        const premium = await AsyncStorage.getItem("isPremium");
        setIsPremium(premium === "true");

        // Încarcă cartea
        const currentBook = loadFullBook(String(book));
        setSelectedBook(currentBook);

        if (currentBook) {
          const chap = currentBook.chapters[Number(chapter) - 1];
          setSelectedChapter(chap || []);
        }
      } catch (e) {
        console.error("Eroare la încărcarea capitolului:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [book, chapter]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Dacă nu e Premium și depășește limitele
  if (!isPremium && Number(chapter) > MAX_FREE_CHAPTERS) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-6">
        <Text className="text-2xl font-bold text-center mb-4 text-yellow-600">
          Acces limitat
        </Text>
        <Text className="text-center text-gray-700 mb-8">
          Ai citit primele {MAX_FREE_CHAPTERS} capitole gratuit.  
          Pentru a continua lectura completă, activează Premium.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/premium")}
          className="bg-yellow-500 rounded-2xl p-4"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Devino Premium
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Afișare capitol
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-3">
        <Text className="text-blue-600">← Înapoi</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mb-4">
        {selectedBook?.name} — Capitolul {chapter}
      </Text>

      {selectedChapter.length > 0 ? (
        selectedChapter.map((verse, i) => (
          <Text key={i} className="mb-2 text-gray-800 leading-6">
            <Text className="font-semibold">{i + 1}. </Text>
            {verse}
          </Text>
        ))
      ) : (
        <Text className="text-center text-gray-500">Capitolul nu are conținut.</Text>
      )}
    </ScrollView>
  );
}
