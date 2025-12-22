import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider, useGlobal } from './context/GlobalContext';
import MainLayout from './layouts/MainLayout';
import ScreenClientes from './pages/Cliente/ScreenCliente';

// A wrapper to handle the conditional logic of which screen to show
function AppContent() {
  const { activeTab } = useGlobal();

  return (
    <MainLayout>
      {activeTab === 'clientes' && <ScreenClientes />}
      {activeTab === 'produtos' && <h1>Gestão de Produtos (Em Breve)</h1>}
      {activeTab === 'fornecedores' && <h1>Gestão de Fornecedores (Em Breve)</h1>}
      {/* Add other tabs here */}
    </MainLayout>
  );
}

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
           {/* We use a wildcard to let the AppContent handle the internal view switching */}
           <Route path="/*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;