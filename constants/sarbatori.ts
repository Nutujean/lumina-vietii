// 🔹 Lista de sărbători ortodoxe 2025–2027
export const sarbatoriMap: Record<string, { sarbatoare: string; cruce: boolean }> = {
  // --- 2025 ---
  "2025-01-01": { sarbatoare: "Tăierea împrejur cea după trup a Domnului", cruce: true },
  "2025-01-06": { sarbatoare: "Botezul Domnului (Boboteaza)", cruce: true },
  "2025-01-07": { sarbatoare: "Sf. Ioan Botezătorul", cruce: false },
  "2025-02-02": { sarbatoare: "Întâmpinarea Domnului", cruce: true },
  "2025-03-25": { sarbatoare: "Buna Vestire", cruce: true },
  "2025-04-13": { sarbatoare: "Floriile", cruce: true },
  "2025-04-20": { sarbatoare: "Învierea Domnului (Paștele)", cruce: true },
  "2025-05-29": { sarbatoare: "Înălțarea Domnului", cruce: true },
  "2025-06-08": { sarbatoare: "Pogorârea Sf. Duh (Rusaliile)", cruce: true },
  "2025-06-29": { sarbatoare: "Sfinții Petru și Pavel", cruce: true },
  "2025-08-06": { sarbatoare: "Schimbarea la Față", cruce: true },
  "2025-08-15": { sarbatoare: "Adormirea Maicii Domnului", cruce: true },
  "2025-09-08": { sarbatoare: "Nașterea Maicii Domnului", cruce: true },
  "2025-09-14": { sarbatoare: "Înălțarea Sfintei Cruci", cruce: true },
  "2025-11-21": { sarbatoare: "Intrarea Maicii Domnului în Biserică", cruce: true },
  "2025-12-06": { sarbatoare: "Sf. Nicolae", cruce: false },
  "2025-12-25": { sarbatoare: "Nașterea Domnului (Crăciunul)", cruce: true },
  "2025-12-27": { sarbatoare: "Sf. Ștefan", cruce: false },

  // --- 2026 ---
  "2026-01-01": { sarbatoare: "Tăierea împrejur cea după trup a Domnului", cruce: true },
  "2026-01-06": { sarbatoare: "Botezul Domnului (Boboteaza)", cruce: true },
  "2026-01-07": { sarbatoare: "Sf. Ioan Botezătorul", cruce: false },
  "2026-02-02": { sarbatoare: "Întâmpinarea Domnului", cruce: true },
  "2026-03-25": { sarbatoare: "Buna Vestire", cruce: true },
  "2026-04-05": { sarbatoare: "Floriile", cruce: true },
  "2026-04-12": { sarbatoare: "Învierea Domnului (Paștele)", cruce: true },
  "2026-05-21": { sarbatoare: "Înălțarea Domnului", cruce: true },
  "2026-05-31": { sarbatoare: "Pogorârea Sf. Duh (Rusaliile)", cruce: true },
  "2026-06-29": { sarbatoare: "Sfinții Petru și Pavel", cruce: true },
  "2026-08-06": { sarbatoare: "Schimbarea la Față", cruce: true },
  "2026-08-15": { sarbatoare: "Adormirea Maicii Domnului", cruce: true },
  "2026-09-08": { sarbatoare: "Nașterea Maicii Domnului", cruce: true },
  "2026-09-14": { sarbatoare: "Înălțarea Sfintei Cruci", cruce: true },
  "2026-11-21": { sarbatoare: "Intrarea Maicii Domnului în Biserică", cruce: true },
  "2026-12-06": { sarbatoare: "Sf. Nicolae", cruce: false },
  "2026-12-25": { sarbatoare: "Nașterea Domnului (Crăciunul)", cruce: true },
  "2026-12-27": { sarbatoare: "Sf. Ștefan", cruce: false },

  // --- 2027 ---
  "2027-01-01": { sarbatoare: "Tăierea împrejur cea după trup a Domnului", cruce: true },
  "2027-01-06": { sarbatoare: "Botezul Domnului (Boboteaza)", cruce: true },
  "2027-01-07": { sarbatoare: "Sf. Ioan Botezătorul", cruce: false },
  "2027-02-02": { sarbatoare: "Întâmpinarea Domnului", cruce: true },
  "2027-03-25": { sarbatoare: "Buna Vestire", cruce: true },
  "2027-03-28": { sarbatoare: "Floriile", cruce: true },
  "2027-04-04": { sarbatoare: "Învierea Domnului (Paștele)", cruce: true },
  "2027-05-13": { sarbatoare: "Înălțarea Domnului", cruce: true },
  "2027-05-23": { sarbatoare: "Pogorârea Sf. Duh (Rusaliile)", cruce: true },
  "2027-06-29": { sarbatoare: "Sfinții Petru și Pavel", cruce: true },
  "2027-08-06": { sarbatoare: "Schimbarea la Față", cruce: true },
  "2027-08-15": { sarbatoare: "Adormirea Maicii Domnului", cruce: true },
  "2027-09-08": { sarbatoare: "Nașterea Maicii Domnului", cruce: true },
  "2027-09-14": { sarbatoare: "Înălțarea Sfintei Cruci", cruce: true },
  "2027-11-21": { sarbatoare: "Intrarea Maicii Domnului în Biserică", cruce: true },
  "2027-12-06": { sarbatoare: "Sf. Nicolae", cruce: false },
  "2027-12-25": { sarbatoare: "Nașterea Domnului (Crăciunul)", cruce: true },
  "2027-12-27": { sarbatoare: "Sf. Ștefan", cruce: false },
};

// 🔹 Funcție helper pentru obținerea sărbătorii
export function getSarbatoare(date: string) {
  return sarbatoriMap[date] ?? null;
}

