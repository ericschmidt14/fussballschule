/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Drawer, Paper, Table, Tabs } from "@mantine/core";
import Title from "../components/title";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "../form";
import { ParticipantRow } from "./components/row";
import { prices, youths } from "../values";
import { useSession } from "next-auth/react";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { exportCSV } from "../utils";

export default function Page() {
  const { data: session, status } = useSession();
  const ALL_PARTICIPANTS = "a";
  const [activeTab, setActiveTab] = useState<string | null>(ALL_PARTICIPANTS);
  const [data, setData] = useState<SoccerSchoolEntry[]>();

  const tabs = [ALL_PARTICIPANTS, "f", "e", "d", "t"];

  useEffect(() => {
    fetch("/api/soccerschool", {
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
      .filter((el) => {
        return activeTab === ALL_PARTICIPANTS
          ? true
          : el.youth.toLowerCase() === activeTab;
      })
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
    <Paper className="relative m-8 p-4 pt-8" radius="md">
      <Title text="Anmeldungen zur Fussballschule" />
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List className="flex justify-between">
          <div className="flex">
            {tabs.map((t) => {
              return (
                <Tabs.Tab key={t} value={t}>
                  {youths[t]}
                </Tabs.Tab>
              );
            })}
          </div>
          <Button
            variant="transparent"
            leftSection={<IconFileTypeCsv size={20} />}
            onClick={() =>
              exportCSV(
                JSON.stringify(
                  data.map((d) => {
                    return {
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
        </Tabs.List>
        {tabs.map((t) => {
          return (
            <Tabs.Panel key={t} value={t}>
              {table}
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </Paper>
  ) : (
    <></>
  );
}
