export const prices: { [key: string]: number } = {
  3: 55,
  6: 50,
};

export const youths: { [key: string]: string } = {
  k: "Kindergarten (4 – 6 Jahre)",
  f1: "Fußballschule (7 – 9 Jahre)",
  f2: "Fußballschule (8 – 10 Jahre)",
  f3: "Fußballschule (10 – 13 Jahre)",
  m: "Mädels-Fußballschule (7 – 14 Jahre)",
};

export const ageGroups = [
  {
    label: "Kindergarten (4 – 6 Jahre)",
    value: "k",
    min: 4,
    max: 6,
  },
  {
    label: "Fußballschule (7 – 9 Jahre)",
    value: "f1",
    min: 7,
    max: 8,
  },
  {
    label: "Fußballschule (8 – 10 Jahre)",
    value: "f2",
    min: 9,
    max: 10,
  },
  {
    label: "Fußballschule (11 – 14 Jahre)",
    value: "f3",
    min: 11,
    max: 14,
  },
];

export const times: {
  [key: string]: string[];
} = {
  k: [
    "Montag, 14:00 – 15:00 Uhr",
    "Donnerstag, 15:00 – 16:00 Uhr",
    "Freitag, 14:00 – 15:00 Uhr",
  ],
  f1: ["Montag, 15:00 – 16:30 Uhr", "Dienstag, 15:00 – 16:30 Uhr"],
  f2: ["Mittwoch, 15:00 – 16:30 Uhr"],
  f3: ["Freitag, 15:00 – 16:30 Uhr"],
  m: ["Freitag, 15:00 – 16:30 Uhr"],
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
  {
    value: "new",
    label: "Neu",
  },
  {
    value: "mailing2",
    label: "Einladung zum Probetraining",
  },
  { value: "mailing3", label: "Einladung zur Fußballschule" },
  { value: "confirmed", label: "Zahlungsdaten eingegangen" },
  { value: "started", label: "Gestartet" },
  { value: "ended", label: "Beendet" },
];
