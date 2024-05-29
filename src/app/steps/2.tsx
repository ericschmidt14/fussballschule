"use client";
import "dayjs/locale/de";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isNotEmpty, useForm } from "@mantine/form";
import Title from "../components/title";
import { SegmentedControl, TextInput, Textarea } from "@mantine/core";
import Label from "../components/label";
import { DatePickerInput, DatesProvider } from "@mantine/dates";

export default function Step2() {
  dayjs.extend(customParseFormat);

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      lastName: "",
      firstName: "",
      dob: new Date(2010, 1),
      gender: "male",
      club: "",
      position: "",
      misc: "",
      size: "128",
    },

    validate: {
      lastName: isNotEmpty("Bitte geben Sie einen Nachnamen an"),
      firstName: isNotEmpty("Bitte geben Sie einen Vornamen an"),
    },
  });

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <div className="flex flex-col gap-8">
        <Title text="Angaben zum teilnehmenden Kind" />
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
          <DatePickerInput
            withAsterisk
            defaultDate={new Date(2010, 1)}
            defaultLevel="decade"
            valueFormat="DD.MM.YYYY"
            label="Geburtstag"
            placeholder="04.05.1900"
            key={form.key("dob")}
            {...form.getInputProps("dob")}
          />
          <div>
            <Label text="Geschlecht" />
            <SegmentedControl
              key={form.key("gender")}
              {...form.getInputProps("gender")}
              fullWidth
              data={[
                { label: "Junge", value: "male" },
                { label: "Mädchen", value: "female" },
              ]}
              transitionDuration={500}
              transitionTimingFunction="linear"
            />
          </div>
          <TextInput
            label="Verein"
            key={form.key("club")}
            {...form.getInputProps("club")}
          />
          <TextInput
            label="Ich spiele gerne als"
            placeholder="Stürmer"
            key={form.key("position")}
            {...form.getInputProps("position")}
          />
          <Textarea
            className="col-span-2"
            label="Besonderheiten (Allergien, Krankheiten, Medikamente etc.)"
            key={form.key("misc")}
            {...form.getInputProps("misc")}
          />
          <div className="col-span-2">
            <Label text="Konfektionsgröße" />
            <SegmentedControl
              key={form.key("size")}
              {...form.getInputProps("size")}
              fullWidth
              data={["128", "140", "152", "164", "176", "S", "M"]}
              transitionTimingFunction="linear"
            />
            <p className="mt-2 col-span-2 muted small">
              Mit der Anmeldung erhalten Sie als Teilnehmer ein exklusives
              Trainings-Outfit der Fußballschule. Dieses besteht aus einem
              Trikot, Hose und Stutzen sowie einer 1. FC Nürnberg Trinkflasche
              und wird gegen eine Gebühr von 39,00€ vor Ort an den Teilnehmer
              vergeben. Ein Umtausch ist für 14 Tage und nur in einem
              angemessenen Zustand möglich.
            </p>
          </div>
        </form>
      </div>
    </DatesProvider>
  );
}
