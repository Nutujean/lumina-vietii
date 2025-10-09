import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function TatalNostruPage() {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fffaf0", padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: "blue", fontSize: 16 }}>← Înapoi</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 20 }}>
        🙏 Tatăl nostru
      </Text>

      <Text style={{ fontSize: 16, lineHeight: 24, color: "#111" }}>
        Tatăl nostru, Care ești în ceruri, sfințească-se numele Tău; vie împărăția Ta; facă-se voia Ta, precum în cer
        așa și pe pământ.{"\n\n"}
        Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi; și ne iartă nouă greșelile noastre, precum și noi
        iertăm greșiților noștri;{"\n\n"}
        și nu ne duce pe noi în ispită, ci ne izbăvește de cel rău.{"\n\n"}
        Amin.
      </Text>
    </ScrollView>
  );
}
