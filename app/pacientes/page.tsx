'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface Tutor {
    id: number,
    nome: string;
}

export default function Pacientes() {
    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [sexo, setSexo] = useState("");
    const [tutorId, setTutorId] = useState("");

    const [tutores, setTutores] = useState<Tutor[]>([]);
    const [mensagem, setMensagem] = useState("");

     // Carregar tutores cadastrados
    useEffect(() => {
        async function carregarTutores() {
            try {
                const resposta = await fetch(
                    "https://api-clinica-veterinaria-4.onrender.com/tutores"
                );

                if (!resposta.ok) {
                    throw new Error("Erro ao carregar tutores");
                }

                const dados = await resposta.json();
                setTutores(dados);
            } catch (error) {
                console.error(error);
                setMensagem("Não foi possível carregar os tutores.");
            }
        }

        carregarTutores();
    }, []);

    async function cadastrarPaciente(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const paciente = {
            nome,
            especie,
            raca,
            sexo,
            tutor: {
                id: Number(tutorId)
            }
        };

        try {
            const resposta = await fetch("https://api-clinica-veterinaria-4.onrender.com/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paciente),
            });

           if (!resposta.ok) {
                const erro = await resposta.text();

                console.error("ERRO DO BACKEND:", resposta.status, erro);

                setMensagem(`Erro ${resposta.status}: ${erro}`);
                return;
            }

            setMensagem("Paciente cadastrado com sucesso!");

            setNome("");
            setEspecie("");
            setRaca("");
            setSexo("");
            setTutorId("");

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

                     {/* Seleção do tutor */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Tutor do Paciente
                            </label>

                            <select
                                value={tutorId}
                                onChange={(e) => setTutorId(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                            >
                                <option value="">
                                    Selecione um tutor
                                </option>

                                {tutores.map((tutor) => (
                                    <option
                                        key={tutor.id}
                                        value={tutor.id}
                                    >
                                        {tutor.nome} - ID: {tutor.id}
                                    </option>
                                ))}
                            </select>

                            {tutores.length === 0 && (
                                <p className="mt-2 text-sm text-red-600">
                                    Nenhum tutor encontrado. Cadastre um tutor primeiro.
                                </p>
                            )}
                        </div>

                    <button
                    type="submit"
                    className="w-full rounded-lg bg-teal-700 p-3 font-bold text-white transition hover:bg-teal-800"
                    >
                       Cadastrar Paciente
                    </button> <br />

                </form>

                {mensagem && (
                    <p className="mt-5 rounded-lg bg-teal-50 p-4 font-medium text-teal-800">
                        {mensagem}
                    </p>
                )}

                <Link
                   href="/pacientes/listar"
                   className="rounded-lg bg-teal-700 p-3 font-bold text-white hover:bg-teal-800"
                >
                  Gerenciar Pacientes
                </Link>

             </div>

            </div>

        </main>
    );
}