export const prices: { [key: string]: string } = {
  3: "55€",
  6: "50€",
};

export const youths: { [key: string]: string } = {
  k: "Kindergarten (4 – 6 Jahre)",
  f1: "Fußballschule (7 – 9 Jahre)",
  f2: "Fußballschule (8 – 10 Jahre)",
  f3: "Fußballschule (10 – 13 Jahre)",
  m: "Mädels-Fußballschule (4 – 14 Jahre)",
};

export const ageGroups = [
  {
    value: "k",
    min: 4,
    max: 6,
  },
  {
    value: "f1",
    min: 7,
    max: 9,
  },
  {
    value: "f2",
    min: 8,
    max: 10,
  },
  {
    value: "f3",
    min: 10,
    max: 13,
  },
];

export const times: {
  [key: string]: { label: string; value: string }[];
} = {
  k: [
    { label: "Montag, 14:00 – 15:00 Uhr", value: "Mo" },
    { label: "Donnerstag, 15:00 – 16:00 Uhr", value: "Do" },
    { label: "Freitag, 14:00 – 15:00 Uhr", value: "Fr" },
  ],
  f1: [
    { label: "Montag, 15:00 – 16:30 Uhr", value: "Mo" },
    { label: "Dienstag, 15:00 – 16:30 Uhr", value: "Di" },
  ],
  f2: [{ label: "Mittwoch, 15:00 – 16:30 Uhr", value: "Mi" }],
  f3: [{ label: "Freitag, 15:00 – 16:30 Uhr", value: "Fr" }],
  m: [{ label: "Freitag, 15:00 – 16:30 Uhr", value: "Fr" }],
};

export const genders: { [key: string]: string } = {
  male: "Junge",
  female: "Mädchen",
};

export const sizes: { [key: string]: string } = {
  YS: "134 – 140",
  YM: "146 – 152",
  YL: "152 – 158",
  YXL: "164 – 170",
  S: "170 – 176",
  M: "176 – 188",
};
