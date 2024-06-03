import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1. FCN Fußballschule | Anmeldung",
  description: "",
};

const theme = createTheme({
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
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <main
          className={`min-h-screen ${inter.className} flex flex-col justify-between`}
        >
          <MantineProvider theme={theme}>{children}</MantineProvider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
