import Label from "@/app/components/label";
import { SoccerSchoolEntry } from "@/app/interfaces";
import { formatIBAN, getPrice } from "@/app/utils";
import { sizes } from "@/app/values";
import {
  Checkbox,
  Divider,
  Fieldset,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormRow, FormWrapper } from "../../components/form";
import Title from "../../components/title";
import { FormValues } from "../form/form";

export default function Step2({
  form,
  entry,
}: {
  form: UseFormReturnType<FormValues>;
  entry: SoccerSchoolEntry | undefined;
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
      <Divider label="Weitere Angaben" />
      <div>
        <Label text="Laufzeit & Abrechnungszeitraum" />
        <SegmentedControl
          key={form.key("period")}
          {...form.getInputProps("period")}
          fullWidth
          data={[
            {
              label: `6 Monate à ${getPrice(entry?.youth || "", "6")}€`,
              value: "6",
            },
            {
              label: `3 Monate à ${getPrice(entry?.youth || "", "3")}€`,
              value: "3",
            },
          ]}
        />
        <p className="mt-2 muted small">
          Die Abbuchung erfolgt monatlich. Gesamtpreis:{" "}
          {getPrice(entry?.youth || "", form.getValues().period) *
            +form.getValues().period}
          €
        </p>
      </div>
      <div>
        <Label text="Konfektionsgröße" />
        <SegmentedControl
          key={form.key("size")}
          {...form.getInputProps("size")}
          fullWidth
          data={["128", "140", "152", "164", "S", "M"]}
          transitionTimingFunction="linear"
        />
        <p
          className="small muted"
          style={{ marginTop: "calc(var(--mantine-spacing-xs) / 2)" }}
        >
          Entspricht der Größe {sizes[form.getValues().size]}
        </p>
        <p className="mt-2 muted small">
          Mit der Anmeldung erhält jeder Teilnehmer ein exklusives
          Trainings-Outfit. Dieses besteht aus einem Trikot, Hose und Stutzen
          sowie einer 1. FC Nürnberg Trinkflasche und wird gegen eine Gebühr von
          45,00€ vor Ort an den Teilnehmer vergeben. Ein Umtausch ist für 14
          Tage und nur in einem angemessenen Zustand möglich.
        </p>
      </div>
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
