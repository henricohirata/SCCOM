import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastroCliente from './pages/CadastroCliente';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/clientes/novo">Novo Cliente</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao SCCOM</h1>} />
        <Route path="/clientes/novo" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;