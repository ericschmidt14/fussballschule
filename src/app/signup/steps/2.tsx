import { UseFormReturnType } from "@mantine/form";
import Title from "../../components/title";
import { TextInput } from "@mantine/core";
import { FormValues } from "../form/form";
import { FormRow, FormWrapper } from "../../components/form";

export default function Step2({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Angaben zum Erziehungsberechtigten" />
      <FormRow>
        <TextInput
          label="Vorname"
          key={form.key("parentFirstName")}
          {...form.getInputProps("parentFirstName")}
        />
        <TextInput
          label="Nachname"
          key={form.key("parentLastName")}
          {...form.getInputProps("parentLastName")}
        />
      </FormRow>
      <FormRow asymmetric>
        <TextInput
          className="col-span-3"
          label="Straße"
          key={form.key("street")}
          {...form.getInputProps("street")}
        />
        <TextInput
          label="Nr"
          key={form.key("number")}
          {...form.getInputProps("number")}
        />
      </FormRow>
      <FormRow asymmetric>
        <TextInput
          label="PLZ"
          key={form.key("postalCode")}
          {...form.getInputProps("postalCode")}
        />
        <TextInput
          className="col-span-3"
          label="Ort"
          key={form.key("city")}
          {...form.getInputProps("city")}
        />
      </FormRow>
      <FormRow>
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
      </FormRow>
    </FormWrapper>
  );
}
