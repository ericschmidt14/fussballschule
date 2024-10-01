import { SoccerSchoolEntry } from "@/app/interfaces";
import { convertDOB } from "@/app/utils";
import { genders } from "@/app/values";
import { Button, Drawer, Select, Table, Tooltip } from "@mantine/core";
import { differenceInYears, format } from "date-fns";
import { useState } from "react";
import { DrawerContent } from "./drawer";
import { useDisclosure } from "@mantine/hooks";

export function ParticipantRow({
  index,
  participant,
}: {
  index: number;
  participant: SoccerSchoolEntry;
}) {
  const checkState = () => {
    if (participant.ended !== null) {
      return "ended";
    }
    if (participant.started !== null) {
      return "started";
    }
    if (participant.confirmed !== null) {
      return "confirmed";
    }
    if (participant.mailing !== null) {
      return "mailing";
    }
    return "new";
  };

  const setConfirm = () => {
    fetch("/api/confirm", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({
        token: participant.childToken,
      }),
    }).catch((error) => console.error(error));
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

  const [state, setState] = useState<string | null>(checkState());
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{participant.childFirstName}</Table.Td>
        <Table.Td>{participant.childLastName}</Table.Td>
        <Table.Td>
          {participant.created &&
            format(new Date(participant.created), "dd.MM.yyyy")}
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
              {
                value: "new",
                label: "Neu",
              },
              {
                value: "mailing",
                label: "Im Probetraining",
              },
              { value: "confirmed", label: "Eingeladen" },
              { value: "started", label: "Gestartet" },
              { value: "ended", label: "Beendet" },
            ]}
            defaultValue={state}
            onChange={(value) => {
              setState(value);
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
            variant="transparent"
            size="xs"
            onClick={() => {
              open();
            }}
          >
            Details anzeigen
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
