export const prices: { [key: string]: number } = {
  3: 55,
  6: 50,
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
    label: "Kindergarten (4 – 6 Jahre)",
    value: "k",
    min: 4,
    max: 6,
  },
  {
    label: "Fußballschule (7 – 9 Jahre)",
    value: "f1",
    min: 7,
    max: 9,
  },
  {
    label: "Fußballschule (8 – 10 Jahre)",
    value: "f2",
    min: 8,
    max: 10,
  },
  {
    label: "Fußballschule (10 – 13 Jahre)",
    value: "f3",
    min: 10,
    max: 13,
  },
  {
    label: "Mädels-Fußballschule (4 – 14 Jahre)",
    value: "m",
    min: 4,
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
  YXS: "128",
  YS: "140",
  YM: "152",
  YL: "164",
  S: "S",
  M: "M",
};
