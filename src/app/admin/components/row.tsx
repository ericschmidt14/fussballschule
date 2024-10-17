import { SoccerSchoolEntry } from "@/app/interfaces";
import { checkState, convertDOB } from "@/app/utils";
import { youths } from "@/app/values";
import { Button, Drawer, Select, Table, Tooltip } from "@mantine/core";
import { differenceInYears, format } from "date-fns";
import { useState } from "react";
import { DrawerContent } from "./drawer";
import { useDisclosure } from "@mantine/hooks";
import { IconId } from "@tabler/icons-react";

export function ParticipantRow({
  index,
  participant,
  filterState,
}: {
  index: number;
  participant: SoccerSchoolEntry;
  filterState: string | null;
}) {
  const sendMail = (type: "2" | "3") => {
    fetch("/api/mailing", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        type: type,
        childToken: participant.childToken,
      }),
    }).catch((error) => console.error(error));
  };

  const setConfirm = () => {
    fetch("/api/started", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
        datetime: null,
      }),
    }).catch((error) => console.error(error));
    fetch("/api/ended", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
        datetime: null,
      }),
    }).catch((error) => console.error(error));
  };

  const setStarted = () => {
    fetch("/api/started", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
        datetime: new Date().toISOString(),
      }),
    }).catch((error) => console.error(error));
    fetch("/api/ended", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
        datetime: null,
      }),
    }).catch((error) => console.error(error));
  };

  const setEnded = () => {
    fetch("/api/ended", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
        datetime: new Date().toISOString(),
      }),
    }).catch((error) => console.error(error));
  };

  const [state, setState] = useState<string | null>(checkState(participant));
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>
          {participant.childFirstName} {participant.childLastName}
        </Table.Td>
        <Table.Td>
          {participant.childCreated &&
            format(new Date(participant.childCreated), "dd.MM.yyyy")}
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
        <Table.Td>{youths[participant.youth]}</Table.Td>
        <Table.Td>{participant.time}</Table.Td>
        <Table.Td>{participant.size}</Table.Td>
        <Table.Td>
          <Select
            key={`${participant.childToken}-${filterState || "no-state"}`}
            data={[
              {
                value: "new",
                label: "Neu",
              },
              {
                value: "mailing2",
                label: "Einladung zum Probetraining",
              },
              { value: "mailing3", label: "Einladung zur Fußballschule" },
              { value: "confirmed", label: "Zahlungsdaten eingegangen" },
              { value: "started", label: "Gestartet" },
              { value: "ended", label: "Beendet" },
            ]}
            value={state}
            onChange={(value) => {
              setState(value);
              if (value === "mailing2") {
                sendMail("2");
              }
              if (value === "mailing3") {
                sendMail("3");
              }
              if (value === "confirmed") {
                setConfirm();
              }
              if (value === "started") {
                setStarted();
              }
              if (value === "ended") {
                setEnded();
              }
            }}
            allowDeselect={false}
            checkIconPosition="right"
          />
        </Table.Td>
        <Table.Td align="right">
          <Button
            variant="light"
            size="xs"
            leftSection={<IconId size={16} />}
            onClick={() => {
              open();
            }}
          >
            Details
          </Button>
        </Table.Td>
      </Table.Tr>
      <Drawer
        opened={opened}
        onClose={close}
        title="Details"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <DrawerContent data={participant} />
      </Drawer>
    </>
  );
}
