import { Banner } from "@/components/Banner";
import { FormContact } from "@/forms/FormContact";
import Image from "next/image";

export default function Contact() {
  return (
    <main className="w-full mb-48">
      <Banner>
        <Image
          src="/banner2.png"
          alt="Banner"
          fill
          className="w-full h-full object-cover -z-50 absolute inset-0"
        />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Encontramos o seu <span className="text-primary">carro ideal!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-normal text-white mt-3">
            Venha ser mais um cliente e faça parte da nossa história
          </p>
        </div>
      </Banner>

      <FormContact />
    </main>
  );
}
