"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../../components/title";
import { Fieldset, Table } from "@mantine/core";
import { FormValues } from "../form/form";
import { FormWrapper } from "../../components/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "@/app/interfaces";
import { genders, youths } from "@/app/values";

export default function Summary({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [data, setData] = useState<SoccerSchoolEntry>();

  useEffect(() => {
    fetch(`/api/token/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res[0]);
      })
      .catch((error) => console.error(error));

    // fetch("/api/confirm", {
    //   method: "POST",
    //   headers: { Accept: "*/*" },
    //   body: JSON.stringify({ token: token }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => console.error(error));
  }, [token]);

  return (
    <FormWrapper>
      <Title text="Anmeldung vervollständigen" />
      {data && <Details entry={data} />}
    </FormWrapper>
  );
}

function Details({ entry }: { entry: SoccerSchoolEntry }) {
  const data = [
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
      value: entry.dob,
    },
    {
      description: "Termin",
      value: `${youths[entry.youth]} – ${entry.time}, 15:00 – 16:30 Uhr`,
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
  ];

  return (
    <Fieldset legend="Zusammenfassung">
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
    </Fieldset>
  );
}
