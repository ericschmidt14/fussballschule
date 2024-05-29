import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { Checkbox, Divider, TextInput } from "@mantine/core";
import { FormValues } from "../form";

export default function Step4({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <Title text="Ermächtigung zum SEPA-Bankeinzug" />
      <div className="grid grid-cols-2 gap-4">
        <Checkbox
          className="col-span-2"
          size="md"
          label="Hiermit ermächtige ich den 1. FC Nürnberg e.V. widerruflich, den zu entrichtenden Beitrag bei Fälligkeit zu Lasten meines Kontos mittels SEPA-Lastschrift einzuziehen."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />
        <Divider
          label="Kontodaten"
          labelPosition="center"
          className="col-span-2"
        />
        <TextInput
          className="col-span-2"
          label="Name des Kontoinhabers"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          label="IBAN"
          key={form.key("iban")}
          {...form.getInputProps("iban")}
        />
        <TextInput
          label="BIC"
          key={form.key("bic")}
          {...form.getInputProps("bic")}
        />
        <p className="col-span-2 muted small">
          Ich willige in die Verarbeitung meiner o. g. Bankdaten und
          persönlichen Daten durch den 1. Fußball-Club Nürnberg e.V. ein. Die
          gesonderten Datenschutzhinweise zur Einzugsermächtigung und zum
          SEPA-Lastschriftverfahren habe ich zustimmend zur Kenntnis genommen.
          Ohne diese Einwilligung können meine Bankdaten nicht genutzt werden
          und ein SEPA-Lastschrifteinzug der o. g. Forderungen nicht erfolgen.
          Die angegebenen Daten werden ausschließlich zum Einzug der offenen
          Forderungen bzw. zur Erstattung von Guthaben verwendet. Eine
          weitergehende Datenverarbeitung ist nur aufgrund einer ausdrücklichen
          Ermächtigung möglich.
        </p>
      </div>
    </div>
  );
}
