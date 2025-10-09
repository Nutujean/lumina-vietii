import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneParinti() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune pentru părinți</Text>
      <Text style={styles.text}>
        Doamne, binecuvântează-i pe părinții mei cu sănătate, pace și bucurie.
        Răsplătește-le dragostea și jertfa cu care m-au crescut și ocrotește-i în
        fiecare clipă a vieții lor. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
