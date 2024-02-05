import { db } from "@/firebase";
import { ICar, IMotorbike } from "@/types";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const getDataMotorbikes = async (): Promise<IMotorbike[]> => {
  try {
    const motorbikes: IMotorbike[] = [];

    const querySnapshot = await getDocs(collection(db, "cars"));

    for (const doc of querySnapshot.docs) {
      const motorbikeData: DocumentData = doc.data();
      const motorbike: IMotorbike = {
        ...motorbikeData,
        id: doc.id,
      } as IMotorbike;
      motorbikes.push(motorbike);
    }

    return motorbikes;
  } catch (error) {
    console.error("Erro ao buscar os carros:", error);
    throw error;
  }
};
