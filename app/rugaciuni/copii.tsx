import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneCopii() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune pentru copii</Text>
      <Text style={styles.text}>
        Doamne, ocrotește toți copiii lumii. Umple-le inimile cu bucurie, lumină
        și înțelepciune. Ferește-i de primejdii și ajută-i să crească în iubire și
        credință curată. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
