import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { SARBATORI } from "../constants/sarbatori";

// 🔔 Configurare notificări și permisiuni
export async function setupNotifications() {
  console.log("🔔 setupNotifications() apelat");
  if (!Device.isDevice) {
    console.log("⚠️ Notificările funcționează doar pe dispozitive reale.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("❌ Permisiunea pentru notificări a fost refuzată.");
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  console.log("✅ setupNotifications finalizat cu succes!");
}

// 📅 Verificare și notificare pentru sărbătorile de azi
export async function programareNotificariZilnice() {
  console.log("🕊️ programareNotificariZilnice() apelat");
  const azi = new Date();
  const aziString = azi.toISOString().split("T")[0]; // YYYY-MM-DD

  if (sarbatori && sarbatori[aziString]) {
    const detalii = sarbatori[aziString];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🙏 Astăzi este sărbătoare",
        body: `${detalii.sarbatoare}${detalii.cruce ? " ✝️ (cu cruce roșie)" : ""}`,
        sound: true,
      },
      trigger: null,
    });
    console.log("📩 Notificare trimisă!");
  } else {
    console.log("📅 Astăzi nu este sărbătoare.");
  }
}
