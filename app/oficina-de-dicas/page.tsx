import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const articles = [
  {
    titulo: "Carros Usados Automáticos por Menos de 35 Mil",
    link: "https://www.icarros.com.br/noticias/top-10/8-carros-usados-automaticos-pormenos-de-r$-35-mil/22468.html",
    paragraph:
      "Com o preço dos carros 0km em alta, fica difícil achar alguma opção que caiba no bolso, ainda mais se o desejo for por um modelo com câmbio automático.",
  },
  {
    titulo: "7 Carros com Teto Solar que Você Compra com até R$ 30 Mil",
    link: "https://www.mobiauto.com.br/revista/7-carros-com-teto-solar-que-vocecompra-com-ate-r-30-mil/2838",
    paragraph:
      "Lista tem desde o famoso Fiat Stilo com seu teto Sky Window dividido em cinco lâminas até o Citroën C3 Solaris",
  },
  {
    titulo: "Os cinco carros mais baratos do Brasil em 2024",
    link: "https://www.mobiauto.com.br/revista/os-cinco-carros-mais-baratos-do-brasil-em-2024/3861",
    paragraph:
      "Dominada por hatches, lista parte de R$ 69.990 e tem subcompactos e compactos",
  },
  {
    titulo: "Veja as motos trail mais vendidas do Brasil",
    link: "https://www.mobiauto.com.br/revista/veja-as-motos-trail-mais-vendidas-do-brasil/3817",
    paragraph:
      "Versáteis e muitas vezes usando a mecânica já conhecida de suas irmãs urbanas, as motos para todo-o-terreno são preferidas por uma série de fatores, entenda.",
  },
  {
    titulo: "Veja quais os 5 SUVs compactos mais baratos do Brasil",
    link: "https://www.mobiauto.com.br/revista/veja-quais-os-5-suvs-compactos-mais-baratos-do-brasil/3815",
    paragraph:
      "Jeep Renegade ficou mais barato e agora sai por R$ 118.290, mas pode chegar a R$ 102.900 para PCD",
  },
  {
    titulo: "Como escolher a moto certa?",
    link: "https://www.mobiauto.com.br/revista/como-escolher-a-moto-certa/3799",
    paragraph:
      "Acertar na compra de um sapato ou de um tênis já é difícil, imagine escolher a motocicleta certinha para aquilo que você idealiza fazer: trabalho, lazer, aventura, entre outros",
  },
];

console.log(articles);

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black text-center mt-5">
          Artigos
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {articles.map((article) => (
          <Link href={article.link ?? ""} key={article.titulo}>
            <Card>
              <CardHeader>
                <CardTitle>{article.titulo}</CardTitle>
                <CardDescription>{article.paragraph}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
