"use client";

import { Card } from "@/components/ui/card";
import { AuthContext } from "@/context/auth";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return redirect("/");
  }

  return (
    <div>
      <section>
        <div>
          <h1 className="text-3xl font-bold text-black text-center mt-1">
            Bem vindo ao painel de controle
          </h1>

          <p className="text-lg text-black text-center mt-1">
            Aqui você pode gerenciar todos os seus carros e motos e anuncia-los
            na nossa plataforma.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 p-5">
          <Card>
            <h1 className="text-3xl font-bold text-black text-center mt-1">
              Como usar a plataforma ?
            </h1>
            <div className="text-lg text-black p-2">
              <p className="text-lg text-black mt-1 mb-4">
                Registro Simples: Comece criando sua conta AutoNegocie. O
                registro é rápido e fácil, permitindo que você acesse uma
                variedade de recursos personalizados.
              </p>
              <p>
                Pesquisa Avançada: Utilize nossas poderosas ferramentas de
                pesquisa para encontrar o carro dos seus sonhos. Refine sua
                busca por marca, modelo, ano e outros critérios específicos.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
