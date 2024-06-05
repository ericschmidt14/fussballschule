import { useState } from "react";
import Title from "../components/title";
import { SegmentedControl, Select } from "@mantine/core";
import Label from "../components/label";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [youth, setYouth] = useState(form.getValues().youth);

  form.watch("youth", ({ value }) => {
    setYouth(value);
    form.setFieldValue("time", times[value][0].value);
  });

  const youths: { [key: string]: string } = {
    f: "7 – 8",
    e: "9 – 10",
    d: "10 – 12",
    t: "10 – 12",
  };

  const times: {
    [key: string]: { label: string; value: string }[];
  } = {
    f: [
      { label: "Montag, 15:00 – 16:30 Uhr", value: "Mo" },
      { label: "Dienstag, 15:00 – 16:30 Uhr", value: "Di" },
    ],

    e: [
      { label: "Montag, 15:00 – 16:30 Uhr", value: "Mo" },
      { label: "Dienstag, 15:00 – 16:30 Uhr", value: "Di" },
      { label: "Mittwoch, 15:00 – 16:30 Uhr", value: "Mi" },
    ],

    d: [{ label: "Freitag, 15:00 – 16:30 Uhr", value: "Fr" }],
    t: [{ label: "Mittwoch, 15:00 – 16:30 Uhr", value: "Mi" }],
  };
  return (
    <FormWrapper>
      <Title text="Zeitraum & Termin" />
      <SegmentedControl
        key={form.key("period")}
        {...form.getInputProps("period")}
        fullWidth
        data={[
          {
            label: (
              <>
                <h3>3 Monate à 55€</h3>
                <p className="muted">12 Trainingseinheiten</p>
              </>
            ),
            value: "3",
          },
          {
            label: (
              <>
                <h3>6 Monate à 50€</h3>
                <p className="muted">24 Trainingseinheiten</p>
              </>
            ),
            value: "6",
          },
        ]}
        transitionDuration={500}
        transitionTimingFunction="linear"
      />
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
            {youths[youth]} Jahre
          </p>
        </div>
        <Select
          label="Zeit"
          key={form.key("time")}
          {...form.getInputProps("time")}
          data={times[youth]}
        />
      </FormRow>
      <div>
        <p className="small">
          <b>Das Training findet ganzjährig statt</b>, ausgenommen sind
          Feiertage und Schulferien. Eine Anmeldung ist ganzjährig möglich.
        </p>
      </div>
    </FormWrapper>
  );
}
