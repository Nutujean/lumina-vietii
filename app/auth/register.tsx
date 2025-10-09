import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { apiPost } from "../utils/api";;

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Atenție", "Completează toate câmpurile.");
      return;
    }

    const res = await apiPost("/auth/register", { name, email, password });
    if (res?.token) {
      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.user));
      Alert.alert("Succes", "Cont creat cu succes!");
      router.replace("/(tabs)/index");
    } else {
      Alert.alert("Eroare", res?.message || "Nu s-a putut crea contul.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-4 text-center">Creează un cont</Text>

      <TextInput
        placeholder="Nume"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-2xl p-3 mb-3"
      />
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

      <TouchableOpacity onPress={handleRegister} className="bg-blue-600 p-4 rounded-2xl">
        <Text className="text-white text-center font-semibold text-lg">Creează cont</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")} className="mt-4">
        <Text className="text-center text-blue-600">Ai deja cont? Autentifică-te</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
