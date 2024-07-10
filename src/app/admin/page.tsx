/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Drawer, Paper, Table, Tabs } from "@mantine/core";
import Title from "../components/title";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "../form";
import { DrawerContent } from "./components/drawer";
import { ParticipantRow } from "./components/row";
import { youths } from "../values";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconBrandWindows, IconLogout } from "@tabler/icons-react";

export default function Page() {
  const { data: session, status } = useSession();
  const ALL_PARTICIPANTS = "a";
  const [activeTab, setActiveTab] = useState<string | null>(ALL_PARTICIPANTS);
  const [activeDrawer, setActiveDrawer] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
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

  if (status === "loading") {
    return <></>;
  }

  if (!session) {
    return (
      <Paper
        className="relative w-[520px] my-8 mx-auto p-8 flex flex-col gap-4"
        radius="md"
      >
        <p className="text-center">Für den Admin-Bereich bitte anmelden.</p>
        <Button
          variant="light"
          onClick={() => signIn("azure-ad")}
          leftSection={<IconBrandWindows />}
        >
          Mit Microsoft Account einloggen
        </Button>
      </Paper>
    );
  }

  return data ? (
    <>
      <div className="flex justify-between px-8 pt-2">
        <div className="flex gap-2 items-center">
          {session?.user?.image && (
            <img
              src={session?.user?.image}
              alt="User Image"
              className="rounded-full"
            />
          )}
          <div>
            <p>
              <b>{session?.user?.name}</b>
            </p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
        <Button
          variant="light"
          color="gray"
          onClick={() => signOut()}
          leftSection={<IconLogout />}
        >
          Ausloggen
        </Button>
      </div>
      <Paper className="relative m-8 p-4 pt-8" radius="md">
        <Title text="Anmeldungen zur Fussballschule" />

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            {tabs.map((t) => {
              return (
                <Tabs.Tab key={t} value={t}>
                  {youths[t]}
                </Tabs.Tab>
              );
            })}
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
