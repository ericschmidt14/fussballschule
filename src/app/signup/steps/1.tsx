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
import { ageGroups, sizes, times } from "../../values";
import { differenceInYears } from "date-fns";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  const setYouth = (value: Date | undefined) => {
    const age = differenceInYears(new Date(), new Date(value || ""));
    const group = ageGroups
      .reverse()
      .find((g) => g.min <= age && g.max >= age)?.value;
    group && form.setFieldValue("youth", group);
  };

  form.watch("dob", ({ value }) => {
    setYouth(value);
  });

  form.watch("gender", ({ value }) => {
    if (value === "female") {
      form.setFieldValue("youth", "m");
    } else {
      setYouth(form.getValues().dob);
    }
  });

  form.watch("youth", ({ value }) => {
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
          <Select
            label="Gruppe"
            key={form.key("youth")}
            {...form.getInputProps("youth")}
            data={[
              { label: "Kindergarten (4 – 6 Jahre)", value: "k" },
              { label: "Fußballschule (7 – 9 Jahre)", value: "f1" },
              { label: "Fußballschule (8 – 10 Jahre)", value: "f2" },
              { label: "Fußballschule (10 – 13 Jahre)", value: "f3" },
              { label: "Mädels-Fußballschule (4 – 14 Jahre)", value: "m" },
            ]}
            allowDeselect={false}
            checkIconPosition="right"
          />
          <Select
            label="Zeit"
            key={form.key("time")}
            {...form.getInputProps("time")}
            data={times[form.getValues().youth]}
            allowDeselect={false}
            checkIconPosition="right"
          />
        </FormRow>
        <div>
          <Label text="Konfektionsgröße" />
          <SegmentedControl
            key={form.key("size")}
            {...form.getInputProps("size")}
            fullWidth
            data={["YS", "YM", "YL", "YXL", "S", "M"]}
            transitionTimingFunction="linear"
          />
          <p
            className="small muted"
            style={{ marginTop: "calc(var(--mantine-spacing-xs) / 2)" }}
          >
            {sizes[form.getValues().size]} cm
          </p>
          <p className="mt-2 col-span-2 muted small">
            Mit der Anmeldung erhalten Sie als Teilnehmer ein exklusives
            Trainings-Outfit der Fußballschule. Dieses besteht aus einem Trikot,
            Hose und Stutzen sowie einer 1. FC Nürnberg Trinkflasche und wird
            gegen eine Gebühr von 39,00€ vor Ort an den Teilnehmer vergeben. Ein
            Umtausch ist für 14 Tage und nur in einem angemessenen Zustand
            möglich.
          </p>
        </div>
        <Fieldset legend="Optionale Angaben">
          <FormWrapper>
            <FormRow>
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
            </FormRow>
            <Textarea
              label="Besonderheiten"
              placeholder="Allergien, Krankheiten, Medikamente etc."
              key={form.key("misc")}
              {...form.getInputProps("misc")}
            />
          </FormWrapper>
        </Fieldset>
      </FormWrapper>
    </DatesProvider>
  );
}
