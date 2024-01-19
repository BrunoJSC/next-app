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
    <section className="min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-black text-center mt-1">
          Bem vindo ao painel de controle
        </h1>

        <p className="text-lg text-black text-center mt-1">
          Aqui você pode gerenciar todos os seus carros e motos e anuncia-los na
          nossa plataforma.
        </p>
      </div>
    </section>
  );
}
