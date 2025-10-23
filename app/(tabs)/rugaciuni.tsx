import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RugaciuniScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const premium = await AsyncStorage.getItem("isPremium");
      setIsPremium(premium === "true");
    };
    checkPremium();
  }, []);

  // 🔹 Rugăciuni gratuite
  const rugaciuniGratuite = [
    {
      titlu: "Tatăl nostru",
      continut: `Tatăl nostru, Care ești în ceruri, sfințească-se Numele Tău; vie împărăția Ta; facă-se voia Ta, precum în cer așa și pe pământ. 
Pâinea noastră cea de toate zilele, dă-ne-o nouă astăzi; și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri; 
și nu ne duce pe noi în ispită, ci ne izbăvește de cel rău. Că a Ta este împărăția și puterea și slava, în vecii vecilor. Amin.`,
    },
    {
      titlu: "Crezul",
      continut: `Cred întru unul Dumnezeu, Tatăl Atotțiitorul, Făcătorul cerului și al pământului, al tuturor celor văzute și nevăzute. 
Și întru unul Domn Iisus Hristos, Fiul lui Dumnezeu, Unul-Născut, Care din Tatăl S-a născut mai înainte de toți vecii; 
Lumină din Lumină, Dumnezeu adevărat din Dumnezeu adevărat, născut iar nu făcut, Cel de o ființă cu Tatăl, prin Care toate s-au făcut. 
Care pentru noi oamenii și pentru a noastră mântuire S-a pogorât din ceruri și S-a întrupat de la Duhul Sfânt și din Maria Fecioara și S-a făcut om.`,
    },
    {
      titlu: "Rugăciune de seară",
      continut: `Doamne, Iisuse Hristoase, Fiul lui Dumnezeu, pentru rugăciunile Preacuratei Maicii Tale, miluiește-ne pe noi. 
Doamne, dă-ne noapte bună și odihnă pașnică, ferește-ne de rele și păzește-ne sub acoperământul aripilor Tale. Amin.`,
    },
  ];

  // 🔸 Rugăciuni Premium
  const rugaciuniPremium = [
    { titlu: "Rugăciune pentru familie", emoji: "👨‍👩‍👧‍👦", continut: `Doamne, binecuvântează familia mea, părinții, frații și surorile mele. Ferește-ne de rău, dă-ne pace și dragoste. Amin.` },
    { titlu: "Rugăciune pentru sănătate", emoji: "❤️", continut: `Doamne, dă-mi sănătate trupului și sufletului, vindecă durerile mele și întărește-mă în credință. Amin.` },
    { titlu: "Rugăciune pentru examene", emoji: "✍️", continut: `Doamne, luminează-mi mintea și ajută-mă să trec cu bine încercările. Amin.` },
    { titlu: "Rugăciune pentru copii", emoji: "👶", continut: `Doamne, binecuvântează copiii mei, păzește-i de primejdii și luminează-le mintea. Amin.` },
    { titlu: "Rugăciune pentru părinți", emoji: "👵", continut: `Doamne, răsplătește dragostea părinților mei și dă-le sănătate și pace. Amin.` },
    { titlu: "Rugăciune pentru necazuri", emoji: "🙏", continut: `Doamne, vezi necazul meu și dă-mi putere să trec peste greutăți. Amin.` },
    { titlu: "Rugăciune de dimineață", emoji: "☀️", continut: `Doamne, îți mulțumesc pentru această nouă zi. Binecuvântează pașii mei și ferește-mă de rău. Amin.` },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră completă */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            padding: 8,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            flex: 1,
            marginRight: 40,
          }}
        >
          Rugăciuni
        </Text>
      </View>

      {/* 🔸 Lista rugăciunilor */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        {/* 🔹 Secțiunea Gratuită */}
        <Text
          style={{
            color: "#1E2A78",
            fontWeight: "800",
            fontSize: 18,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          🌿 Rugăciuni gratuite
        </Text>

        {rugaciuniGratuite.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/rugaciune",
                params: { titlu: item.titlu, continut: item.continut },
              })
            }
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 18,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#F9C846",
            }}
          >
            <Text style={{ color: "#1E2A78", fontSize: 18, fontWeight: "700" }}>
              {item.titlu}
            </Text>
          </TouchableOpacity>
        ))}

        {/* 🔒 Secțiunea Premium */}
        <Text
          style={{
            color: "#B8860B",
            fontWeight: "800",
            fontSize: 18,
            marginBottom: 10,
            marginTop: 25,
          }}
        >
          🔒 Rugăciuni Premium
        </Text>

        {isPremium ? (
          rugaciuniPremium.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/rugaciune",
                  params: { titlu: item.titlu, continut: item.continut },
                })
              }
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 18,
                marginBottom: 15,
                borderWidth: 1,
                borderColor: "#F9C846",
                position: "relative",
              }}
            >
              {/* 👑 Iconița aurie în colț */}
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  right: 12,
                  fontSize: 18,
                }}
              >
                👑
              </Text>

              <Text style={{ color: "#1E2A78", fontSize: 18, fontWeight: "700" }}>
                {item.emoji} {item.titlu}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 25,
              marginTop: 10,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#F9C846",
            }}
          >
            <Text
              style={{
                color: "#1E2A78",
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Aceste rugăciuni sunt disponibile doar pentru utilizatorii Premium.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/abonament")}
              style={{
                backgroundColor: "#F9C846",
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#1E2A78", fontWeight: "700", fontSize: 16 }}>
                Activează Premium ✨
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
