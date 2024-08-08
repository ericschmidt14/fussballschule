import { SoccerSchoolEntry } from "@/app/form";
import { copy } from "@/app/utils";
import { Button, Divider, Popover, Table } from "@mantine/core";
import { IconCopy, IconMail, IconPhone, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function DrawerContent({ data }: { data: SoccerSchoolEntry }) {
  const [opened, setOpened] = useState(false);

  return (
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
      <Popover opened={opened} onChange={setOpened} width="target" withArrow>
        <Popover.Target>
          <Button
            fullWidth
            variant="light"
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
            <Button variant="transparent" onClick={() => setOpened((o) => !o)}>
              Nein
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </>
  );
}
