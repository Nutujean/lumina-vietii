import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export default function NotiteScreen() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("Necunoscut");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Încarcă datele utilizatorului și notițele salvate
  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Citește emailul din SecureStore
        const storedEmail = await SecureStore.getItemAsync("userEmail");
        if (!storedEmail) {
          setEmail("Nelogat");
          setIsPremium(false);
          setLoading(false);
          return;
        }

        setEmail(storedEmail);

        // 2️⃣ Verifică statusul Premium din backend
        const res = await fetch(`${API_URL}/${storedEmail}`);
        const data = await res.json();
        console.log("🔹 Răspuns backend Premium:", data);

        setIsPremium(data.isPremium || false);

        // 3️⃣ Încarcă notițele locale
        const savedNotes = await AsyncStorage.getItem("notite");
        if (savedNotes) setNotesList(JSON.parse(savedNotes));
      } catch (err) {
        console.log("❌ Eroare la încărcarea datelor:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Salvează local notițele
  const saveNotes = async (newNotes: string[]) => {
    try {
      await AsyncStorage.setItem("notite", JSON.stringify(newNotes));
    } catch (err) {
      console.log("Eroare la salvare:", err);
    }
  };

  // 🔹 Adaugă o nouă notiță
  const addNote = () => {
    if (note.trim() === "") {
      Alert.alert("Notiță goală", "Scrie ceva înainte de a salva.");
      return;
    }

    // 🔸 Limite: 1 gratis / 6 Premium
    const limit = isPremium ? 6 : 1;
    if (notesList.length >= limit) {
      Alert.alert(
        "Funcție Premium",
        isPremium
          ? `Ai atins limita de ${limit} notițe Premium.`
          : "Poți salva o singură notiță gratuită.\nPentru mai multe, activează versiunea Premium.",
        [
          { text: "Anulează", style: "cancel" },
          {
            text: "Mergi la Premium",
            onPress: () => router.push("/(tabs)/donatii"),
          },
        ]
      );
      return;
    }

    const updated = [note, ...notesList];
    setNotesList(updated);
    saveNotes(updated);
    setNote("");
  };

  // 🔹 Șterge o notiță
  const deleteNote = (index: number) => {
    Alert.alert("Ștergi notița?", "Această acțiune nu poate fi anulată.", [
      { text: "Anulează", style: "cancel" },
      {
        text: "Șterge",
        style: "destructive",
        onPress: () => {
          const updated = notesList.filter((_, i) => i !== index);
          setNotesList(updated);
          saveNotes(updated);
        },
      },
    ]);
  };

  // 🔹 Loading vizual
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF8E1",
        }}
      >
        <ActivityIndicator size="large" color="#1E2A78" />
        <Text style={{ color: "#1E2A78", marginTop: 10 }}>
          Se verifică contul...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8E1" }}>
      {/* 🔷 Bara albastră + buton galben */}
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            flex: 1,
            marginRight: 40,
          }}
        >
          Notițe
        </Text>
      </View>

      {/* 🔸 Conținut */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 100,
          }}
        >
          {/* 🧑 Info cont */}
          <View style={{ marginBottom: 15, alignItems: "center" }}>
            <Text style={{ color: "#1E2A78", fontSize: 15 }}>
              Cont: {email}
            </Text>
            <Text
              style={{
                color: isPremium ? "green" : "red",
                fontWeight: "700",
                marginTop: 3,
              }}
            >
              {isPremium ? "Premium" : "Gratuit"}
            </Text>
          </View>

          {/* 📝 Input notiță */}
          <TextInput
            placeholder="Scrie aici o notiță..."
            placeholderTextColor="#666"
            multiline
            value={note}
            onChangeText={setNote}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#F9C846",
              padding: 12,
              fontSize: 16,
              color: "#1E2A78",
              minHeight: 100,
              textAlignVertical: "top",
            }}
          />

          {/* Buton salvare */}
          <Pressable
            onPress={addNote}
            style={{
              backgroundColor: "#F9C846",
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 20,
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#1E2A78",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Salvează notița
            </Text>
          </Pressable>

          {/* 🔹 Lista notițelor */}
          <View style={{ marginTop: 30 }}>
            {notesList.length === 0 ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "#777",
                  fontSize: 15,
                }}
              >
                Nu ai adăugat încă nicio notiță.
              </Text>
            ) : (
              notesList.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 15,
                    borderWidth: 1,
                    borderColor: "#F9C846",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E2A78",
                      fontSize: 16,
                      lineHeight: 22,
                      marginBottom: 8,
                    }}
                  >
                    {item}
                  </Text>

                  <Pressable
                    onPress={() => deleteNote(index)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Ionicons
                      name="trash"
                      size={18}
                      color="#B22222"
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={{
                        color: "#B22222",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      Șterge
                    </Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
