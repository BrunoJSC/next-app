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
import { FormCar } from "@/formAdmin/FormCar";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DrawerCar({ open, setOpen }: DrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Adicionar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastar carro</DialogTitle>
            <DialogDescription>
              Preencha todos os campos para cadastrar um novo carro
            </DialogDescription>
          </DialogHeader>
          <FormCar />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Cadastar carro</DrawerTitle>
          <DrawerDescription>
            Preencha todos os campos para cadastrar um novo carro
          </DrawerDescription>
        </DrawerHeader>
        <FormCar />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
