import { useGlobal } from '../context/GlobalContext';
import './MainLayout.css';

export default function MainLayout({ children }) {
  const { activeTab, setActiveTab, selectedClient, clientSubView, setClientSubView } = useGlobal();

  return (
    <div className="app-container">
      
      {/* 1. BARRA SUPERIOR GLOBAL (Ocupa toda a largura) */}
      <header className="global-header">
        <div className="header-left">
           <span className="app-logo">SCCOM</span>
        </div>

        <div className="header-center">
          <input type="text" placeholder="Pesquisar em todo o sistema..." className="global-search-input" />
        </div>

        <div className="header-right">
          <div className="user-info">
            <div style={{ textAlign: 'right' }}>
              <div className="user-name">Henrico</div>
              <div className="user-role">Admin</div>
            </div>
            <div className="user-avatar"></div>
          </div>
        </div>
      </header>

      {/* 2. CORPO DO SISTEMA (Onde ficam as Ilhas Flutuantes) */}
      <div className="islands-wrapper">
        
        {/* ILHA 1: Menu de Navegação Global */}
        <aside className="global-nav">
          <NavButton label="Cli" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} />
          <NavButton label="Prod" active={activeTab === 'produtos'} onClick={() => setActiveTab('produtos')} />
          <NavButton label="Forn" active={activeTab === 'fornecedores'} onClick={() => setActiveTab('fornecedores')} />
          <NavButton label="Fin" active={activeTab === 'financeiro'} onClick={() => setActiveTab('financeiro')} />
        </aside>

        {/* ILHA 2: Workspace Principal */}
        <main className="main-island">
          <div className="workspace-content">
            {children}
          </div>
        </main>

        

        {/* ILHA 3 e 4: Contexto do Cliente (Só aparece se necessário) */}
        {activeTab === 'clientes' && selectedClient && (
          <div className="context-wrapper">
            
            {/* Dossiê (Card de Informação) */}
            <aside className="client-dossier">
              <div className="dossier-header">
                <div className="dossier-avatar">{selectedClient.nome.charAt(0)}</div>
                <h3>{selectedClient.nome}</h3>
                <span className="badge-vip">VIP</span>
              </div>
              <div className="dossier-info">
                <p><span>CPF</span> {selectedClient.cpf || '...'}</p>
                <p><span>Tel</span> (11) 99999-9999</p>
              </div>
            </aside>

            {/* Menu de Contexto (Barra de Ações) */}
            <aside className="context-nav">
              <div className="context-label">Ações</div>
              <ContextButton label="🛒" subLabel="PDV" active={clientSubView === 'pos'} onClick={() => setClientSubView('pos')} />
              <ContextButton label="🔄" subLabel="Dev" active={clientSubView === 'returns'} onClick={() => setClientSubView('returns')} />
              <ContextButton label="📄" subLabel="Rel" active={clientSubView === 'reports'} onClick={() => setClientSubView('reports')} />
              <div style={{ marginTop: 'auto' }}>
                <ContextButton label="✕" subLabel="Fechar" onClick={() => { /* Lógica fechar */ }} danger />
              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
}

// Componentes Auxiliares
const NavButton = ({ label, active, onClick }) => (
  <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

const ContextButton = ({ label, subLabel, active, onClick, danger }) => (
  <button className={`context-button ${active ? 'active' : ''} ${danger ? 'danger' : ''}`} onClick={onClick}>
    <span style={{ fontSize: '18px' }}>{label}</span>
    <span style={{ fontSize: '9px', marginTop: '3px' }}>{subLabel}</span>
  </button>
);