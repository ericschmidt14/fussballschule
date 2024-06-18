import { format } from "date-fns";

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
