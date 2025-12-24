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

  // Verifica qual aba está ativa baseada na URL para pintar o botão
  const abaAtiva = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="app-container">
      {/* --- Cabeçalho Global --- */}
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
              <div className="user-name">{usuario?.nome || 'Visitante'}</div>
              <div className="user-role">{usuario?.cargo || ''}</div>
            </div>
            <div className="user-avatar">{usuario?.nome?.charAt(0)}</div>
          </div>
        </div>
      </header>

      {/* --- Wrapper das Ilhas --- */}
      {/* O CSS .islands-wrapper usa flexbox, permitindo que os filhos se alinhem lado a lado */}
      <div className="islands-wrapper">

        {/* Ilha 1: Navegação Global (Fixa) */}
        <aside className="global-nav">
          <BotaoNav label="Cli" ativo={abaAtiva.includes('clientes')} onClick={() => navigate('/clientes')} />
          <BotaoNav label="Prod" ativo={abaAtiva.includes('produtos')} onClick={() => navigate('/produtos')} />
          <BotaoNav label="Forn" ativo={abaAtiva.includes('fornecedores')} onClick={() => navigate('/fornecedores')} />
          <BotaoNav label="Fin" ativo={abaAtiva.includes('financeiro')} onClick={() => navigate('/financeiro')} />
        </aside>

        {/* AQUI ESTÁ A MUDANÇA: O Outlet renderiza o componente da rota filha.
           O Módulo filho (ex: ModuloClientes) retornará um Fragmento contendo:
           1. <main className="main-island">...</main>
           2. <aside className="context-wrapper">...</aside> (Opcional)
        */}
        <Outlet />

      </div>
    </div>
  );
}

const BotaoNav = ({ label, ativo, onClick }) => (
  <button className={`nav-button ${ativo ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);