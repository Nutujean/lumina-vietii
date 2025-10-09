import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneNecazuri() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune în necazuri</Text>
      <Text style={styles.text}>
        Doamne, în clipele grele mă încred în Tine. Alină-mi suferința și întărește-mi
        credința. Dă-mi putere să port crucea mea și să nu deznădăjduiesc, căci Tu ești
        nădejdea și mântuirea mea. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
