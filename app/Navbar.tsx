"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

function Navbar() {
  return (
    <nav className="mb-5 border-b shadow-sm">
      <Container>
        <Flex justify="between" align="center" className="h-16 px-5">
          <Flex align="center" gap="4">
            <Link href="/">
              <AiFillBug className="text-xl text-[var(--accent-10)]" />
            </Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthLinks />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default Navbar;

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues/list",
  },
];

function NavLinks() {
  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((link) => {
        const isActive = currentPath.split("/")[1] === link.href.split("/")[1];

        return (
          <li key={link.href}>
            <Link
              className={classnames({
                "rounded-md bg-[var(--accent-9)] p-1 px-2 text-white": isActive,
                "transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function AuthLinks() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    status === "authenticated" && (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user!.image!}
            size="3"
            radius="full"
            fallback="?"
            className="cursor-pointer"
            // referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="!text-xl">
          <DropdownMenu.Label className="!pl-2">
            <Text className="text-[.9rem]">{session!.user?.name}</Text>
          </DropdownMenu.Label>

          <DropdownMenu.CheckboxItem>
            <Link className="text-[.9rem]" href="/api/auth/signout">
              Log out
            </Link>
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  );
}
