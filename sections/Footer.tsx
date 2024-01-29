"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1E1E1E] relative w-full mt-20">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-16 lg:px-8 md:mt-auto ">
        <div
          className="
             w-full md:w-[60%] px-6 sm:px-24 absolute top-[-50px] left-1/2 transform -translate-x-1/2 mx-auto flex flex-col items-center gap-4 rounded-lg bg-primary p-6 sm:p-8 shadow-lg sm:flex-row sm:justify-evenly"
        >
          <h2 className={`text-xl font-semibold text-white`}>SIGA A GENTE</h2>
          <ul className="flex gap-4">
            <li>
              <Link
                href="https://www.facebook.com/CarrosUsadosABCD?mibextid=ZbWKwL"
                target="_blank"
              >
                <FacebookIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </Link>
            </li>

            <li>
              <Link
                href="https://www.instagram.com/bmzsintonia?igsh=czc0c280MzFia2k5"
                target="_blank"
              >
                <InstagramIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Fale Conosco
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  (11) 3456-3427
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  (11) 94072-3891
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  contato@autonegocie.com.br
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Institucional
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/financiamento"
                >
                  Financiamento
                </Link>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/anunciar"
                >
                  Anunciar meu veículo
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Dúvidas
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/regras"
                >
                  Regras Gerais
                </Link>
              </li>
              <li>
                <Link
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/politica-de-privacidade"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/contato"
                >
                  Sugestão de Melhorias
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Administradores
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/admin"
                >
                  Área de administração
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-white text-sm mt-24 sm:mt-32">
        <p className="px-4 sm:px-8">
          AutoNegocie - Somos um site especializado em marketing digital para
          veículos usados, atendemos as regiões de São Paulo, conforme anunciado
          no site com matriz online.
        </p>
        <p className="mt-4 sm:mt-6">
          Copyright © 2023 AutoNegocie. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
