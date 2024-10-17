import { format } from "date-fns";
import { json2csv } from "json-2-csv";
import { prices } from "./values";
import { SoccerSchoolEntry } from "./interfaces";

export function exportCSV(data: string) {
  const csv = json2csv(JSON.parse(data));
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    const fileName = `Export_${new Date().toISOString()}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function copy(text: string) {
  navigator.clipboard.writeText(text);
}

export const getPrice = (youth: string, period: string) => {
  return youth === "k" ? prices[period] - 10 : prices[period];
};

export function convertDOB(dob: string) {
  try {
    return format(new Date(dob), "dd.MM.yyyy");
  } catch (error) {
    return "Ungültiges Format";
  }
}

export const formatIBAN = (iban: string) => {
  return iban
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .toUpperCase();
};

export const notEmptyValidation = (value: string, error: string) => {
  return value.trim().length < 1 ? error : null;
};

export const postalCodeValidation = (code: string) => {
  return /^[0-9][0-9][0-9][0-9][0-9]$/.test(code)
    ? null
    : "Ungültige Postleitzahl";
};

export const emailValidation = (email: string) => {
  return /\S+@\S+\.\S+/.test(email) ? null : "Ungültige Mailadresse";
};

export const ibanValidation = (iban: string) => {
  return isValidIBAN(iban) ? null : "Ungültige IBAN";
};

export const isValidIBAN = (iban: string) => {
  const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  const formattedIban = iban.replace(/\s+/g, "").toUpperCase();

  if (!ibanPattern.test(formattedIban)) {
    return false;
  }

  const rearrangedIban = formattedIban.slice(4) + formattedIban.slice(0, 4);
  const numericIban = rearrangedIban.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  let remainder = numericIban;
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9);
    remainder =
      (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97 === 1;
};

export const checkState = (participant: SoccerSchoolEntry) => {
  if (participant.ended !== null) {
    return "ended";
  }
  if (participant.started !== null) {
    return "started";
  }
  if (participant.confirmed !== null) {
    return "confirmed";
  }
  if (participant.mailing3 !== null || participant.mailing == "3") {
    return "mailing3";
  }
  if (participant.mailing2 !== null || participant.mailing == "2") {
    return "mailing2";
  }
  return "new";
};
