"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues",
  },
];

function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="mb-5 flex h-16 items-center space-x-6 border-b px-5 shadow-sm">
      <Link href="/">
        <AiFillBug className="text-xl text-[var(--accent-10)]" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          const isActive =
            currentPath.split("/")[1] === link.href.split("/")[1];

          return (
            <li key={link.href}>
              <Link
                className={classnames({
                  "rounded-md bg-[var(--accent-9)] p-1.5 px-2 text-white":
                    isActive,
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
    </nav>
  );
}

export default Navbar;
