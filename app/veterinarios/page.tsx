'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Clinica {
    id: number;
    nome: string;
}

export default function Veterinarios() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const [clinicaId, setClinicaId] = useState("");
    const [clinicas, setClinicas] = useState<Clinica[]>([]); 

    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false); 

    //Buscar clínicas cadastradas
    useEffect(() => {
        async function buscarClínicas() {
            try {
                const resposta = await fetch(
                    "http://localhost:8080/clinicas"
                );

            if (!resposta.ok) {
                throw new Error("Erro ao buscar clínicas");
            }
            const dados: Clinica[] = await resposta.json();
                setClinicas(dados);

            } catch (error) {
                console.error("Erro ao carregar clínicas:", error);
                setMensagem(
                    "Não foi possível carregar as clínicas cadastradas."
                );
            }
        }

        buscarClínicas();
    }, []);

    //Cadastrar Veterinários
    async function cadastrarVeterinario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!clinicaId) {
           setMensagem("Selecione uma clínica.");
           return;
        }

        const veterinario = {
            nome,
            telefone,
            email,
            clinica: {
                id: Number(clinicaId)
            }
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
                const detalhe = await resposta.text();

                console.error("Status HTTP:", resposta.status);
                throw new Error(
                    `Erro HTTP ${resposta.status}: ${detalhe}`
                );
            }

            setMensagem("Veterinário cadastrado com sucesso!");

            setNome("");
            setTelefone("");
            setEmail("");
            setClinicaId("");

        } catch (error) {
            console.error(error);
            setMensagem(
                "Não foi possível cadastrar o veterinário. Verifique os dados."
            );
        } finally {
            setCarregando(false);
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

                    {/* Clínica */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Clínica
                            </label>

                            <select
                                value={clinicaId}
                                onChange={(e) => setClinicaId(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                            >
                                <option value="">
                                    Selecione uma clínica
                                </option>

                                {clinicas.map((clinica) => (
                                    <option
                                        key={clinica.id}
                                        value={clinica.id}
                                    >
                                        {clinica.nome}
                                    </option>
                                ))}
                            </select>

                            {clinicas.length === 0 && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Nenhuma clínica cadastrada ou disponível.
                                    Cadastre uma clínica antes de continuar.
                                </p>
                            )}
                        </div>

                    <button
                      type="submit"
                      disabled={carregando || clinicas.length === 0}
                      className="w-full rounded-lg bg-teal-700 p-3 font-bold text-white transition hover:bg-teal-800 disabled:opacity-50"
                    >
                       {carregando ? "Cadastrando..." : "Cadastrar Veterinário"}
                    </button> <br />

                </form>

                {mensagem && (
                  <p className="mt-5 rounded-lg bg-teal-50 p-4 font-medium text-teal-800">
                    {mensagem}
                  </p>
                )}

                <Link
                  href="/veterinarios/listar"
                  className="rounded-lg bg-teal-600 px-6 py-3 text-white font-semibold hover:bg-teal-700"
                >
                   Gerenciar Veterinários
                </Link>

            </div>

        </div>

       </main>
    );
}