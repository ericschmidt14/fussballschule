"use client";
import { useState } from "react";
import { Stepper, Button, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues, getInitialValues } from "./form/form";
import { validateForm } from "./form/validation";
import Step1 from "./steps/1";
import Step2 from "./steps/2";
import Step3 from "./steps/3";

export default function Home() {
  const [active, setActive] = useState(0);

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
      <form
        className="w-full md:w-[768px] p-4 flex flex-col"
        onSubmit={form.onSubmit((values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify(values, null, 2),
          })
            .then((res) => res.text())
            .then((data) => {
              console.log(data);
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
              position: "relative",
              margin: "32px auto 16px",
              padding: "48px 32px",
              border:
                "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-6)",
              borderRadius: "var(--mantine-radius-md)",
              background: "rgba(255, 255, 255, 0.0925)",
              boxShadow: "var(--mantine-shadow-xl)",
            },
            steps: {
              width: "240px",
              margin: "0 auto",
            },
            stepBody: {
              display: "none",
            },
            stepIcon: { boxShadow: "var(--mantine-shadow-xl)" },
            separator: {
              marginLeft: rem(-2),
              marginRight: rem(-2),
            },
          }}
        >
          <Stepper.Step>
            <Step1 form={form} />
          </Stepper.Step>
          <Stepper.Step>
            <Step2 form={form} />
          </Stepper.Step>
          <Stepper.Step>
            <Step3 form={form} />
          </Stepper.Step>
          <Stepper.Completed>
            <b>Anmeldung erfolgreich abgeschickt!</b> Bitte überprüfen Sie das
            Postfach der angegebenen Mailadresse für weitere Informationen.
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
            <Button onClick={nextStep} disabled={!form.isValid()}>
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
