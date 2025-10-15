import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { BOOKS } from "../../constants/biblia";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BibliaIndex() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const booksFiltered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return BOOKS;
    return BOOKS.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.id.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <View style={styles.container}>
      {/* 🔹 Bara albastră identică cu celelalte pagini */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Biblia</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔍 Căutare */}
      <TextInput
        placeholder="Caută carte (ex: Geneza, Matei)..."
        value={q}
        onChangeText={setQ}
        style={styles.search}
        returnKeyType="search"
        placeholderTextColor="#777"
      />

      {/* 📖 Lista cărților */}
      <FlatList
        data={booksFiltered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(tabs)/biblia/${item.id}`)}
          >
            <View>
              <Text style={styles.bookName}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.testament === "VT"
                  ? "Vechiul Testament"
                  : "Noul Testament"}{" "}
                • {item.chaptersCount} capitole
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },

  // 🔵 Bara albastră cu buton galben
  header: {
    backgroundColor: "#1E2A78",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
  },
  backButton: {
    backgroundColor: "#F9C846",
    padding: 6,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#fff",
  },

  // 🔍 Căutare
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 15,
    color: "#333",
  },

  // 📖 Card carte biblică
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  bookName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E2A78",
  },
  meta: {
    marginTop: 6,
    color: "#555",
    fontSize: 13,
  },
});
