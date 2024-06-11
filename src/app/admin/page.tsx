"use client";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Paper,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "@mantine/core";
import Title from "../components/title";
import { differenceInYears, format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry, SoccerSchoolParticipant } from "../form";
import {
  IconCopy,
  IconFileInvoice,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { copy } from "../utils";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string | null>("f");
  const [activeDrawer, setActiveDrawer] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<SoccerSchoolEntry[]>();
  const [participants, setParticipants] = useState<SoccerSchoolParticipant[]>();

  useEffect(() => {
    fetch("https://stage.comoso.biz:8443/FCNWebApi/api/SoccerSchool", {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    data &&
      setParticipants(
        data.map((el) => el.childs).reduce((a, c) => a.concat(c), [])
      );
  }, [data]);

  const rows =
    participants &&
    participants
      // .filter((el) => {
      //   return el.youth.toLowerCase() === activeTab;
      // })
      .map((participant, index) => (
        <Table.Tr key={index}>
          <Table.Td>{index + 1}</Table.Td>
          <Table.Td>{participant.firstName}</Table.Td>
          <Table.Td>{participant.lastName}</Table.Td>
          <Table.Td>
            {format(new Date(participant.created), "dd.MM.yyyy")}
            <Badge variant="transparent" color="gray">
              Noch 12 Einheiten
            </Badge>
          </Table.Td>
          <Table.Td>
            <Tooltip
              label={format(new Date(participant.created), "dd.MM.yyyy")}
              position="left"
              withArrow
            >
              <p>
                {differenceInYears(new Date(), new Date(participant.created))}
              </p>
            </Tooltip>
          </Table.Td>
          <Table.Td>{participant.size}</Table.Td>
          <Table.Td>
            <Select
              data={[
                "Anmeldung eingegangen",
                "Anmeldung bestätigt",
                "Zahlung bestätigt",
                "Training gestartet",
              ]}
              defaultValue="Anmeldung bestätigt"
            />
          </Table.Td>
          <Table.Td align="right">
            <Button
              variant="light"
              size="xs"
              onClick={() => {
                open();
                setActiveDrawer(participant.id);
              }}
            >
              Mehr anzeigen
            </Button>
          </Table.Td>
        </Table.Tr>
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
          <Table.Th>Größe</Table.Th>
          <Table.Th>Status</Table.Th>
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
            <Tabs.Tab value="f">F-Jugend</Tabs.Tab>
            <Tabs.Tab value="e">E-Jugend</Tabs.Tab>
            <Tabs.Tab value="d">D-Jugend</Tabs.Tab>
            <Tabs.Tab value="t">Torwarttraining</Tabs.Tab>
          </Tabs.List>
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
          parent={
            activeDrawer &&
            data.filter(
              (parent) =>
                parent.id ===
                participants?.filter(
                  (participant) => participant.id === activeDrawer
                )[0].parentId
            )[0]
          }
        />
      </Drawer>
    </>
  ) : (
    <></>
  );
}

function DrawerContent({ parent }: { parent: SoccerSchoolEntry | 0 }) {
  return (
    parent !== 0 && (
      <>
        <Divider
          label="Angaben zum Erziehungsberechtigten"
          labelPosition="left"
        />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <b>Name</b>
              </Table.Td>
              <Table.Td>
                {parent.firstName} {parent.lastName}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <b>Adresse</b>
              </Table.Td>
              <Table.Td>
                {parent.street} {parent.number}, {parent.postalCode}{" "}
                {parent.city}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2} align="center">
                <Button variant="transparent" size="xs">
                  <IconMail size={16} className="mr-2" /> {parent.email}
                </Button>
                <Button variant="transparent" size="xs">
                  <IconPhone size={16} className="mr-2" /> {parent.phone}
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Divider
          label="Zahlungsinformationen"
          labelPosition="left"
          className="mt-8"
        />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <b>Kontoinhaber</b>
              </Table.Td>
              <Table.Td>{parent.name}</Table.Td>
              <Table.Td />
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <b>IBAN</b>
              </Table.Td>
              <Table.Td>{parent.iban}</Table.Td>
              <Table.Td>
                <Button
                  variant="transparent"
                  size="xs"
                  onClick={() => copy(parent.iban)}
                >
                  <IconCopy size={14} />
                </Button>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <b>BIC</b>
              </Table.Td>
              <Table.Td>{parent.bic}</Table.Td>
              <Table.Td>
                <Button
                  variant="transparent"
                  size="xs"
                  onClick={() => copy(parent.bic)}
                >
                  <IconCopy size={14} />
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Button fullWidth>
          <IconFileInvoice size={16} className="mr-2" /> Rechnung erstellen
        </Button>
      </>
    )
  );
}
