const API_URL = "https://lumina-vietii-backend.onrender.com/api/users";

export async function checkPremium(email: string) {
  try {
    const res = await fetch(`${API_URL}/${email}`);
    const data = await res.json();
    return data.isPremium === true;
  } catch (err) {
    console.log("Eroare verificare Premium:", err);
    return false;
  }
}
