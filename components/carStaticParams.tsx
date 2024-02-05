import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";

export async function generateStaticParams() {
  const carIds: string[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, "cars"));

    querySnapshot.forEach((doc) => {
      carIds.push(doc.id);
    });

    return {
      paths: carIds.map((id) => ({ params: { id } })),
      fallback: false,
    };
  } catch (error) {
    console.error("Erro ao buscar IDs dos carros:", error);
    return { paths: [], fallback: false };
  }
}
