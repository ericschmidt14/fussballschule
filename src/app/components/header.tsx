import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-5 flex justify-center gap-2 pt-8 scale-50 md:scale-100">
      <Image src="/logo.svg" alt="1. FCN Logo" width={96} height={96} />
      <h1>
        <span className="font-light">Fussball</span>schule
      </h1>
    </header>
  );
}
