import { Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-5 flex justify-between items-center gap-2 px-16 py-2 bg-black/90 text-white shadow-md">
      <Link href="/" className="logo">
        <div className="flex items-center gap-1">
          <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
          <p className="text-2xl uppercase">
            Fussball<b>schule</b>
          </p>
        </div>
      </Link>
      <Button
        component="a"
        href="mailto:fussballschule@fcn.de"
        leftSection={<IconMail size={20} />}
      >
        Kontakt
      </Button>
    </header>
  );
}
