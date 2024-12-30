import { Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-center md:justify-between items-center gap-2 px-16 py-2 bg-black/50 backdrop-blur-lg text-white shadow-md">
      <Link href="/" className="logo">
        <div className="flex items-center gap-1">
          <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
          <p className="text-2xl">
            <b>Fußball</b>
            <i>schule</i>
          </p>
        </div>
      </Link>
      <Button
        color="dark"
        component="a"
        className="hidden md:block"
        href="mailto:fussballschule@fcn.de"
        leftSection={<IconMail size={20} />}
      >
        Kontakt
      </Button>
    </header>
  );
}
