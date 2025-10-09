import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Titlu principal */}
      <Text className="text-3xl font-bold text-center mb-6">
        🌟 Lumina Vieții
      </Text>

      {/* Card vremea */}
      <TouchableOpacity
        onPress={() => router.push("/vremea")}
        className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-md"
      >
        <Text className="text-xl font-bold mb-2 text-center">☀️ Vremea</Text>
        <Text className="text-gray-600 text-center">
          Verifică prognoza meteo pentru zilele sfinte.
        </Text>
      </TouchableOpacity>

      {/* Card Biblia */}
      <TouchableOpacity
        onPress={() => router.push("/biblia")}
        className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-md"
      >
        <Text className="text-xl font-bold mb-2 text-center">📖 Biblia</Text>
        <Text className="text-gray-600 text-center">
          Citește Sfânta Scriptură și învață înțelepciunea divină.
        </Text>
      </TouchableOpacity>

      {/* Card Lumânare */}
      <TouchableOpacity
        onPress={() => router.push("/lumanare")}
        className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-md"
      >
        <Text className="text-xl font-bold mb-2 text-center">🕯️ Aprinde o lumânare</Text>
        <Text className="text-gray-600 text-center">
          Aprinde o lumânare pentru cei vii sau adormiți.
        </Text>
      </TouchableOpacity>

      {/* Card Susține aplicația → duce la Premium */}
      <TouchableOpacity
        onPress={() => router.push("/premium")}
        className="bg-yellow-100 rounded-2xl p-4 mb-4 shadow-md"
      >
        <Text className="text-xl font-bold mb-2 text-center">
          💛 Susține aplicația
        </Text>
        <Text className="text-gray-600 text-center">
          Ajută-ne să păstrăm Lumina Vieții aprinsă și să o ducem mai departe.
        </Text>
      </TouchableOpacity>

      {/* Card Altele */}
      <TouchableOpacity
        onPress={() => router.push("/altele")}
        className="bg-gray-100 rounded-2xl p-4 mb-6 shadow-md"
      >
        <Text className="text-xl font-bold mb-2 text-center">✨ Altele</Text>
        <Text className="text-gray-600 text-center">
          Calendar, sărbători, rugăciuni și alte resurse.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
