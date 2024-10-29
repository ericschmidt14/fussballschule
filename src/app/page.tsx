"use client";
import { Button, Paper } from "@mantine/core";
import Link from "next/link";
import Footer from "./components/footer";
import Header from "./components/header";
import Title from "./components/title";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />
      <section className="flex flex-col justify-center items-center">
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          className="relative max-w-[520px] m-auto my-16 flex flex-col gap-4"
          style={{
            border:
              "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-6)",
          }}
        >
          <Title text="Anmeldung zur Fußballschule" />
          <p>
            In unserer Fußballschule trainieren junge Fußballspieler/-innen
            zwischen 7 und 13 Jahren unter professionellen Trainingsbedingungen.
            Zusätzlich bieten wir unseren Fußball-Kindergarten für Kinder
            zwischen 4 und 6 Jahren an. Die Einheiten gelten als ergänzendes
            Fördertraining neben dem Vereinstraining. Dabei steht der Spaß und
            die Leidenschaft für den Fußball im Vordergrund!
          </p>
          <h3>Meldet euch hier an!</h3>
          <p>
            Ihr wollt beim 1. FCN Fördertraining für Kindergartenkinder oder
            Schüler dabei sein? Dann meldet euch hier online für zwei
            Probeeinheiten an. Nach erfolgreicher Anmeldung bekommt ihr eine
            Bestätigungsmail, anschließend setzen wir uns mit euch in
            Verbindung, um alle weiteren Details zu klären.
          </p>
          <Contact />
          <Button className="my-4" fullWidth component={Link} href="/signup/">
            Jetzt anmelden
          </Button>
          <p className="muted small">
            <b>Achtung!</b> Die Teilnehmerzahl ist begrenzt. Ihr erhaltet eine
            Rückmeldung per E-Mail, ob Ihre Anmeldung berücksichtigt werden
            konnte.
          </p>
        </Paper>
      </section>
      <div className="text-white">
        <Footer />
      </div>
    </main>
  );
}

function Contact() {
  return (
    <p>
      Bei Fragen stehen wir gerne unter{" "}
      <a href="tel:091194079375">+49 911 940 79 375</a> bzw.{" "}
      <a href="mailto:fussballschule@fcn.de">fussballschule@fcn.de</a> zur
      Verfügung.
    </p>
  );
}
