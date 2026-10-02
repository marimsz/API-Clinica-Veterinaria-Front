
'use client';

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";

interface Tutor {
    id: number;
    nome: string;
}

interface Paciente {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    sexo: string;
    tutor: Tutor | null;
}

export default function ListarPacientes() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [idBusca, setIdBusca] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const [pacienteEditando, setPacienteEditando] =
        useState<Paciente | null>(null);

    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [sexo, setSexo] = useState("");

    const API = "https://api-clinica-veterinaria-4.onrender.com/pacientes";

    // Listar todos os pacientes
    async function mostrarTodos() {
        setCarregando(true);
        setMensagem("");

        try {
            const resposta = await fetch(API);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar pacientes");
            }

            const dados: Paciente[] = await resposta.json();
            setPacientes(dados);

        } catch (err) {
            console.error("Erro ao carregar pacientes:", err);
            setMensagem("Não foi possível carregar os pacientes.");
        } finally {
            setCarregando(false);
        }
    }

    // Buscar paciente pelo ID
    async function buscarPaciente() {
        if (!idBusca.trim()) {
            setMensagem("Digite o ID do paciente.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        try {
            const resposta = await fetch(`${API}/${idBusca}`);

            if (resposta.status === 404) {
                setPacientes([]);
                setMensagem("Paciente não encontrado.");
                return;
            }

            if (!resposta.ok) {
                throw new Error("Erro ao buscar paciente");
            }

            const paciente: Paciente = await resposta.json();
            setPacientes([paciente]);

        } catch (err) {
            console.error("Erro ao buscar paciente:", err);
            setMensagem("Não foi possível buscar o paciente.");
        } finally {
            setCarregando(false);
        }
    }

    // Excluir paciente
    async function excluirPaciente(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este paciente?"
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(`${API}/${id}`, {
                method: "DELETE",
            });

            if (!resposta.ok) {
                const detalhe = await resposta.text();
                console.error("Erro do backend:", detalhe);

                throw new Error(`Erro HTTP ${resposta.status}`);
            }

            setMensagem("Paciente excluído com sucesso!");
            setPacienteEditando(null);

            await mostrarTodos();

        } catch (err) {
            console.error("Erro ao excluir paciente:", err);
            setMensagem(
                "Não foi possível excluir o paciente. Verifique o erro no backend."
            );
        }
    }

    // Abrir formulário de edição
    function abrirEdicao(paciente: Paciente) {
        setPacienteEditando(paciente);
        setNome(paciente.nome);
        setEspecie(paciente.especie);
        setRaca(paciente.raca);
        setSexo(paciente.sexo);
        setMensagem("");
    }

    // Modificar paciente
    async function modificarPaciente(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!pacienteEditando) return;

        const pacienteAtualizado = {
            nome,
            especie,
            raca,
            sexo,
        };

        try {
            const resposta = await fetch(
                `${API}/${pacienteEditando.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pacienteAtualizado),
                }
            );

            if (!resposta.ok) {
                const detalhe = await resposta.text();
                console.error("Erro do backend:", detalhe);

                throw new Error("Erro ao modificar paciente");
            }

            setMensagem("Paciente modificado com sucesso!");
            setPacienteEditando(null);

            await mostrarTodos();

        } catch (err) {
            console.error("Erro ao modificar paciente:", err);
            setMensagem("Não foi possível modificar o paciente.");
        }
    }

    useEffect(() => {
        mostrarTodos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-md">

            <Link
              href="/"
              className="mb-6 inline-block font-semibold text-teal-700 hover:underline"
            >
              ← Voltar ao início
            </Link>

                {/* Título e botão Novo */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-teal-700">
                        Gerenciar Pacientes
                    </h1>

                    <Link
                        href="/pacientes"
                        className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
                    >
                        + Novo Paciente
                    </Link>
                </div>

                {/* Busca por ID */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <input
                        type="number"
                        placeholder="Digite o ID do paciente"
                        value={idBusca}
                        onChange={(e) => setIdBusca(e.target.value)}
                        className="w-full max-w-xs rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-500"
                    />

                    <button
                        type="button"
                        onClick={buscarPaciente}
                        className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
                    >
                        Buscar
                    </button>

                    <button
                        type="button"
                        onClick={mostrarTodos}
                        className="rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
                    >
                        Listar Todos
                    </button>
                </div>

                {/* Mensagem */}
                {mensagem && (
                    <p className="mb-4 rounded-lg bg-gray-100 p-3 text-gray-700">
                        {mensagem}
                    </p>
                )}

                {/* Tabela */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">

                        <thead>
                            <tr className="bg-teal-700 text-white">
                                <th className="p-3">ID</th>
                                <th className="p-3">Nome</th>
                                <th className="p-3">Espécie</th>
                                <th className="p-3">Raça</th>
                                <th className="p-3">Sexo</th>
                                <th className="p-3">Tutor</th>
                                <th className="p-3 text-center">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        Carregando pacientes...
                                    </td>
                                </tr>
                            ) : pacientes.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        Nenhum paciente encontrado.
                                    </td>
                                </tr>
                            ) : (
                                pacientes.map((paciente) => (
                                    <tr
                                        key={paciente.id}
                                        className="border-b border-gray-200 transition hover:bg-gray-50"
                                    >
                                        <td className="p-3 text-gray-900">
                                            {paciente.id}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {paciente.nome}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {paciente.especie}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {paciente.raca}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {paciente.sexo}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {paciente.tutor?.nome ?? "Sem tutor"}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => abrirEdicao(paciente)}
                                                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                                                >
                                                    Modificar
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => excluirPaciente(paciente.id)}
                                                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                                                >
                                                    Excluir
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Formulário de edição */}
                {pacienteEditando && (
                    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">

                        <h2 className="mb-6 text-2xl font-bold text-teal-700">
                            Modificar Paciente
                        </h2>

                        <form
                            onSubmit={modificarPaciente}
                            className="space-y-4"
                        >

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Espécie
                                </label>

                                <input
                                    type="text"
                                    value={especie}
                                    onChange={(e) => setEspecie(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Raça
                                </label>

                                <input
                                    type="text"
                                    value={raca}
                                    onChange={(e) => setRaca(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Sexo
                                </label>

                                <select
                                    value={sexo}
                                    onChange={(e) => setSexo(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-500"
                                >
                                    <option value="">
                                        Selecione o sexo
                                    </option>
                                    <option value="MACHO">Macho</option>
                                    <option value="FEMEA">Fêmea</option>
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
                                >
                                    Salvar Alterações
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPacienteEditando(null)}
                                    className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}