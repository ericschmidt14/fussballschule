"use client";
import { useState } from "react";
import { Stepper, Button } from "@mantine/core";
import { useForm, isEmail, isNotEmpty, matches } from "@mantine/form";
import Image from "next/image";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";
import Step4 from "./steps/4";
import Step5 from "./steps/5";
import { FormValues } from "./form";

export default function Home() {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      period: "3",
      youth: "f",
      time: "1",
      child: {
        lastName: "",
        firstName: "",
        dob: new Date(2010, 1),
        gender: "male",
        club: "",
        position: "",
        misc: "",
        size: "128",
      },
      parent: {
        lastName: "",
        firstName: "",
        street: "",
        number: "",
        postalCode: "",
        city: "",
        email: "",
        phone: "",
      },
      agree: false,
      name: "",
      iban: "",
      bic: "",
      conditions: false,
      privacy: false,
      recordings: false,
      processing: false,
    },

    // validate: () => {
    //   if (active === 2) {
    //     return {
    //       parent: {
    //         lastName: isNotEmpty("Bitte geben Sie einen Nachnamen an"),
    //         firstName: isNotEmpty("Bitte geben Sie einen Vornamen an"),
    //         postalCode: matches(
    //           /^[0-9][0-9][0-9][0-9][0-9]$/,
    //           "Bitte 5-stellige PLZ angeben"
    //         ),
    //         email: isEmail("Bitte gültige Mailadresse angeben"),
    //       },
    //     };
    //   }

    //   if (active === 3) {
    //     return {
    //       name: isNotEmpty("Bitte geben Sie einen Namen an"),
    //       iban: matches(
    //         /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/,
    //         "Bitte geben Sie eine gültige IBAN an"
    //       ),
    //     };
    //   }

    //   return {};
    // },
  });

  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="flex gap-2 pt-8">
        <Image src="/logo.svg" alt="1. FCN Logo" width={96} height={96} />
        <h1>
          <span className="outline">Fussball</span>schule
        </h1>
      </header>

      <div className="w-[1100px] my-8">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

          <div className="max-w-[880px] m-auto flex justify-between">
            {active > 0 ? (
              <Button variant="default" onClick={prevStep}>
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
    </main>
  );
}
