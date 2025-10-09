import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneDimineata() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciunea de dimineață</Text>
      <Text style={styles.text}>
        Doamne, în această dimineață îți mulțumesc pentru darul vieții și pentru
        binecuvântările Tale. Îți încredințez ziua mea, pașii mei și gândurile
        mele. Întărește-mă să trăiesc în iubire, pace și credință. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
