import { UseFormReturnType } from "@mantine/form";
import Title from "../../components/title";
import {
  Checkbox,
  Divider,
  Fieldset,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { FormValues } from "../form/form";
import { FormRow, FormWrapper } from "../../components/form";
import { formatIBAN } from "@/app/utils";

export default function BankData({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Ermächtigung zum SEPA-Bankeinzug" />
      <Checkbox
        label="Hiermit ermächtige ich den 1. FC Nürnberg e.V. widerruflich, den zu entrichtenden Beitrag bei Fälligkeit zu Lasten meines Kontos mittels SEPA-Lastschrift einzuziehen."
        key={form.key("agree")}
        {...form.getInputProps("agree", { type: "checkbox" })}
      />
      <Divider label="Kontodaten" labelPosition="center" />
      <TextInput
        className="col-span-2"
        label="Name des Kontoinhabers"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <FormRow>
        <TextInput
          label="IBAN"
          key={form.key("iban")}
          {...form.getInputProps("iban")}
          onChange={(event) => {
            form.setFieldValue("iban", formatIBAN(event.currentTarget.value));
          }}
        />
        <TextInput
          label="BIC"
          key={form.key("bic")}
          {...form.getInputProps("bic")}
        />
      </FormRow>
      <p className="col-span-2 muted small">
        Ich willige in die Verarbeitung meiner o. g. Bankdaten und persönlichen
        Daten durch den 1. Fußball-Club Nürnberg e.V. ein. Die gesonderten
        Datenschutzhinweise zur Einzugsermächtigung und zum
        SEPA-Lastschriftverfahren habe ich zustimmend zur Kenntnis genommen.
        Ohne diese Einwilligung können meine Bankdaten nicht genutzt werden und
        ein SEPA-Lastschrifteinzug der o. g. Forderungen nicht erfolgen. Die
        angegebenen Daten werden ausschließlich zum Einzug der offenen
        Forderungen bzw. zur Erstattung von Guthaben verwendet. Eine
        weitergehende Datenverarbeitung ist nur aufgrund einer ausdrücklichen
        Ermächtigung möglich.
      </p>
      <Divider label="Laufzeit & Abrechnungszeitraum" />
      <SegmentedControl
        key={form.key("period")}
        {...form.getInputProps("period")}
        fullWidth
        data={[
          {
            label: (
              <>
                <h3>3 Monate à 55€</h3>
                <p className="muted">12 Einheiten</p>
              </>
            ),
            value: "3",
          },
          {
            label: (
              <>
                <h3>6 Monate à 50€</h3>
                <p className="muted">24 Einheiten</p>
              </>
            ),
            value: "6",
          },
        ]}
        transitionDuration={500}
        transitionTimingFunction="linear"
      />
      <Fieldset legend="Mitgliederbereich">
        <FormRow>
          <div>
            <h3>50% Rabatt</h3>
            <p>
              Auf den 1. Monat für Club-Mitglieder <br /> – auch bei
              Neuanmeldung
            </p>
          </div>
          <TextInput
            label="Mitgliedsnummer"
            description="(optional)"
            key={form.key("memberno")}
            {...form.getInputProps("memberno")}
          />
        </FormRow>
      </Fieldset>
    </FormWrapper>
  );
}
