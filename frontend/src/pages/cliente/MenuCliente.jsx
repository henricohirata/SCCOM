/*
 * ----------------------------------------------------------------------------
 * Componente: ClientSidebar
 * Descrição: O "Dossiê" e menu de contexto específico do módulo de Clientes.
 * Deve ser passado para a prop 'rightPanel' do MainLayout.
 * ----------------------------------------------------------------------------
 */

export default function MenuCliente({ cliente, subVisao, setSubVisao, aoFechar }) {

  // Se não tem cliente, não renderiza nada (proteção extra)
  if (!cliente) return null;

  return (
    <>
      {/* Dossiê (Card de Informação) */}
      <aside className="client-dossier">
        <div className="dossier-header">
          {/* [CORREÇÃO] Usamos a prop 'cliente' diretamente */}
          <div className="dossier-avatar">{cliente.nome.charAt(0)}</div>
          <h3>{cliente.nome}</h3>
          <span className="badge-vip">VIP</span>
        </div>
        <div className="dossier-info">
          <p><span>CPF</span> {cliente.cpf || cliente.documento || '...'}</p>
          <p><span>Tel</span> (11) 99999-9999</p>
        </div>
      </aside>

      {/* Menu de Contexto (Barra de Ações) */}
      <aside className="context-nav">
        <div className="context-label">Ações</div>

        {/* [CORREÇÃO] Usamos 'subVisao' e 'setSubVisao' recebidos via props */}
        <ContextButton
            label="🛒"
            subLabel="PDV"
            active={subVisao === 'pdv'}
            onClick={() => setSubVisao('pdv')}
        />
        <ContextButton
            label="🔄"
            subLabel="Dev"
            active={subVisao === 'devolucao'}
            onClick={() => setSubVisao('devolucao')}
        />
        <ContextButton
            label="📄"
            subLabel="Rel"
            active={subVisao === 'historico'}
            onClick={() => setSubVisao('historico')}
        />

        <div style={{ marginTop: 'auto' }}>
          {/* [CORREÇÃO] Botão fechar agora chama a função do pai */}
          <ContextButton
            label="✕"
            subLabel="Fechar"
            onClick={aoFechar}
            danger
          />
        </div>
      </aside>
    </>
  );
}

const ContextButton = ({ label, subLabel, active, onClick, danger }) => (
  <button className={`context-button ${active ? 'active' : ''} ${danger ? 'danger' : ''}`} onClick={onClick}>
    <span style={{ fontSize: '18px' }}>{label}</span>
    <span style={{ fontSize: '9px', marginTop: '3px' }}>{subLabel}</span>
  </button>
);