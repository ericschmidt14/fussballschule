"use client";
import { FormRow } from "@/app/components/form";
import Label from "@/app/components/label";
import { useSoccerSchoolContext } from "@/app/context/soccerSchoolContext";
import { SoccerSchoolEntry } from "@/app/interfaces";
import { copy, formatIBAN } from "@/app/utils";
import {
  ActionIcon,
  Button,
  Divider,
  Fieldset,
  Popover,
  SegmentedControl,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCopy, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import "dayjs/locale/de";
import { useState } from "react";
import { FormValues, getInitialValues } from "../form/form";
import { validateForm } from "../form/validation";

export function DrawerContent({
  data,
  close,
}: {
  data: SoccerSchoolEntry;
  close: () => void;
}) {
  const { groups } = useSoccerSchoolContext();

  const [opened, setOpened] = useState(false);

  const form = useForm<FormValues>({
    validateInputOnChange: true,
    initialValues: getInitialValues(data),
    validate: (values: FormValues) => validateForm(values),
  });

  form.watch("youth", ({ value }) => {
    form.setFieldValue("time", "");
  });

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.onSubmit((values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify({ ...data, ...values }, null, 2),
          })
            .then((res) => res.text())
            .then(() => close())
            .catch((error) => console.error(error));
        })}
      >
        <Fieldset legend="Angaben zum teilnehmenden Kind">
          <div className="flex flex-col gap-2">
            <FormRow>
              <TextInput
                label="Vorname"
                key={form.key("childFirstName")}
                {...form.getInputProps("childFirstName")}
                disabled
              />
              <TextInput
                label="Nachname"
                key={form.key("childLastName")}
                {...form.getInputProps("childLastName")}
                disabled
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
                data={groups
                  .filter((g) => g.value === form.getValues().youth)[0]
                  .times.split("/")}
                allowDeselect={false}
                checkIconPosition="right"
              />
            </FormRow>
            <FormRow>
              <TextInput
                label="Verein"
                key={form.key("club")}
                {...form.getInputProps("club")}
              />
              <TextInput
                label="Ich spiele gerne als"
                key={form.key("position")}
                {...form.getInputProps("position")}
              />
            </FormRow>
            <Textarea
              label="Besonderheiten"
              key={form.key("misc")}
              {...form.getInputProps("misc")}
            />
          </div>
        </Fieldset>
        <Fieldset legend="Angaben zum Erziehungsberechtigten">
          <div className="flex flex-col gap-2">
            <FormRow>
              <TextInput
                label="Vorname"
                key={form.key("parentFirstName")}
                {...form.getInputProps("parentFirstName")}
                disabled
              />
              <TextInput
                label="Nachname"
                key={form.key("parentLastName")}
                {...form.getInputProps("parentLastName")}
                disabled
              />
            </FormRow>
            <FormRow asymmetric>
              <TextInput
                className="col-span-3"
                label="Straße"
                key={form.key("street")}
                {...form.getInputProps("street")}
              />
              <TextInput
                label="Nr"
                key={form.key("number")}
                {...form.getInputProps("number")}
              />
            </FormRow>
            <FormRow asymmetric>
              <TextInput
                label="PLZ"
                key={form.key("postalCode")}
                {...form.getInputProps("postalCode")}
              />
              <TextInput
                className="col-span-3"
                label="Ort"
                key={form.key("city")}
                {...form.getInputProps("city")}
              />
            </FormRow>
            <FormRow>
              <TextInput
                label="E-Mail"
                key={form.key("email")}
                {...form.getInputProps("email")}
                rightSection={
                  <ActionIcon
                    color="dark"
                    variant="transparent"
                    onClick={() => copy(form.values.email)}
                    title="Mailadresse kopieren"
                  >
                    <IconCopy size={16} />
                  </ActionIcon>
                }
                disabled
              />
              <TextInput
                label="Handy / Telefon"
                key={form.key("phone")}
                {...form.getInputProps("phone")}
              />
            </FormRow>
          </div>
        </Fieldset>
        <Fieldset legend="Kontodaten">
          <div className="flex flex-col gap-2">
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
                  form.setFieldValue(
                    "iban",
                    formatIBAN(event.currentTarget.value)
                  );
                }}
                rightSection={
                  <ActionIcon
                    color="dark"
                    variant="transparent"
                    onClick={() => copy(form.values.iban)}
                    title="IBAN kopieren"
                  >
                    <IconCopy size={16} />
                  </ActionIcon>
                }
              />
              <TextInput
                label="BIC"
                key={form.key("bic")}
                {...form.getInputProps("bic")}
                rightSection={
                  <ActionIcon
                    color="dark"
                    variant="transparent"
                    onClick={() => copy(form.values.bic)}
                    title="BIC kopieren"
                  >
                    <IconCopy size={16} />
                  </ActionIcon>
                }
              />
            </FormRow>
            <Button
              color="dark"
              variant="transparent"
              size="xs"
              onClick={() =>
                copy(
                  `${window.location.origin}/confirm?token=${data.childToken}`
                )
              }
              leftSection={<IconCopy size={16} />}
            >
              Link für Zahlungsdaten kopieren
            </Button>
          </div>
        </Fieldset>
        <Fieldset legend="Weitere Angaben">
          <div className="flex flex-col gap-2">
            <div>
              <Label text="Abrechnungszeitraum" />
              <SegmentedControl
                key={form.key("period")}
                {...form.getInputProps("period")}
                fullWidth
                data={[
                  {
                    label: "3 Monate",
                    value: "3",
                  },
                  {
                    label: "6 Monate",
                    value: "6",
                  },
                ]}
              />
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
            </div>
            <TextInput
              label="Mitgliedsnummer"
              key={form.key("memberno")}
              {...form.getInputProps("memberno")}
            />
          </div>
        </Fieldset>
        <div className="grid grid-cols-1 gap-4">
          <Button
            type="submit"
            color="red"
            leftSection={<IconDeviceFloppy size={16} />}
            disabled={!form.isValid()}
          >
            Änderungen speichern
          </Button>
          <Divider label="Gefahrenzone" />
          <Popover opened={opened} onChange={setOpened} withArrow>
            <Popover.Target>
              <Button
                color="dark"
                leftSection={<IconTrash size={16} />}
                onClick={() => setOpened((o) => !o)}
              >
                Datensatz löschen
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex flex-col gap-2">
                <p>Datensatz endgültig löschen?</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() =>
                      fetch(`/api/token/${data.childToken}`, {
                        method: "DELETE",
                      })
                        .then((res) => res.text())
                        .then(() => close())
                        .catch((error) => console.error(error))
                    }
                  >
                    Ja
                  </Button>
                  <Button
                    variant="transparent"
                    onClick={() => setOpened(false)}
                  >
                    Nein
                  </Button>
                </div>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </form>
    </DatesProvider>
  );
}
