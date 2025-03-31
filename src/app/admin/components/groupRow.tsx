import { useSoccerSchoolContext } from "@/app/context/soccerSchoolContext";
import { Group } from "@/app/interfaces";
import { isValidTimeSlotFormat } from "@/app/utils";
import {
  Button,
  Drawer,
  NumberInput,
  Table,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useState } from "react";

export default function GroupRow({ group }: { group: Group }) {
  const { fetchGroups } = useSoccerSchoolContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(group.label);
  const [min, setMin] = useState<string | number>(group.min);
  const [max, setMax] = useState<string | number>(group.max);
  const [times, setTimes] = useState(group.times);

  return (
    <>
      <Table.Tr>
        <Table.Td>{group.label}</Table.Td>
        <Table.Td>{group.times}</Table.Td>
        <Table.Td align="right">
          <Button
            variant="light"
            size="xs"
            onClick={open}
            leftSection={<IconEdit size={16} />}
          >
            Bearbeiten
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
        <div className="flex flex-col gap-4">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Alter (min.)" value={min} onChange={setMin} />
            <NumberInput label="Alter (max.)" value={max} onChange={setMax} />
          </div>
          <Textarea
            label="Zeiten"
            description="Trainingszeiten mit / trennen"
            value={times}
            onChange={(e) => setTimes(e.currentTarget.value)}
            error={
              isValidTimeSlotFormat(times)
                ? ""
                : "Falsches Format. Trainingszeiten haben das Format 'Wochentag, Startzeit - Endzeit Uhr' (z.B. Montag, 14:00 – 15:00 Uhr). Mehrere Trainingszeiten müssen mit ' / ' getrennt werden."
            }
          />
          <Button
            color="red"
            leftSection={<IconDeviceFloppy size={16} />}
            onClick={() => {
              fetch("/api/groups", {
                method: "POST",
                body: JSON.stringify(
                  {
                    value: group.value,
                    label: name,
                    min,
                    max,
                    times,
                  },
                  null,
                  2
                ),
              })
                .then((res) => res.text())
                .then(() => {
                  close();
                  fetchGroups();
                })
                .catch((error) => console.error(error));
            }}
            disabled={
              name.length < 1 ||
              min.toString().length < 1 ||
              max.toString().length < 1 ||
              !isValidTimeSlotFormat(times)
            }
          >
            Änderungen speichern
          </Button>
        </div>
      </Drawer>
    </>
  );
}
