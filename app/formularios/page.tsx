import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormCar } from "./forms/FormCar";
import { FormMotorbike } from "./forms/FormMotorbike";
import { Card } from "@/components/ui/card";
import { DrawerUserCar } from "./DrawerUser/DrawerUserCar";
import Image from "next/image";
import { DrawerUserMotorbike } from "./DrawerUser/DrawerUserMotorbike";

export default function Forms() {
  return (
    <section className="w-full min-h-screen mx-auto flex flex-col items-center justify-center mb-48">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex flex-col items-center p-4">
          <Image src="/car.svg" alt="Logo" width={200} height={200} />
          <DrawerUserCar />
        </Card>

        <Card className="flex flex-col items-center p-4">
          <Image src="/moto.svg" alt="Logo" width={200} height={200} />
          <DrawerUserMotorbike />
        </Card>
      </div>
    </section>
  );
}
