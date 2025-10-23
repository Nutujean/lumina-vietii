import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // 🔹 Ascunde complet bara de navigație de jos
        tabBarStyle: { display: "none" },
      }}
    >
      {/* 🏠 Acasă */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Acasă",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 📅 Calendar */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🙏 Rugăciuni */}
      <Tabs.Screen
        name="rugaciuni"
        options={{
          title: "Rugăciuni",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🕯️ Lumânare */}
      <Tabs.Screen
        name="lumanare"
        options={{
          title: "Lumânare",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 📖 Biblia */}
      <Tabs.Screen
        name="biblia"
        options={{
          title: "Biblia",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ❤️ Susține */}
      <Tabs.Screen
        name="donatii"
        options={{
          title: "Susține",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 👤 Contul meu */}
      <Tabs.Screen
        name="contul-meu"
        options={{
          title: "Contul meu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
<Tabs.Screen
  name="biserici"
  options={{
    title: "Biserici",
    // ascunde din bara de tab-uri, îl accesăm doar din card
    tabBarButton: () => null,
  }}
/>
    </Tabs>
  );
}
