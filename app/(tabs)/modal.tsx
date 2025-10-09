import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";

export default function AlteleScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fffaf0", padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#003366",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        ⚙️ Altele
      </Text>

      {/* Despre aplicație */}
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#b8860b",
            marginBottom: 10,
          }}
        >
          ℹ️ Despre aplicație
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 22, color: "#111" }}>
          „Lumina Vieții” este o aplicație ortodoxă cu Calendar, Rugăciuni și
          posibilitatea de a aprinde lumânări virtuale.{"\n\n"}
          Scopul ei este de a aduce liniște și rugăciune mai aproape de tine,
          oriunde te-ai afla.
        </Text>
      </View>

      {/* Contact */}
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#b8860b",
            marginBottom: 10,
          }}
        >
          📬 Contact
        </Text>
        <Text style={{ fontSize: 16, color: "#111", marginBottom: 10 }}>
          Pentru sugestii și întrebări, ne poți scrie la:
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("mailto:contact@luminavietii.ro")}>
          <Text style={{ fontSize: 16, color: "#003366", textDecorationLine: "underline" }}>
            contact@luminavietii.ro
          </Text>
        </TouchableOpacity>
      </View>

      {/* Termeni și condiții */}
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#b8860b",
            marginBottom: 10,
          }}
        >
          📜 Termeni și condiții
        </Text>
        <Text style={{ fontSize: 16, color: "#111" }}>
          Folosind aplicația „Lumina Vieții”, ești de acord că aceasta are un
          scop spiritual și informativ. Nu colectăm date personale și nu
          folosim reclame agresive.{"\n\n"}
          Pentru detalii complete, consultă secțiunea Termeni și Condiții de pe
          site-ul oficial.
        </Text>
      </View>

      {/* Versiune aplicație */}
      <Text
        style={{
          textAlign: "center",
          color: "#555",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        Versiune: 1.0.0
      </Text>
    </ScrollView>
  );
}
