"use client";

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
import { FormBike } from "@/formAdmin/FormBike";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DrawerFormBike({ open, setOpen }: DrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Adicionar moto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastar Moto</DialogTitle>
            <DialogDescription>
              Preencha todos os campos para cadastrar uma nova moto
            </DialogDescription>
          </DialogHeader>
          <FormBike />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Adicionar moto</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Cadastar moto</DrawerTitle>
          <DrawerDescription>
            Preencha todos os campos para cadastrar uma nova moto
          </DrawerDescription>
        </DrawerHeader>
        <FormBike />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
