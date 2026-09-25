'use client';

import { useState } from "react";
import Link from "next/link";

export default function Veterinarios() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const [mensagem, setMensagem] = useState("");

    async function cadastrarVeterinario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const veterinario = {
            nome,
            telefone,
            email,
        };
        try {
            const resposta = await fetch("http://localhost:8080/veterinarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(veterinario)
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar veterinário");
            }

            setMensagem("Veterinário cadastrado com sucesso!");

            setNome("");
            setTelefone("");
            setEmail("");

        } catch (error) {
           console.error(error);
           setMensagem("Não foi possível cadastrar")
        }
    }

    return (
       <main className="min-h-screen bg-gray-100 p-">

        <div className="mx-auto max-w-3xl">

            <Link
            href="/"
            className="mb-6 inline-block font-semibold text-teal-700 hover:underline"
            >
                ← Voltar ao início
            </Link>

            <div className="rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-3xl font-bold text-teal-700">
                    Cadastro de Veterinários
                </h1>

                <p className="mb-8 text-gray-600">
                   Preencha os dados para cadastrar um veterinário
                </p>

                <form onSubmit={cadastrarVeterinario} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Nome do Veterinário
                        </label>

                        <input 
                          type="text" 
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                          placeholder="Digite o nome"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Telefone do Veterinário
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
                            E-mail do Veterinário
                        </label>

                        <input 
                          type="text" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                          placeholder="Digite o e-mail"
                        />
                    </div>

                    <button
                    type="submit"
                    className="w-full rounded-lg bg-teal-700 p-3 font-bold text-white transition hover:bg-teal-800 "
                    >
                       Cadastrar Veterinário
                    </button>

                </form>

                {mensagem && (
                  <p className="mt-5 rounded-lg bg-teal-50 p-4 font-medium text-teal-800">
                    {mensagem}
                  </p>
                )}

            </div>

        </div>

       </main>
    );
}