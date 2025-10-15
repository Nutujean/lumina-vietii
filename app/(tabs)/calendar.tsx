import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { SARBATORI } from "../constants/sarbatori";

export default function CalendarScreen() {
  const router = useRouter();
  const [luna, setLuna] = useState(new Date().getMonth());
  const [an, setAn] = useState(new Date().getFullYear());

  const luni = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
  ];

  const sarbatoriSet = useMemo(() => new Set(SARBATORI.map(s => s.date)), []);
  const sarbatoriMap = useMemo(() => new Map(SARBATORI.map(s => [s.date, s.name])), []);

  const fmtDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const zileInLuna = new Date(an, luna + 1, 0).getDate();
  const primaZi = new Date(an, luna, 1).getDay();
  const offset = primaZi === 0 ? 6 : primaZi - 1;

  const cells: (number | null)[] = Array(offset).fill(null).concat(
    Array.from({ length: zileInLuna }, (_, i) => i + 1)
  );
  while (cells.length % 7 !== 0) cells.push(null);

  const sarbatoriLuna = SARBATORI.filter((s) => {
    const [y, m] = s.date.split("-").map(Number);
    return y === an && m === luna + 1;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔹 Bara albastră + buton galben */}
      <View
        style={{
          backgroundColor: "#1E2A78",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
          elevation: 3,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            padding: 6,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
          Calendar Ortodox
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 🔽 Conținutul calendarului */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 25,
          paddingBottom: 40,
        }}
      >
        {/* 📅 Titlu */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "800",
            color: "#1E2A78",
            marginBottom: 8,
          }}
        >
          Calendar Creștin Ortodox
        </Text>

        <View
          style={{
            height: 3,
            backgroundColor: "#F9C846",
            width: "40%",
            alignSelf: "center",
            borderRadius: 2,
            marginBottom: 15,
          }}
        />

        {/* Luna curentă */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Pressable
            onPress={() => {
              if (luna === 0) {
                setLuna(11);
                setAn(an - 1);
              } else setLuna(luna - 1);
            }}
            style={{ padding: 6 }}
          >
            <Ionicons name="chevron-back-circle" size={36} color="#1E2A78" />
          </Pressable>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1E2A78",
              marginHorizontal: 12,
            }}
          >
            {luni[luna]} {an}
          </Text>

          <Pressable
            onPress={() => {
              if (luna === 11) {
                setLuna(0);
                setAn(an + 1);
              } else setLuna(luna + 1);
            }}
            style={{ padding: 6 }}
          >
            <Ionicons name="chevron-forward-circle" size={36} color="#1E2A78" />
          </Pressable>
        </View>

        {/* 🗓️ Zilele săptămânii */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            paddingHorizontal: 4,
          }}
        >
          {["L", "Ma", "Mi", "J", "V", "S", "D"].map((zi) => (
            <Text
              key={zi}
              style={{
                width: "14.2857%",
                textAlign: "center",
                fontWeight: "700",
                color: "#1E2A78",
              }}
            >
              {zi}
            </Text>
          ))}
        </View>

        {/* 🔢 Zilele lunii */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {cells.map((zi, idx) => {
            const isEmpty = zi === null;
            const data = !isEmpty ? fmtDate(an, luna, zi!) : "";
            const isHoliday = !isEmpty && sarbatoriSet.has(data);

            return (
              <View
                key={idx}
                style={{
                  width: "14.2857%",
                  aspectRatio: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  borderRadius: 8,
                  backgroundColor: isHoliday ? "#FFECEC" : "transparent",
                  borderWidth: isHoliday ? 1 : 0,
                  borderColor: isHoliday ? "#B22222" : "transparent",
                  opacity: isEmpty ? 0 : 1,
                }}
              >
                {!isEmpty && (
                  <Text
                    style={{
                      fontWeight: "600",
                      color: isHoliday ? "#B22222" : "#1E2A78",
                      fontSize: 16,
                      marginTop: -4,
                    }}
                  >
                    {zi}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* ✨ Linie aurie */}
        <View
          style={{
            height: 3,
            backgroundColor: "#F9C846",
            width: "50%",
            alignSelf: "center",
            borderRadius: 2,
            marginTop: -80,
            marginBottom: 30,
          }}
        />

        {/* 🕊️ Lista sărbătorilor */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "#F9C846",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
              color: "#1E2A78",
              marginBottom: 10,
            }}
          >
            Sărbători în {luni[luna]} {an}
          </Text>

          {sarbatoriLuna.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#555" }}>
              Nu există sărbători în această lună.
            </Text>
          ) : (
            sarbatoriLuna.map((s, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 15,
                  color: "#B22222",
                  textAlign: "center",
                  marginVertical: 4,
                  fontWeight: "500",
                }}
              >
                {new Date(s.date).getDate()} {luni[new Date(s.date).getMonth()]} – {s.name}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
