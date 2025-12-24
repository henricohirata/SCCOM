/*
 * ----------------------------------------------------------------------------
 * Componente: ClientSidebar
 * Descrição: O "Dossiê" e menu de contexto específico do módulo de Clientes.
 * Deve ser passado para a prop 'rightPanel' do MainLayout.
 * ----------------------------------------------------------------------------
 */
import { useGlobal } from '../../context/GlobalContext';

export default function MenuCliente() {
  const { selectedClient, clientSubView, setClientSubView } = useGlobal();

  if (!selectedClient) return null;

  return (
    <>
      {/* Dossiê (Card de Informação) */}
      <aside className="client-dossier">
        <div className="dossier-header">
          <div className="dossier-avatar">{selectedClient.nome.charAt(0)}</div>
          <h3>{selectedClient.nome}</h3>
          <span className="badge-vip">VIP</span>
        </div>
        <div className="dossier-info">
          <p><span>CPF</span> {selectedClient.cpf || selectedClient.documento || '...'}</p>
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
    </>
  );
}

const ContextButton = ({ label, subLabel, active, onClick, danger }) => (
  <button className={`context-button ${active ? 'active' : ''} ${danger ? 'danger' : ''}`} onClick={onClick}>
    <span style={{ fontSize: '18px' }}>{label}</span>
    <span style={{ fontSize: '9px', marginTop: '3px' }}>{subLabel}</span>
  </button>
);