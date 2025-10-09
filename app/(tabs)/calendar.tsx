import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from "react-native";
import { useRouter } from "expo-router";
import { sarbatoriMap, getSarbatoare } from "../../constants/sarbatori";

export default function CalendarScreen() {
  const router = useRouter();
  const today = new Date();
  const [luna, setLuna] = useState(today.getMonth());
  const [an, setAn] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<{ date: string; sarbatoare?: string } | null>(null);

  const luni = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
  ];

  const daysInMonth = new Date(an, luna + 1, 0).getDate();
  const firstDay = new Date(an, luna, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (luna === 0) {
      setLuna(11);
      setAn(an - 1);
    } else setLuna(luna - 1);
  };

  const handleNextMonth = () => {
    if (luna === 11) {
      setLuna(0);
      setAn(an + 1);
    } else setLuna(luna + 1);
  };

  const renderItem = ({ item }: { item: number }) => {
    const dateStr = `${an}-${String(luna + 1).padStart(2, "0")}-${String(item).padStart(2, "0")}`;
    const sarbatoare = getSarbatoare(dateStr);

    return (
      <TouchableOpacity
        style={[
          styles.dayCard,
          sarbatoare ? styles.daySarbatoare : null
        ]}
        onPress={() => setSelectedDay({ date: dateStr, sarbatoare: sarbatoare?.sarbatoare })}
      >
        <Text style={[styles.dayNumber, sarbatoare ? styles.dayNumberSarbatoare : null]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Bara sus */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.inapoi}>← Înapoi</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.titlu}>📅 Calendar Creștin Ortodox {an}</Text>
        </View>

        {/* spațiu echilibrat */}
        <View style={{ width: 60 }} />
      </View>

      {/* 🔄 Selector lună */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.arrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.month}>{luni[luna]}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Zile */}
      <FlatList
        data={daysArray}
        numColumns={7}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />

      {/* 🪔 Popup sărbătoare */}
      <Modal visible={!!selectedDay} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📖 {selectedDay?.date}</Text>
            <Text style={styles.modalText}>
              {selectedDay?.sarbatoare ?? "Nicio sărbătoare importantă în această zi."}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDay(null)}>
              <Text style={styles.closeButtonText}>Închide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf8f5", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  inapoi: { fontSize: 16, color: "#007AFF", fontWeight: "600" },
  titlu: { fontSize: 20, fontWeight: "700", color: "#4B5563", textAlign: "center" },
  monthNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  arrow: { fontSize: 22, color: "#374151", paddingHorizontal: 20 },
  month: { fontSize: 18, fontWeight: "600", color: "#374151" },
  grid: { alignItems: "center" },
  dayCard: {
    width: 45,
    height: 45,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  daySarbatoare: {
    backgroundColor: "#ffecec",
    borderWidth: 1,
    borderColor: "#ffb3b3",
  },
  dayNumber: { fontSize: 16, color: "#374151" },
  dayNumberSarbatoare: { color: "#D32F2F", fontWeight: "700" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, color: "#444", textAlign: "center", marginBottom: 20 },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: { color: "white", fontWeight: "600" },
});
