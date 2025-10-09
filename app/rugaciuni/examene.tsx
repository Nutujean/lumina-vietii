import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneExamene() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune pentru examene</Text>
      <Text style={styles.text}>
        Doamne, luminează-mi mintea și înțelepciunea, ajută-mă să-mi amintesc ceea ce am
        învățat și să răspund cu înțelepciune. Dă-mi liniște și încredere, iar rodul muncii
        mele să fie spre slava Ta și spre folosul meu. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
