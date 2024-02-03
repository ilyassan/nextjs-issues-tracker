"use client";

import Skeleton from "@/app/components/Skeleton";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import LogoutButton from "./components/LogoutButton";

const NavBar = () => {
  const MainLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks links={MainLinks} />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = ({ links }: { links: { label: string; href: string }[] }) => {
  const pathname = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === pathname,
            })}
            onClick={(event) => {
              if (link.href === pathname) {
                event.preventDefault();
              }
            }}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" height="2rem" />;

  if (status === "unauthenticated")
    return <NavLinks links={[{ href: "/auth/login", label: "Login" }]} />;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <LogoutButton />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
