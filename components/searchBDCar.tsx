import { db } from "@/firebase";
import { ICar } from "@/types";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const getDataCars = async (): Promise<ICar[]> => {
  try {
    const cars: ICar[] = [];

    const querySnapshot = await getDocs(collection(db, "cars"));

    for (const doc of querySnapshot.docs) {
      const carData: DocumentData = doc.data();
      const car: ICar = { ...carData, id: doc.id } as ICar;
      cars.push(car);
    }

    return cars;
  } catch (error) {
    console.error("Erro ao buscar os carros:", error);
    throw error;
  }
};
