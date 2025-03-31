"use client";
import { useSoccerSchoolContext } from "@/app/context/soccerSchoolContext";
import { Paper, Table } from "@mantine/core";
import { useSession } from "next-auth/react";
import GroupRow from "../components/groupRow";

export default function Page() {
  const { data: session, status } = useSession();
  const { groups } = useSoccerSchoolContext();

  if (status === "loading") {
    return <></>;
  }

  if (!session) {
    return <></>;
  }

  return (
    <Paper
      className="relative m-8 p-8 flex flex-col gap-4"
      radius="md"
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Zeiten</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {groups.map((g) => (
            <GroupRow key={g.value} group={g} />
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
