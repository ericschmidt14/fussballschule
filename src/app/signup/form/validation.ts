import {
  emailValidation,
  notEmptyValidation,
  postalCodeValidation,
} from "@/app/utils";
import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  if (active === 0) {
    return {
      childLastName: notEmptyValidation(
        values.childLastName,
        "Bitte Nachnamen angeben"
      ),
      childFirstName: notEmptyValidation(
        values.childFirstName,
        "Bitte Vornamen angeben"
      ),
      dob: values.dob ? null : "Bitte Geburtsdatum angeben",
      time: values.time ? null : "Bitte Zeitraum auswählen",
    };
  }

  if (active === 1) {
    return {
      parentLastName: notEmptyValidation(
        values.parentLastName,
        "Bitte Nachnamen angeben"
      ),
      parentFirstName: notEmptyValidation(
        values.parentFirstName,
        "Bitte Vornamen angeben"
      ),
      street: notEmptyValidation(values.street, "Bitte Straße angeben"),
      number: notEmptyValidation(values.number, "Bitte Hausnummer angeben"),
      postalCode: postalCodeValidation(values.postalCode),
      city: notEmptyValidation(values.street, "Bitte Ort angeben"),
      email: emailValidation(values.email),
      phone: notEmptyValidation(values.phone, "Bitte Rufnummer angeben"),
    };
  }

  if (active === 2) {
    return {
      conditions: values.conditions ? null : "",
    };
  }

  return {};
}
