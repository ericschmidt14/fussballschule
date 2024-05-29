import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-8 py-4 justify-between items-center flex">
      <div className="justify-start items-start gap-8 flex">
        <p>
          <b>© 2024</b>
        </p>
        <nav className="flex gap-4">
          <a href="">Kontakt</a>
          <a href="">Impressum</a>
          <a href="">Datenschutz</a>
        </nav>
      </div>
      <div className="justify-start items-center gap-3 flex">
        <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
        <div className="text-4xl font-bold italic">NLZ</div>
        <div className="w-px h-[28px] bg-black" />
        <div className="text-[8px] leading-snug font-light uppercase">
          Nachwuchs- <br /> Leistungszentrum
        </div>
      </div>
    </footer>
  );
}
