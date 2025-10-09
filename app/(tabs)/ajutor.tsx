// app/(tabs)/ajutor.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { sendTestNotification, setupNotifications } from "../utils/notifyCore";
import { useRouter } from "expo-router";

export default function AjutorScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendTest = async () => {
    setLoading(true);
    const ok = await setupNotifications();
    if (ok) {
      await sendTestNotification();
      Alert.alert("✅ Notificare trimisă", "Testul a fost efectuat cu succes!");
    } else {
      Alert.alert(
        "⚠️ Atenție",
        "Permisiunile pentru notificări nu sunt acordate."
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Ajutor și test notificări</Text>

      <Text style={styles.description}>
        Aici poți testa funcția de notificări a aplicației <Text style={styles.appName}>Lumina Vieții</Text>.
        Asigură-te că ai permis notificările în setările telefonului.
      </Text>

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#ccc" }]}
        onPress={handleSendTest}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Se trimite notificarea..." : "Trimite notificare de test"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅️ Înapoi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 25,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  appName: {
    color: "#b8860b",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF9500",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    alignSelf: "center",
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
