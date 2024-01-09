"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { FormCar } from "../forms/FormCar";

export function DrawerUserCar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar carro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar carro</DialogTitle>
          <DialogDescription>
            Preencha os dados do seu veículo
          </DialogDescription>
        </DialogHeader>
        <FormCar />
      </DialogContent>
    </Dialog>
  );
}
