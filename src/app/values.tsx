export const prices: { [key: string]: number } = {
  3: 55,
  6: 50,
};

export const genders: { [key: string]: string } = {
  male: "Junge",
  female: "Mädchen",
};

export const sizes: { [key: string]: string } = {
  "128": "YXS",
  "140": "YS",
  "152": "YM",
  "164": "YL",
  S: "S",
  M: "M",
};

export const states = [
  { value: "new", label: "Neu" },
  { value: "mailing2", label: "Einladung zum Probetraining" },
  { value: "mailing3", label: "Einladung zur Fußballschule" },
  { value: "confirmed", label: "Zahlungsdaten eingegangen" },
  { value: "started", label: "Gestartet" },
  { value: "ended", label: "Beendet" },
];
