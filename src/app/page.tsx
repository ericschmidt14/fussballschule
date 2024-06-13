"use client";
import { Button, Paper } from "@mantine/core";
import SignUp from "./components/signUp";
import Title from "./components/title";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [signUp, setSignUp] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <section className="flex flex-col justify-center items-center">
      {token && (
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          className="relative max-w-[520px] m-auto my-16 flex flex-col gap-4"
        >
          <Title text="Vielen Dank für Ihre Anmeldung" />
          <p>
            Wir haben Ihre Anmeldung für {token} erhalten und werden diese
            prüfen. Sie erhalten eine Rückmeldung per E-Mail, ob Ihre Anmeldung
            berücksichtigt werden konnte.
          </p>
          <Contact />
          <Button onClick={() => setSignUp(true)} className="my-4" fullWidth>
            Weitere Anmeldung ausfüllen
          </Button>
        </Paper>
      )}
      {signUp ? (
        <SignUp />
      ) : (
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          className="relative max-w-[520px] m-auto my-16 flex flex-col gap-4"
        >
          <Title text="Anmeldung zur 1. FCN Fussballschule" />
          <p>
            In unserer Fußballschule trainieren junge Fußballspieler/-innen
            zwischen 7 und 13 Jahren unter professionellen Trainingsbedingungen.
            Die Einheiten gelten als zusätzliches Fördertraining neben dem
            Vereinstraining. Dabei steht der Spaß und die Leidenschaft für den
            Fußball im Vordergrund!
          </p>
          <Contact />
          <Button onClick={() => setSignUp(true)} className="my-4" fullWidth>
            Jetzt anmelden
          </Button>
          <p className="muted small">
            <b>Achtung!</b> Die Teilnehmerzahl ist begrenzt. Sie erhalten eine
            Rückmeldung per E-Mail, ob Ihre Anmeldung berücksichtigt werden
            konnte.
          </p>
        </Paper>
      )}
    </section>
  );
}

function Contact() {
  return (
    <p>
      Bei Fragen stehen wir gerne unter <a href="">+49 911 940 79 375</a> bzw.{" "}
      <a href="">fussballschule@fcn.de</a> zur Verfügung.
    </p>
  );
}
