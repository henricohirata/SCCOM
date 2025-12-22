// src/pages/Cliente/ScreenCliente.jsx
import { useGlobal } from '../../context/GlobalContext';
import ClientSearch from '../../components/BuscaClientes/BuscaClientes';

export default function ScreenCliente() {
  const { selectedClient, setSelectedClient, clientSubView, cart, addToCart, clearClientSession } = useGlobal();

  // VIEW 1: Seleção de Cliente (Estado Inicial)
  if (!selectedClient) {
    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '10px', color: '#2c3e50' }}>Identificar Cliente</h1>
        <p style={{ marginBottom: '30px', color: '#7f8c8d' }}>
          Inicie a venda buscando pelo CPF/CNPJ ou Nome do cliente.
        </p>

        {/* Aqui entra o nosso novo componente */}
        <ClientSearch onClientSelect={setSelectedClient} />
        
        <div style={{ marginTop: '40px', padding: '20px', background: '#fff3cd', borderRadius: '8px', color: '#856404' }}>
          <strong>Dica:</strong> Pressione ENTER para selecionar o primeiro resultado da lista.
        </div>
      </div>
    );
  }

  // VIEW 2: Cliente Selecionado (Painel de Vendas/PDV)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Painel do Cliente: {selectedClient.nome}</h2>
        <button 
            onClick={clearClientSession}
            style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
            Fechar Atendimento
        </button>
      </div>

      {clientSubView === 'pos' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* ... (O restante do código do PDV/Carrinho permanece igual ao seu arquivo original) ... */}
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: 'white' }}>
              <h3>Produtos</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                {['Camiseta', 'Calça Jeans', 'Boné', 'Meias'].map(prod => (
                  <button 
                    key={prod} 
                    onClick={() => addToCart({ name: prod, price: 50.0 })}
                    style={{ width: '100px', height: '80px', background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '6px', cursor: 'pointer' }}>
                    <strong>{prod}</strong><br/><small>R$ 50,00</small>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff' }}>
              <h3>Carrinho</h3>
              {cart.length === 0 ? <p style={{color: '#999'}}>Vazio</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cart.map((item, idx) => (
                    <li key={idx} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                      {item.name} - R$ {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                Total: R$ {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </div>
              <button style={{ marginTop: '15px', width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Finalizar Venda
              </button>
            </div>
        </div>
      )}

      {clientSubView === 'returns' && <h2>Gestão de Devoluções (Em breve)</h2>}
      {clientSubView === 'reports' && <h2>Relatórios do Cliente (Em breve)</h2>}
    </div>
  );
}