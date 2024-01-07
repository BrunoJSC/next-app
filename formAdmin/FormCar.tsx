import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { carShowSchema } from "@/validation/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
export function FormCar({ className }: { className?: string }) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const form = useForm<z.infer<typeof carShowSchema>>({
    resolver: zodResolver(carShowSchema),
    defaultValues: {
      price: "",
      location: "",
      bodyType: "",
      brandCar: "",
      modelCar: "",
      fuel: "",
      km: "",
      plate: "",
      condition: "",
      yearFabrication: "",
      exchange: "",
      color: "",
      doors: "",
      description: "",
      accessories: [],
      images: "",
    },
  });

  const downloadURLs: string[] = [];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      for (const element of Array.from(selectedFiles)) {
        const file = element;
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        downloadURLs.push(downloadURL);
        console.log("Image uploaded successfully:", downloadURL);
      }
    }

    console.log(downloadURLs);
    return downloadURLs;
  };

  const handleSubmit = async (data: z.infer<typeof carShowSchema>) => {
    await addDoc(collection(db, "cars"), {
      id: Date().toString(),
      price: data.price,
      location: data.location,
      bodyType: data.bodyType,
      brandCar: data.brandCar,
      modelCar: data.modelCar,
      fuel: data.fuel,
      km: data.km,
      plate: data.plate,
      condition: data.condition,
      yearFabrication: data.yearFabrication,
      exchange: data.exchange,
      color: data.color,
      doors: data.doors,
      description: data.description,
      accessories: data.accessories,
      images: await handleUpload(),
    });

    console.log(data);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid gap-2">
          <Label htmlFor="brandCar">Marca do carro</Label>
          <Input type="text" {...form.register("brandCar")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="modelCar">Modelo do carro</Label>
          <Input type="text" {...form.register("modelCar")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Preço</Label>
          <Input type="text" {...form.register("price")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Localização</Label>
          <Input type="text" {...form.register("location")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bodyType">Carroceria</Label>
          <Input type="text" {...form.register("bodyType")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="plate">Placa do veiculo</Label>
          <Input type="text" {...form.register("plate")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fuel">Tipo de combustível do veiculo</Label>
          <Input type="text" {...form.register("fuel")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="km">Quilometragem</Label>
          <Input type="text" {...form.register("km")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="condition">Condição</Label>
          <Input type="text" {...form.register("condition")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yearFabrication">Ano de fabricação</Label>
          <Input type="text" {...form.register("yearFabrication")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="exchange">Tipo de cambio</Label>
          <Input type="text" {...form.register("exchange")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="color">Cor</Label>
          <Input type="text" {...form.register("color")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="doors">Portas</Label>
          <Input type="text" {...form.register("doors")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="accessories">Acessórios</Label>
          <Input type="text" {...form.register("accessories")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea {...form.register("description")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            type="file"
            {...form.register("images")}
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={!form.formState.isValid}
        >
          {form.formState.isLoading ? "...Cadastrando" : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
}
