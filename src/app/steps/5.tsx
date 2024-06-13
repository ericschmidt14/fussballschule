"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { Checkbox, Collapse, Divider, Spoiler, Table } from "@mantine/core";
import { FormValues } from "../form";
import { useState } from "react";
import { FormWrapper } from "../components/form";
import { genders, youths } from "../values";

export default function Step5({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [conditions, setConditions] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <FormWrapper>
      <Title text="Zusammenfassung & Bestätigung" />
      <Spoiler
        maxHeight={120}
        showLabel="Mehr anzeigen"
        hideLabel="Weniger anzeigen"
      >
        <Summary form={form} />
      </Spoiler>
      <div className="flex flex-col gap-4">
        <Divider label="Allgemeine Hinweise" labelPosition="center" />
        <Checkbox
          className="col-span-2"
          label={
            <>
              Ich habe die{" "}
              <span
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setConditions(!conditions);
                }}
              >
                Teilnahmebedingungen / AGB
              </span>{" "}
              gelesen und akzeptiert.
            </>
          }
          key={form.key("conditions")}
          {...form.getInputProps("conditions", { type: "checkbox" })}
        />
        <Collapse in={conditions}>
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Collapse>
        <Checkbox
          className="col-span-2"
          label={
            <>
              Ich habe die{" "}
              <span
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacy(!privacy);
                }}
              >
                Datenschutzhinweise
              </span>{" "}
              zur Kenntnis genommen.
            </>
          }
          key={form.key("privacy")}
          {...form.getInputProps("privacy", { type: "checkbox" })}
        />
        <Collapse in={privacy}>
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Collapse>
        <Divider
          label="Einwilligungen im Rahmen der Fußballschule"
          labelPosition="center"
        />
        <Checkbox
          className="col-span-2"
          label="Ton-, Foto- und Videoaufnahmen"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Ton-, Video- und Fotoaufnahmen sowie Vornamen, Bild, Stimme, Erscheinungsbild und Darbietung meines Kindes, die während des Besuchs der Fußballschule sowie bei Events in dessen Rahmen gefertigt werden, für die Zwecke der Öffentlichkeitsarbeit des Vereins verwendet werden dürfen."
          key={form.key("recordings")}
          {...form.getInputProps("recordings", { type: "checkbox" })}
        />

        <Checkbox
          className="col-span-2"
          label="Verarbeitung besonderer Kategorien personenbezogener Daten"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Gesundheitsdaten meines Kindes wie bspw. Erkrankungen, Verletzungen, Allergien zu verarbeiten, um das Training in der Fußballschule entsprechend gestalten und ggfs. notwendige Maßnahmen ergreifen zu können."
          key={form.key("processing")}
          {...form.getInputProps("processing", { type: "checkbox" })}
        />
        <p className="muted small">
          Mir ist bewusst, dass diese Einwilligungen freiwillig sind und ich sie
          jederzeit mit Wirkung für die Zukunft widerrufen kann. Hierfür genügt
          die Übersendung der Widerrufserklärung in Textform an die oben
          genannten Kontaktdaten des Verantwortlichen. Mir ist klar, dass durch
          den Widerruf der Einwilligung die Rechtmäßigkeit der aufgrund der
          Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt
          wird.
        </p>
      </div>
    </FormWrapper>
  );
}

function Summary({ form }: { form: UseFormReturnType<FormValues> }) {
  const data = [
    {
      description: "Zeitraum",
      value: `${form.getValues().period} Monate`,
    },
    {
      description: "Termin",
      value: `${youths[form.getValues().youth]} – ${
        form.getValues().time
      }, 15:00 – 16:30 Uhr`,
    },
    {
      description: "Name",
      value: `${form.getValues().childFirstName} ${
        form.getValues().childLastName
      }`,
    },
    {
      description: "Geschlecht",
      value: genders[form.getValues().gender],
    },
    {
      description: "Geburtstag",
      value: "",
    },
    {
      description: "Verein",
      value: form.getValues().club,
    },
    {
      description: "Position",
      value: form.getValues().position,
    },
    {
      description: "Besonderheiten",
      value: form.getValues().misc,
    },
    {
      description: "Konfektionsgröße",
      value: form.getValues().size,
    },
    {
      description: "Mitgliedsnummer",
      value: form.getValues().memberno,
    },
    {
      description: "Name",
      value: `${form.getValues().parentFirstName} ${
        form.getValues().parentLastName
      }`,
    },
    {
      description: "Adresse",
      value: `${form.getValues().street} ${form.getValues().number}, ${
        form.getValues().postalCode
      } ${form.getValues().city}`,
    },
    {
      description: "E-Mail",
      value: form.getValues().email,
    },
    {
      description: "Handy / Telefon",
      value: form.getValues().phone,
    },
    {
      description: "Kontoinhaber",
      value: form.getValues().name,
    },
    {
      description: "IBAN",
      value: form.getValues().iban,
    },
    {
      description: "BIC",
      value: form.getValues().bic,
    },
  ];

  return (
    <Table>
      <Table.Tbody>
        {data.map((entry, index) => {
          return (
            <Table.Tr key={index}>
              <Table.Td>
                <b>{entry.description}</b>
              </Table.Td>
              <Table.Td>{entry.value ? entry.value : ""}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
