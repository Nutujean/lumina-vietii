// app/utils/api.ts
const API_BASE = "http://localhost:5000/api";
// dacă backendul e online, folosește:
// const API_BASE = "https://lumina-vietii-backend.onrender.com/api";

export async function apiPost(path: string, body: any, token?: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (e) {
    console.error("API POST error:", e);
    return null;
  }
}

export async function apiGet(path: string, token?: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return await res.json();
  } catch (e) {
    console.error("API GET error:", e);
    return null;
  }
}

