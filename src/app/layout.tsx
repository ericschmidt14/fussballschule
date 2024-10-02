import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "1. FCN Fußballschule | Anmeldung",
  description: "",
};

const theme = createTheme({
  fontFamily: "Glober Regular",
  headings: { fontFamily: "Glober ExtraBold" },
  primaryColor: "red",
  colors: {
    red: [
      "#fdecef",
      "#f5d6da",
      "#efa8b1",
      "#ea7884",
      "#e6515f",
      "#e33948",
      "#aa1124",
      "#c9222f",
      "#b41b29",
      "#9e1021",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Suspense>{children}</Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
