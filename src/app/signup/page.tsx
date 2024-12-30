"use client";
import { Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useState } from "react";
import StepperIndicator from "../components/stepper";
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
      <StepperIndicator steps={3} active={active} />
      <form
        className="w-full md:w-[768px] flex flex-col"
        onSubmit={form.onSubmit((values) => {
          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify(
              {
                youth: values.youth,
                time: values.time,
                childLastName: values.childLastName,
                childFirstName: values.childFirstName,
                dob: dayjs(values.dob).format("YYYY-MM-DD"),
                gender: values.gender,
                club: values.club,
                position: values.position,
                misc: values.misc,
                parentLastName: values.parentLastName,
                parentFirstName: values.parentFirstName,
                street: values.street,
                number: values.number,
                postalCode: values.postalCode,
                city: values.city,
                email: values.email,
                phone: values.phone,
                conditions: values.conditions,
                // values added during confirmation:
                period: "",
                size: "",
                memberno: "",
                agree: false,
                name: "",
                iban: "",
                bic: "",
                privacy: false,
                recordings: false,
                processing: false,
              },
              null,
              2
            ),
          })
            .then((res) => res.text())
            .then((data) => {
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
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
            },
            step: { display: "none" },
            steps: { display: "none" },
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
            <b>Anmeldung erfolgreich abgeschickt!</b> Bitte überprüfe das
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
