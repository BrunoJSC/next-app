"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, storage } from "@/firebase";
import { carSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

export function FormCar() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: "",
      email: "",
      fip: "",
      phone: "",
      location: "",
      brandCar: "",
      modelCar: "",
      bodyType: "",
      mechanic: "",
      plate: "",
      auction: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      doors: "",
      fuel: "",
      km: "",
      accessories: [],
      price: "",
      description: "",
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

  const handleSubmit = async (data: z.infer<typeof carSchema>) => {
    await addDoc(collection(db, "formCar"), {
      id: Date().toString(),
      name: data.name,
      email: data.email,
      fip: data.fip,
      phone: data.phone,
      location: data.location,
      brandCar: data.brandCar,
      modelCar: data.modelCar,
      bodyType: data.bodyType,
      mechanic: data.mechanic,
      plate: data.plate,
      auction: data.auction,
      yearFabrication: data.yearFabrication,
      yearModification: data.yearModification,
      color: data.color,
      doors: data.doors,
      fuel: data.fuel,
      km: data.km,
      accessories: data.accessories,
      price: data.price,
      description: data.description,
      images: await handleUpload(),
    });

    form.reset();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Digite seu nome" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite seu email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FIP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o FIP para o modelo de carro"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite seu número de telefone"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite sua localização"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandCar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca do veiculo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o modelo do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modelCar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo do veiculo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o modelo do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo da carroceria</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o tipo da carroceria"
                    {...field}
                  />
                </FormControl>

                <FormDescription>Exemplo: Hatch</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mechanic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mecanico</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite sim ou não"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Informe se o carros já modificado
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa do veiculo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a placa do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="auction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leilão</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite se o veiculo é de leilão ou não"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearFabrication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de fabricação</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite sua data de fabricação"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearModification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de modificação</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite sua data de modificação"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a cor do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portas</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a quantidade de portas que o veiculo tem"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="km"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Km</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a quilometragem do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Combustível</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o combustível do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accessories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acessórios</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite os acessórios do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o preço do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite os acessórios do veiculo"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Imagens</FormLabel>
            <FormControl>
              <input
                id="file-upload"
                type="file"
                {...form.register("images")}
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
            </FormControl>

            <FormMessage />
          </FormItem>

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
