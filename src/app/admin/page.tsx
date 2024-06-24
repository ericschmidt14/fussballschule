"use client";
import { SOCCER_SCHOOL_API } from "../constants";
import { Drawer, Paper, Table, Tabs } from "@mantine/core";
import Title from "../components/title";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "../form";
import { DrawerContent } from "./components/drawer";
import { ParticipantRow } from "./components/row";

export default function Page() {
  const ALL_PARTICIPANTS = "a";
  const [activeTab, setActiveTab] = useState<string | null>(ALL_PARTICIPANTS);
  const [activeDrawer, setActiveDrawer] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<SoccerSchoolEntry[]>();

  useEffect(() => {
    fetch(SOCCER_SCHOOL_API, {
      method: "GET",
      headers: { Accept: "*/*" },
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
        <ParticipantRow
          key={index}
          index={index}
          participant={participant}
          setActiveDrawer={setActiveDrawer}
          open={open}
        />
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

  return data ? (
    <>
      <Paper className="relative m-8 p-4 pt-8" radius="md">
        <Title text="Anmeldungen zur Fussballschule" />
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value={ALL_PARTICIPANTS}>Alle</Tabs.Tab>
            <Tabs.Tab value="f">F-Jugend</Tabs.Tab>
            <Tabs.Tab value="e">E-Jugend</Tabs.Tab>
            <Tabs.Tab value="d">D-Jugend</Tabs.Tab>
            <Tabs.Tab value="t">Torwarttraining</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={ALL_PARTICIPANTS}>{table}</Tabs.Panel>
          <Tabs.Panel value="f">{table}</Tabs.Panel>
          <Tabs.Panel value="e">{table}</Tabs.Panel>
          <Tabs.Panel value="d">{table}</Tabs.Panel>
          <Tabs.Panel value="t">{table}</Tabs.Panel>
        </Tabs>
      </Paper>

      <Drawer
        opened={opened}
        onClose={close}
        title="Details"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <DrawerContent
          data={
            activeDrawer &&
            data.filter(
              (participant) => participant.childToken === activeDrawer
            )[0]
          }
        />
      </Drawer>
    </>
  ) : (
    <></>
  );
}
