import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  if (active === 0) {
    return {
      time: values.time ? null : "Bitte Zeitraum auswählen",
    };
  }

  if (active === 1) {
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
    };
  }

  if (active === 2) {
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

  if (active === 3) {
    return {
      agree: values.agree ? null : "",
      name: notEmptyValidation(
        values.name,
        "Bitte vollständigen Namen angeben"
      ),
      iban: ibanValidation(values.iban),
      bic: notEmptyValidation(values.bic, "Bitte BIC angeben"),
    };
  }

  if (active === 4) {
    return {
      conditions: values.conditions ? null : "",
      privacy: values.privacy ? null : "",
    };
  }

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

const ibanValidation = (iban: string) => {
  return /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/.test(
    iban
  )
    ? null
    : "Ungültige IBAN";
};
