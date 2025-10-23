import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView, Alert } from "react-native";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/user";

export default function DonatiiScreen() {
  const handleRevolut = async (suma: number) => {
    const url = `https://revolut.me/p/Zwx3OJmjhr/${suma}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Eroare", "Nu se poate deschide linkul Revolut.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Susține aplicația Lumina Vieții</Text>
      <Text style={styles.subtitle}>Alege o sumă pentru a sprijini dezvoltarea aplicației:</Text>

      <View style={styles.buttons}>
        {[5, 10, 20].map((sum) => (
          <TouchableOpacity
            key={sum}
            style={styles.button}
            onPress={() => handleRevolut(sum)}
          >
            <Text style={styles.buttonText}>{sum} lei</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Donațiile ajută la menținerea serverului, actualizări și noi funcții pentru comunitate.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#003366",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ffcc00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  infoBox: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
  },
  infoText: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
});

