import { isNotEmpty, useForm } from "@mantine/form";
import Title from "../components/title";
import { Checkbox, Divider, Spoiler, TextInput } from "@mantine/core";

export default function Step5() {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      agree: false,
    },

    validate: {},
  });

  return (
    <div className="flex flex-col gap-8">
      <Title text="Zusammenfassung & Bestätigung" />
      <Spoiler
        maxHeight={120}
        showLabel="Mehr anzeigen"
        hideLabel="Weniger anzeigen"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Spoiler>
      <form className="flex flex-col gap-4">
        <Divider label="Allgemeine Hinweise" labelPosition="center" />
        <Checkbox
          className="col-span-2"
          label="Ich habe die Teilnahmebedingungen / AGB gelesen und akzeptiert."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />
        <Checkbox
          className="col-span-2"
          label="Ich habe die Datenschutzhinweise zur Kenntnis genommen."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />
        <Divider
          label="Einwilligungen im Rahmen der Fußballschule"
          labelPosition="center"
        />
        <Checkbox
          className="col-span-2"
          label="Ton-, Foto- und Videoaufnahmen"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Ton-, Video- und Foto- aufnahmen sowie Vornamen, Bild, Stimme, Erscheinungsbild und Darbietung meines Kindes, die während des Besuchs der Fußballschule sowie bei Events in dessen Rahmen gefertigt werden, für die Zwecke der Öffentlichkeitsarbeit des Vereins verwendet werden dürfen."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />

        <Checkbox
          className="col-span-2"
          label="Verarbeitung besonderer Kategorien personenbezogener Daten"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Gesundheitsdaten meines Kindes wie bspw. Erkrankungen, Verletzungen, Allergien zu verarbeiten, um das Training in der Fußballschule entsprechend gestalten und ggfs. notwendige Maßnahmen ergreifen zu können."
          key={form.key("agree")}
          {...form.getInputProps("agree", { type: "checkbox" })}
        />
        <p className="muted small">
          Mir ist bewusst, dass diese Einwilligungen freiwillig sind und ich sie
          jederzeit mit Wirkung für die Zukunft widerrufen kann. Hierfür genügt
          die Übersendung der Widerrufserklärung in Textform an die oben
          genannten Kontaktdaten des Verantwortlichen. Mir ist klar, dass durch
          den Widerruf der Einwilligung die Rechtmäßigkeit der aufgrund der
          Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt
          wird.
        </p>
      </form>
    </div>
  );
}
