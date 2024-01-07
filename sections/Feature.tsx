import { Box } from "@/components/Box";
import { FEATURES } from "@/constants";

export function Feature() {
  return (
    <section className="w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-black font-poppins">
            A melhor plataforma de negociação de veículos
          </h2>

          <p className="mt-2 text-center mx-auto md:w-[648px] text-[#848484] text-base md:text-[16px] font-normal">
            A AutoNegocie revolucionou a maneira como as pessoas compram e
            vendem veículos. Como uma plataforma{" "}
            <span className="text-primary">inovadora</span>, ela se destaca por
            sua abordagem eficiente e segura de conectar{" "}
            <span className="text-primary">compradores</span> e{" "}
            <span className="text-primary">vendedores</span>.
          </p>
        </div>

        <div className="mt-8 grid md:h-[650.5px] h-auto grid-cols-1 md:grid-cols-2 gap-8 place-items-center border-b  max-w-[937px] mx-auto">
          {FEATURES.map((feature) => (
            <Box
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
