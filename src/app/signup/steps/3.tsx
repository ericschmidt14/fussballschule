import Title from "../../components/title";
import { Checkbox, Fieldset, Spoiler } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../form/form";
import { FormWrapper } from "../../components/form";
import Conditions from "@/app/components/conditions";

export default function Step3({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Teilnahmebedingungen" />
      <Checkbox
        size="md"
        label="Ich habe die Teilnahmebedingungen gelesen und akzeptiert."
        key={form.key("conditions")}
        {...form.getInputProps("conditions", { type: "checkbox" })}
      />
      <Fieldset>
        <Spoiler showLabel="Mehr anzeigen" hideLabel="Weniger anziegen">
          <Conditions />
        </Spoiler>
      </Fieldset>
    </FormWrapper>
  );
}
