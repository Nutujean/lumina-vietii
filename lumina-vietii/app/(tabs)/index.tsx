import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const cards = [
    { title: "Calendar ortodox", image: require("../../assets/icons/calendar.png"), path: "/(tabs)/calendar" },
    { title: "Rugăciuni", image: require("../../assets/icons/rugaciuni.png"), path: "/(tabs)/rugaciuni" },
    { title: "Aprinde o lumânare", image: require("../../assets/icons/lumanare.png"), path: "/(tabs)/lumanare" },
    { title: "Notițe", image: require("../../assets/icons/notite.png"), path: "/(tabs)/notite" },
    { title: "Susține aplicația", image: require("../../assets/icons/sustine.png"), path: "/(tabs)/donatii" },
    { title: "Biblia", image: require("../../assets/icons/biblia.png"), path: "/(tabs)/biblia" },
    { title: "Contul meu", image: require("../../assets/icons/contul.png"), path: "/(tabs)/contul-meu" },
    { title: "Ajutor", image: require("../../assets/icons/ajutor.png"), path: "/(tabs)/ajutor" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lumina Vieții</Text>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(card.path)}
          >
            <Image source={card.image} style={styles.icon} />
            <Text style={styles.cardText}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
  },
});

