import { Text } from "@mantine/core";

export default function Label({ text }: { text: string }) {
  return (
    <Text size="sm" fw={500} mb={2}>
      {text}
    </Text>
  );
}
