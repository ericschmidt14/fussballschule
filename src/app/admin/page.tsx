"use client";
import { Button, Paper, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { ParticipantRow } from "./components/row";
import { prices } from "../values";
import { useSession } from "next-auth/react";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { exportCSV } from "../utils";
import { SOCCER_SCHOOL_API } from "../constants";
import { SoccerSchoolEntry } from "../interfaces";

export default function Page() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SoccerSchoolEntry[]>();

  useEffect(() => {
    //fetch("/api", {
    fetch(SOCCER_SCHOOL_API, {
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
      .reverse()
      .map((participant, index) => (
        <ParticipantRow key={index} index={index} participant={participant} />
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
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );

  if (status === "loading") {
    return <></>;
  }

  if (!session) {
    return <></>;
  }

  return data ? (
    <Paper className="relative m-8 p-4" radius="md">
      <div className="flex justify-end">
        <Button
          leftSection={<IconFileTypeCsv size={20} />}
          onClick={() =>
            exportCSV(
              JSON.stringify(
                data
                  .filter((d) => d.ended === null)
                  .map((d) => {
                    return {
                      Nummer: "",
                      Title: "",
                      "Academic Title": "",
                      Vorname: d.parentFirstName,
                      Nachname: d.parentLastName,
                      Spielername: `${d.childFirstName} ${d.childLastName}`,
                      Status: "Aktiv",
                      Sprache: "DE - Deutsch",
                      Kontaktaufnahme: "1 - erlaubt",
                      Interessent: "",
                      Land: "DE - Deutschland",
                      Hausnummer: d.number,
                      Kündigung: "",
                      Vertragsabschlussdatum: d.created,
                      Vertragslaufzeit: `${d.period} Monate`,
                      Rabatt: "",
                      Straße: d.street,
                      "Adresszeile 4": "",
                      "Adresszeile 5": "",
                      Ort: d.city,
                      Bundesland: "",
                      Postleitzahl: d.postalCode,
                      Steuerstandortcode: "",
                      Postfach: "",
                      "Postleitzahl des Postfachs": "",
                      Telefon: "",
                      Fax: "",
                      Mobiltelefon: d.phone,
                      "E-Mail": d.email,
                      "Bevorzugte Kontaktart": "",
                      "ABC-Klassifikation": "",
                      Geburtsdatum: d.dob,
                      Kundennotiz: "",
                      Verkaufsorganisationsnummer: "EV2000",
                      Vertriebsweg: "Z3 - Direktvertrieb",
                      Lieferpriorität: "",
                      Komplettlieferung: "",
                      Incoterms: "",
                      "Incoterms-Ort": "",
                      Kundengruppe: "Z3 - 1. FCN Fußball-Erlebnis",
                      Zahlungsbedingungen: "ZD01 - Nach Erhalt netto",
                      Währung: "EUR - Euro",
                      Banknummer: d.bic,
                      "Konto-ID": "",
                      IBAN: d.iban,
                      Kontoinhaber: "EV1000",
                      Unternehmensnummer: "4010 - Foderung LuL",
                      Kontenfindungsgruppe: "",
                      "Grund der Zahlungssperre": "",
                      Column8: "04 - Lastschrift durch Einzug",
                      Column7: "",
                      Column6: "",
                      "Ablaufdatum der Zahlungssperre": "",
                      Zahlweg: "",
                      "Instruction 1": "",
                      "Instruction 2": "",
                      "Instruction 3": "",
                      "Instruction 4": "",
                      "Bankgebühren gezahlt von": "",
                      Kreditlimit: "Nein",
                      Kreditlimitwährungstyp: "",
                      Beteiligtenrolle: "",
                      "Direkt zuständiger Mitarbeiter": "",
                      Dublettenprüfung: "Nein",
                      ObjectNodeSenderTechnicalID: "",
                      "Change StateID": "",
                      UUID: "",
                      "Betrag abzubuchen": prices[d.period].replace("€", ""),
                    };
                  }),
                null,
                2
              )
            )
          }
        >
          Exportieren
        </Button>
      </div>
      {table}
    </Paper>
  ) : (
    <></>
  );
}
