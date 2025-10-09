import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneFamilie() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune pentru familie</Text>
      <Text style={styles.text}>
        Doamne, binecuvântează familia mea cu iubire, pace și înțelegere.
        Întărește legăturile dintre noi și păzește-ne de tot răul. Ajută-ne
        să trăim uniți în credință și să ne sprijinim unii pe alții în toate
        încercările vieții. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
