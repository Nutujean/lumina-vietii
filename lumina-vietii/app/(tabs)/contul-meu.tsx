import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/user";

export default function ContulMeuScreen() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPremium = async () => {
      try {
        const email = "test@email.com"; // temporar, se poate schimba după autentificare reală
        const res = await fetch(`${API_URL}/${email}`);
        const data = await res.json();
        setStatus(data.isPremium ? "Premium" : "Free");
      } catch (err) {
        setStatus("Eroare la verificare");
      } finally {
        setLoading(false);
      }
    };
    checkPremium();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={styles.loadingText}>Se verifică statutul contului...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contul meu</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Tip cont:</Text>
        <Text style={[styles.value, status === "Premium" && styles.premium]}>
          {status}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => (window.location.href = "/(tabs)/donatii")}
      >
        <Text style={styles.btnText}>Susține aplicația</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  premium: {
    color: "#cc9900",
  },
  btn: {
    backgroundColor: "#ffcc00",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
});

