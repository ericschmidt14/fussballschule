import { ibanValidation, notEmptyValidation } from "@/app/utils";
import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  if (active === 1) {
    return {
      agree: values.agree ? null : "",
      name: notEmptyValidation(values.name, "Bitte Kontoinhaber angeben"),
      iban: ibanValidation(values.iban),
      bic: notEmptyValidation(values.bic, "Bitte BIC angeben"),
    };
  }

  if (active === 2) {
    return {
      conditions: values.conditions ? null : "",
      privacy: values.privacy ? null : "",
      recordings: values.recordings ? null : "",
      processing: values.processing ? null : "",
    };
  }

  return {};
}
