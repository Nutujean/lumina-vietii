import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function AbonamentScreen() {
  const router = useRouter();

  // funcție pentru deschiderea linkului de plată Revolut
  const handleDonate = async (suma: number) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const url = `https://revolut.me/p/Zwx3OJmjhr/${suma}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fffaf0", padding: 20 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* 🔙 Buton Înapoi */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "#b22222",
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          alignSelf: "flex-start",
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>← Înapoi</Text>
      </TouchableOpacity>

      {/* Titlu */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          color: "#8B0000",
          marginBottom: 10,
        }}
      >
        💎 Abonament Premium
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "#444",
          fontSize: 16,
          marginBottom: 25,
        }}
      >
        Sprijină dezvoltarea aplicației „Lumina Vieții” și bucură-te de
        funcții exclusive pentru sufletul tău. 🙏
      </Text>

      {/* Lista beneficiilor */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 20,
          marginBottom: 30,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#8B0000",
            marginBottom: 12,
          }}
        >
          Beneficiile Premium:
        </Text>

        {[
          "🕯️ Poți aprinde mai multe lumânări simultan",
          "📖 Acces la rugăciuni speciale și audio",
          "🗓️ Calendar complet cu zile de post și sărbători",
          "📲 Notificări zilnice personalizate",
          "🌄 Fundaluri tematice și mod noapte",
          "❤️ Sprijini direct aplicația și dezvoltarea ei continuă",
        ].map((text, index) => (
          <Text
            key={index}
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            {text}
          </Text>
        ))}
      </View>

      {/* Planuri / sume de susținere */}
      <Text
        style={{
          textAlign: "center",
          color: "#8B0000",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 15,
        }}
      >
        Alege suma cu care dorești să sprijini aplicația:
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {[10, 20, 50, 100].map((suma) => (
          <TouchableOpacity
            key={suma}
            onPress={() => handleDonate(suma)}
            style={{
              backgroundColor: "#b22222",
              borderRadius: 12,
              paddingVertical: 15,
              paddingHorizontal: 25,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {suma} lei
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mulțumire */}
      <Text
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: 16,
          marginTop: 30,
          fontStyle: "italic",
        }}
      >
        🙏 Mulțumim din inimă pentru sprijinul tău!  
        Orice contribuție contează și ajută această aplicație să rămână vie. 💖
      </Text>
    </ScrollView>
  );
}
