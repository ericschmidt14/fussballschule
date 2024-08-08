export const prices: { [key: string]: string } = {
  3: "55€",
  6: "50€",
};

export const youths: { [key: string]: string } = {
  a: "Alle",
  f: "F-Jugend",
  e: "E-Jugend",
  d: "D-Jugend",
  t: "Torwarttraining",
};

export const ageGroups: { [key: string]: string } = {
  f: "7 – 8",
  e: "9 – 10",
  d: "10 – 12",
  t: "10 – 12",
};

export const times: {
  [key: string]: { label: string; value: string }[];
} = {
  f: [
    { label: "Montag, 15:00 – 16:30 Uhr", value: "Mo" },
    { label: "Dienstag, 15:00 – 16:30 Uhr", value: "Di" },
  ],

  e: [
    { label: "Montag, 15:00 – 16:30 Uhr", value: "Mo" },
    { label: "Dienstag, 15:00 – 16:30 Uhr", value: "Di" },
    { label: "Mittwoch, 15:00 – 16:30 Uhr", value: "Mi" },
  ],

  d: [{ label: "Freitag, 15:00 – 16:30 Uhr", value: "Fr" }],
  t: [{ label: "Mittwoch, 15:00 – 16:30 Uhr", value: "Mi" }],
};

export const genders: { [key: string]: string } = {
  male: "Junge",
  female: "Mädchen",
};
