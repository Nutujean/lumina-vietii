// app/(tabs)/biblia/[book].tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getBookById } from "../../../constants/biblia";

export default function BookScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as { book?: string };
  const bookId = params.book ?? "";
  console.log("📖 DEBUG bookId:", bookId);


  const book = getBookById(bookId);

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>Cartea nu a fost găsită.</Text>
      </View>
    );
  }

  const chapters = Array.from({ length: book.chaptersCount }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {/* 🔙 Bara de sus cu buton Înapoi */}
      <View style={styles.headerBar}>
        <Text style={styles.backButton} onPress={() => router.back()}>
          ← Înapoi
        </Text>
        <Text style={styles.headerTitle}>{book.name}</Text>
      </View>

      <FlatList
        data={chapters}
        keyExtractor={(n) => String(n)}
        numColumns={4}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chapterBtn}
            onPress={() => router.push(`/(tabs)/biblia/${book.id}/${item}`)}
          >
            <Text style={styles.chapterText}>Cap. {item}</Text>
          </TouchableOpacity>
        )}
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
  chapterBtn: {
    flex: 1,
    minWidth: 80,
    margin: 8,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  chapterText: { fontWeight: "600" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
