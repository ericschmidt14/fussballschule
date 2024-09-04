"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../../components/title";
import { Checkbox, Collapse, Divider, Spoiler, Table } from "@mantine/core";
import { FormValues } from "../form/form";
import { useState } from "react";
import { FormWrapper } from "../../components/form";
import Conditions from "@/app/components/conditions";

export default function Agree({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [conditions, setConditions] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <FormWrapper>
      <Title text="Rechtliche Hinweise" />
      <div className="flex flex-col gap-4">
        <Checkbox
          className="col-span-2"
          label={
            <>
              Ich habe die{" "}
              <span
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setConditions(!conditions);
                }}
              >
                Teilnahmebedingungen / AGB
              </span>{" "}
              gelesen und akzeptiert.
            </>
          }
          key={form.key("conditions")}
          {...form.getInputProps("conditions", { type: "checkbox" })}
        />
        <Collapse in={conditions}>
          <Conditions />
        </Collapse>
        <Checkbox
          className="col-span-2"
          label={
            <>
              Ich habe die{" "}
              <span
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacy(!privacy);
                }}
              >
                Datenschutzhinweise
              </span>{" "}
              zur Kenntnis genommen.
            </>
          }
          key={form.key("privacy")}
          {...form.getInputProps("privacy", { type: "checkbox" })}
        />
        <Collapse in={privacy}>
          <Privacy />
        </Collapse>
        <Divider
          label="Einwilligungen im Rahmen der Fußballschule"
          labelPosition="center"
        />
        <Checkbox
          className="col-span-2"
          label="Ton-, Foto- und Videoaufnahmen"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Ton-, Video- und Fotoaufnahmen sowie Vornamen, Bild, Stimme, Erscheinungsbild und Darbietung meines Kindes, die während des Besuchs der Fußballschule sowie bei Events in dessen Rahmen gefertigt werden, für die Zwecke der Öffentlichkeitsarbeit des Vereins verwendet werden dürfen."
          key={form.key("recordings")}
          {...form.getInputProps("recordings", { type: "checkbox" })}
        />

        <Checkbox
          className="col-span-2"
          label="Verarbeitung besonderer Kategorien personenbezogener Daten"
          description="Ich stimme zu, dass der 1. FCN berechtigt ist, Gesundheitsdaten meines Kindes wie bspw. Erkrankungen, Verletzungen, Allergien zu verarbeiten, um das Training in der Fußballschule entsprechend gestalten und ggfs. notwendige Maßnahmen ergreifen zu können."
          key={form.key("processing")}
          {...form.getInputProps("processing", { type: "checkbox" })}
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
      </div>
    </FormWrapper>
  );
}

