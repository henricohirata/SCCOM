/*
 * ----------------------------------------------------------------------------
 * Contexto de Autenticação
 * ----------------------------------------------------------------------------
 * Gerencia o usuário logado e suas permissões.
 * Prepara o terreno para RBAC (Role Based Access Control).
 * ----------------------------------------------------------------------------
 */
import { createContext, useState, useContext } from 'react';

const ContextoAutenticacao = createContext();

export function ProvedorAutenticacao({ children }) {
  // MOCK: Inicializamos com um usuário 'fixo' para não bloquear o desenvolvimento.
  // Futuramente, isso iniciará como null e será preenchido após o login.
  const [usuario, setUsuario] = useState({
    nome: 'Henrico',
    cargo: 'ADMIN', // Tente mudar para 'VENDEDOR' para testar permissões futuramente
    avatar: null
  });

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    // Aqui entraria lógica de token/localStorage
  };

  const logout = () => {
    setUsuario(null);
  };

  /**
   * Verifica se o usuário tem permissão para acessar determinado recurso.
   * @param {Array} cargosPermitidos - Lista de cargos que podem acessar.
   */
  const temPermissao = (cargosPermitidos) => {
    if (!usuario) return false;
    if (cargosPermitidos.includes('*')) return true; // Acesso público/geral
    // Verifica se o cargo do usuário está na lista permitida
    return cargosPermitidos.includes(usuario.cargo);
  };

  return (
    <ContextoAutenticacao.Provider value={{ usuario, login, logout, temPermissao }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
}

export const useAutenticacao = () => useContext(ContextoAutenticacao);