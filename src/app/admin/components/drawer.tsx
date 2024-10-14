"use client";
import { SoccerSchoolEntry } from "@/app/interfaces";
import { copy, getPrice } from "@/app/utils";
import { Button, Divider, Table } from "@mantine/core";
import { IconCopy, IconMail, IconPhone } from "@tabler/icons-react";

export function DrawerContent({ data }: { data: SoccerSchoolEntry }) {
  return (
    <>
      <Divider label="Weitere Angaben" labelPosition="left" />
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <b>Mitgliedsnummer</b>
            </Table.Td>
            <Table.Td>{data.memberno}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <b>Verein</b>
            </Table.Td>
            <Table.Td>{data.club}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <b>Position</b>
            </Table.Td>
            <Table.Td>{data.position}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <b>Besonderheiten</b>
            </Table.Td>
            <Table.Td>{data.misc}</Table.Td>
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
            <Table.Td colSpan={2}>
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
            <Table.Td>{data.name}</Table.Td>
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
          <Table.Tr>
            <Table.Td>
              <b>Zeitraum</b>
            </Table.Td>
            <Table.Td>
              {data.period} Monate à {getPrice(data.youth, data.period)}€
            </Table.Td>
            <Table.Td />
          </Table.Tr>
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Button
                variant="transparent"
                size="xs"
                onClick={() =>
                  copy(
                    `${window.location.origin}/confirm?token=${data.childToken}`
                  )
                }
              >
                <IconCopy size={16} className="mr-2" /> Link für Zahlungsdaten
                kopieren
              </Button>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}
