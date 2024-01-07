"use client";

import { NAV_LINK } from "@/constants";
import { Button } from "./ui/button";
import { ToggleMenu } from "./ToggleMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { NavbarAdmin } from "./NavbarAdmin";

export function Navbar() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  return (
    <>
      {user ? (
        <NavbarAdmin />
      ) : (
        <>
          <header className="w-full mx-auto bg-white border-b 2xl:max-w-7xl flex items-center justify-between p-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={200}
                height={50}
                className="h-10 w-20 bg-cover"
              />
            </Link>

            <ToggleMenu className="md:hidden block" />

            <nav className="md:flex gap-4 items-center hidden">
              {NAV_LINK.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-bold hover:text-primary transition duration-300 ${
                    pathname === link.href ? "text-primary" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Button asChild>
                <Link href="/anunciar">Anunciar</Link>
              </Button>
            </nav>
          </header>
        </>
      )}
    </>
  );
}
