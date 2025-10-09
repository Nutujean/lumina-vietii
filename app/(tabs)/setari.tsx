import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function SetariScreen() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const handleToggleDarkMode = () => {
    Haptics.selectionAsync();
    setDarkMode(!darkMode);
  };

  const handleToggleNotifications = () => {
    Haptics.selectionAsync();
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleFontSizeChange = (value: number) => {
    Haptics.selectionAsync();
    setFontSize(value);
  };

  const handleReset = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Confirmare",
      "Ești sigur că vrei să resetezi toate preferințele?",
      [
        {
          text: "Anulează",
          style: "cancel",
        },
        {
          text: "Resetează",
          style: "destructive",
          onPress: () => {
            setDarkMode(false);
            setNotificationsEnabled(true);
            setFontSize(16);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert("Preferințele au fost resetate.");
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: darkMode ? "#1a1a1a" : "#fffaf0",
        padding: 20,
      }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* 🔙 Buton Înapoi */}
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
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

      {/* Titlu */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          color: darkMode ? "#FFD700" : "#8B0000",
          marginBottom: 25,
        }}
      >
        ⚙️ Setări
      </Text>

      {/* 🌙 Mod întunecat */}
      <View
        style={{
          backgroundColor: darkMode ? "#333" : "white",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: darkMode ? "#FFD700" : "#333",
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          🌙 Mod întunecat
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <Text style={{ color: darkMode ? "#ddd" : "#555", fontSize: 16 }}>
            Activează / dezactivează tema întunecată
          </Text>
          <Switch
            value={darkMode}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: "#ccc", true: "#FFD700" }}
            thumbColor={darkMode ? "#B8860B" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* 🔔 Notificări */}
      <View
        style={{
          backgroundColor: darkMode ? "#333" : "white",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: darkMode ? "#FFD700" : "#333",
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          🔔 Notificări
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <Text style={{ color: darkMode ? "#ddd" : "#555", fontSize: 16 }}>
            Primește notificări pentru sărbători
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: "#ccc", true: "#FFD700" }}
            thumbColor={notificationsEnabled ? "#B8860B" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* 📝 Dimensiune text */}
      <View
        style={{
          backgroundColor: darkMode ? "#333" : "white",
          borderRadius: 12,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: darkMode ? "#FFD700" : "#333",
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          📝 Dimensiune text rugăciuni
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: darkMode ? "#ddd" : "#555",
            marginBottom: 15,
          }}
        >
          Ajustează mărimea textului din paginile cu rugăciuni:
        </Text>

        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <Text style={{ fontSize: fontSize, color: darkMode ? "#fff" : "#333" }}>
            Exemplu text
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: darkMode ? "#ddd" : "#555", marginBottom: 5 }}>
            Dimensiune curentă: {fontSize.toFixed(0)}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-around", width: "80%" }}>
            {[14, 16, 18, 20, 22].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => handleFontSizeChange(size)}
                style={{
                  backgroundColor: fontSize === size ? "#B8860B" : "#ddd",
                  padding: 10,
                  borderRadius: 6,
                  minWidth: 40,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: fontSize === size ? "white" : "#333" }}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* 🔄 Buton resetare */}
      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: "#8B0000",
          paddingVertical: 14,
          borderRadius: 10,
          marginTop: 30,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          🔄 Resetează toate preferințele
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
