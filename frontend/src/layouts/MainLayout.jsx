import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';

export default function MainLayout({ children }) {
  const { activeTab, setActiveTab, selectedClient, clientSubView, setClientSubView } = useGlobal();

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. LEFT SIDEBAR: Global Navigation */}
      <aside style={{ width: '80px', backgroundColor: '#2c3e50', color: '#ecf0f1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
        <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>SCCOM</div>
        
        <NavButton label="Cli" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} />
        <NavButton label="Prod" active={activeTab === 'produtos'} onClick={() => setActiveTab('produtos')} />
        <NavButton label="Forn" active={activeTab === 'fornecedores'} onClick={() => setActiveTab('fornecedores')} />
        <NavButton label="Fin" active={activeTab === 'financeiro'} onClick={() => setActiveTab('financeiro')} />
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* 2. TOP BAR: Global Search & User Info */}
        <header style={{ height: '60px', backgroundColor: '#ecf0f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #ccc' }}>
          <input type="text" placeholder="Global Search..." style={{ padding: '8px', width: '300px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Admin User</span>
            <div style={{ width: '35px', height: '35px', backgroundColor: '#95a5a6', borderRadius: '50%' }}></div>
          </div>
        </header>

        {/* 3. MIDDLE SCREEN: Main Workspace */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      {/* 4. RIGHT SIDEBAR: Contextual Menu (Only shows if a Client is selected) */}
      {activeTab === 'clientes' && selectedClient && (
        <aside style={{ width: '250px', backgroundColor: '#f8f9fa', borderLeft: '1px solid #ddd', display: 'flex', flexDirection: 'column' }}>
          {/* Client Profile Section */}
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#3498db', borderRadius: '50%', margin: '0 auto 10px' }}></div>
            <h3>{selectedClient.nome}</h3>
            <p style={{ fontSize: '0.9em', color: '#666' }}>VIP Member</p>
          </div>

          {/* Sub Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <SubButton label="POS / Venda" active={clientSubView === 'pos'} onClick={() => setClientSubView('pos')} />
            <SubButton label="Devoluções" active={clientSubView === 'returns'} onClick={() => setClientSubView('returns')} />
            <SubButton label="Relatórios" active={clientSubView === 'reports'} onClick={() => setClientSubView('reports')} />
            <div style={{ height: '1px', background: '#ccc', margin: '10px 0' }} />
            <button onClick={() => window.alert('Fechando cliente...')} style={{ padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}>Fechar Cliente</button>
          </nav>
        </aside>
      )}
    </div>
  );
}

// Simple Button Components for styles
const NavButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{ 
      width: '60px', height: '60px', marginBottom: '10px', border: 'none', 
      backgroundColor: active ? '#34495e' : 'transparent', color: 'white', 
      cursor: 'pointer', borderRadius: '8px', fontSize: '12px' 
    }}>
    {label}
  </button>
);

const SubButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{ 
      padding: '12px', textAlign: 'left', border: 'none', backgroundColor: active ? '#e3e6e8' : 'transparent', 
      cursor: 'pointer', fontWeight: active ? 'bold' : 'normal' 
    }}>
    {label}
  </button>
);