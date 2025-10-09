import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneSeara() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciunea de seară</Text>
      <Text style={styles.text}>
        Doamne, îți mulțumesc pentru ziua care a trecut. Iartă-mă pentru greșelile
        făcute cu gândul, cuvântul sau fapta. Odihnește sufletul și trupul meu
        în această noapte și păzește-mă de tot răul. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
