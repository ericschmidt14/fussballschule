import { Button, Menu, rem } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IconLogin2, IconLogout } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-5 flex justify-between items-center gap-2 px-16 py-2 bg-black/90 text-white shadow-md">
      <Link href="/admin" className="logo">
        <div className="flex items-center gap-1">
          <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
          <p className="text-2xl uppercase">
            Fussball<b>schule</b>
          </p>
        </div>
      </Link>
      {!session ? (
        <Button onClick={() => signIn("azure-ad")} leftSection={<IconLogin2 />}>
          Einloggen
        </Button>
      ) : (
        <>
          <Menu trigger="click-hover">
            <Menu.Target>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col items-end">
                  <p>
                    <b>{session.user?.name}</b>
                  </p>
                  <p className="muted">{session.user?.email}</p>
                </div>
                <Image
                  src="/user.svg"
                  alt="Profile Image"
                  width={48}
                  height={48}
                />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => signOut()}
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Abmelden
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      )}
    </header>
  );
}

function NavItem({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const path = usePathname();
  const active =
    (path.includes(href) && href !== "/") || (path === "/" && href === "/");

  return (
    <Link href={href}>
      <p className={`${active ? "text-white" : "link"} ${className}`}>
        {children}
      </p>
    </Link>
  );
}