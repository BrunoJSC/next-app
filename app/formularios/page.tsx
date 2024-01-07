"use client";

import { useState } from "react";
import { DrawerFormBike } from "./components/DrawerFormBike";
import { DrawerFormCar } from "./components/DrawerFormCar";
import Image from "next/image";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-24">
      <div className="flex flex-col items-center">
        <Image src="/moto.svg" alt="logo" width={100} height={100} />
        <DrawerFormBike open={open} setOpen={setOpen} />
      </div>

      <div className="flex flex-col items-center">
        <Image src="/car.svg" alt="logo" width={100} height={100} />
        <DrawerFormCar open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
