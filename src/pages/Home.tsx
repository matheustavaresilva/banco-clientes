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
    <div className="min-h-screen bg-banestes-cinza p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Título centralizado */}
        <h1 className="text-3xl font-bold mb-6 text-center text-banestes-azul">
          Lista de Clientes
        </h1>

        {/* Campo de pesquisa */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF/CNPJ"
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setPaginaAtual(1);
            }}
            className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-banestes-azul"
            aria-label="Pesquisar clientes"
          />
        </div>

        {/* Lista de clientes */}
        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clientesPaginados.map((cliente) => (
                <li
                  key={cliente.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <p className="text-banestes-azul font-semibold">
                    <Link to={`/cliente/${cliente.id}`} className="hover:underline">
                      {cliente.nome}
                    </Link>
                  </p>
                  <p className="text-sm"><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
                  <p className="text-sm"><strong>Email:</strong> {cliente.email}</p>
                </li>
              ))}
            </ul>

            {/* Paginação */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={irParaPaginaAnterior}
                disabled={paginaAtual === 1}
                className="px-4 py-2 rounded bg-banestes-azul text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700 font-medium">
                Página {paginaAtual} de {totalPaginas}
              </span>
              <button
                onClick={irParaProximaPagina}
                disabled={paginaAtual === totalPaginas}
                className="px-4 py-2 rounded bg-banestes-verde text-white hover:bg-green-700 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
