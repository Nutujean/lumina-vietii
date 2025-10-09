import { ScrollView, Text, StyleSheet } from "react-native";

export default function RugaciuneSanatate() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rugăciune pentru sănătate</Text>
      <Text style={styles.text}>
        Doamne, dăruiește sănătate trupului și sufletului meu. Întărește-i pe cei
        bolnavi și suferinzi, adu-le alinare și speranță. Tu ești Doctorul cel
        adevărat al sufletelor și al trupurilor noastre. Amin.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center" },
  text: { fontSize: 16, lineHeight: 24, color: "#333" },
});
