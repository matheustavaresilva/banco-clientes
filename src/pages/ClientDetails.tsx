import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cliente, Conta, Agencia } from "../types";
import { fetchClientes, fetchContas, fetchAgencias } from "../dataService";

const ClientDetails = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const clientes = await fetchClientes();
      const contas = await fetchContas();
      const agencias = await fetchAgencias();

      const selectedCliente = clientes.find((c) => c.id === id);
      if (selectedCliente) {
        setCliente(selectedCliente);

        // Encontrar contas do cliente
        const contasCliente = contas.filter(
          (conta) => conta.cpfCnpjCliente === selectedCliente.cpfCnpj
        );
        setContas(contasCliente);

        // Buscar agência correta pelo código, não pelo id
        const agenciaCliente = agencias.find(
          (ag) => ag.codigo === selectedCliente.codigoAgencia
        );
        setAgencia(agenciaCliente ?? null);
      }
    };

    loadData();
  }, [id]);

  if (!cliente) return <p>Carregando cliente...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Detalhes do Cliente</h1>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>
      <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toFixed(2)}</p>
      <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>

      <h2 className="text-lg font-semibold mt-4">Contas Bancárias</h2>
      {contas.length > 0 ? (
        contas.map((conta) => (
          <div key={conta.id} className="mb-2">
            <p><strong>Tipo:</strong> {conta.tipo}</p>
            <p><strong>Saldo:</strong> R$ {conta.saldo.toFixed(2)}</p>
            <p><strong>Limite de Crédito:</strong> R$ {conta.limiteCredito.toFixed(2)}</p>
            <p><strong>Crédito Disponível:</strong> R$ {conta.creditoDisponivel.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>Este cliente não possui contas cadastradas.</p>
      )}

      <h2 className="text-lg font-semibold mt-4">Agência</h2>
      {agencia ? (
        <div>
          <p><strong>Nome:</strong> {agencia.nome}</p>
          <p><strong>Endereço:</strong> {agencia.endereco}</p>
        </div>
      ) : (
        <p>Agência não encontrada.</p>
      )}
    </div>
  );
};

export default ClientDetails;
