import Papa, { ParseResult } from "papaparse";
import { Cliente, Conta, Agencia } from "./types";

// Converte texto CSV para objetos, usando cabeçalhos da planilha
const parseCSV = <T>(csvText: string): T[] => {
  const parsed: ParseResult<T> = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  return parsed.data;
};

// Corrige problemas de acentuação (JoÃ£o -> João)
const fixEncoding = (text: string) => {
  try {
    return decodeURIComponent(escape(text));
  } catch {
    return text;
  }
};

export const fetchClientes = async (): Promise<Cliente[]> => {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes"
  );
  const csvText = await res.text();
  const rows = parseCSV<Cliente>(csvText);

  return rows.map((row: any) => ({
    id: row.id,
    cpfCnpj: row.cpfCnpj,
    rg: row.rg || undefined,
    dataNascimento: new Date(row.dataNascimento),
    nome: fixEncoding(row.nome),
    nomeSocial: row.nomeSocial ? fixEncoding(row.nomeSocial) : undefined,
    email: row.email,
    endereco: fixEncoding(row.endereco),
    rendaAnual: parseFloat(row.rendaAnual.replace(",", ".")),
    patrimonio: parseFloat(row.patrimonio.replace(",", ".")),
    estadoCivil: row.estadoCivil,
    codigoAgencia: Number(row.codigoAgencia),
  }));
};

export const fetchContas = async (): Promise<Conta[]> => {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
  );
  const csvText = await res.text();
  const rows = parseCSV<Conta>(csvText);

  return rows.map((row: any) => ({
    id: row.id,
    cpfCnpjCliente: row.cpfCnpjCliente,
    tipo: row.tipo,
    saldo: parseFloat(row.saldo.replace(",", ".")),
    limiteCredito: parseFloat(row.limiteCredito.replace(",", ".")),
    creditoDisponivel: parseFloat(row.creditoDisponivel.replace(",", ".")),
  }));
};

export const fetchAgencias = async (): Promise<Agencia[]> => {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
  );
  const csvText = await res.text();
  const rows = parseCSV<Agencia>(csvText);

  return rows.map((row: any) => ({
    id: row.id,
    codigo: Number(row.codigo),
    nome: fixEncoding(row.nome),
    endereco: fixEncoding(row.endereco),
  }));
};
