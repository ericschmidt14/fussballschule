import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-8 py-4 justify-between items-center flex flex-col-reverse md:flex-row gap-4">
      <div className="justify-start items-start gap-8 flex">
        <p className="hidden md:block">© 1. FC Nürnberg e.V.</p>
        <nav className="flex gap-8">
          <a href="https://www.fcn.de/standards/impressum/" target="_blank">
            Impressum
          </a>
          <a
            href="https://www.fcn.de/standards/datenschutzerklaerung/"
            target="_blank"
          >
            Datenschutz
          </a>
        </nav>
      </div>
      <div className="justify-start items-center gap-3 flex">
        <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
        <div className="text-4xl font-bold italic">NLZ</div>
        <div className="w-px h-[28px] bg-white" />
        <div className="text-[8px] leading-snug font-light uppercase">
          Nachwuchs- <br /> Leistungszentrum
        </div>
      </div>
    </footer>
  );
}
