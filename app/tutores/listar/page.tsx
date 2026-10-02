'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Tutor {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}

    export default function ListarTutores() {
        const [tutores, setTutores] = useState<Tutor[]>([]);
        const [idBusca, setIdBusca] = useState("");
        const[mensagem, setMensagem] = useState("");
        const [carregando, setCarregando] = useState(true);
       
        const [tutorEditando, setTutorEditando] = useState<Tutor | null>(null);
    
        const [nome, setNome] = useState("");
        const [cpf, setCpf] = useState("");
        const [telefone, setTelefone] = useState("");
        const [email, setEmail] = useState("");
    
        const API = "https://api-clinica-veterinaria-4.onrender.com/tutores";

    async function mostrarTodos() {
        setCarregando(true);
        setMensagem("");

        try {
            const resposta = await fetch(API);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar tutores");
            }

            const dados: Tutor[] = await resposta.json();
            setTutores(dados);
       } catch (err) {
            console.error("Erro ao carregar tutores:", err);
            setMensagem("Não foi possível carregar os tutores.");
       } finally {
            setCarregando(false);
       }
    }

    async function buscarTutor() {
    if (!idBusca.trim()) {
        setMensagem("Digite o ID do tutor.");
        return;
    }

    setCarregando(true);
    setMensagem("");

    try {
        const resposta = await fetch(`${API}/${idBusca}`);

        if (resposta.status === 404) {
            setTutores([]);
            setMensagem("Tutor não encontrado.");
            return;
        }

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const tutor: Tutor = await resposta.json();
        setTutores([tutor]);

    } catch (err) {
        console.error("Erro ao buscar tutor:", err);
        setMensagem("Não foi possível buscar o tutor.");
    } finally {
        setCarregando(false);
    }
}

async function excluirTutor(id: number) {
    const confirmar = window.confirm(
        "Tem certeza que deseja excluir este tutor?"
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!resposta.ok) {
            const detalhe = await resposta.text();

            console.error("Erro do backend:", detalhe);

            throw new Error(
                `Erro HTTP ${resposta.status}: ${detalhe}`
            );
        }

        setMensagem("Tutor excluído com sucesso!");
        await mostrarTodos();

    } catch (err) {
        console.error("Erro ao excluir tutor:", err);

        setMensagem(
            "Não foi possível excluir o tutor. Verifique o erro no terminal do backend."
        );
    }
}

function abrirEdicao(tutor: Tutor) {
    setTutorEditando(tutor);
    setNome(tutor.nome);
    setCpf(tutor.cpf);
    setTelefone(tutor.telefone);
    setEmail(tutor.email);
}

async function modificarTutor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!tutorEditando) return;
    
    const tutorAtualizado = {
        nome,
        cpf,
        telefone,
        email,
    };

    try {
        const resposta = await fetch(`${API}/${tutorEditando.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tutorAtualizado),
        });

        if (!resposta.ok) {
            throw new Error("Erro ao modificar tutor");
        }

        setMensagem("Tutor modificado com sucesso!");
        setTutorEditando(null);

        await mostrarTodos();

    } catch (error) {
        console.error(error);
        setMensagem("Não foi possível modificar o tutor")
    }
    
}

useEffect(() => {
    mostrarTodos();
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
                            Tutores Cadastrados
                        </h1>

                        <p className="text-gray-600">
                             Consulte, modifique ou exclua os tutores.
                        </p>

                    </div>

                     <Link
                        href="/tutores"
                        className="rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800"
                        >
                        + Novo Tutor
                    </Link>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <input
                        type="number"
                        value={idBusca}
                        onChange={(e) => setIdBusca(e.target.value)}
                        placeholder="Digite o ID do tutor"
                        className="w-full max-w-xs rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-teal-600"
                    />

                    <button
                        onClick={buscarTutor}
                        className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white transition hover:bg-teal-800"
                    >
                        Buscar
                    </button>

                    <button
                    onClick={() => {
                        setIdBusca("");
                        mostrarTodos();
                    }}
                    className="rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-800 transition hover:bg-gray-300"
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
                     Carregando tutores...
                </p>
                ) : (
                <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-teal-700 text-white">
                        <th className="p-3">ID</th>
                        <th className="p-3">Nome</th>
                        <th className="p-3">CPF</th>
                        <th className="p-3">Telefone</th>
                        <th className="p-3">E-mail</th>
                        <th className="p-3">Ações</th>
                    </tr>
                </thead>

                 <tbody>
                    {tutores.length === 0 ? (
                <tr>
                    <td
                     colSpan={6}
                     className="border-b p-6 text-center text-gray-500"
                    >
                        Nenhum tutor encontrado.
                    </td>
                </tr>
                ) : (
                    tutores.map((tutor) => (
                    <tr
                    key={tutor.id}
                    className="border-b border-gray-200 text-gray-800 hover:bg-gray-50"
                    >
                        <td className="p-3">{tutor.id}</td>
                        <td className="p-3">{tutor.nome}</td>
                        <td className="p-3">{tutor.cpf}</td>
                        <td className="p-3">{tutor.telefone}</td>
                        <td className="p-3">{tutor.email}</td>

                    <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                    <button
                         onClick={() => abrirEdicao(tutor)}
                         className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                         Modificar
                    </button>

                    <button
                        onClick={() => excluirTutor(tutor.id)}
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

                {tutorEditando && (
                    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <h2 className="mb-5 text-2xl font-bold text-teal-700">
                            Modificar Tutor - ID {tutorEditando.id}
                      </h2>

                            <form
                                onSubmit={modificarTutor}
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
                                        CPF
                                    </label>
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
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

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
                                    >
                                        Salvar Alterações
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setTutorEditando(null)}
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
)

}