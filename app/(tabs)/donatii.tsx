import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";

export default function DonatiiScreen() {
  const doneaza = (suma: string) => {
    Alert.alert("Mulțumim 🙏", `Ai ales să donezi ${suma}. Implementăm plata reală aici.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤲 Susține aplicația Lumina Vieții</Text>
      <Text style={styles.text}>
        Aplicația este gratuită și va rămâne așa.{"\n"}
        Dacă dorești, poți contribui printr-o mică donație pentru a sprijini
        dezvoltarea și întreținerea ei.
      </Text>

      <TouchableOpacity style={styles.card} onPress={() => doneaza("2 €")}>
        <Text style={styles.cardTitle}>☕ 2 €</Text>
        <Text style={styles.cardText}>O cafea pentru dezvoltare</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => doneaza("5 €")}>
        <Text style={styles.cardTitle}>🌿 5 €</Text>
        <Text style={styles.cardText}>Sprijin mic dar cu suflet mare</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => doneaza("10 €")}>
        <Text style={styles.cardTitle}>❤️ 10 €</Text>
        <Text style={styles.cardText}>Pentru o contribuție semnificativă</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => doneaza("20 €")}>
        <Text style={styles.cardTitle}>🌟 20 €</Text>
        <Text style={styles.cardText}>Ajută-ne să creștem aplicația</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#444" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardText: { fontSize: 15, marginTop: 5, color: "#666" },
});
