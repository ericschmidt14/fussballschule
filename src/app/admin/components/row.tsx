import { SoccerSchoolEntry } from "@/app/form";
import { convertDOB } from "@/app/utils";
import { genders } from "@/app/values";
import { Badge, Button, Select, Table, Tooltip } from "@mantine/core";
import { IconArticleOff, IconCameraOff } from "@tabler/icons-react";
import { differenceInYears, format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

export function ParticipantRow({
  index,
  participant,
  setActiveDrawer,
  open,
}: {
  index: number;
  participant: SoccerSchoolEntry;
  setActiveDrawer: Dispatch<SetStateAction<string>>;
  open: () => void;
}) {
  const checkState = () => {
    if (participant.confirmed !== null) {
      return "confirmed";
    }
    return "mailing";
  };

  const [state, setState] = useState<string | null>(checkState());

  return (
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{participant.childFirstName}</Table.Td>
      <Table.Td>{participant.childLastName}</Table.Td>
      <Table.Td>
        {format(new Date(participant.childCreated), "dd.MM.yyyy")}
        <Badge variant="transparent">{+participant.period * 4} Einheiten</Badge>
      </Table.Td>
      <Table.Td>
        <Tooltip label={convertDOB(participant.dob)} position="left" withArrow>
          <p>{differenceInYears(new Date(), new Date(participant.dob))}</p>
        </Tooltip>
      </Table.Td>
      <Table.Td>{genders[participant.gender]}</Table.Td>
      <Table.Td>{participant.size}</Table.Td>
      <Table.Td>
        <Select
          data={[
            {
              value: "mailing",
              label: "Anmeldung eingegangen",
            },
            { value: "confirmed", label: "Anmeldung bestätigt" },
            { value: "billing", label: "Zahlung bestätigt" },
            { value: "started", label: "Training gestartet" },
            { value: "ended", label: "Training beendet" },
          ]}
          defaultValue={state}
          onChange={(value) => setState(value)}
          allowDeselect={false}
          checkIconPosition="right"
          disabled
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
  );
}
