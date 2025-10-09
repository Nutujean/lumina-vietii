import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Nota {
  id: number;
  titlu: string;
  continut: string;
  data: string;
}

export default function NotiteScreen() {
  const router = useRouter();
  const [titlu, setTitlu] = useState("");
  const [continut, setContinut] = useState("");
  const [notite, setNotite] = useState<Nota[]>([]);
  const [notaEditata, setNotaEditata] = useState<Nota | null>(null);

  const STORAGE_KEY = "@lumina_vietii_notite";

  // 🔹 Încarcă notițele salvate
  useEffect(() => {
    const incarcaNotite = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setNotite(JSON.parse(json));
      } catch (error) {
        console.log("Eroare la încărcare:", error);
      }
    };
    incarcaNotite();
  }, []);

  // 🔹 Salvează notițele automat
  useEffect(() => {
    const salveazaNotite = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notite));
      } catch (error) {
        console.log("Eroare la salvare:", error);
      }
    };
    if (notite.length >= 0) salveazaNotite();
  }, [notite]);

  const handleAdaugaNota = () => {
    if (!titlu.trim() || !continut.trim()) {
      Alert.alert("Atenție", "Completează titlul și conținutul notiței.");
      return;
    }

    if (notaEditata) {
      // 🔄 Salvăm modificările
      const actualizate = notite.map((n) =>
        n.id === notaEditata.id ? { ...n, titlu, continut } : n
      );
      setNotite(actualizate);
      setNotaEditata(null);
      setTitlu("");
      setContinut("");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    const notaNoua: Nota = {
      id: Date.now(),
      titlu: titlu.trim(),
      continut: continut.trim(),
      data: new Date().toLocaleDateString("ro-RO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    setNotite([notaNoua, ...notite]);
    setTitlu("");
    setContinut("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleStergeNota = (id: number) => {
    Alert.alert("Ștergere notiță", "Sigur vrei să ștergi această notiță?", [
      { text: "Anulează", style: "cancel" },
      {
        text: "Șterge",
        style: "destructive",
        onPress: () => {
          setNotite(notite.filter((n) => n.id !== id));
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        },
      },
    ]);
  };

  const handleEditareNota = (nota: Nota) => {
    setNotaEditata(nota);
    setTitlu(nota.titlu);
    setContinut(nota.continut);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fffaf0", padding: 20 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* 🔙 Buton Înapoi */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "#b22222",
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          alignSelf: "flex-start",
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>← Înapoi</Text>
      </TouchableOpacity>

      {/* Titlu principal */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          color: "#8B0000",
          marginBottom: 20,
        }}
      >
        📝 Notițe și rugăciuni
      </Text>

      {/* Formular */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TextInput
          placeholder="Titlu rugăciune / notiță"
          placeholderTextColor="#999"
          value={titlu}
          onChangeText={setTitlu}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#b22222",
            marginBottom: 10,
            fontSize: 16,
            paddingVertical: 4,
            color: "#333",
          }}
        />
        <TextInput
          placeholder="Scrie aici conținutul..."
          placeholderTextColor="#aaa"
          value={continut}
          onChangeText={setContinut}
          multiline
          numberOfLines={4}
          style={{
            fontSize: 16,
            textAlignVertical: "top",
            color: "#333",
          }}
        />

        <TouchableOpacity
          onPress={handleAdaugaNota}
          style={{
            backgroundColor: "#b22222",
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {notaEditata ? "💾 Salvează modificările" : "➕ Adaugă notiță"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista notițe */}
      {notite.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#777",
            marginTop: 20,
            fontStyle: "italic",
          }}
        >
          Nu ai încă nicio notiță. Adaugă una nouă mai sus. 🙏
        </Text>
      ) : (
        notite.map((nota) => (
          <View
            key={nota.id}
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#8B0000",
                marginBottom: 6,
              }}
            >
              {nota.titlu}
            </Text>
            <Text style={{ color: "#333", fontSize: 16, marginBottom: 8 }}>
              {nota.continut}
            </Text>
            <Text
              style={{
                color: "#999",
                fontSize: 13,
                marginBottom: 8,
                textAlign: "right",
              }}
            >
              📅 {nota.data}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => handleEditareNota(nota)}
                style={{
                  backgroundColor: "#f4a460",
                  flex: 1,
                  paddingVertical: 6,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>✏️ Editează</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleStergeNota(nota.id)}
                style={{
                  backgroundColor: "#b22222",
                  flex: 1,
                  paddingVertical: 6,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>🗑️ Șterge</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
