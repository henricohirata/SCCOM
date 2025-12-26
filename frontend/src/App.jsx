/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Componente raiz da aplicação.
 * Define a estrutura principal, injeta o GlobalContext e renderiza o layout
 * principal.
 * ----------------------------------------------------------------------------
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProvedorAutenticacao, useAutenticacao } from './context/AutenticacaoContext';
import { ProvedorAtendimento } from './context/ContextoAtendimento';
import LayoutPrincipal from './layouts/LayoutPrincipal';
import ModuloCliente from './modules/ModuloCliente';
import './App.css';


// Componente para proteger rotas
// Checa as credenciais do usuário logado antes de renderizar o conteúdo
function RotaProtegida({ children, cargosPermitidos }) {

  const { temPermissao } = useAutenticacao();

  if (!temPermissao(cargosPermitidos)) {
    return <div style={{padding: 20, color: 'red'}}>⛔ Acesso Negado: Você não tem permissão para esta área.</div>;
  }
  return children;
}


// Aplicação principal
// Configura o roteamento e o contexto global
function App() {

  return (
    <ProvedorAutenticacao>
      <ProvedorAtendimento>
        <BrowserRouter>
          <Routes>
             <Route path="/" element={<LayoutPrincipal />}>
                <Route index element={<Navigate to="/clientes" replace />} />

                <Route
                  path="clientes/*"
                  element={
                    <RotaProtegida cargosPermitidos={['ADMIN', 'VENDEDOR', 'GERENTE']}>
                      <ModuloCliente />
                    </RotaProtegida>
                  }
                />

                <Route
                  path="produtos/*"
                  element={
                    <RotaProtegida cargosPermitidos={['ADMIN', 'VENDEDOR', 'GERENTE']}>
                      <main className="ilha-principal"><div className="workspace"><h1>Produtos</h1></div></main>
                    </RotaProtegida>
                  }
                />

                <Route
                  path="fornecedores/*"
                  element={
                    <RotaProtegida cargosPermitidos={['ADMIN', 'VENDEDOR', 'GERENTE']}>
                      <main className="ilha-principal"><div className="workspace"><h1>Fornecedores</h1></div></main>
                    </RotaProtegida>
                  }
                />

                <Route
                  path="financeiro/*"
                  element={
                    <RotaProtegida cargosPermitidos={['ADMIN', 'GERENTE']}>
                      <main className="ilha-principal"><div className="workspace"><h1>Financeiro</h1></div></main>
                    </RotaProtegida>
                  }
                />

                <Route
                  path="gestao/*"
                  element={
                    <RotaProtegida cargosPermitidos={['ADMIN', 'GERENTE']}>
                      <main className="ilha-principal"><div className="workspace"><h1>Gestão</h1></div></main>
                    </RotaProtegida>
                  }
                />

             </Route>
          </Routes>
        </BrowserRouter>
      </ProvedorAtendimento>
    </ProvedorAutenticacao>
  );
}

export default App;