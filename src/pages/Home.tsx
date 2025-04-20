import { useEffect, useState } from "react";
import { Cliente } from "../types";
import { fetchClientes } from "../dataService";
import { Link } from "react-router-dom";

const Home = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(true);
  const itensPorPagina = 10;

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const dados = await fetchClientes();
        setClientes(dados);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.cpfCnpj.includes(filtro)
  );

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(inicio, fim);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {/* Container flex para centralizar */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Título centralizado */}
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Clientes</h1>

        {/* Campo de pesquisa centralizado */}
        <div className="flex justify-center mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF/CNPJ"
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setPaginaAtual(1); // Reinicia para a primeira página ao filtrar
            }}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>

      {/* Exibição dos clientes */}
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <>
          <ul className="space-y-4 w-full max-w-4xl mx-auto">
            {clientesPaginados.map((cliente) => (
              <li
                key={cliente.id}
                className="border border-gray-300 rounded p-4 shadow"
              >
                <p>
                  <strong>Nome:</strong>{" "}
                  <Link
                    to={`/cliente/${cliente.id}`}
                    className="text-blue-600 font-semibold"
                  >
                    {cliente.nome}
                  </Link>
                </p>
                <p>
                  <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}
                </p>
                <p>
                  <strong>Email:</strong> {cliente.email}
                </p>
              </li>
            ))}
          </ul>

          {/* Paginação */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={irParaPaginaAnterior}
              disabled={paginaAtual === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {paginaAtual} / {totalPaginas}
            </span>
            <button
              onClick={irParaProximaPagina}
              disabled={paginaAtual === totalPaginas}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
