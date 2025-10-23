import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function BibliaScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră */}
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
          Biblia
        </Text>
      </View>

      {/* 🔸 Conținut */}
      <ScrollView contentContainerStyle={{ padding: 30 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1E2A78",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Alege Testamentul
        </Text>

        {/* 🕊️ Text legal explicativ */}
        <Text
          style={{
            fontSize: 13,
            color: "#555",
            textAlign: "center",
            marginBottom: 30,
            lineHeight: 18,
          }}
        >
          Text biblic oferit în scop informativ și educațional.{"\n"}
          Conținutul nu este asociat cu nicio instituție religioasă oficială.
        </Text>

        {/* 🔹 Butoane pentru Testamente */}
        <Pressable
          onPress={() =>
            router.push({ pathname: "/carte-lista", params: { tip: "noul" } })
          }
          style={{
            backgroundColor: "#F9C846",
            borderRadius: 12,
            paddingVertical: 20,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#1E2A78", fontWeight: "800", fontSize: 18 }}>
            Noul Testament
          </Text>
        </Pressable>

        <Pressable
          onPress={() => alert("Vechiul Testament va fi adăugat curând 🙏")}
          style={{
            backgroundColor: "#EEE",
            borderRadius: 12,
            paddingVertical: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#999", fontWeight: "700", fontSize: 18 }}>
            Vechiul Testament (în curând)
          </Text>
        </Pressable>

        {/* 🔹 Etichetă sursă */}
        <Text
          style={{
            fontSize: 11,
            color: "#999",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          📖 Sursă: text adaptat din traduceri publice (Domeniu Public)
        </Text>
      </ScrollView>
    </View>
  );
}
