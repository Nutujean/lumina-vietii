import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotiteScreen() {
  const router = useRouter();
  const [notite, setNotite] = useState<{ id: string; text: string }[]>([]);
  const [text, setText] = useState("");

  const adaugaNotita = () => {
    if (text.trim() === "") return;
    setNotite([{ id: Date.now().toString(), text }, ...notite]);
    setText("");
  };

  const stergeNotita = (id: string) => {
    Alert.alert("Ștergere notiță", "Ești sigur că vrei să ștergi această notiță?", [
      { text: "Anulează", style: "cancel" },
      {
        text: "Șterge",
        style: "destructive",
        onPress: () => setNotite(notite.filter((n) => n.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră unitară */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notițe</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔸 Formular adăugare notiță */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Scrie o notiță..."
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={adaugaNotita}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔸 Listă notițe */}
      {notite.length === 0 ? (
        <Text style={styles.emptyText}>Nu ai adăugat nicio notiță încă.</Text>
      ) : (
        <FlatList
          data={notite}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>{item.text}</Text>
              <TouchableOpacity onPress={() => stergeNotita(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#B22222" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 16,
  },

  // 🔹 Bara de sus identică cu celelalte pagini
  header: {
    backgroundColor: "#1E2A78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
  },

  // 🔸 Input pentru notiță
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    flex: 1,
    color: "#1E2A78",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#F9C846",
    borderRadius: 50,
    padding: 6,
    marginLeft: 8,
  },

  // 🔹 Carduri notițe
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 15,
  },
});
