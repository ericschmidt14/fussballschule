"use client";
import { SOCCER_SCHOOL_API } from "./constants";
import { Button, Paper } from "@mantine/core";
import Title from "./components/title";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SoccerSchoolEntry } from "./form";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <main className="min-h-screen flex flex-col justify-between" id="lp">
      <Header />
      <section className="flex flex-col justify-center items-center">
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          className="relative max-w-[520px] m-auto my-16 flex flex-col gap-4"
        >
          {token ? (
            <WithToken token={token} />
          ) : (
            <>
              <Title text="Anmeldung zur 1. FCN Fussballschule" />
              <p>
                In unserer Fußballschule trainieren junge Fußballspieler/-innen
                zwischen 7 und 13 Jahren unter professionellen
                Trainingsbedingungen. Die Einheiten gelten als zusätzliches
                Fördertraining neben dem Vereinstraining. Dabei steht der Spaß
                und die Leidenschaft für den Fußball im Vordergrund!
              </p>
              <Contact />
              <Button
                className="my-4"
                fullWidth
                component={Link}
                href="/signup/"
              >
                Jetzt anmelden
              </Button>
              <p className="muted small">
                <b>Achtung!</b> Die Teilnehmerzahl ist begrenzt. Sie erhalten
                eine Rückmeldung per E-Mail, ob Ihre Anmeldung berücksichtigt
                werden konnte.
              </p>
            </>
          )}
        </Paper>
      </section>
      <div className="text-white">
        <Footer />
      </div>
    </main>
  );
}

function WithToken({ token }: { token: string }) {
  const [data, setData] = useState<SoccerSchoolEntry>();

  useEffect(() => {
    fetch(`/api/token/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res[0]);
      })
      .catch((error) => console.error(error));

    fetch("/api/confirm", {
      method: "POST",
      headers: { Accept: "*/*" },
      body: JSON.stringify({ token: token }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <>
      <Title text="Vielen Dank" />
      <p>
        <b>
          Die Anmeldung{" "}
          {data &&
            `für ${data?.childFirstName}
          ${data?.childLastName} `}
          wurde bestätigt und wird nun geprüft.
        </b>{" "}
        Sie erhalten eine Rückmeldung per E-Mail sobald die Anmeldung
        berücksichtigt werden konnte.
      </p>
      <Contact />
      <Button className="my-4" fullWidth component={Link} href="/signup/">
        Weitere Anmeldung ausfüllen
      </Button>
    </>
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
