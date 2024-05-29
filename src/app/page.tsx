"use client";
import { useState } from "react";
import { Stepper, Button } from "@mantine/core";
import Image from "next/image";

import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";

export default function Home() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="flex gap-2 py-4">
        <Image src="/logo.svg" alt="1. FCN Logo" width={96} height={96} />
        <h1>
          <span className="outline">Fussball</span>schule
        </h1>
      </header>

      <div className="w-[1200px] my-8">
        <Stepper
          active={active}
          allowNextStepsSelect={false}
          iconSize={32}
          size="sm"
          styles={{
            content: {
              position: "relative",
              margin: "32px auto",
              padding: "48px 32px",
              maxWidth: "880px",
              background: "#F9F9F9",
              boxShadow: "0 4px 16px 0 rgba(0,0,0, 0.25)",
            },
          }}
        >
          <Stepper.Step label="Zeitraum & Termin">
            <Step1 />
          </Stepper.Step>
          <Stepper.Step label="Teilnehmendes Kind">
            <Step2 />
          </Stepper.Step>
          <Stepper.Step label="Erziehungsberechtigter">
            <Step3 />
          </Stepper.Step>
          <Stepper.Step label="Zahlungsinformationen">
            <Step4 />
          </Stepper.Step>
          <Stepper.Step label="Bestätigung">
            <Step5 />
          </Stepper.Step>
          <Stepper.Completed>
            <b>Anmeldung erfolgreich abgeschlossen!</b> Bitte überprüfen Sie das
            Postfach der angegebenen Mail für weitere Informationen.
          </Stepper.Completed>
        </Stepper>

        <div className="max-w-[880px] m-auto flex justify-between">
          {active > 0 ? (
            <Button variant="default" onClick={prevStep}>
              Zurück
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={nextStep}>Weiter</Button>
        </div>
      </div>
    </main>
  );
}
