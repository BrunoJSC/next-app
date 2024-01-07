import { Summary } from "@/components/Summary";

export function FAQ() {
  return (
    <section>
      <h2 className="text-[38px] text-black font-bold text-center mt-10">
        Perguntas Frequentes sobre a plataforma
      </h2>

      <div className="container mx-auto max-w-[937px] border-b">
        <Summary
          title="1. Quais são os horários de funcionamento da  concessionária?"
          text="Nossos atendentes estão disponíveis 24 horas por dia, 7 dias por semana."
        />

        <Summary
          title="2. Como funciona a venda do veículo pela Autonegocie ?"
          text="Realizamos uma avaliação do cadastro do seu veículo, definimos um preço com base em tudo o que seu carro oferece no momento, e damos início ao processo de anúncio na plataforma utilizando as principais ferramentas de marketing digital. A Autonegocie possui uma equipe altamente qualificada para o atendimento de todos os leads, direcionando as melhores ofertas de compra, e cuidando de toda a venda."
        />

        <Summary
          title="3. É seguro anunciar meu veículo com a Autonegocie?"
          text="Além da nossa equipe que possui grande experiência no ramo de veículos, utilizamos uma tecnologia que analisa e elimina qualquer tipo de fraude, evitando golpes no processo de negociação."
        />

        <Summary
          title="4. Qual o prazo médio para vender um veículo com a Autonegocie?"
          text="Veículos de bom comércio são vendidos em um prazo médio de 10 a 15 dias."
        />

        <Summary
          title="5. Preciso pagar algum valor para a plataforma ?"
          text="Sim, temos um valor de comissão que nos ajuda a manter toda a qualidade no processo de compra e venda conosco, isso será combinado durante a negociação e pago apenas após a venda do seu veículo."
        />
      </div>
    </section>
  );
}
