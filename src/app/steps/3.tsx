import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { TextInput } from "@mantine/core";

export default function Step3({ form }: { form: UseFormReturnType<any> }) {
  return (
    <div className="flex flex-col gap-8">
      <Title text="Angaben zum Erziehungsberechtigten" />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nachname"
          key={form.key("parent.lastName")}
          {...form.getInputProps("parent.lastName")}
        />
        <TextInput
          label="Vorname"
          key={form.key("parent.firstName")}
          {...form.getInputProps("parent.firstName")}
        />
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            className="col-span-3"
            label="Straße"
            key={form.key("parent.street")}
            {...form.getInputProps("parent.street")}
          />
          <TextInput
            label="Hausnummer"
            key={form.key("parent.number")}
            {...form.getInputProps("parent.number")}
          />
        </div>
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <TextInput
            label="Postleitzahl"
            key={form.key("parent.postalCode")}
            {...form.getInputProps("parent.postalCode")}
          />
          <TextInput
            className="col-span-3"
            label="Ort"
            key={form.key("parent.city")}
            {...form.getInputProps("parent.city")}
          />
        </div>
        <TextInput
          label="E-Mail"
          description="Für Ihre Anmeldebestätigung"
          key={form.key("parent.email")}
          {...form.getInputProps("parent.email")}
        />
        <TextInput
          label="Handy / Telefon"
          description="Tagsüber erreichbar"
          key={form.key("parent.phone")}
          {...form.getInputProps("parent.phone")}
        />
      </div>
    </div>
  );
}
