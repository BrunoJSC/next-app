"use client";

import Image from "next/image";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselComponent,
} from "./ui/carousel";

export function Carousel({ images }: { images: string[] }) {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
      <CarouselComponent
        opts={{
          align: "start",
        }}
        className="w-full max-w-screen-lg mx-auto mt-2"
      >
        <CarouselContent>
          {Array.isArray(images) && images.length > 0 && (
            <>
              {images.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:w-[400px] md:mr-4" // Ajustado para responsividade
                >
                  <div className="w-full h-[400px]">
                    <Image
                      src={images[index]}
                      alt="car"
                      width={400}
                      height={400}
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                </CarouselItem>
              ))}
              <p className="text-center text-gray-600 mt-4">
                Adicione mais imagens para visualização
              </p>
            </>
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </CarouselComponent>
    </div>
  );
}
