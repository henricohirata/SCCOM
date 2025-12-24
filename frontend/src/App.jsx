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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider, useGlobal } from './context/GlobalContext';
import MainLayout from './layouts/MainLayout';
import ScreenClientes from './pages/Cliente/ScreenCliente';
import ClientSidebar from './pages/Cliente/SidebarCliente';

function AppContent() {
  // [2] GET selectedClient FROM CONTEXT
  const { activeTab, selectedClient } = useGlobal();

  // [3] DEFINE THE LOGIC FOR THE RIGHT PANEL
  // We only show the sidebar if we are in 'clientes' tab AND a client is selected
  const sidebarToRender = (activeTab === 'clientes' && selectedClient)
    ? <ClientSidebar />
    : null;

  return (
    // [4] PASS IT TO MAINLAYOUT
    <MainLayout rightPanel={sidebarToRender}>
      {activeTab === 'clientes' && <ScreenClientes />}
      {activeTab === 'produtos' && <h1>Gestão de Produtos (Em Breve)</h1>}
      {activeTab === 'fornecedores' && <h1>Gestão de Fornecedores (Em Breve)</h1>}
      {activeTab === 'financeiro' && <h1>Financeiro (Em Breve)</h1>}
    </MainLayout>
  );
}

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;