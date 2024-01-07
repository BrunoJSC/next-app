"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINK } from "@/constants";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ToggleMenuProps {
  className: string;
}

export function ToggleMenu({ className }: ToggleMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 h-56">
        {NAV_LINK.map((link) => (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="w-full" asChild>
            <Link href="/anunciar">Anunciar</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
