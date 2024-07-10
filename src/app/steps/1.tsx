import { useState } from "react";
import Title from "../components/title";
import { SegmentedControl, Select } from "@mantine/core";
import Label from "../components/label";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";
import { times, ageGroups } from "../values";

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
      <div>
        <p className="small">
          <b>Das Training findet ganzjährig statt</b>, ausgenommen sind
          Feiertage und Schulferien. Eine Anmeldung ist ganzjährig möglich.
        </p>
      </div>
    </FormWrapper>
  );
}
