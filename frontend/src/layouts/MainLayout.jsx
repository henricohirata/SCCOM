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

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAutenticacao } from '../context/AutenticacaoContext';
import './MainLayout.css';

export default function LayoutPrincipal() {
  const { usuario } = useAutenticacao();
  const navigate = useNavigate();
  const location = useLocation();

  const abaAtiva = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="app-container">
      {/* Header Global (Mantenha igual) */}
      <header className="global-header">
        <div className="header-left">
           <span className="app-logo">SCCOM</span>
        </div>
        <div className="header-center">
          <input type="text" placeholder="Pesquisar..." className="global-search-input"/>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div style={{ textAlign: 'right' }}>
              <div className="user-name">{usuario?.nome || 'Visitante'}</div>
              <div className="user-role">{usuario?.cargo || ''}</div>
            </div>
            <div className="user-avatar"></div>
          </div>
        </div>
      </header>

      <div className="islands-wrapper">

        {/* --- MENU LATERAL (SIDEBAR) --- */}
        <aside className="global-nav">


          <BotaoNav
            icon="👥"
            label="Clientes"
            ativo={abaAtiva.includes('clientes')}
            onClick={() => navigate('/clientes')}
          />

          <BotaoNav
            icon="📦"
            label="Produtos"
            ativo={abaAtiva.includes('produtos')}
            onClick={() => navigate('/produtos')}
          />

          <BotaoNav
            icon="🚚"
            label="Fornecedores"
            ativo={abaAtiva.includes('fornecedores')}
            onClick={() => navigate('/fornecedores')}
          />

          <BotaoNav
            icon="💰"
            label="Financeiro"
            ativo={abaAtiva.includes('financeiro')}
            onClick={() => navigate('/financeiro')}
          />

          <BotaoNav
            icon="💻"
            label="Gestão"
            ativo={abaAtiva.includes('gestao')}
            onClick={() => navigate('/gestao')}
          />

          {/* Espaçador para empurrar configurações para baixo (opcional) */}
          <div style={{ flex: 1 }}></div>

          <BotaoNav
            icon="⚙️"
            label="Configurações"
            ativo={abaAtiva === 'config'}
            onClick={() => {}}
          />

        </aside>

        {/* --- Conteúdo --- */}
        <Outlet />

      </div>
    </div>
  );
}

// Componente BotaoNav Atualizado
const BotaoNav = ({ icon, label, ativo, onClick }) => (
  <button className={`nav-button ${ativo ? 'active' : ''}`} onClick={onClick}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </button>
);