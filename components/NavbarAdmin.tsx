"use client";

import { ADMIN_LINK } from "@/constants";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export function NavbarAdmin() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      router.replace("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return redirect("/admin");
  }

  return (
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

      <nav className="md:flex gap-4 items-center hidden">
        {ADMIN_LINK.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-bold hover:text-primary transition duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Button onClick={handleSignOut} variant="destructive">
        Sair
      </Button>
    </header>
  );
}
