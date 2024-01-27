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
import { cylinder } from "@/constants/filterMotorbike";
import { db, storage } from "@/firebase";
import { motorbikeSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormMotorbike() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof motorbikeSchema>>({
    resolver: zodResolver(motorbikeSchema),
    defaultValues: {
      name: "",
      email: "",
      fip: "",
      phone: "",
      location: "",
      motorbikeBrand: "",
      motorbikeModel: "",
      mechanic: "",
      plate: "",
      auction: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      fuel: "",
      km: "",
      price: "",
      description: "",
      fairing: "",
      cylinder: "",
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

  const handleSubmit = async (data: z.infer<typeof motorbikeSchema>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "formMotorbike"), {
        id: Math.random().toString(),
        name: data.name,
        email: data.email,
        fip: data.fip,
        phone: data.phone,
        location: data.location,
        motorbikeBrand: data.motorbikeBrand,
        motorbikeModel: data.motorbikeModel,
        mechanic: data.mechanic,
        plate: data.plate,
        auction: data.auction,
        yearFabrication: data.yearFabrication,
        yearModification: data.yearModification,
        color: data.color,
        fuel: data.fuel,
        km: data.km,
        price: data.price,
        description: data.description,
        fairing: data.fairing,
        cylinder: data.cylinder,
        images: await handleUpload(),
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite neste formato (11) 99999-9999"
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
                    placeholder="Digite a localização"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motorbikeBrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca da moto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a marca da moto"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motorbikeModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo da moto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o modelo da moto"
                    {...field}
                  />
                </FormControl>

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
                    placeholder="Digite se a moto já foi modificada sim ou não"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa da moto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a placa da moto"
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
                    placeholder="Digite se a moto é de leilão ou não"
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
                    placeholder="Digite a data de fabricação"
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
                    placeholder="Digite a data de modificação"
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
                    placeholder="Digite a cor da moto"
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
                <FormLabel>KM</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite a quilometragem da moto"
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
                    placeholder="Digite o tipo de combustível da moto"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fairing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carenagem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o estado da carenagem. boa, media ou ruim"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cylinder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cilindradas</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a cilindrada da moto" {...field} />
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
                    placeholder="Digite a FIP da moto"
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
                    placeholder="Digite o preço da moto"
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
                  <Textarea className="h-[300px]" {...field} />
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
                  <select>
                    {cylinder.map((cylinder) => (
                      <option key={cylinder.value} value={cylinder.value}>
                        {cylinder.label}
                      </option>
                    ))}
                  </select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <CameraIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...form.register("images")}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                  </label>
                  <p className="pl-1">
                    Ao tirar a foto do veículo siga as seguintes orientações:
                    Frente, Traseira, Lateral Esquerda, Lateral Direita Fotos
                    precisaram pegar o ângulo do carro inteiro
                  </p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
