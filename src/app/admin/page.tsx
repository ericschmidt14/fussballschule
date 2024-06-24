"use client";
import { SOCCER_SCHOOL_API } from "../constants";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Paper,
  Popover,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "@mantine/core";
import Title from "../components/title";
import { differenceInYears, format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "../form";
import {
  IconArticleOff,
  IconCameraOff,
  IconCopy,
  IconFileInvoice,
  IconMail,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
import { convertDOB, copy } from "../utils";
import { genders } from "../values";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string | null>("a");
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
        return activeTab === "a" ? true : el.youth.toLowerCase() === activeTab;
      })
      .reverse()
      .map((participant, index) => (
        <Table.Tr key={index}>
          <Table.Td>{index + 1}</Table.Td>
          <Table.Td>{participant.childFirstName}</Table.Td>
          <Table.Td>{participant.childLastName}</Table.Td>
          <Table.Td>
            {format(new Date(participant.childCreated), "dd.MM.yyyy")}
            <Badge variant="transparent" color="gray">
              {+participant.period * 4} Einheiten
            </Badge>
          </Table.Td>
          <Table.Td>
            <Tooltip
              label={convertDOB(participant.dob)}
              position="left"
              withArrow
            >
              <p>{differenceInYears(new Date(), new Date(participant.dob))}</p>
            </Tooltip>
          </Table.Td>
          <Table.Td>{genders[participant.gender]}</Table.Td>
          <Table.Td>{participant.size}</Table.Td>
          <Table.Td>
            <Select
              data={[
                "Anmeldung eingegangen",
                "Anmeldung bestätigt",
                "Zahlung bestätigt",
                "Training gestartet",
                "Training beendet",
              ]}
              defaultValue="Anmeldung eingegangen"
            />
          </Table.Td>
          <Table.Td>
            {!participant.recordings && (
              <Tooltip
                label="Keine Ton-, Foto- & Videoaufnahmen"
                position="left"
                withArrow
              >
                <IconCameraOff color="gray" />
              </Tooltip>
            )}
          </Table.Td>
          <Table.Td>
            {!participant.processing && (
              <Tooltip
                label="Keine Verarbeitung personenbezogener Daten"
                position="left"
                withArrow
              >
                <IconArticleOff color="gray" />
              </Tooltip>
            )}
          </Table.Td>
          <Table.Td align="right">
            <Button
              variant="light"
              size="xs"
              onClick={() => {
                open();
                setActiveDrawer(participant.childToken);
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
            <Tabs.Tab value="a">Alle</Tabs.Tab>
            <Tabs.Tab value="f">F-Jugend</Tabs.Tab>
            <Tabs.Tab value="e">E-Jugend</Tabs.Tab>
            <Tabs.Tab value="d">D-Jugend</Tabs.Tab>
            <Tabs.Tab value="t">Torwarttraining</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a">{table}</Tabs.Panel>
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

function DrawerContent({ data }: { data: SoccerSchoolEntry | "" }) {
  const [opened, setOpened] = useState(false);

  return (
    data !== "" && (
      <>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <b>Mitgliedsnummer</b>
              </Table.Td>
              <Table.Td>{data.memberno}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Divider
          label="Angaben zum Erziehungsberechtigten"
          labelPosition="left"
          className="mt-8"
        />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <b>Name</b>
              </Table.Td>
              <Table.Td>
                {data.parentFirstName} {data.parentLastName}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <b>Adresse</b>
              </Table.Td>
              <Table.Td>
                {data.street} {data.number}, {data.postalCode} {data.city}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2} align="center">
                <Button variant="transparent" size="xs">
                  <IconMail size={16} className="mr-2" /> {data.email}
                </Button>
                <Button variant="transparent" size="xs">
                  <IconPhone size={16} className="mr-2" /> {data.phone}
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
              <Table.Td>{data.iban}</Table.Td>
              <Table.Td>
                <Button
                  variant="transparent"
                  size="xs"
                  onClick={() => copy(data.iban)}
                >
                  <IconCopy size={14} />
                </Button>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <b>BIC</b>
              </Table.Td>
              <Table.Td>{data.bic}</Table.Td>
              <Table.Td>
                <Button
                  variant="transparent"
                  size="xs"
                  onClick={() => copy(data.bic)}
                >
                  <IconCopy size={14} />
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Button variant="light" className="mt-8" fullWidth>
          <IconFileInvoice size={16} className="mr-2" /> Rechnung erstellen
        </Button>
        <Popover opened={opened} onChange={setOpened} width="target" withArrow>
          <Popover.Target>
            <Button
              fullWidth
              className="mt-2"
              onClick={() => setOpened((o) => !o)}
            >
              <IconTrash size={16} className="mr-2" /> Eintrag löschen
            </Button>
          </Popover.Target>
          <Popover.Dropdown className="flex justify-between items-baseline">
            <p>Anmeldung wirklich löschen?</p>
            <div>
              <Button>Ja</Button>
              <Button
                variant="transparent"
                onClick={() => setOpened((o) => !o)}
              >
                Nein
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>
      </>
    )
  );
}
