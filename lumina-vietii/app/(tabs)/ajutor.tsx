import { ScrollView, Text, StyleSheet, View } from "react-native";

export default function AjutorScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajutor și informații</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ℹ️ Despre aplicație</Text>
        <Text style={styles.text}>
          „Lumina Vieții” este o aplicație dedicată celor care doresc să fie mai aproape de credință, 
          oferind rugăciuni, calendar ortodox și posibilitatea de a aprinde o lumânare virtuală.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🕯️ Cum funcționează lumânarea</Text>
        <Text style={styles.text}>
          Scrie numele persoanei pentru care vrei să aprinzi o lumânare și apasă butonul „Aprinde”. 
          Lumânarea se va aprinde timp de 20 de secunde și se va stinge automat.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💖 Cont Premium</Text>
        <Text style={styles.text}>
          Printr-un cont Premium poți aprinde mai multe lumânări, accesa rugăciuni extinse și sprijini 
          dezvoltarea aplicației. Accesează secțiunea „Susține aplicația” pentru a deveni Premium.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📩 Contact</Text>
        <Text style={styles.text}>
          Pentru sugestii sau probleme tehnice, ne poți scrie la adresa:{"\n"}
          <Text style={styles.email}>lumina.vietii.app@gmail.com</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#003366",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  email: {
    color: "#003366",
    fontWeight: "600",
  },
});

