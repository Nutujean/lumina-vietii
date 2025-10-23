import { ScrollView, Text, StyleSheet, View } from "react-native";

export default function RugaciuniScreen() {
  const rugaciuni = [
    {
      titlu: "Tatăl nostru",
      text: "Tatăl nostru, Care ești în ceruri, sfințească-se numele Tău; vie împărăția Ta; facă-se voia Ta, precum în cer așa și pe pământ...",
    },
    {
      titlu: "Crezul (Simbolul credinței)",
      text: "Cred într-Unul Dumnezeu, Tatăl Atotțiitorul, Făcătorul cerului și al pământului, văzutelor tuturor și nevăzutelor...",
    },
    {
      titlu: "Rugăciune pentru familie",
      text: "Doamne Iisuse Hristoase, binecuvântează casa mea, păzește-ne în pace, dă-ne sănătate, dragoste și înțelepciune...",
    },
    {
      titlu: "Rugăciune pentru cei bolnavi",
      text: "Doamne, Dumnezeul nostru, Cel ce ești doctorul sufletelor și al trupurilor, vindecă pe robii Tăi de orice suferință trupească și sufletească...",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rugăciuni</Text>

      {rugaciuni.map((r, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{r.titlu}</Text>
          <Text style={styles.cardText}>{r.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f6ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#003366",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});

