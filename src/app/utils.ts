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
