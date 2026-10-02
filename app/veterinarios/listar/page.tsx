'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Clinica {
    id: number;
    nome: string;
}

interface Veterinario {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    clinica: Clinica | null
}

export default function ListarVeterinarios() {
    const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
    const [idBusca, setIdBusca] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const [veterinarioEditando, setVeterinarioEditando] =
        useState<Veterinario | null>(null);

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [clinicas, setClinicas] = useState<Clinica[]>([]);
    const [clinicaId, setClinicaId] = useState("");

    const API = "https://api-clinica-veterinaria-4.onrender.com/veterinarios";

    async function mostrarTodos() {
        setCarregando(true);
        setMensagem("");

        try {
            const resposta = await fetch(API);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar veterinários");
            }

            const dados: Veterinario[] = await resposta.json();
            setVeterinarios(dados);

        } catch (err) {
            console.error("Erro ao carregar veterinários:", err);
            setMensagem("Não foi possível carregar os veterinários.");
        } finally {
            setCarregando(false);
        }
    }

    async function buscarVeterinario() {
        if (!idBusca.trim()) {
            setMensagem("Digite o ID do veterinário.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        try {
            const resposta = await fetch(`${API}/${idBusca}`);

            if (resposta.status === 404) {
                setVeterinarios([]);
                setMensagem("Veterinário não encontrado.");
                return;
            }

            if (!resposta.ok) {
                throw new Error("Erro ao buscar veterinário");
            }

            const veterinario: Veterinario = await resposta.json();
            setVeterinarios([veterinario]);

        } catch (err) {
            console.error("Erro ao buscar veterinário:", err);
            setMensagem("Não foi possível buscar o veterinário.");
        } finally {
            setCarregando(false);
        }
    }

    async function excluirVeterinario(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este veterinário?"
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

            setMensagem("Veterinário excluído com sucesso!");
            setVeterinarioEditando(null);

            await mostrarTodos();

        } catch (err) {
            console.error("Erro ao excluir veterinário:", err);
            setMensagem(
                "Não foi possível excluir o veterinário. Verifique se existem atendimentos vinculados."
            );
        }
    }

    function abrirEdicao(veterinario: Veterinario) {
        setVeterinarioEditando(veterinario);
        setNome(veterinario.nome);
        setTelefone(veterinario.telefone);
        setEmail(veterinario.email);

        setClinicaId(
            veterinario.clinica
            ? String(veterinario.clinica.id)
            : ""
        );

        setMensagem("");
    }

    async function modificarVeterinario(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!veterinarioEditando) return;

        const veterinarioAtualizado = {
            nome,
            telefone,
            email,
            clinica: {
                id: Number(clinicaId),
            },
        };

        try {
            const resposta = await fetch(
                `${API}/${veterinarioEditando.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(veterinarioAtualizado),
                }
            );

            if (!resposta.ok) {
                const detalhe = await resposta.text();
                console.error("Erro do backend:", detalhe);

                throw new Error("Erro ao modificar veterinário");
            }

            setMensagem("Veterinário modificado com sucesso!");
            setVeterinarioEditando(null);

            await mostrarTodos();

        } catch (err) {
            console.error("Erro ao modificar veterinário:", err);
            setMensagem("Não foi possível modificar o veterinário.");
        }
    }

    async function mostrarClinicas() {
        try {
            const resposta = await fetch("https://api-clinica-veterinaria-4.onrender.com/clinicas");

            if (!resposta.ok) {
                throw new Error("Erro ao buscar clínicas");
            }

            const dados: Clinica[] = await resposta.json();
            setClinicas(dados);

        } catch (err) {
            console.error("Erro ao carregar clínicas:", err);
            setMensagem("Não foi possível carregar as clínicas.");
        }
    }

    useEffect(() => {
        mostrarTodos();
        mostrarClinicas();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <Link
                    href="/"
                    className="mb-6 inline-block font-semibold text-teal-700 hover:underline"
                >
                    ← Voltar ao início
                </Link>

                <div className="rounded-2xl bg-white p-8 shadow-lg">

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-teal-700">
                                Veterinários Cadastrados
                            </h1>

                            <p className="text-gray-600">
                                Consulte, modifique ou exclua os veterinários.
                            </p>
                        </div>

                        <Link
                            href="/veterinarios"
                            className="rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800"
                        >
                            + Novo Veterinário
                        </Link>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-3">
                        <input
                            type="number"
                            value={idBusca}
                            onChange={(e) => setIdBusca(e.target.value)}
                            placeholder="Digite o ID do veterinário"
                            className="w-full max-w-xs rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                        />

                        <button
                            onClick={buscarVeterinario}
                            className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
                        >
                            Buscar
                        </button>

                        <button
                            onClick={() => {
                                setIdBusca("");
                                mostrarTodos();
                            }}
                            className="rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-800 hover:bg-gray-300"
                        >
                            Mostrar Todos
                        </button>
                    </div>

                    {mensagem && (
                        <p className="mb-4 rounded-lg bg-teal-50 p-3 font-medium text-teal-800">
                            {mensagem}
                        </p>
                    )}

                    {carregando ? (
                        <p className="py-6 text-center text-gray-600">
                            Carregando veterinários...
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-teal-700 text-white">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Nome</th>
                                        <th className="p-3">Telefone</th>
                                        <th className="p-3">E-mail</th>
                                        <th className="p-3">Clínica</th>
                                        <th className="p-3">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {veterinarios.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="border-b p-6 text-center text-gray-500"
                                            >
                                                Nenhum veterinário encontrado.
                                            </td>
                                        </tr>
                                    ) : (
                                        veterinarios.map((veterinario) => (
                                            <tr
                                                key={veterinario.id}
                                                className="border-b border-gray-200 text-gray-800 hover:bg-gray-50"
                                            >
                                                <td className="p-3">
                                                    {veterinario.id}
                                                </td>

                                                <td className="p-3">
                                                    {veterinario.nome}
                                                </td>

                                                <td className="p-3">
                                                    {veterinario.telefone}
                                                </td>

                                                <td className="p-3">
                                                    {veterinario.email}
                                                </td>

                                                <td className="p-3">
                                                 {veterinario.clinica?.nome ?? "Sem clínica"}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            onClick={() =>
                                                                abrirEdicao(veterinario)
                                                            }
                                                            className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                                        >
                                                            Modificar
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                excluirVeterinario(veterinario.id)
                                                            }
                                                            className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
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
                    )}

                    {veterinarioEditando && (
                        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                            <h2 className="mb-5 text-2xl font-bold text-teal-700">
                                Modificar Veterinário - ID {veterinarioEditando.id}
                            </h2>

                            <form
                                onSubmit={modificarVeterinario}
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
                                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
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
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium text-gray-700">
                                        E-mail
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                                    />
                                </div>

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
                                        <option value="">Selecione uma clínica</option>

                                        {clinicas.map((clinica) => (
                                            <option key={clinica.id} value={clinica.id}>
                                                {clinica.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
                                    >
                                        Salvar Alterações
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setVeterinarioEditando(null)}
                                        className="rounded-lg bg-gray-300 px-6 py-3 font-bold text-gray-800 hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}