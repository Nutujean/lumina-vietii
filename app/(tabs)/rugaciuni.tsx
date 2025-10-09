// app/(tabs)/rugaciuni.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RugaciuniScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fffaf0", padding: 20 }}>
      {/* Buton Înapoi */}
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 10 }}>
        <Text style={{ color: "blue", fontSize: 16 }}>← Înapoi</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#003366",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          🙏 Rugăciuni
        </Text>

        {/* Tatăl nostru */}
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
            Tatăl nostru
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#111" }}>
            Tatăl nostru, Care ești în ceruri, sfințească-se numele Tău; vie
            împărăția Ta; facă-se voia Ta, precum în cer așa și pe pământ.{"\n"}
            Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi; și ne iartă
            nouă greșelile noastre, precum și noi iertăm greșiților noștri;{"\n"}
            și nu ne duce pe noi în ispită, ci ne izbăvește de cel rău. Amin!
          </Text>
        </View>

        {/* Crezul */}
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
            Crezul
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#111" }}>
            Cred întru Unul Dumnezeu, Tatăl Atotțiitorul, Făcătorul cerului și al
            pământului, al tuturor celor văzute și nevăzute.{"\n"}
            Și întru Unul Domn Iisus Hristos, Fiul lui Dumnezeu, Unul-Născut, Care
            din Tatăl S-a născut, mai înainte de toți vecii.{"\n"}
            Lumină din Lumină, Dumnezeu adevărat din Dumnezeu adevărat, născut, nu
            făcut, Cel de o ființă cu Tatăl, prin Care toate s-au făcut...{"\n"}
            (text complet aici dacă vrei să-l punem integral).
          </Text>
        </View>

        {/* Rugăciune de seară */}
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
            Rugăciune de seară
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#111" }}>
            Doamne, Dumnezeul meu, mulțumescu-Ți că în ziua aceasta m-ai ajutat și
            mi-ai dăruit sănătate.{"\n"}
            Iartă-mi toate greșelile ce am făcut astăzi cu gândul, cuvântul și
            fapta, și ajută-mă ca să petrec această noapte în pace.{"\n"}
            Ocrotește-mă cu îngerii Tăi și trezește-mă întru bucurie, ca să Te
            slăvesc pe Tine. Amin.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
