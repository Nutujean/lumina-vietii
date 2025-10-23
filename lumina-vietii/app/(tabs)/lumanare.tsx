import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

export default function LumanareScreen() {
  const [nume, setNume] = useState("");
  const [aprinsa, setAprinsa] = useState(false);

  const aprinde = () => {
    if (nume.trim() === "") return;
    setAprinsa(true);
    setTimeout(() => setAprinsa(false), 20000); // se stinge automat după 20s
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aprinde o lumânare</Text>

      {!aprinsa ? (
        <>
          <Image source={require("../../assets/candle-off.png")} style={styles.img} />
          <TextInput
            placeholder="Scrie numele persoanei..."
            style={styles.input}
            value={nume}
            onChangeText={setNume}
          />
          <TouchableOpacity style={styles.btn} onPress={aprinde}>
            <Text style={styles.btnText}>Aprinde</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.center}>
          <Image source={require("../../assets/candle-real.png")} style={styles.img} />
          <Text style={styles.prayText}>Lumânarea este aprinsă pentru</Text>
          <Text style={styles.nameText}>{nume}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#fffdf7",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#cc8400",
    marginBottom: 20,
  },
  img: {
    width: 150,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    width: "80%",
    textAlign: "center",
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#ffcc00",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
  },
  center: {
    alignItems: "center",
  },
  prayText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
    color: "#000",
  },
});

