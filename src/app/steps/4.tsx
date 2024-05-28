import { isNotEmpty, matches, useForm } from "@mantine/form";
import Title from "../components/title";
import { Checkbox, TextInput } from "@mantine/core";

export default function Step4() {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      agree: false,
      name: "",
      iban: "",
      bic: "",
    },

    validate: {
      name: isNotEmpty("Bitte geben Sie einen Nachnamen an"),
      iban: matches(
        /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/,
        "Bitte geben Sie eine gültige IBAN an"
      ),
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <Title text="Ermächtigung zum SEPA-Bankeinzug" />
      <form className="grid grid-cols-2 gap-4">
        <Checkbox
          className="col-span-2"
          label="Hiermit ermächtige ich den 1. FC Nürnberg e.V. widerruflich, den zu entrichtenden Beitrag bei Fälligkeit zu Lasten meines Kontos mittels SEPA-Lastschrift einzuziehen."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />
        <TextInput
          withAsterisk
          className="col-span-2"
          label="Name des Kontoinhabers"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          withAsterisk
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
      </form>
    </div>
  );
}
