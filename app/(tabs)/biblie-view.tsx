import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BiblieView() {
  const router = useRouter();
  const { titlu, continut } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara de sus */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Pressable
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
        </Pressable>
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
          Capitol biblic
        </Text>
      </View>

      {/* 🔸 Conținut */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 60,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1E2A78",
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          {titlu}
        </Text>

        <Text
          style={{
            fontSize: 17,
            lineHeight: 26,
            color: "#2c2c2c",
            textAlign: "justify",
          }}
        >
          {continut}
        </Text>
      </ScrollView>
    </View>
  );
}

