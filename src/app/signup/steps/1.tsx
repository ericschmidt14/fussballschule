"use client";
import { useSoccerSchoolContext } from "@/app/context/soccerSchoolContext";
import { getPrice } from "@/app/utils";
import {
  Alert,
  Fieldset,
  SegmentedControl,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { differenceInYears } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/de";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormRow, FormWrapper } from "../../components/form";
import Label from "../../components/label";
import Title from "../../components/title";
import { FormValues } from "../form/form";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);
  const { groups } = useSoccerSchoolContext();

  const today = new Date();
  const minAge = 4;
  const maxAge = 14;
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );

  const getTimes = () => {
    if (groups.length < 1) return [];

    const selectedGroup = groups.filter(
      (g) => g.value === form.getValues().youth
    )[0];

    const hasSlots = selectedGroup.times.trim() !== "";
    return hasSlots ? selectedGroup.times.split(" / ") : ["---"];
  };

  const setYouth = (value: Date | undefined) => {
    const age = differenceInYears(new Date(), new Date(value || ""));
    const group = groups
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

  form.watch("youth", () => {
    form.setFieldValue("time", "");
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
            minDate={minDate}
            maxDate={maxDate}
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
        <div className="flex flex-col gap-4">
          <FormRow>
            <Select
              label="Gruppe"
              key={form.key("youth")}
              {...form.getInputProps("youth")}
              data={groups.map((g) => {
                return {
                  value: g.value,
                  label: g.label,
                };
              })}
              allowDeselect={false}
              checkIconPosition="right"
            />
            <Select
              label="Zeit"
              key={form.key("time")}
              {...form.getInputProps("time")}
              data={getTimes()}
              checkIconPosition="right"
            />
          </FormRow>
          <p className="small muted">
            <b>
              6 Monate à {getPrice(form.getValues().youth, "6")}€ bzw. 3 Monate
              à {getPrice(form.getValues().youth, "3")}€.
            </b>{" "}
            Das Training findet grundsätzlich in gemischten Gruppen statt –
            unabhängig vom Geschlecht. Für Mädchen bieten wir außerdem die
            Option für unsere Mädels-Fußballschule an.
          </p>
          <Alert variant="light" title="Hinweis" icon={<IconInfoCircle />}>
            Wegen der hohen Nachfrage können wir zur Zeit leider nur eine
            begrenzte Auswahl an Trainingsgruppen für Neuanmeldungen anbieten.
            Schau gerne später wieder vorbei, falls aktuell keine passende
            Gruppe zur Auswahl stehen sollte.
          </Alert>
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
