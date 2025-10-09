import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";

export default function LumanareScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">🕯️ Aprinde o Lumânare</Text>

      {/* Imagine / animație existentă */}
      <View className="justify-center items-center mb-6">
        <Image
          source={require("../../assets/lumanare_aprinsa.png")}
          style={{ width: 150, height: 200, resizeMode: "contain" }}
        />
      </View>

      {/* Buton principal - aprinde o lumânare normal */}
      <TouchableOpacity
        onPress={() => router.push("/aprinde-lumanare")}
        className="bg-orange-500 rounded-2xl p-4 mb-4"
      >
        <Text className="text-white text-center text-lg font-bold">
          Aprinde o lumânare
        </Text>
      </TouchableOpacity>

      {/* Buton Premium - Aprinde mai multe */}
      <TouchableOpacity
        onPress={() => router.push("/premium")}
        className="bg-yellow-500 rounded-2xl p-4 mb-4"
      >
        <Text className="text-white text-center text-lg font-bold">
          🔥 Aprinde mai multe lumânări (Premium)
        </Text>
      </TouchableOpacity>

      {/* Explicație suplimentară */}
      <View className="bg-gray-100 rounded-2xl p-4 mt-4">
        <Text className="text-gray-700 text-center">
          Poți aprinde până la 2 lumânări gratuit.  
          Pentru mai multe și pentru opțiuni personalizate, activează Premium.
        </Text>
      </View>
    </ScrollView>
  );
}