function Privacy() {
  return (
    <article className="muted small md:columns-2">
      <h4>
        1. Name und Kontaktdaten des für die Verarbeitung Verantwortlichen
      </h4>
      <p>Diese Datenschutzhinweise gelten für die Datenverarbeitung durch:</p>
      <p>
        1. Fußball-Club Nürnberg e.V. <br />
        Valznerweiherstraße 200 <br />
        90480 Nürnberg
      </p>
      <p>
        Telefon: (0911) 940 79 - 100 <br />
        Telefax: (0911) 940 79 - 510 <br />
        E-Mail: fussballschule@fcn.de
        <br />
        www.fcn.de
      </p>
      <h4>2. Kontaktdaten des Datenschutzbeauftragten</h4>
      <p>
        Sie können unseren Datenschutzbeauftragten unter folgender Adresse
        erreichen:
      </p>
      <p>
        SiDIT GmbH Rechtsanwalt <br /> Holger Loos <br />
        Langgasse 20 <br />
        97261 Güntersleben <br />
        E-Mail: info@sidit.de
      </p>
      <h4>
        3. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck
        und deren Verwendung
      </h4>
      <h4>3. 1. Erhebung und Speicherung</h4>
      <p>
        Wenn Sie Ihr Kind für unsere Fußballschule anmelden wollen, erheben wir
        folgende Informationen:
      </p>
      <p>
        <ul>
          <li> Angaben zum teilnehmenden Kind </li>
          <li> Vorname </li>
          <li> Nachname </li>
          <li> Geburtsdatum </li>
          <li> Geschlecht </li>
          <li> Anschrift (Straße, Hausnummer, PLZ, Ort) </li>
          <li> Telefon- und Handynummer </li>
          <li>Konfektionsgröße </li>
          <li>
            Besonderheiten (wie bspw. Allergien, Krankheiten, Medikamente)
          </li>
          <li> Angaben zum Erziehungsberechtigten </li>
          <li> Name des Erziehungsberechtigten </li>
          <li> Telefonnummer </li>
          <li>Handynummer </li>
          <li> E-Mail-Adresse </li>
          <li> Kontodaten</li>
        </ul>
      </p>
      <p>
        Während der Teilnahme in der Fußballschule werden möglicherweise noch
        Ton-, Foto- oder Filmaufnahmen von den Teilnehmern angefertigt.
      </p>
      <h4>
        3.2 Wofür verarbeiten wir Ihre Daten (Zweck der Verarbeitung) und auf
        welcher Rechtsgrundlage?
      </h4>
      <p>
        Im Nachfolgenden informieren wir Sie darüber, wofür und auf welcher
        Rechtsgrundlage wir Ihre Daten verarbeiten.
      </p>
      <h4>
        3.2.1. Zur Erfüllung von vertraglichen Pflichten (Art. 6 Abs. 1 Buchst.
        b DS-GVO)
      </h4>
      <p>
        Wir verarbeiten Ihre Daten zur Durchführung unserer Verträge mit Ihnen,
        d.h. insbesondere
      </p>
      <ul>
        <li>
          Für die Buchung und Abrechnung des Besuchs des Kindes an der
          Fußballschule
        </li>
        <li>
          Für den Betrieb und die Durchführungen der Leistungen der
          Fußballschule
        </li>
        <li>zur Korrespondenz mit Ihnen;</li>
        <li>zur Rechnungsstellung;</li>
        <li>
          zur Abwicklung von evtl. vorliegenden Haftungsansprüchen sowie der
          Geltendmachung etwaiger Ansprüche gegen Sie.
        </li>
      </ul>
      <h4>
        3.2.2 Aufgrund Ihrer Einwilligung (Art. 6 Abs. 1 Buchst. a DS-GVO)
      </h4>
      <p>
        Soweit Sie uns eine Einwilligung zur Verarbeitung von personenbezogenen
        Daten erteilt haben, ist die jeweilige Einwilligung Rechtsgrundlage für
        die dort genannte Verarbeitung.
      </p>
      <p>Dies betrifft insbesondere</p>
      <ul>
        <li>Ton-, Foto- oder Filmaufnahmen</li>
        <li>Erhebung und Speicherung weiterer personenbezogenen Daten</li>
      </ul>
      <p>
        <b>
          Sie können Einwilligungen jederzeit mit Wirkung für die Zukunft
          widerrufen.
        </b>
      </p>
      <h4>
        3.2.3 Im Rahmen der Interessenabwägung (Art. 6 Abs. 1 Buchst. f DS-GVO)
      </h4>
      <p>
        Wir können Ihre Daten außerdem auf Basis einer Interessenabwägung zur
        Wahrung der berechtigten Interessen von uns oder von Dritten verwenden.
        Dies erfolgt bspw. zu folgenden Zwecken:
      </p>
      <ul>
        <li>Zur Einteilung und Zusammenstellung von Trainingsgruppen </li>
        <li> Werbung, Markt- und Meinungsforschung</li>
        <li>
          zur Abwicklung von evtl. vorliegenden Haftungsansprüchen sowie der
          Geltendmachung etwaiger Ansprüche gegen Sie.
        </li>
      </ul>
      <p>
        Unser Interesse an der jeweiligen Verarbeitung ergibt sich aus den
        jeweiligen Zwecken und ist im Übrigen wirtschaftlicher Natur. Soweit
        dies möglich und angemessen ist, verarbeiten wir Ihre Daten
        pseudonymisiert oder anonymisiert.
      </p>
      <h4>
        3.2.4. Aufgrund gesetzlicher Vorgaben (Art. 6 Abs. 1 Buchst. c DS-GVO)
      </h4>
      <p>
        Wir unterliegen verschiedenen rechtlichen Verpflichtungen, wie bspw.
        gesetzlichen handelsrechtlichen Aufbewahrungs- und
        Dokumentationspflichten (aus HGB, StGB oder AO). Die Daten werden
        gelöscht, sobald sie für den Zweck ihrer Verarbeitung nicht mehr
        erforderlich sind; es sei denn, dass wir nach Artikel 6 Abs. 1 S. 1 lit.
        c DSGVO aufgrund von steuer- und handelsrechtlichen Aufbewahrungs- und
        Dokumentationspflichten (aus HGB, StGB oder AO) zu einer längeren
        Speicherung verpflichtet sind oder Sie in eine darüberhinausgehende
        Speicherung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben.
      </p>
      <h4>
        3.2.5. Die Verarbeitung besonderer Kategorien personenbezogener Daten
        (Art. 9 Abs. 2a DSGVO)
      </h4>
      <p>
        Die Verarbeitung der Gesundheitsdaten Ihres Kindes wie bspw. Allergien
        und Medikamente, Erkrankungen u.ä. erfolgt auf Grund der von Ihnen
        ausdrücklich erteilten Einwilligung. Diese Daten benötigen wir, um auf
        diese gesundheitlichen Besonderheiten Rücksicht nehmen und entsprechende
        Maßnahmen ergreifen zu können.
      </p>
      <h4>4. Weitergabe von Daten an Dritte</h4>
      <p>
        Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den
        im Folgenden aufgeführten Zwecken findet nicht statt:
      </p>
      <ul>
        <li>Weitergabe an den/die Trainer/Betreuer in der Fußballschule</li>
        <li>Buchhaltung (z.B. Steuerberater)</li>
        <li>Rechtsstreitigkeiten (z.B. Anwalt)</li>
      </ul>
      <h4>5. Löschung</h4>
      <p>
        Die Daten werden gelöscht, sobald sie für den Zweck ihrer Verarbeitung
        nicht mehr erforderlich sind; es sei denn, dass wir nach Artikel 6 Abs.
        1 S. 1 lit. c DSGVO aufgrund von steuer- und handelsrechtlichen
        Aufbewahrungs- und Dokumentationspflichten (aus HGB, StGB oder AO) zu
        einer längeren Speicherung verpflichtet sind oder Sie in eine
        darüberhinausgehende Speicherung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO
        eingewilligt haben.
      </p>
      <h4>6. Betroffenenrechte</h4>
      <p>Sie haben das Recht:</p>
      <ul>
        <li>
          gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit
          gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die
          Datenverarbeitung, die auf dieser Einwilligung beruhte, für die
          Zukunft nicht mehr fortführen dürfen;
        </li>
        <li>
          gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeite- ten
          personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft
          über die Verarbeitungszwecke, die Kategorie der personenbezogenen
          Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten
          offengelegt wurden oder werden, die geplante Speicherdauer, das
          Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der
          Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts,
          die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden,
          sowie über das Bestehen einer automatisierten Entscheidungsfindung
          einschließlich Profiling und ggf. aussagekräftigen Informationen zu
          deren Einzelheiten verlangen;
        </li>
        <li>
          gemäß Art. 16 DSGVO unverzüglich die Berichtigung un- richtiger oder
          Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten
          zu verlangen;
        </li>
        <li>
          gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten
          personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung
          zur Ausübung des Rechts auf freie Meinungsäußerung und Information,
          zur Erfüllung einer recht- lichen Verpflichtung, aus Gründen des
          öffentlichen Interesses oder zur Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen erforderlich ist;
        </li>
        <li>
          gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten
          von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber
          deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie
          jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch
          gegen die Verarbeitung eingelegt haben;
        </li>
        <li>
          gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns
          bereitgestellt haben, in einem strukturierten, gängigen und
          maschinenlesebaren Format zu erhalten oder die Übermittlung an einen
          anderen Verantwortlichen zu verlangen und
        </li>
        <li>
          gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In
          der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres
          üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres
          Kanzleisitzes wenden.
        </li>
      </ul>
      <h4>7. Widerspruchsrecht</h4>
      <p>
        Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten
        Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden,
        haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die
        Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür
        Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben.
        Möchten Sie von Ihrem Widerspruchsrecht Gebrauch machen, genügt eine
        E-Mail an fussballschule@fcn.de
      </p>
      <h4>Stand: 09.03.2023</h4>
    </article>
  );
}
