import { Box } from "@mantine/core";

export default function StepperIndicator({
  steps,
  active,
}: {
  steps: number;
  active: number;
}) {
  return (
    <Box
      style={{
        width: "100vw",
        height: "2px",
        overflow: "hidden",
        position: "sticky",
        backgroundColor: "var(--mantine-color-dark-4)",
        top: "64px",
        zIndex: "1000",
      }}
    >
      <Box
        style={{
          height: "100%",
          width: `${((active + 1) / steps) * 100}%`,
          backgroundColor: "var(--mantine-primary-color-filled)",
          transition: "width 0.3s ease",
        }}
      />
    </Box>
  );
}
