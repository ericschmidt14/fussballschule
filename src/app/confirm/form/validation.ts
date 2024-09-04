import { isValidIBAN } from "@/app/utils";
import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  return {};
}

const notEmptyValidation = (value: string, error: string) => {
  return value.trim().length < 1 ? error : null;
};

const ibanValidation = (iban: string) => {
  return isValidIBAN(iban) ? null : "Ungültige IBAN";
};
