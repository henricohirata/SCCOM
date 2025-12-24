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
 * principal (MainLayout).
 * ----------------------------------------------------------------------------
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProvedorAutenticacao, useAutenticacao } from './context/AutenticacaoContext';
import LayoutPrincipal from './layouts/MainLayout';
import ModuloCliente from './pages/cliente/ModuloCliente';

// Componente Wrapper para proteger rotas (Verifica credenciais)
function RotaProtegida({ children, cargosPermitidos }) {
  const { temPermissao } = useAutenticacao();

  // Como estamos com usuario mockado, isso passará direto se o cargo bater.
  // Se o usuario fosse null, redirecionariamos para login.
  if (!temPermissao(cargosPermitidos)) {
    return <div style={{padding: 20, color: 'red'}}>⛔ Acesso Negado: Você não tem permissão para esta área.</div>;
  }
  return children;
}

function App() {
  return (
    <ProvedorAutenticacao>
      <ProvedorAtendimento> {/* <--- ENVOLVER AQUI */}
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

                {/* Agora, ao ir para Produtos e voltar, o ProvedorAtendimento mantém os dados */}
                <Route path="produtos" element={<main className="main-island"><div className="workspace-content"><h1>Produtos</h1></div></main>} />
                <Route path="fornecedores" element={<main className="main-island"><div className="workspace-content"><h1>Fornecedores</h1></div></main>} />
                <Route path="financeiro" element={<main className="main-island"><div className="workspace-content"><h1>Financeiro</h1></div></main>} />
             </Route>
          </Routes>
        </BrowserRouter>
      </ProvedorAtendimento>
    </ProvedorAutenticacao>
  );
}

export default App;