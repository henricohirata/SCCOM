/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Layout mestre da aplicação.
 * Implementa a interface de "Ilhas Flutuantes", contendo a barra lateral de
 * navegação e a área de conteúdo dinâmica onde as 'Screens' são renderizadas.
 * ----------------------------------------------------------------------------
 */

import { useGlobal } from '../context/GlobalContext';
import './MainLayout.css';

export default function MainLayout({ children, rightPanel }) {
  const { activeTab, setActiveTab } = useGlobal();

  return (
    <div className="app-container">

      {/* Header da Aplicação */}
      <header className="global-header">
        <div className="header-left">
           <span className="app-logo">SCCOM</span>
        </div>
        <div className="header-center">
          <input type="text" placeholder="Pesquisar no sistema..." className="global-search-input"/>
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

      {/* Área Central / 'Ilhas' */}
      <div className="islands-wrapper">

        {/* Menu de Navegação Global */}
        <aside className="global-nav">
          <NavButton label="Cli" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} />
          <NavButton label="Prod" active={activeTab === 'produtos'} onClick={() => setActiveTab('produtos')} />
          <NavButton label="Forn" active={activeTab === 'fornecedores'} onClick={() => setActiveTab('fornecedores')} />
          <NavButton label="Fin" active={activeTab === 'financeiro'} onClick={() => setActiveTab('financeiro')} />
        </aside>

        {/* Área de Trabalho Principal */}
        <main className="main-island">
          <div className="workspace-content">
            {children}
          </div>
        </main>

        {/* Painel Direito (Dossiê/Contexto) - Agora injetado via prop */}
        {rightPanel && (
          <div className="context-wrapper">
            {rightPanel}
          </div>
        )}

      </div>
    </div>
  );
}

const NavButton = ({ label, active, onClick }) => (
  <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);