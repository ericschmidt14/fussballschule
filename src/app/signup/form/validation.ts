import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  // if (active === 0) {
  //   return {
  //     time: values.time ? null : "Bitte Zeitraum auswählen",
  //   };
  // }

  // if (active === 1) {
  //   return {
  //     childLastName: notEmptyValidation(
  //       values.childLastName,
  //       "Bitte Nachnamen angeben"
  //     ),
  //     childFirstName: notEmptyValidation(
  //       values.childFirstName,
  //       "Bitte Vornamen angeben"
  //     ),
  //     dob: values.dob ? null : "Bitte Geburtsdatum angeben",
  //   };
  // }

  // if (active === 2) {
  //   return {
  //     parentLastName: notEmptyValidation(
  //       values.parentLastName,
  //       "Bitte Nachnamen angeben"
  //     ),
  //     parentFirstName: notEmptyValidation(
  //       values.parentFirstName,
  //       "Bitte Vornamen angeben"
  //     ),
  //     street: notEmptyValidation(values.street, "Bitte Straße angeben"),
  //     number: notEmptyValidation(values.number, "Bitte Hausnummer angeben"),
  //     postalCode: postalCodeValidation(values.postalCode),
  //     city: notEmptyValidation(values.street, "Bitte Ort angeben"),
  //     email: emailValidation(values.email),
  //     phone: notEmptyValidation(values.phone, "Bitte Rufnummer angeben"),
  //   };
  // }

  // if (active === 3) {
  //   return {
  //     agree: values.agree ? null : "",
  //     name: notEmptyValidation(
  //       values.name,
  //       "Bitte vollständigen Namen angeben"
  //     ),
  //     iban: ibanValidation(values.iban),
  //     bic: notEmptyValidation(values.bic, "Bitte BIC angeben"),
  //   };
  // }

  // if (active === 4) {
  //   return {
  //     conditions: values.conditions ? null : "",
  //     privacy: values.privacy ? null : "",
  //   };
  // }

  return {};
}

const notEmptyValidation = (value: string, error: string) => {
  return value.trim().length < 1 ? error : null;
};

const postalCodeValidation = (code: string) => {
  return /^[0-9][0-9][0-9][0-9][0-9]$/.test(code)
    ? null
    : "Ungültige Postleitzahl";
};

const emailValidation = (email: string) => {
  return /\S+@\S+\.\S+/.test(email) ? null : "Ungültige Mailadresse";
};
