"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { Checkbox, Collapse, Divider, Spoiler, Table } from "@mantine/core";
import { FormValues } from "../form";
import { useState } from "react";
import { FormWrapper } from "../components/form";
import { genders, youths } from "../values";

export default function Step5({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [conditions, setConditions] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <FormWrapper>
      <Title text="Zusammenfassung & Bestätigung" />
      <Spoiler
        maxHeight={120}
        showLabel="Mehr anzeigen"
        hideLabel="Weniger anzeigen"
      >
        <Summary form={form} />
      </Spoiler>
      <div className="flex flex-col gap-4">
        <Divider label="Allgemeine Hinweise" labelPosition="center" />
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

function Summary({ form }: { form: UseFormReturnType<FormValues> }) {
  const data = [
    {
      description: "Zeitraum",
      value: `${form.getValues().period} Monate`,
    },
    {
      description: "Termin",
      value: `${youths[form.getValues().youth]} – ${
        form.getValues().time
      }, 15:00 – 16:30 Uhr`,
    },
    {
      description: "Name",
      value: `${form.getValues().childFirstName} ${
        form.getValues().childLastName
      }`,
    },
    {
      description: "Geschlecht",
      value: genders[form.getValues().gender],
    },
    {
      description: "Geburtstag",
      value: form.getValues().dob?.toDateString(),
    },
    {
      description: "Verein",
      value: form.getValues().club,
    },
    {
      description: "Position",
      value: form.getValues().position,
    },
    {
      description: "Besonderheiten",
      value: form.getValues().misc,
    },
    {
      description: "Konfektionsgröße",
      value: form.getValues().size,
    },
    {
      description: "Mitgliedsnummer",
      value: form.getValues().memberno,
    },
    {
      description: "Name",
      value: `${form.getValues().parentFirstName} ${
        form.getValues().parentLastName
      }`,
    },
    {
      description: "Adresse",
      value: `${form.getValues().street} ${form.getValues().number}, ${
        form.getValues().postalCode
      } ${form.getValues().city}`,
    },
    {
      description: "E-Mail",
      value: form.getValues().email,
    },
    {
      description: "Handy / Telefon",
      value: form.getValues().phone,
    },
    {
      description: "Kontoinhaber",
      value: form.getValues().name,
    },
    {
      description: "IBAN",
      value: form.getValues().iban,
    },
    {
      description: "BIC",
      value: form.getValues().bic,
    },
  ];

  return (
    <Table>
      <Table.Tbody>
        {data.map((entry, index) => {
          return (
            <Table.Tr key={index}>
              <Table.Td>
                <b>{entry.description}</b>
              </Table.Td>
              <Table.Td>{entry.value ? entry.value : ""}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}

function Conditions() {
  return (
    <article className="muted small md:columns-2">
      <p>
        Veranstalter ist der 1. FC Nürnberg, FUSSBALLSCHULE, Verein für
        Leibesübungen e.V., Valznerweiherstraße 200, 90480 Nürnberg.
        Veranstaltungsort ist der Sport- park Valznerweiher (sofern nicht anders
        vermerkt). Der Umfang der Leistungen er- gibt sich aus der
        Leistungsbeschreibung. Änderungen sind möglich. Sie obliegen der
        Entscheidung des Betreuungspersonals vor Ort.
      </p>
      <p>
        Anmeldungen sind möglich per Post oder Mail. Die Anmeldung wird erst
        verbindlich, wenn sie vom1.FC Nürnberg bestätigt worden ist. Diese
        Rückmeldung erfolgt per E-Mail, in Ausnahmefällen per Post. Für die An-
        und Abreise zum Trainingsgelände sind die Teilnehmer selbst
        verantwortlich.
      </p>
      <p>
        Mit der Anmeldung versichern die Erziehungsberechtigten, dass der
        Teilnehmer sporttauglich ist. Die Teilnahme erfolgt auf eigene Gefahr.
        Verletzungen und/oder Erkrankungen sowie eventuelle Folgeschäden sind
        durch die private Kranken- und Unfallversicherung der
        Erziehungsberechtigten direkt abzusichern.
      </p>
      <p>
        Bis 24h nach erfolgter erster Trainingseinheit besteht ein
        Sonderkündigungsrecht durch schriftliche Kündigung per Post oder Mail.
      </p>
      <p>
        Die Teilnehmerzahl ist begrenzt, daher entscheidet der 1. FC Nürnberg
        über die Teilnahme.
      </p>
      <p>
        Eine Kündigung muss mindestens 14 Tage vor Ablauf der Vertragslaufzeit
        schriftlich (per Post oder Mail) an die FUSSBALLSCHULE des 1. FC
        Nürnberg bzw. den Teilnehmer gerichtet werden. Andernfalls verlängert
        sich die Laufzeit der Vereinbarung auf unbestimmte Zeit. Die
        Vertragsparteien können das verlängerte Vertragsverhältnis jederzeit zum
        Ablauf eines jeden Vertragsmonats kündigen.
      </p>
      <p>
        Alle Teilnehmer haben Anspruch auf vier Trainingseinheiten pro Monat.
        Trainingseinheiten, welche aufgrund von Feiertagen oder entschuldigtem
        Fehlen nicht wahrgenommen werden, können in der Trainingswoche an einem
        anderen Tag absolviert bzw. zu einem späteren Zeitpunkt nachgeholt
        werden (gegebenenfalls auch nach Ablauf des Beitrittzeitraums). Selbiges
        gilt für entfallene Trainingseinheiten während der schulfreien Zeit. Bei
        unentschuldigtem Fehlen verfällt der Anspruch auf diese
        Trainingseinheit. Der gebuchte Beitrittszeitraum und die da- mit
        verbundene Kündigungsfrist bleiben von obiger Regelung unberührt.
      </p>
      <p>
        Der Veranstalter kann bei unvorhergesehenen, außergewöhnlichen
        Umständen, die bei Vertragsabschluss nicht einsehbar waren, mit
        sofortiger Wirkung vom Vertrag zurücktreten.
      </p>
      <p>
        Der Veranstalter haftet für die sorgfältige Auswahl und Überwachung der
        Trainer und Betreuer, die ordnungsgemäße Durchführung der
        Trainingseinheiten und die ordnungsgemäße Erbringung der sonstigen
        vertraglich vereinbarten Leistungen. Für Vorsatz und grobe
        Fahrlässigkeit haftet der Veranstalter unbeschränkt. Für einfache
        Fahrlässigkeit haftet der Veranstalter - außer im Falle der Verletzung
        des Lebens, des Körpers oder der Gesundheit - nur, sofern wesentliche
        Vertragspflichten (Kardinalpflichten) verletzt werden. Im Falle
        einfacher Fahrlässigkeit ist die Haftung be- grenzt auf den
        vertragstypischen und vorhersehbaren Schaden. Soweit die Haftung
        ausgeschlossen oder beschränkt ist, gilt dies auch für die Haftung für
        Erfüllungsgehilfen des Veranstalters.
      </p>
      <p>
        Der Erziehungsberechtigte haftet für die vorsätzlich oder fahrlässig
        verursachten Schäden des jeweiligen Teilnehmers. Der Veranstalter kann
        Teilnehmer, die Anweisungen der Trainer oder Betreuer nicht befolgen,
        sich oder andere gefährden und/oder grob gegen die Verhaltensregeln
        verstoßen, von den Trainingseinheiten ausschließen.
      </p>
      <p>
        Vom 1. FC Nürnberg angefertigte Ton-, Foto- oder Filmaufnahmen während
        der Trainingseinheiten im Rahmen der 1. FCN-FUSSBALLSCHULE und des 1.
        FCN-FUSSBALL KINDERGARTEN können zeitlich und räumlich unbegrenzt
        verwendet, d. h. hergestellt, verbreitet, vervielfältigt oder
        veröffentlicht werden. Der Veranstalter ist berechtigt, das Material
        jederzeit an Dritte unbeschränkt zur Verfügung zu stellen bzw. zu
        veräußern. Die Verwendung des Materials kann in allen Medien erfolgen
        und in vollem Umfang genutzt werden. Sie bestätigen mit Ihrer
        Unterschrift, dass Sie auf eine Vergütung der Leistung/Rechte Ihres
        Kindes verzichten.
      </p>
      <p>
        Sollten einzelne Bestimmungen des Vertrages unwirksam sein, so wird die
        Wirksamkeit der übrigen Bestimmungen nicht berührt. Die unwirksame
        Bestimmung ist durch die gesetzliche Regelung zu ersetzen, die dem
        verfolgten Vertragszweck möglichst nahekommt.
      </p>
    </article>
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
