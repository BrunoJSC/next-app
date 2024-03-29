"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { accessories } from "@/constants";
import { Label } from "@/components/ui/label";
import {
  body,
  bodyType,
  brandCar,
  carColors,
  condition,
  doors,
  fuelCar,
  locations,
  mechanic,
  motors,
  transmissionType,
} from "@/constants/filterCar";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

export function FormCar() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

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
      auction: "",
      condition: "",
      mechanic: "",
      plate: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      doors: "",
      fuel: "",
      km: "",
      motors: "",
      bodyWork: "",
      documents: "",
      accessories: [],
      description: "",
      exchange: "",
      price: "",
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
      }
    }

    return downloadURLs;
  };

  const handleSubmit = async (data: z.infer<typeof carSchema>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "formCar"), {
        id: Math.random().toString(),
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
        condition: data.condition,
        exchange: data.exchange,
        documents: data.documents,
        bodyWork: data.bodyWork,
        motors: data.motors,
        images: await handleUpload(),
      });

      toast.success("Formulário de carro enviado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                {...form.register("name")}
                placeholder="Digite seu nome"
                className="mt-2"
              />
            </div>

            <div className="mt-3">
              <Label htmlFor="email">Email</Label>
              <Input
                {...form.register("email")}
                placeholder="Digite seu email"
                className="mt-2"
              />
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="phone">Celular</Label>
            <Input
              {...form.register("phone")}
              placeholder="Digite neste formato (11) 99999-9999"
              className="mt-2"
            />
          </div>

          <div className="mt-3">
            <Label>Localização</Label>
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("location")}
            >
              <option value="">Localização do carro</option>
              {locations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 end-3 -translate-y-1/2">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
              </svg>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="brandCar" className="text-sm font-medium mb-3">
              Marca
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("brandCar")}
              >
                <option value="">Selecionar modelo de carro</option>
                {brandCar.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="modelCar">Modelo</Label>
            <Input
              {...form.register("modelCar")}
              className="mt-2"
              placeholder="Modelo do veículo digite neste formato ex: X1 ou Nissan 370Z"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="bodyType">Tipo de carroceria</Label>
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("bodyType")}
            >
              <option value="">Selecione</option>
              {bodyType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 end-3 -translate-y-1/2">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
              </svg>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="auction">Leilão</Label>
            <Input
              {...form.register("auction")}
              className="mt-2"
              placeholder="Leilão sim ou não"
            />
          </div>

          <div className="mt-3">
            <div className="grid gap-2">
              <Label>Condição do veiculo</Label>
              <div className="relative">
                <select
                  className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...form.register("condition")}
                >
                  <option value="">Selecione</option>
                  {condition.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="mechanic">Mecânica</Label>

            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("mechanic")}
              >
                <option value="">Selecione</option>
                {mechanic.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="plate">Placa do veículo</Label>

            <Input
              {...form.register("plate")}
              className="mt-2"
              placeholder="Placa do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="yearFabrication">Ano de fabricação</Label>

            <Input
              {...form.register("yearFabrication")}
              className="mt-2"
              placeholder="Ano do fabricação"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="yearModification">Ano modelo</Label>

            <Input
              {...form.register("yearModification")}
              className="mt-2"
              placeholder="Ano modelo"
            />
          </div>

          <div className="mt-3">
            <Label>Cor</Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("color")}
              >
                <option value="">Cor do carro</option>
                {carColors.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="exchange">Câmbio</Label>

            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("exchange")}
              >
                <option value="">Selecione</option>
                {transmissionType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="doors" className="text-sm font-medium">
              Portas
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("doors")}
              >
                <option value="">Portas</option>
                {doors.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Label>Tipo de combustível</Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("fuel")}
              >
                <option value="">
                  Selecionar tipo de combustível do carro
                </option>
                {fuelCar.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute top-1/2 end-3 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <FormField
              control={form.control}
              name="km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KM</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix=" "
                      decimalScale={2}
                      className="w-full bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="motors">Motor</Label>

            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("motors")}
            >
              <option value="">Selecione</option>
              {motors.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <Label htmlFor="bodywork">Lataria</Label>

            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("bodyWork")}
            >
              <option value="">Selecione</option>
              {body.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <Label htmlFor="documents">Documentos</Label>

            <Input
              {...form.register("documents")}
              className="mt-2"
              placeholder="Se o veiculo tem mutas ou restrições"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="fip">FIP</Label>
            <Input
              {...form.register("fip")}
              placeholder="FIP"
              className="mt-2"
            />
          </div>

          <div className="mt-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      className="w-full bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            {accessories.map((accessory) => (
              <div key={accessory.value}>
                <input
                  type="checkbox"
                  id={accessory.value}
                  value={accessory.value}
                  {...form.register("accessories")}
                  className="mr-4"
                />
                <label htmlFor={accessory.value}>{accessory.label}</label>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <Label htmlFor="description">Descriçao</Label>

            <Textarea
              {...form.register("description")}
              className="mt-2 h-52"
              placeholder="Descreva quantos donos o veículo teve, quais revisões foram feitas recentemente, motivo da venda e observações sobre o veículo."
            />
          </div>
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

          <Button type="submit" className="w-full mt-5" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
