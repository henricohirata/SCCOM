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
import './LayoutPrincipal.css';

export default function LayoutPrincipal() {
  const { usuario } = useAutenticacao();
  const navigate = useNavigate();
  const location = useLocation();

  const abaAtiva = location.pathname.split('/')[1] || 'dashboard';

  {/* --- Layout Principal - Container da aplicação --- */}
  return (
    <div className="container-app">

      {/* --- Header Global --- */}
      <header className="header-global">

        {/* --- Logo --- */}
        <div className="header-left">
           <span className="logo-app">SCCOM</span>
        </div>

        {/* --- Barra de Busca --- */}
        <div className="header-center">
          <input type="text" placeholder="Pesquisar..." className="busca-global-input"/>
        </div>

        {/* --- Informações do Usuário --- */}
        <div className="header-right">

          <div className="info-usuario">

            <div style={{ textAlign: 'right' }}>
              <div className="nome-usuario">{usuario?.nome || 'Visitante'}</div>
              <div className="cargo-usuario">{usuario?.cargo || ''}</div>
            </div>
            <div className="foto-usuario"></div>

          </div>

        </div>

      </header>

      <div className="container-tela-principal">

        {/* --- MENU LATERAL --- */}
        <aside className="menu-global">

          <BotaoNav
            icone="👥"
            label="Clientes"
            ativo={abaAtiva.includes('clientes')}
            onClick={() => navigate('/clientes')}
          />

          <BotaoNav
            icone="📦"
            label="Produtos"
            ativo={abaAtiva.includes('produtos')}
            onClick={() => navigate('/produtos')}
          />

          <BotaoNav
            icone="🚚"
            label="Fornecedores"
            ativo={abaAtiva.includes('fornecedores')}
            onClick={() => navigate('/fornecedores')}
          />

          <BotaoNav
            icone="💰"
            label="Financeiro"
            ativo={abaAtiva.includes('financeiro')}
            onClick={() => navigate('/financeiro')}
          />

          <BotaoNav
            icone="💻"
            label="Gestão"
            ativo={abaAtiva.includes('gestao')}
            onClick={() => navigate('/gestao')}
          />

          <div style={{ flex: 1 }}></div>

          <BotaoNav
            icone="⚙️"
            label="Configurações"
            ativo={abaAtiva === 'config'}
            onClick={() => {}}
          />

        </aside>

        {/* Tela Principal: Carrega a tela correspondente à rota atual via Outlet */}
        <Outlet />

      </div>
    </div>
  );
}

// Componente BotaoNav - Botão de navegação na barra lateral do menu global
const BotaoNav = ({ icone, label, ativo, onClick }) => (
  <button className={`botao-nav ${ativo ? 'active' : ''}`} onClick={onClick}>
    <span className="icone-botao-nav">{icone}</span>
    <span className="label-botao-nav">{label}</span>
  </button>
);