import { View, Text, ScrollView, StyleSheet } from "react-native";
import sarbatori from "../../constants/sarbatori";

export default function CalendarScreen() {
  const zile = Object.entries(sarbatori);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calendar ortodox</Text>
      {zile.map(([data, info], index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.data}>{data}</Text>
          <Text style={styles.sarbatoare}>{info}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  data: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  sarbatoare: {
    color: "#333",
  },
});

