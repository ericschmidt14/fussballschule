"use client";
import "dayjs/locale/de";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { SegmentedControl, TextInput, Textarea } from "@mantine/core";
import Label from "../components/label";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { FormValues } from "../form";

export default function Step2({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <div className="flex flex-col gap-8">
        <Title text="Angaben zum teilnehmenden Kind" />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Nachname"
            key={form.key("child.lastName")}
            {...form.getInputProps("child.lastName")}
          />
          <TextInput
            label="Vorname"
            key={form.key("child.firstName")}
            {...form.getInputProps("child.firstName")}
          />
          <DatePickerInput
            defaultDate={new Date(2010, 1)}
            defaultLevel="decade"
            valueFormat="DD.MM.YYYY"
            label="Geburtstag"
            placeholder="04.05.1900"
            key={form.key("child.dob")}
            {...form.getInputProps("child.dob")}
          />
          <div>
            <Label text="Geschlecht" />
            <SegmentedControl
              key={form.key("child.gender")}
              {...form.getInputProps("child.gender")}
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
            description="(optional)"
            placeholder="1. FC Nürnberg"
            key={form.key("club")}
            {...form.getInputProps("child.club")}
          />
          <TextInput
            label="Ich spiele gerne als"
            description="(optional)"
            placeholder="Stürmer"
            key={form.key("position")}
            {...form.getInputProps("child.position")}
          />
          <Textarea
            className="col-span-2"
            label="Besonderheiten (Allergien, Krankheiten, Medikamente etc.)"
            description="(optional)"
            key={form.key("child.misc")}
            {...form.getInputProps("child.misc")}
          />
          <div className="col-span-2">
            <Label text="Konfektionsgröße" />
            <SegmentedControl
              key={form.key("child.size")}
              {...form.getInputProps("child.size")}
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
        </div>
      </div>
    </DatesProvider>
  );
}
