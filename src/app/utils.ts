import { format } from "date-fns";
import { json2csv } from "json-2-csv";

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
