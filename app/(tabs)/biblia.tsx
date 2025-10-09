// app/(tabs)/biblia.tsx
import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { BOOKS } from "../../constants/biblia";
import { useRouter } from "expo-router";

export default function BibliaIndex() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const booksFiltered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return BOOKS;
    return BOOKS.filter(b => b.name.toLowerCase().includes(term) || b.id.toLowerCase().includes(term));
  }, [q]);

  return (
    <View style={styles.container}>
      {/* 🔙 Bara de sus */}
      <View style={styles.headerBar}>
       <Text style={styles.backButton} onPress={() => router.back()}>
          ← Înapoi
        </Text>
        <Text style={styles.headerTitle}>📖 Biblia</Text>
      </View>

      <TextInput
        placeholder="Caută carte (ex: Geneza, Matei)..."
        value={q}
        onChangeText={setQ}
        style={styles.search}
        returnKeyType="search"
      />

      <FlatList
        data={booksFiltered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(tabs)/biblia/${item.id}`)}
          >
            <View>
              <Text style={styles.bookName}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.testament === "VT" ? "Vechiul Testament" : "Noul Testament"} • {item.chaptersCount} capitole
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
  container: { flex: 1, backgroundColor: "#FFFDF8" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    fontSize: 18,
    color: "#9A3412",
    fontWeight: "600",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9A3412",
  },
  search: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  bookName: { fontSize: 18, fontWeight: "600", color: "#333" },
  meta: { marginTop: 6, color: "#666", fontSize: 13 },
});
