'use client';

import { useState } from "react";
import Link from "next/link";


export default function Clinicas() {
    const [nome, setNome ] = useState("");
    const [cnpj, setCnpj ] = useState("");
    const [telefone, setTelefone ] = useState("");
    const [email, setEmail ] = useState("");
    const [endereco, setEndereco ] = useState("");

    const [mensagem, setMensagem ] = useState("");

    async function cadastrarClinica(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const clinica = {
            nome,
            cnpj,
            telefone,
            email,
            endereco,
        };
    try {
        const resposta = await fetch("https://api-clinica-veterinaria-4.onrender.com/clinicas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clinica)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar clínica");
        }

        setMensagem("Clínica cadastrada com sucesso!");

        setNome("");
        setCnpj("");
        setTelefone("");
        setEmail("");
        setEndereco("");

    } catch (error) {
        console.error(error);
        setMensagem("Não foi possível cadastrar")
    }
  }

  return (
     <main className="min-h-screen bg-gray-100 p-8">

     <div className="mx-auto max-w-3xl">

      <Link
      href="/"
      className="mb-6 inline-block font-semibold text-teal-700 hover:underline"
      >
         ← Voltar ao início
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold text-teal-700">
            Cadastro de Clínicas
        </h1>

        <p className="mb-8 text-gray-600">
            Preencha os dados para cadastrar uma clínica veterinária
        </p>

        <form onSubmit={cadastrarClinica} className="space-y-5" >

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Nome da Clínica
                </label>

                <input 
                 type="text" 
                 value={nome}
                 onChange={(e) => setNome(e.target.value)}
                 required
                 className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                 placeholder="Digite o nome da clínica"
                 />
            </div>

             <div>
                <label className="mb-2 block font-medium text-gray-700">
                    CNPJ
                </label>

                <input 
                 type="text" 
                 value={cnpj}
                 onChange={(e) => setCnpj(e.target.value)}
                 required
                 className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                 placeholder="Digite o cnpj"
                 />
            </div>

             <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Telefone
                </label>

                <input 
                 type="text" 
                 value={telefone}
                 onChange={(e) => setTelefone(e.target.value)}
                 required
                 className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                 placeholder="Digite o telefone"
                 />
            </div>

             <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Email
                </label>

                <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                 placeholder="Digite o e-mail"
                 />
            </div>

             <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Endereço
                </label>

                <input 
                 type="text" 
                 value={endereco}
                 onChange={(e) => setEndereco(e.target.value)}
                 required
                 className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                 placeholder="Digite o endereco"
                 />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-700 p-3 font-bold text-white transition hover:bg-teal-800"
            >
                Cadastrar Clínica
            </button> <br />

        </form>

        {mensagem && (
            <p className="mt-5 rounded-lg bg-teal-50 p-4 font-medium text-teal-800">
               {mensagem}
            </p>
        )}

        <Link
          href="/clinicas/listar"
          className="rounded-lg bg-teal-700 p-3 font-bold text-white hover:bg-teal-800"
        >
          Listar Clínicas
        </Link>

 
      </div>

     </div>

     </main>
  );

}