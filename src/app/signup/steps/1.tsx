"use client";
import "dayjs/locale/de";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UseFormReturnType } from "@mantine/form";
import Title from "../../components/title";
import {
  Fieldset,
  SegmentedControl,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import Label from "../../components/label";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { FormValues } from "../form/form";
import { FormRow, FormWrapper } from "../../components/form";
import { ageGroups, times } from "../../values";
import { useState } from "react";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  const [youth, setYouth] = useState(form.getValues().youth);

  form.watch("youth", ({ value }) => {
    setYouth(value);
    form.setFieldValue("time", times[value][0].value);
  });

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <FormWrapper>
        <Title text="Angaben zum teilnehmenden Kind" />
        <FormRow>
          <TextInput
            label="Vorname"
            key={form.key("childFirstName")}
            {...form.getInputProps("childFirstName")}
          />
          <TextInput
            label="Nachname"
            key={form.key("childLastName")}
            {...form.getInputProps("childLastName")}
          />
        </FormRow>
        <FormRow>
          <DatePickerInput
            defaultDate={new Date(2010, 1)}
            defaultLevel="decade"
            valueFormat="DD.MM.YYYY"
            label="Geburtstag"
            placeholder="TT.MM.JJJJ"
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
        </FormRow>
        <FormRow>
          <div>
            <Label text="Jugend" />
            <SegmentedControl
              key={form.key("youth")}
              {...form.getInputProps("youth")}
              fullWidth
              data={[
                { label: "F", value: "f" },
                { label: "E", value: "e" },
                { label: "D", value: "d" },
                { label: "Torwarttraining", value: "t" },
              ]}
              transitionDuration={500}
              transitionTimingFunction="linear"
            />
            <p
              className="small muted"
              style={{ marginTop: "calc(var(--mantine-spacing-xs) / 2)" }}
            >
              {ageGroups[youth]} Jahre
            </p>
          </div>
          <Select
            label="Zeit"
            key={form.key("time")}
            {...form.getInputProps("time")}
            data={times[youth]}
            allowDeselect={false}
            checkIconPosition="right"
          />
        </FormRow>
        <Fieldset legend="Weitere Angaben">
          <FormWrapper>
            <FormRow>
              <TextInput
                label="Verein"
                description="(optional)"
                placeholder="1. FC Nürnberg"
                key={form.key("club")}
                {...form.getInputProps("club")}
              />
              <TextInput
                label="Ich spiele gerne als"
                description="(optional)"
                placeholder="Stürmer"
                key={form.key("position")}
                {...form.getInputProps("position")}
              />
            </FormRow>
            <Textarea
              label="Besonderheiten"
              description="(optional)"
              placeholder="Allergien, Krankheiten, Medikamente etc."
              key={form.key("misc")}
              {...form.getInputProps("misc")}
            />
            <div>
              <Label text="Konfektionsgröße" />
              <SegmentedControl
                key={form.key("size")}
                {...form.getInputProps("size")}
                fullWidth
                data={["YS", "YM", "YL", "YXL", "S", "M"]}
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
          </FormWrapper>
        </Fieldset>
      </FormWrapper>
    </DatesProvider>
  );
}
