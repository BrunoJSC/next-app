// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { app } from "@/firebase";
// import { motorbikeShowSchema } from "@/validation/schemas";
// import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// export function FormEditMotorbike({ carId }: { carId: string }) {
//   const form = useForm();
//   const getCarData = async () => {
//     const db = getFirestore(app);
//     const carRef = doc(db, "cars", carId);

//     try {
//       const carSnapshot = await getDoc(carRef);

//       if (carSnapshot.exists()) {
//         const carData = carSnapshot.data();
//         // Usando form.setValue para preencher os dados no formulário
//         form.setValue("motorbikeModel", carData.motorbikeModel);
//         // Adicione mais linhas conforme necessário para outros campos
//       }
//     } catch (error) {
//       console.error("Erro ao buscar informações do carro:", error);
//     }
//   };

//   const onSubmit = async (data: z.infer<typeof motorbikeShowSchema>) => {
//     const db = getFirestore(app);
//     const carRef = doc(db, "cars", carId);

//     try {
//       await updateDoc(carRef, data);
//     } catch (error) {
//       console.error("Erro ao atualizar as informações do carro:", error);
//     }
//   };

//   useEffect(() => {
//     getCarData();
//   }, [carId, getCarData]);

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <Label htmlFor="motorbikeModel">Modelo</Label>
//           <Input type="text" {...form.register("motorbikeModel")} />
//         </form>
//       </Form>
//     </div>
//   );
// }
