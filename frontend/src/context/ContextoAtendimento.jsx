/*
 * ----------------------------------------------------------------------------
 * Contexto de Atendimento (Antiga lógica de Sessão do Cliente)
 * ----------------------------------------------------------------------------
 * Responsável por manter o estado do cliente e do PDV ativo mesmo quando
 * o usuário navega entre abas (ex: vai para Produtos e volta para Clientes).
 * ----------------------------------------------------------------------------
 */
import { createContext, useState, useContext } from 'react';

const ContextoAtendimento = createContext();

export function ProvedorAtendimento({ children }) {
  // Estado persistente do atendimento
  const [clienteEmAtendimento, setClienteEmAtendimento] = useState(null);
  const [subVisao, setSubVisao] = useState('pdv'); // 'pdv', 'devolucao', 'historico'
  const [carrinho, setCarrinho] = useState([]);

  // Ações de Negócio
  const iniciarAtendimento = (cliente) => {
    setClienteEmAtendimento(cliente);
    setSubVisao('pdv');
    // Nota: Dependendo da regra, podemos limpar ou manter o carrinho anterior
  };

  const encerrarAtendimento = () => {
    setClienteEmAtendimento(null);
    setCarrinho([]);
    setSubVisao('pdv');
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  return (
    <ContextoAtendimento.Provider value={{
      clienteEmAtendimento,
      subVisao,
      setSubVisao,
      carrinho,
      iniciarAtendimento,
      encerrarAtendimento,
      adicionarAoCarrinho
    }}>
      {children}
    </ContextoAtendimento.Provider>
  );
}

export const useAtendimento = () => useContext(ContextoAtendimento);