import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [temp, setTemp] = useState<number | null>(null);

  // 🌤️ Preluăm temperatura reală pentru Oltenița
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=44.08&lon=26.63&appid=1400ca456e470d6a5d5a94c0fdb6766d&units=metric&lang=ro"
        );
        const data = await res.json();
        if (data?.main?.temp) setTemp(Math.round(data.main.temp));
      } catch (err) {
        console.log("Eroare vreme:", err);
      }
    };
    fetchWeather();
  }, []);

  const cards = [
    { title: "Calendar", image: require("../../assets/icons/calendar.png"), path: "calendar" },
    { title: "Vremea", image: require("../../assets/icons/vremea.png"), path: "vremea" },
    { title: "Biblia", image: require("../../assets/icons/biblia.png"), path: "biblia" },
    { title: "Notițe", image: require("../../assets/icons/notite.png"), path: "notite" },
    { title: "Rugăciuni", image: require("../../assets/icons/rugaciuni.png"), path: "rugaciuni" },
    { title: "Lumânare", image: require("../../assets/icons/lumanare.png"), path: "lumanare" },
    { title: "Susține", image: require("../../assets/icons/sustine.png"), path: "donatii" },
    { title: "Biserici", image: require("../../assets/icons/biserici.png"), path: "biserici" },
    { title: "Contul meu", image: require("../../assets/icons/contulmeu.png"), path: "contul-meu" },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#FFF8E1",
        paddingVertical: 25,
        paddingHorizontal: 18,
      }}
    >
      {/* Titlu aplicație */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          textAlign: "center",
          color: "#1E2A78",
          marginBottom: 6,
        }}
      >
        Lumina Vieții
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#4A5568",
          marginBottom: 26,
        }}
      >
        Ghid de credință și speranță
      </Text>

      {/* Grilă 3x3 */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 22,
        }}
      >
        {cards.map((card) => (
          <Pressable
            key={card.title}
            onPress={() => router.push(card.path)}
            style={{
              width: "30%",
              aspectRatio: 1,
              borderRadius: 18,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 4,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#FFD95A", "#F9C846", "#FFF8E1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={card.image}
                style={{ width: 85, height: 75, marginBottom: 4 }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#1E2A78",
                  textAlign: "center",
                }}
              >
                {card.title}
              </Text>

              {/* 🌡️ doar pe cardul „Vremea” afișăm temperatura */}
              {card.title === "Vremea" && (
                <Text
                  style={{
                    fontSize: 13,
                    color: "#1E2A78",
                    fontWeight: "600",
                    marginTop: -2,
                  }}
                >
                  {temp !== null ? `${temp}°C` : "…"}
                </Text>
              )}
            </LinearGradient>
          </Pressable>
        ))}
      </View>

      {/* Rugăciunea Tatăl nostru */}
      <View
        style={{
          marginTop: 35,
          padding: 16,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 14,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            color: "#1E2A78",
            marginBottom: 12,
          }}
        >
          Rugăciunea Tatăl Nostru
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            lineHeight: 24,
            color: "#333",
          }}
        >
          Tatăl nostru care ești în ceruri, sfințească-se Numele Tău, vie
          împărăția Ta, facă-se voia Ta, precum în cer așa și pe pământ. Pâinea
          noastră cea de toate zilele dă-ne-o nouă astăzi și ne iartă nouă
          greșelile noastre, precum și noi iertăm greșiților noștri. Și nu ne
          duce pe noi în ispită, ci ne izbăvește de cel rău. Amin.
        </Text>
      </View>
    </ScrollView>
  );
}
