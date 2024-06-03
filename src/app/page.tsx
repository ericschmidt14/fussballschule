"use client";
import { useState } from "react";
import { Stepper, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues } from "./form";
import Header from "./components/header";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import { validateForm } from "./validation";

export default function Home() {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      period: "3",
      youth: "f",
      time: "1",
      childLastName: "",
      childFirstName: "",
      dob: undefined,
      gender: "male",
      club: "",
      position: "",
      misc: "",
      size: "128",
      parentLastName: "",
      parentFirstName: "",
      street: "",
      number: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
      agree: false,
      name: "",
      iban: "",
      bic: "",
      conditions: false,
      privacy: false,
      recordings: false,
      processing: false,
    },

    validate: (values: FormValues) => validateForm(active, values),
  });

  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <section className="flex flex-col justify-center items-center">
      <Header />
      <div className="w-[1080px] my-8">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stepper
            active={active}
            allowNextStepsSelect={false}
            iconSize={32}
            size="sm"
            styles={{
              content: {
                position: "relative",
                margin: "32px auto 16px",
                padding: "48px 32px",
                maxWidth: "880px",
                borderRadius: "var(--mantine-radius-md)",
                background: "var(--mantine-color-gray-0)",
                boxShadow: "var(--mantine-shadow-xl)",
              },
              separator: {
                marginInline: "var(--mantine-spacing-xs)",
              },
            }}
          >
            <Stepper.Step label="Zeitraum & Termin">
              <Step1 form={form} />
            </Stepper.Step>
            <Stepper.Step label="Teilnehmendes Kind">
              <Step2 form={form} />
            </Stepper.Step>
            <Stepper.Step label="Erziehungsberechtigter">
              <Step3 form={form} />
            </Stepper.Step>
            <Stepper.Step label="Zahlungsinformationen">
              <Step4 form={form} />
            </Stepper.Step>
            <Stepper.Step label="Bestätigung">
              <Step5 form={form} />
            </Stepper.Step>
            <Stepper.Completed>
              <b>Anmeldung erfolgreich abgeschlossen!</b> Bitte überprüfen Sie
              das Postfach der angegebenen Mail für weitere Informationen.
            </Stepper.Completed>
          </Stepper>

          <div className="max-w-[880px] m-auto flex justify-between px-4">
            {active > 0 ? (
              <Button variant="light" onClick={prevStep}>
                Zurück
              </Button>
            ) : (
              <div />
            )}
            {active < 4 ? (
              <Button onClick={nextStep} disabled={!form.isValid()}>
                Weiter
              </Button>
            ) : (
              <Button type="submit">Anmeldung abschicken</Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
