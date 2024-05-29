import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import Title from "../components/title";
import { TextInput } from "@mantine/core";

export default function Step3() {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      lastName: "",
      firstName: "",
      street: "",
      number: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
    },

    validate: {
      lastName: isNotEmpty("Bitte Nachnamen angeben"),
      firstName: isNotEmpty("Bitte Vornamen angeben"),
      postalCode: matches(
        /^[0-9][0-9][0-9][0-9][0-9]$/,
        "Bitte 5-stellige PLZ angeben"
      ),
      email: isEmail("Bitte gültige Mailadresse angeben"),
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <Title text="Angaben zum Erziehungsberechtigten" />
      <form className="grid grid-cols-2 gap-4">
        <TextInput
          withAsterisk
          label="Nachname"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          withAsterisk
          label="Vorname"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            withAsterisk
            className="col-span-3"
            label="Straße"
            key={form.key("street")}
            {...form.getInputProps("street")}
          />
          <TextInput
            withAsterisk
            label="Hausnummer"
            key={form.key("number")}
            {...form.getInputProps("number")}
          />
        </div>
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            withAsterisk
            label="Postleitzahl"
            key={form.key("postalCode")}
            {...form.getInputProps("postalCode")}
          />
          <TextInput
            withAsterisk
            className="col-span-3"
            label="Ort"
            key={form.key("city")}
            {...form.getInputProps("city")}
          />
        </div>
        <TextInput
          withAsterisk
          label="E-Mail"
          description="Für Ihre Anmeldebestätigung"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Handy / Telefon"
          description="Tagsüber erreichbar"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
      </form>
    </div>
  );
}
