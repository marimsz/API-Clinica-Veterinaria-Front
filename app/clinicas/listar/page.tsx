'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Clinica {
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
    email: string;
    endereco: string;
}

export default function ListarClinicas() {
    const [clinicas, setClinicas] = useState<Clinica[]>([]);
    const [idBusca, setIdBusca] = useState("");
    const [clinicaSelecionada, setClinicaSelecionada] = useState<Clinica | null>(null);

    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");

    const [carregando, setCarregando] = useState(true);
    const[mensagem, setMensagem] = useState("");

    const API = "https://api-clinica-veterinaria-4.onrender.com/clinicas";

    async function carregarClinicas() {
        try {
            setCarregando(true);

            const resposta = await fetch(API);

            if (!resposta.ok) {
                throw new Error("Erro ao carregar clínicas");
            }

            const dados: Clinica[] = await resposta.json();
            setClinicas(dados);
        } catch (error) {
          console.error(error);
          setMensagem("Não foi possível carregar as clínicas.");  
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarClinicas();
    }, []);

    //Buscar pelo ID
        async function buscarPorId() {
            setMensagem("");

            if (!idBusca.trim()) {
                setMensagem("Digite o ID da clínica.");
                return
            }

            try {
                const resposta = await fetch(`${API}/${idBusca}`);

                if (resposta.status === 404) {
                   setMensagem("Clínica não encontrada");
                   return;
                }

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar clínica.");
                }

                const dados: Clinica = await resposta.json();

                setClinicas([dados]);
                setMensagem(`Clínica ${dados.id} encontrada.`);
            } catch (error) {
                console.error(error);
                setMensagem("Não foi possível buscar a clínica.");
            }            
        }

        //Restaurar Lista Completa
        function mostrarTodas() {
            setIdBusca("");
            setMensagem("");
            carregarClinicas();
        }

        //Modificar Clinica
        function modificarClinica(clinica: Clinica) {
            setClinicaSelecionada(clinica);

            setNome(clinica.nome);
            setCnpj(clinica.cnpj);
            setTelefone(clinica.telefone);
            setEmail(clinica.email);
            setEndereco(clinica.endereco);

            setMensagem("");
        }

        //Salvar Alterações
        async function salvarAlteracoes(
            e: React.FormEvent<HTMLFormElement>
        ) {
            e.preventDefault();

            if (!clinicaSelecionada) return;
            
            const dadosAtualizados = {
                nome,
                cnpj,
                telefone,
                email,
                endereco,
            };
            try {
                const resposta = await fetch(
                    `${API}/${clinicaSelecionada.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dadosAtualizados),

                    }
                );

                if (!resposta.ok) {
                    throw new Error("Erro ao modificar clínica."); 
                }

                setMensagem("Clínica modificada com sucesso!");
                setClinicaSelecionada(null);

                await carregarClinicas();
            } catch (error) {
                console.error(error);
                setMensagem("Não foi possível modificar a clínica.");

            }
        }   
        
        //Excluir Clínica
        async function excluirClinica(id: number) {
            const confirmar = window.confirm(
                `Deseja realmente excluir a clínica de ID ${id}?`
            );

            if (!confirmar) return; 
            
            try {
                const resposta = await fetch(`${API}/${id}`, {
                    method: "DELETE",
                });

                if (!resposta.ok) {
                    throw new Error("Erro ao excluir clínica.");
                }

                setMensagem("Clínica excluída com sucesso!");

                if (clinicaSelecionada?.id === id) {
                    setClinicaSelecionada(null);
                }

                await carregarClinicas();
            } catch (error){
                console.error(error);
                setMensagem("Não foi possível excluir a clínica.");
            }
     }

    return (
        <main className="min-h-screen b-gray-100 p-8">
           <div className="mx-auto max-w-6xl">

            <Link
            href="/"
            className="mb-6 inline-block font-semibold text-teal-700 hover:underline"
            >
              ← Voltar ao início
            </Link>

            <div className="rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-700">
                            Clínicas Cadastradas 
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Consulte, modifique ou exclua as clínicas.
                        </p>
                    </div>

                    <Link
                    href="/clinicas"
                    className="rounded-lg bg-teal-700 px-5 py-3 text-center font-bold text-white hover:bg-teal-800"
                    >
                        + Nova Clínica 
                    </Link>
                </div>

                {/*Buscar Por Id*/}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                    <input 
                    type="number" 
                    min="1"
                    value={idBusca}
                    onChange={(e) => setIdBusca(e.target.value)}
                    placeholder="Digite o ID da clínica"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 sm:max-w-xs"
                    />

                    <button
                    type="button"
                    onClick={buscarPorId}
                    className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
                    >
                       Buscar
                    </button>

                    <button
                    type="button"
                    onClick={mostrarTodas}
                    className="rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-800 hover:bg-gray-300"
                    >
                      Mostrar Todas
                    </button>
                </div>

                {mensagem && (
                    <p className="mb-5 rounded-lg bg-teal-50 p-4 font-medium text-teal-800">
                        {mensagem}
                    </p>
                )}

                {/* Formulário de Edição */}
                {clinicaSelecionada && (
                    <div className="mb-8 rounded-xl border border-teal-200 bg-teal-50 p-6">

                        <h2 className="mb-5 text-2xl font-bold text-teal-800">
                            Modificar Clínica - ID {clinicaSelecionada.id}
                        </h2>

                        <form 
                        onSubmit={salvarAlteracoes}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                        >

                        <input 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome da clínica"
                        required
                        className="rounded-lg border p-3"
                        />

                        <input 
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        placeholder="Cnpj"
                        required
                        className="rounded-lg border p-3"
                        />

                        <input 
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Telefone"
                        required
                        className="rounded-lg border p-3"
                        />

                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="rounded-lg border p-3"
                        />

                        <input 
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Endereco"
                        required
                        className="rounded-lg border p-3"
                        />

                        <button
                        type="submit"
                        className="rounded-lg bg-teal-700 p-3 font-bold text-white hover:bg-teal-800"
                        >
                            Salvar Alterações
                        </button>

                        <button
                        type="button"
                        onClick={() => setClinicaSelecionada(null)}
                        className="rounded-lg bg-gray-300 p-3 font-bold text-gray-800 hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        </form>
                    </div>
                )}

                {/* Tabela */}

                {carregando ? (
                    <p className="py-6 text-gray-600">
                        Carregando clínicas...
                    </p>
                ) : clinicas.length === 0 ? (
                   <p className="rounded-lg bg-gray-50 p-6 text-gray-600">
                        Nenhuma clínica encontrada.
                   </p> 
                ) : (
                    <div className="overflow-x-auto">
                       <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-teal-700 text-white">
                                <th className="p-3">ID</th>
                                <th className="p-3">Nome</th>
                                <th className="p-3">CNPJ</th>
                                <th className="p-3">Telefone</th>
                                <th className="p-3">E-mail</th>
                                <th className="p-3">Endereço</th>
                                <th className="p-3">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clinicas.map((clinica) => (
                               <tr
                               key={clinica.id}
                               className="border-b border-gray-200 hover:bg-teal-50"
                               >
                                  <td className="p-3  text-gray-800">
                                    {clinica.id}
                                  </td>

                                  <td className="p-3 font-semibold text-gray-800">
                                    {clinica.nome}
                                  </td>

                                  <td className="p-3 font-semibold text-gray-800">
                                     {clinica.cnpj}
                                  </td>

                                  <td className="p-3 font-semibold text-gray-800">
                                    {clinica.telefone}
                                  </td>

                                  <td className="p-3 font-semibold text-gray-800">
                                    {clinica.email}
                                  </td>
                               
                                  <td className="p-3 font-semibold text-gray-800">
                                    {clinica.endereco}
                                  </td>

                                  <td className="p-3">
                                    <div className="flex flex-col gap-2">
                                        <button
                                        type="button"
                                        onClick={() => modificarClinica(clinica)}
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                        >
                                            Modificar
                                        </button>

                                        <button 
                                        type="button"
                                        onClick={() => excluirClinica(clinica.id)}
                                        className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                  </td>
                               </tr> 
                            ))}
                        </tbody>
                       </table>
                    </div>
                )}

            </div>

        </div>
      </main>
    );
}