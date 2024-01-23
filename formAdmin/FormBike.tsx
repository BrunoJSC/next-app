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
import { motorbikeShowSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormBike() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const form = useForm<z.infer<typeof motorbikeShowSchema>>({
    resolver: zodResolver(motorbikeShowSchema),
    defaultValues: {
      location: "",
      motorbikeBrand: "",
      motorbikeModel: "",

      plate: "",

      yearFabrication: "",

      color: "",
      fuel: "",
      km: "",
      price: "",
      description: "",
      condition: "",
      cylinder: "",
      fairing: "",
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

  const handleSubmit = async (data: z.infer<typeof motorbikeShowSchema>) => {
    await addDoc(collection(db, "motorbikes"), {
      id: Math.random().toString(),
      location: data.location,
      motorbikeBrand: data.motorbikeBrand,
      motorbikeModel: data.motorbikeModel,
      plate: data.plate,
      yearFabrication: data.yearFabrication,
      color: data.color,
      fuel: data.fuel,
      km: data.km,
      price: data.price,
      description: data.description,
      cylinder: data.cylinder,
      fairing: data.fairing,
      images: await handleUpload(),
    });

    form.reset();
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="motorbikeBrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca da moto</FormLabel>
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
            name="fairing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Freio</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o freio do veiculo"
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
                <FormLabel>Cilindro</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite quantas clindradas da moto"
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
                    placeholder="Digite a descrição da moto"
                    {...field}
                  />
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
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
