"use client";
import { useSoccerSchoolContext } from "@/app/context/soccerSchoolContext";
import { SoccerSchoolEntry } from "@/app/interfaces";
import { convertDOB } from "@/app/utils";
import { genders } from "@/app/values";
import { Fieldset, Table } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { FormWrapper } from "../../components/form";
import Title from "../../components/title";
import { FormValues } from "../form/form";

export default function Step1({
  form,
  entry,
}: {
  form: UseFormReturnType<FormValues>;
  entry: SoccerSchoolEntry | undefined;
}) {
  const { groups } = useSoccerSchoolContext();

  useEffect(() => {
    entry &&
      form.setFieldValue(
        "name",
        `${entry.parentFirstName} ${entry.parentLastName}`
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const data = entry
    ? [
        {
          description: "Name",
          value: `${entry.childFirstName} ${entry.childLastName}`,
        },
        {
          description: "Geschlecht",
          value: genders[entry.gender],
        },
        {
          description: "Geburtstag",
          value: convertDOB(entry.dob),
        },
        {
          description: "Termin",
          value: `${groups.filter((g) => g.value === entry.youth)[0]} – ${
            entry.time
          }`,
        },
        {
          description: "Verein",
          value: entry.club,
        },
        {
          description: "Position",
          value: entry.position,
        },
        {
          description: "Besonderheiten",
          value: entry.misc,
        },
        {
          description: "Konfektionsgröße",
          value: entry.size,
        },
        {
          description: "Erziehungsberechtigte(r)",
          value: `${entry.parentFirstName} ${entry.parentLastName}`,
        },
        {
          description: "Adresse",
          value: `${entry.street} ${entry.number}, ${entry.postalCode} ${entry.city}`,
        },
        {
          description: "E-Mail",
          value: entry.email,
        },
        {
          description: "Handy / Telefon",
          value: entry.phone,
        },
      ]
    : [];

  return (
    <FormWrapper>
      <Title text="Anmeldung vervollständigen" />
      {entry ? (
        <Fieldset legend="Zusammenfassung">
          <Table className="responsive-table">
            <Table.Tbody>
              {data.map((entry, index) => {
                return (
                  entry.value !== "" && (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <b>{entry.description}</b>
                      </Table.Td>
                      <Table.Td>{entry.value}</Table.Td>
                    </Table.Tr>
                  )
                );
              })}
            </Table.Tbody>
          </Table>
        </Fieldset>
      ) : (
        <p>
          Kein Datensatz verfügbar.{" "}
          <a href="mailto:fussballschule@fcn.de">Bitte kontaktiere uns.</a>
        </p>
      )}
    </FormWrapper>
  );
}
