import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-5 flex gap-2 pt-8">
      <Image src="/logo.svg" alt="1. FCN Logo" width={96} height={96} />
      <h1 className="text-white">
        <span className="font-light">Fussball</span>schule
      </h1>
    </header>
  );
}
