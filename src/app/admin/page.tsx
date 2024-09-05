"use client";
import { Button, Paper, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { ParticipantRow } from "./components/row";
import { prices } from "../values";
import { useSession } from "next-auth/react";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { exportCSV } from "../utils";
import { SOCCER_SCHOOL_API } from "../constants";
import { SoccerSchoolEntry } from "../interfaces";

export default function Page() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SoccerSchoolEntry[]>();

  useEffect(() => {
    //fetch("/api", {
    fetch(SOCCER_SCHOOL_API, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error));
  }, []);

  const rows =
    data &&
    data
      .reverse()
      .map((participant, index) => (
        <ParticipantRow key={index} index={index} participant={participant} />
      ));

  const table = (
    <Table highlightOnHover className="mt-8">
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Vorname</Table.Th>
          <Table.Th>Nachname</Table.Th>
          <Table.Th>Angemeldet seit</Table.Th>
          <Table.Th>Alter</Table.Th>
          <Table.Th>Geschlecht</Table.Th>
          <Table.Th>Größe</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th />
          <Table.Th />
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );

  if (status === "loading") {
    return <></>;
  }

  if (!session) {
    return <></>;
  }

  return data ? (
    <Paper className="relative m-8 p-4" radius="md">
      <div className="flex justify-end">
        <Button
          variant="transparent"
          leftSection={<IconFileTypeCsv size={20} />}
          onClick={() =>
            exportCSV(
              JSON.stringify(
                data
                  .filter((d) => d.ended === null)
                  .map((d) => {
                    return {
                      Nummer: "",
                      Kontoinhaber: d.name,
                      IBAN: d.iban,
                      BIC: d.bic,
                      Betrag: prices[d.period],
                    };
                  }),
                null,
                2
              )
            )
          }
        >
          Exportieren
        </Button>
      </div>
      {table}
    </Paper>
  ) : (
    <></>
  );
}
