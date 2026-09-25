'use client';

import { useState } from "react";
import Link from "next/link";

export default function Pacientes() {
    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [sexo, setSexo] = useState("");

    const [mensagem, setMensagem] = useState("");

    async function cadastrarPaciente(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const paciente = {
            nome,
            especie,
            raca,
            sexo,
        };

        try {
            const resposta = await fetch("http://localhost:8080/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   nome,
                   raca,
                   especie,
                   sexo, 
                }),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar paciente");
            }

            setMensagem("Paciente cadastrado com sucesso!");

            setNome("");
            setEspecie("");
            setRaca("");
            setSexo("");

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
                    Cadastro de Pacientes
                </h1>

                <p className="mb-8 text-gray-600">
                    Preencha os dados para cadastrar o paciente
                </p>

                <form onSubmit={cadastrarPaciente} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Nome do Paciente
                        </label>

                        <input 
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="w-full  rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                        placeholder="Digite o nome"
                        />
                    </div>

                     <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Espécie do Paciente
                        </label>

                        <input 
                        type="text"
                        value={especie}
                        onChange={(e) => setEspecie(e.target.value)}
                        required
                        className="w-full  rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                        placeholder="Digite a espécie"
                        />
                    </div>

                     <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Raça do Paciente
                        </label>

                        <input 
                        type="text"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                        required
                        className="w-full  rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                        placeholder="Digite a raça"
                        />
                    </div>

                     <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Sexo do Paciente
                        </label>

                        <input 
                        type="text"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        required
                        className="w-full  rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                        placeholder="Digite o sexo"
                        />
                    </div>

                    <button
                    type="submit"
                    className="w-full rounded-lg bg-teal-700 p-3 font-bold text-white transition hover:bg-teal-800"
                    >
                       Cadastrar Paciente
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