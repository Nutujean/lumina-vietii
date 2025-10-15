import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SchimbaParola() {
  const router = useRouter();
  const [vechea, setVechea] = useState("");
  const [noua, setNoua] = useState("");
  const [confirma, setConfirma] = useState("");

  const handleChange = () => {
    if (noua !== confirma) {
      Alert.alert("Eroare", "Parolele nu coincid.");
      return;
    }
    Alert.alert("Succes", "Parola a fost schimbată!");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Bara sus */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schimbă parola</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Parola veche"
        value={vechea}
        onChangeText={setVechea}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Parola nouă"
        value={noua}
        onChangeText={setNoua}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmă parola nouă"
        value={confirma}
        onChangeText={setConfirma}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleChange}>
        <Text style={styles.buttonText}>Salvează</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A78",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
    marginRight: 10,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E2A78",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
