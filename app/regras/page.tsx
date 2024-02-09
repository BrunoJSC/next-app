import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full max-w-screen-xl mx-auto min-h-screen p-5 flex items-center justify-between mb-60">
      <div className="w-full md:w-[591px] h-[591px] hidden md:block">
        <Image
          src="/roles.svg"
          alt="roles"
          width={591}
          height={591}
          className="w-full h-full"
        />
      </div>
      <div className="max-w-xl">
        <h2 className="text-2xl font-bold">
          Regras gerais do site AutoNegocie
        </h2>

        <p className="text-lg mt-5">
          O site AutoNegocie.com.br, oferece exclusivamente um serviço: atua
          meramente como provedor do espaço virtual para os anúncios,não é
          responsável pela qualidade, proveniência, veracidade e informações;
          como também não se responsabiliza pelas consequências diretas ou
          indiretas que eventualmente possam corresponder a informações
          oferecidas em relação a qualidade, precauções e condições de pagamento
          dos anúncios veiculados no site.
        </p>

        <p className="text-lg mt-5">
          Atuamos como um intermediário oferecendo conhecimento e expertises
          para que o negócio se concretize de forma saudável mas Cabe ao
          anunciante e o eventual interessado determinarem as suas relações
          recíprocas sobre as condições de preços, prazo, forma de pagamento,
          entrega do bem e tudo que for inerente a negociação do bem negociado.
        </p>
      </div>
    </main>
  );
}
