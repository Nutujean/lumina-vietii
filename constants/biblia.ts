const biblia = [
  {
    id: 1,
    name: "Geneza",
    chapters: [
      ["La început, Dumnezeu a făcut cerurile și pământul."],
      ["Astfel au fost sfârșite cerurile și pământul."],
      ["Aceasta este istoria cerurilor și a pământului."],
      ["Capitol Premium — vizibil doar pentru utilizatori premium."]
    ]
  },
  {
    id: 2,
    name: "Exodul",
    chapters: [
      ["Acestea sunt numele fiilor lui Israel..."],
      ["Dumnezeu a chemat pe Moise din rugul aprins..."]
    ]
  }
];

export function getBookById(id: number) {
  return biblia.find((b) => b.id === id);
}

export function loadFullBook(name: string) {
  return biblia.find((b) => b.name === name);
}

export default biblia;
