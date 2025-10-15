import { useState, useRef, useEffect, memo } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Flame = memo(({ visible, anim }: { visible: boolean; anim: Animated.Value }) => (
  <Animated.View
    style={{
      position: "absolute",
      top: -8,
      alignItems: "center",
      transform: [{ scale: anim }],
      opacity: visible ? 1 : 0,
    }}
  >
    {/* Aură mică */}
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: "rgba(249,200,70,0.18)",
        position: "absolute",
        top: 2,
        shadowColor: "#F9C846",
        shadowOpacity: 0.6,
        shadowRadius: 10,
      }}
    />
    {/* Flacără mai mare */}
    <Animated.Image
      source={require("../../assets/icons/flacara.gif")}
      style={{
        width: 80,
        height: 100,
      }}
      resizeMode="contain"
    />
  </Animated.View>
));

const Candle = memo(
  ({
    title,
    name,
    setName,
    isOn,
    setIsOn,
    anim,
  }: {
    title: string;
    name: string;
    setName: (v: string) => void;
    isOn: boolean;
    setIsOn: (v: boolean) => void;
    anim: Animated.Value;
  }) => (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#1E2A78",
          marginBottom: 6,
        }}
      >
        {title}
      </Text>

      {/* Container lumânare */}
      <View
        style={{
          width: 120,
          height: 200,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Lumânare statică */}
        <Image
          source={require("../../assets/icons/lumanare-stinsa.png")}
          style={{
            width: 120,
            height: 200,
            position: "absolute",
            bottom: 0,
          }}
          resizeMode="contain"
        />

        {/* Flacără animată */}
        <Flame visible={isOn} anim={anim} />
      </View>

      {/* Nume + butoane */}
      <TextInput
        placeholder="Nume"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#F9C846",
          width: "80%",
          paddingHorizontal: 10,
          paddingVertical: 6,
          color: "#1E2A78",
          textAlign: "center",
          marginTop: 8,
          marginBottom: 6,
        }}
      />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => setIsOn(!isOn)}
          style={{
            backgroundColor: isOn ? "#B22222" : "#1E2A78",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "600" }}>
            {isOn ? "Stinge" : "Aprinde"}
          </Text>
        </Pressable>

        {name !== "" && (
          <Pressable
            onPress={() => setName("")}
            style={{
              backgroundColor: "#888",
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "600" }}>Șterge</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
);

export default function LumanareScreen() {
  const router = useRouter();

  const [vii, setVii] = useState<string>("");
  const [adormiti, setAdormiti] = useState<string>("");
  const [isViiOn, setIsViiOn] = useState(false);
  const [isAdormitiOn, setIsAdormitiOn] = useState(false);

  const animVii = useRef(new Animated.Value(1)).current;
  const animAdormiti = useRef(new Animated.Value(1)).current;

  const pulse = (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.96, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  };

  useEffect(() => {
    pulse(animVii);
    pulse(animAdormiti);
  }, []);

  const handleAddMore = () => {
    Alert.alert(
      "Funcție Premium",
      "Pentru a aprinde mai multe lumânări, accesează versiunea Premium.",
      [
        { text: "Anulează", style: "cancel" },
        { text: "Mergi la Premium", onPress: () => router.push("/abonament") },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF8E1",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* 🔹 Bara de sus cu buton Înapoi */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1E2A78",
          paddingVertical: 14,
          paddingHorizontal: 10,
          borderRadius: 12,
          marginTop: 40,
          marginBottom: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#F9C846",
            borderRadius: 50,
            padding: 6,
            marginRight: 10,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Aprinde o lumânare
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          color: "#444",
          marginBottom: 30,
          textAlign: "center",
          width: "85%",
        }}
      >
        Aprinde o lumânare pentru cei dragi — vii și adormiți.
      </Text>

      {/* 🕯️ Două lumânări alăturate */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Candle
          title="Pentru Vii"
          name={vii}
          setName={setVii}
          isOn={isViiOn}
          setIsOn={setIsViiOn}
          anim={animVii}
        />
        <Candle
          title="Pentru Adormiți"
          name={adormiti}
          setName={setAdormiti}
          isOn={isAdormitiOn}
          setIsOn={setIsAdormitiOn}
          anim={animAdormiti}
        />
      </View>

      {/* ➕ Buton Premium */}
      <Pressable
        onPress={handleAddMore}
        style={{
          marginTop: 40,
          backgroundColor: "#F9C846",
          paddingVertical: 10,
          paddingHorizontal: 28,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#1E2A78", fontWeight: "700" }}>
          Aprinde mai multe lumânări 🔒
        </Text>
      </Pressable>
    </View>
  );
}
