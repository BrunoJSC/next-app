"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { motorbikeShowSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";

export function FormBike({ className }: { className?: string }) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const form = useForm<z.infer<typeof motorbikeShowSchema>>({
    resolver: zodResolver(motorbikeShowSchema),
    defaultValues: {
      motorbikeBrand: "",
      motorbikeModel: "",
      location: "",
      price: "",
      plate: "",
      fuel: "",
      km: "",
      condition: "",
      yearFabrication: "",
      color: "",
      description: "",
      cylinder: "",
      images: [],
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

  const handleSubmit = async (data: z.infer<typeof motorbikeShowSchema>) => {
    await addDoc(collection(db, "motorbikes"), {
      id: Date().toString(),
      price: data.price,
      location: data.location,
      motorbikeBrand: data.motorbikeBrand,
      motorbikeModel: data.motorbikeModel,
      fuel: data.fuel,
      km: data.km,
      plate: data.plate,
      condition: data.condition,
      yearFabrication: data.yearFabrication,
      color: data.color,
      cylinder: data.cylinder,
      description: data.description,
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
          <Label htmlFor="brandCar">Marca da moto</Label>
          <Input type="text" {...form.register("motorbikeBrand")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="brandCar">Modelo da moto</Label>
          <Input type="text" {...form.register("motorbikeModel")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Localização</Label>
          <Input type="text" {...form.register("location")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Preço</Label>
          <Input type="text" {...form.register("price")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="plate">Placa da moto</Label>
          <Input type="text" {...form.register("plate")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fuel">Combustível</Label>
          <Input type="text" {...form.register("fuel")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="km">Quilometragem</Label>
          <Input type="text" {...form.register("km")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="condition">Condição</Label>
          <Input type="text" {...form.register("condition")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yearFabrication">Ano de fabricação</Label>
          <Input type="text" {...form.register("yearFabrication")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="color">Cor</Label>
          <Input type="text" {...form.register("color")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cylinder">Cilindradas</Label>
          <Input type="text" {...form.register("cylinder")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
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

        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  );
}
