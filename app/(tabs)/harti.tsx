import { View, Text, Pressable, Linking } from "react-native";
import { useRouter } from "expo-router";

export default function Harta() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Buton Înapoi */}
      <Pressable
        onPress={() => router.back()}
        style={{
          marginBottom: 12,
          alignSelf: "flex-start",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 9999,
          backgroundColor: "#eee",
        }}
      >
        <Text>◀ Înapoi</Text>
      </Pressable>

      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Hartă rapidă (deschide Google Maps).
      </Text>
      <Pressable
        onPress={() => Linking.openURL("https://www.google.com/maps")}
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Deschide Google Maps
        </Text>
      </Pressable>
    </View>
  );
}
