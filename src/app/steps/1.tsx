import { useState } from "react";
import Title from "../components/title";
import { SegmentedControl, Select } from "@mantine/core";
import Label from "../components/label";
import { UseFormReturnType } from "@mantine/form";

export default function Step1({ form }: { form: UseFormReturnType<any> }) {
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
      { label: "Montag, 15:00 – 16:30 Uhr", value: "1" },
      { label: "Dienstag, 15:00 – 16:30 Uhr", value: "2" },
    ],

    e: [
      { label: "Montag, 15:00 – 16:30 Uhr", value: "3" },
      { label: "Dienstag, 15:00 – 16:30 Uhr", value: "4" },
      { label: "Mittwoch, 15:00 – 16:30 Uhr", value: "5" },
    ],

    d: [{ label: "Freitag, 15:00 – 16:30 Uhr", value: "6" }],
    t: [{ label: "Mittwoch, 15:00 – 16:30 Uhr", value: "7" }],
  };
  return (
    <div className="flex flex-col gap-8">
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
      <div className="grid grid-cols-2 gap-4">
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
          <p className="small muted">{youths[youth]} Jahre</p>
        </div>
        <Select
          label="Zeit"
          key={form.key("time")}
          {...form.getInputProps("time")}
          data={times[youth]}
        />
      </div>
      <div>
        <p className="small">
          <b>Das Training findet ganzjährig statt</b>, ausgenommen sind
          Feiertage und Schulferien. Eine Anmeldung ist ganzjährig möglich.
        </p>
      </div>
    </div>
  );
}
