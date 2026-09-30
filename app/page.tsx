'use client';

import Image from "next/image";
import Link from "next/link";

import { 
   PawPrint,
  Plus,
  Hospital,
  UserRound,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <header className="relative flex h-64 items-start justify-between bg-teal-700 px-10 py-10 text-white">
         
         <div className="relative z-10 flex translate-y-8 items-center gap-4">

         <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <PawPrint
            size={64}
            strokeWidth={2.5}
            className="text-white"
          />

          <Plus
          size={22}
          strokeWidth={4}
          className="absolute text-white"
          />
         </div>

          {/* Titulo */}
          <div className="flex flex-col items-start">
          <h1 className="text-4xl font-bold">
            Clínica Veterinária
          </h1>

          <p className="mt-3 text-xl">
             Sistema de gerenciamento veterinário
          </p>
          </div>
          </div>

          
         <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Perto do título */}
         <span className="absolute left-[3%] top-6 rotate-[-20deg] text-5xl opacity-30">
         🐾
         </span>

         <span className="absolute left-[22%] top-28 rotate-12 text-4xl opacity-25">
         🐾
         </span>

         <span className="absolute left-[35%] top-10 rotate-[-15deg] text-6xl opacity-30">
         🐾
         </span>

         <span className="absolute left-[40%] top-40 rotate-12 text-4xl opacity-25">
         🐾
         </span>

         {/* Meio do cabeçalho */}
         <span className="absolute left-[52%] top-20 rotate-[-25deg] text-5xl opacity-30">
         🐾
         </span>

         <span className="absolute left-[62%] top-40 rotate-12 text-6xl opacity-25">
          🐾
         </span>

         <span className="absolute left-[72%] top-12 rotate-[-15deg] text-4xl opacity-30">
          🐾
         </span>

        {/* Próximo do gatinho */}
         <span className="absolute right-[20%] top-36 rotate-12 text-5xl opacity-25">
          🐾
         </span>

         <span className="absolute right-[5%] top-8 rotate-[-20deg] text-6xl opacity-30">
          🐾
         </span>

        </div>

          <div className="absolute bottom-[-35px] right-10 z-20">
           <Image
            src="/gato.png"
            alt="Gato"
            width={280}
            height={300}
            priority
          />
         </div>
      </header>

      <section className="mx-auto max-w-5xl p-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Bem-vindo ao sistema!
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Clínicas */}
      <a
       href="/clinicas"
       className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
      >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
       <Hospital size={34} className="text-teal-700" />
      </div>

      <h3 className="text-xl font-bold text-teal-700">
        Clínicas
      </h3>

       <p className="mt-2 text-gray-600">
        Gerenciar clínicas veterinárias
       </p>

      <ArrowRight className="mt-5 text-teal-700" size={24} />
      </a>

      {/* Tutores */}
      <a
       href="/tutores"
       className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
      >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
        <UserRound size={34} className="text-blue-600" />
      </div>

       <h3 className="text-xl font-bold text-teal-700">
         Tutores
       </h3>

        <p className="mt-2 text-gray-600">
          Cadastrar e consultar tutores
        </p>

      <ArrowRight className="mt-5 text-blue-600" size={24} />
      </a>

       {/* Pacientes */}
       <a
        href="/pacientes"
        className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
        >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
      <PawPrint size={34} className="text-purple-600" />
      </div>

      <h3 className="text-xl font-bold text-teal-700">
        Pacientes
      </h3>

      <p className="mt-2 text-gray-600">
       Gerenciar animais atendidos
      </p>

      <ArrowRight className="mt-5 text-purple-600" size={24} />
      </a>

     {/* Veterinários */}
       <a
        href="/veterinarios"
        className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
      >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
       <Stethoscope size={34} className="text-orange-600" />
      </div>

      <h3 className="text-xl font-bold text-teal-700">
        Veterinários
      </h3>

      <p className="mt-2 text-gray-600">
       Gerenciar veterinários
      </p>

      <ArrowRight className="mt-5 text-orange-600" size={24} />
     </a>

      </div>
     </section>
    </main>
  );
}
