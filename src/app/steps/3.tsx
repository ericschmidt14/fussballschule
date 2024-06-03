import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { TextInput } from "@mantine/core";
import { FormValues } from "../form";

export default function Step3({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <Title text="Angaben zum Erziehungsberechtigten" />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nachname"
          key={form.key("parentLastName")}
          {...form.getInputProps("parentLastName")}
        />
        <TextInput
          label="Vorname"
          key={form.key("parentFirstName")}
          {...form.getInputProps("parentFirstName")}
        />
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            className="col-span-3"
            label="Straße"
            key={form.key("street")}
            {...form.getInputProps("street")}
          />
          <TextInput
            label="Hausnummer"
            key={form.key("number")}
            {...form.getInputProps("number")}
          />
        </div>
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            label="Postleitzahl"
            key={form.key("postalCode")}
            {...form.getInputProps("postalCode")}
          />
          <TextInput
            className="col-span-3"
            label="Ort"
            key={form.key("city")}
            {...form.getInputProps("city")}
          />
        </div>
        <TextInput
          label="E-Mail"
          description="Für Ihre Anmeldebestätigung"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Handy / Telefon"
          description="Tagsüber erreichbar"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
      </div>
    </div>
  );
}
