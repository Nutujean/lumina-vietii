import { ScrollView, Text } from "react-native";

export default function AlteleScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Altele</Text>
      <Text style={{ marginTop: 10 }}>
        Aici poți găsi informații suplimentare, setări și suport.
      </Text>
    </ScrollView>
  );
}