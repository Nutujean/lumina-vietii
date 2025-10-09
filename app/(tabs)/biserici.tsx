import { View, Text, Pressable, Linking, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Biserici() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
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
        Găsește biserici din apropiere sau adaugă preferatele tale.
      </Text>
      <Pressable
        onPress={() =>
          Linking.openURL("https://www.google.com/maps/search/biserici+aproape+de+mine")
        }
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Deschide în Google Maps
        </Text>
      </Pressable>
    </ScrollView>
  );
}
