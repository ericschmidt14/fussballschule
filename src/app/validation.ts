import { FormValues } from "./form";

export function validateForm(active: number, values: FormValues) {
  if (active === 2) {
    return {
      parentLastName:
        values.parentLastName.trim().length < 1 ? "Nachnamen angeben" : null,
      postalCode: /^[0-9][0-9][0-9][0-9][0-9]$/.test(values.postalCode)
        ? null
        : "Ungültige Postleitzahl",
    };
  }

  return {};
}
