"use client";
import { Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StepperIndicator from "../components/stepper";
import { SoccerSchoolEntry } from "../interfaces";
import { FormValues, getInitialValues } from "./form/form";
import { validateForm } from "./form/validation";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [entry, setEntry] = useState<SoccerSchoolEntry>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch(`/api/token/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        res !== "No data found" && setEntry(res[0]);
      })
      .catch((error) => console.error(error));
  }, [token]);

  const form = useForm<FormValues>({
    validateInputOnChange: true,
    initialValues: getInitialValues(),
    validate: (values: FormValues) => validateForm(active, values),
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <section className="flex flex-col justify-center items-center">
      <StepperIndicator steps={3} active={active} />
      <form
        className="w-full md:w-[768px] p-4 flex flex-col"
        onSubmit={form.onSubmit((values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify(
              entry && {
                // values from existing entry:
                ...entry,
                // new values:
                period: values.period,
                size: values.size,
                memberno: values.memberno,
                agree: values.agree,
                name: values.name,
                iban: values.iban,
                bic: values.bic,
                privacy: values.privacy,
                recordings: values.recordings,
                processing: values.processing,
              },
              null,
              2
            ),
          })
            .then((res) => res.text())
            .then((data) => {
              fetch("/api/confirm", {
                method: "POST",
                headers: { Accept: "*/*" },
                body: JSON.stringify({
                  token: entry && entry.childToken,
                }),
              }).catch((error) => console.error(error));
              nextStep();
            })
            .catch((error) => console.error(error));
        })}
      >
        <Stepper
          active={active}
          allowNextStepsSelect={false}
          iconSize={32}
          size="sm"
          styles={{
            content: {
              margin: "16px auto",
              padding: "48px 32px",
            },
            step: { display: "none" },
            steps: { display: "none" },
          }}
        >
          <Stepper.Step>
            <Step1 form={form} entry={entry} />
          </Stepper.Step>
          <Stepper.Step>
            <Step2 form={form} entry={entry} />
          </Stepper.Step>
          <Stepper.Step>
            <Step3 form={form} />
          </Stepper.Step>
          <Stepper.Completed>
            <b>Anmeldung erfolgreich vervollständigt!</b> Wir freuen uns dich in
            der Fußballschule des 1. FC Nürnberg begrüßen zu dürfen.
          </Stepper.Completed>
        </Stepper>

        <div className="w-full m-auto flex justify-between px-4">
          {active > 0 ? (
            <Button variant="transparent" onClick={prevStep}>
              Zurück
            </Button>
          ) : (
            <div />
          )}
          {active < 2 && (
            <Button onClick={nextStep} disabled={!form.isValid() || !entry}>
              Weiter
            </Button>
          )}
          {active === 2 && (
            <Button type="submit" disabled={!form.isValid()}>
              Anmeldung abschicken
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
