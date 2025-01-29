"use client";
import {
  Button,
  Pagination,
  Paper,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import {
  IconFileTypeCsv,
  IconFilter,
  IconRefresh,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "../interfaces";
import { checkState, exportXLSX, getPrice } from "../utils";
import { states, youths } from "../values";
import { ParticipantRow } from "./components/row";

export default function Page() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SoccerSchoolEntry[]>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [group, setGroup] = useState<string | null>("");
  const [state, setState] = useState<string | null>("");

  const pageLimit = 25;

  const fetchData = () => {
    fetch("/api", {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredResults =
    data &&
    data
      .filter((d) => (group ? d.youth === group : true))
      .filter((d) => (state ? checkState(d) === state : true))
      .filter((d) =>
        [
          d.parentFirstName,
          d.parentLastName,
          d.childFirstName,
          d.childLastName,
        ].some((value) => value.toLowerCase().includes(search.toLowerCase()))
      )
      .reverse();

  const pageSize = pageLimit ? +pageLimit : 25;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData =
    filteredResults && filteredResults.slice(startIndex, endIndex);
  const totalPages =
    filteredResults && Math.ceil(filteredResults.length / pageSize);

  const rows = currentPageData?.map((participant) => (
    <ParticipantRow
      key={`${participant.childToken}-${state || "no-state"}`}
      participant={participant}
      filterState={state}
    />
  ));

  const table = (
    <Table className="mt-8">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Anmeldung</Table.Th>
          <Table.Th>Alter</Table.Th>
          <Table.Th>Gruppe</Table.Th>
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
    <Paper
      className="relative m-8 p-4 flex flex-col gap-4"
      radius="md"
      bg="rgba(0, 0, 0, 0.5)"
    >
      <div className="grid grid-cols-4 gap-2 items-center">
        <TextInput
          placeholder="Suchen ..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          data={["k", "f1", "f2", "f3", "m"].map((g) => {
            return { value: g, label: youths[g] };
          })}
          placeholder="Gruppe wählen"
          leftSection={<IconUsersGroup size={16} />}
          checkIconPosition="right"
          value={group}
          onChange={setGroup}
        />
        <Select
          data={states}
          placeholder="Status wählen"
          leftSection={<IconFilter size={16} />}
          value={state}
          onChange={setState}
          checkIconPosition="right"
        />
        <div className="grid grid-cols-2 gap-2">
          <Button
            leftSection={<IconFileTypeCsv size={20} />}
            onClick={() =>
              exportXLSX(
                JSON.stringify(
                  data
                    .filter(
                      (d) =>
                        d.iban !== "" && d.started !== null && d.ended === null
                    )
                    .map((d) => {
                      return {
                        Nummer: "",
                        Title: "",
                        "Academic Title": "",
                        Vorname: d.parentFirstName,
                        Nachname: d.parentLastName,
                        Spielername: `${d.childFirstName} ${d.childLastName}`,
                        Kündigung: "",
                        Vertragsabschlussdatum: d.started,
                        Vertragslaufzeit: `${d.period} Monate`,
                        Straße: d.street,
                        Hausnummer: d.number,
                        Ort: d.city,
                        Postleitzahl: d.postalCode,
                        Telefon: d.phone,
                        Mobiltelefon: d.phone,
                        "E-Mail": d.email,
                        "Konto-ID": d.iban,
                        IBAN: "",
                        Kontoinhaber: "",
                        "Betrag abzubuchen": getPrice(d.youth, d.period),
                        Hinweis: "",
                        Wochentag: `${d.time} ${youths[d.youth]}`,
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
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => fetchData()}
          >
            Aktualisieren
          </Button>
        </div>
      </div>
      {table}
      <Pagination
        value={page}
        onChange={setPage}
        total={totalPages || 0}
        className="flex justify-center pt-4"
      />
    </Paper>
  ) : (
    <></>
  );
}
