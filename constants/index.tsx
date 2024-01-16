import {
  MessageCircle,
  HeartHandshake,
  BadgePercent,
  Plus,
} from "lucide-react";

export const NAV_LINK = [
  { label: "Carros", href: "/carros" },

  { label: "Motos", href: "/motos" },

  { label: "Oficina de Dicas", href: "/oficina de Dicas" },
  { label: "Lojas", href: "/lojas" },

  { label: "Contato", href: "/contato" },
];

export const ADMIN_LINK: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Carros", href: "/dashboard/criar-carro" },
  { label: "Motos", href: "/dashboard/criar-moto" },
  { label: "Contatos", href: "/dashboard/contatos" },
  { label: "Emails", href: "/dashboard/emails" },
];

export const LinksDashboard = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Criar Carro",
    href: "/dashboard/criar-carro",
  },
  {
    title: "Criar Moto",
    href: "/criar-moto",
  },
  {
    title: "Contatos",
    href: "/dashboard/contatos",
  },
  {
    title: "Emails",
    href: "/dashboard/emails",
  },
];

export const FEATURES = [
  {
    title: "Avaliação",
    description:
      "Avalie seu veículo de forma rápida e segura em nossa plataforma. É importante garantir que esteja bem conservado para analisarmos da melhor forma e chegarmos a um preço justo.",
    icon: <MessageCircle color="#fff" />,
  },

  {
    title: "Negociação",
    description:
      "Em nossa plataforma você terá uma negociação de alta qualidade, te conectamos com o comprador que procura exatamente o que o seu veículo oferece para facilitar todo o processo.",
    icon: <HeartHandshake color="#fff" />,
  },

  {
    title: "Venda",
    description:
      "Nossa equipe te acompanha e cuida de todos os passos para uma venda simplificada e segura. Tenha a disposição um atendimento qualificado para tirar todas as suas dúvidas das etapas de venda.",
    icon: <BadgePercent color="#fff" />,
  },

  {
    title: "Compra",
    description:
      "Tenha acesso a um catálogo de carros selecionados por nossa equipe com o objetivo de manter a qualidade em tudo que oferecemos a você. Temos preços abaixo do mercado e facilitamos a sua compra através de troca e financiamento. ",
    icon: <Plus color="#fff" />,
  },
];

export const announce = [
  {
    title: "Ampla Audiência de Potenciais Compradores",
    paragraph:
      "Ao anunciar seu carro no site AutoNegocie, você terá acesso a uma ampla base de potenciais compradores interessados em adquirir veículos. Isso aumenta suas chances de encontrar um comprador rapidamente e fechar um bom negócio.",
  },

  {
    title: "Simplicidade e Conveniência",
    paragraph:
      "O site AutoNegocie tem alcance nacional, o que significa que seu anúncio será visto por pessoas de diferentes regiões do país. Isso proporciona uma maior visibilidade para o seu carro e aumenta as chances de encontrar um comprador mesmo fora da sua localidade.",
  },

  {
    title: "Avaliação Transparente e Equitativa",
    paragraph:
      "O AutoNegocie oferece ferramentas de avaliação para estimar o valor do seu carro com base em critérios de mercado. Isso proporciona uma avaliação justa e transparente, ajudando você a definir um preço adequado para o seu veículo e atrair compradores que estejam dispostos a pagar o valor justo.",
  },

  {
    title: "Transações Seguras",
    paragraph:
      "O site AutoNegocie possui medidas de segurança para proteger tanto os compradores quanto os vendedores. Transações seguras e confiáveis são facilitadas por meio de mecanismos de verificação de identidade, histórico do veículo e opções de pagamento seguro, garantindo uma negociação tranquila.",
  },
];

export const finances = [
  {
    title: "Parceria com os principais bancos",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title: "Facilidade na aprovação do crédito",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title: "Buscamos a melhor taxa de juros possível",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title: "Plano CDC (plano de desconto na antecipação de parcelas)",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title: "Assinatura de contrato online",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title: "Aprovação online",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },

  {
    title:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
    paragraph:
      "Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento.",
  },
];

export const accessories = [
  { label: "Air bag", value: "Air bag" },
  { label: "Ar condicionado", value: "Ar condicionado" },
  { label: "ABS", value: "ABS" },
  { label: "Direção hidráulica", value: "Direção hidráulica" },
  { label: "Trava elétrica", value: "Trava elétrica" },
  { label: "Piloto automático", value: "Piloto automático" },
];
