import { MantineProvider } from "@mantine/core";
import Image from "next/image";

export default function Footer() {
  return (
    <MantineProvider>
      <footer className="px-8 py-4 justify-between items-center flex flex-col-reverse md:flex-row gap-4 bg-black text-white">
        <div className="justify-start items-start gap-8 flex">
          <p className="hidden md:block">
            <b>© 1. FC Nürnberg e.V.</b>
          </p>
          <nav className="flex gap-4">
            <a href="">FAQs</a>
            <a href="">Impressum</a>
            <a href="">Datenschutz</a>
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
    </MantineProvider>
  );
}
