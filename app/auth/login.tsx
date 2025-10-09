import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { apiPost } from "../utils/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenție", "Introdu email și parolă.");
      return;
    }

    const res = await apiPost("/auth/login", { email, password });
    if (res?.token) {
      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.user));
      Alert.alert("Succes", "Bine ai revenit!");
      router.replace("/(tabs)/index");
    } else {
      Alert.alert("Eroare", res?.message || "Autentificare eșuată.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-4 text-center">Autentificare</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-2xl p-3 mb-3"
      />
      <TextInput
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-2xl p-3 mb-5"
      />

      <TouchableOpacity onPress={handleLogin} className="bg-blue-600 p-4 rounded-2xl">
        <Text className="text-white text-center font-semibold text-lg">Autentificare</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")} className="mt-4">
        <Text className="text-center text-blue-600">Nu ai cont? Creează unul</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
