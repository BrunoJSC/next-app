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
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
