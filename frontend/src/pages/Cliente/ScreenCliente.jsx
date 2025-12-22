import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function ScreenCliente() {
  const { selectedClient, setSelectedClient, clientSubView, cart, addToCart } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');

  // MOCK DATA - Replace with API call to GET /clientes
  const mockClients = [
    { id: 1, nome: 'Henrico Hirata', cpf: '123.456.789-00' },
    { id: 2, nome: 'Maria Silva', cpf: '987.654.321-11' },
  ];

  // VIEW 1: Search Selection
  if (!selectedClient) {
    return (
      <div>
        <h2>Buscar Cliente</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Nome, CPF ou Telefone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '100%', maxWidth: '400px' }}
          />
          <button style={{ padding: '10px 20px', backgroundColor: '#2980b9', color: 'white', border: 'none' }}>Buscar</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#f2f2f2' }}>
              <th style={{ padding: '10px' }}>Nome</th>
              <th style={{ padding: '10px' }}>CPF</th>
              <th style={{ padding: '10px' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{c.nome}</td>
                <td style={{ padding: '10px' }}>{c.cpf}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => setSelectedClient(c)}
                    style={{ padding: '5px 10px', backgroundColor: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Selecionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // VIEW 2: Client Selected (The Middle Screen content)
  return (
    <div>
      {clientSubView === 'pos' && (
        <div>
          <h2>PDV - Nova Venda</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            
            {/* Left: Product List (Mock) */}
            <div style={{ border: '1px solid #ddd', padding: '10px' }}>
              <h3>Produtos Disponíveis</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Camiseta', 'Calça Jeans', 'Boné', 'Meias'].map(prod => (
                  <button 
                    key={prod} 
                    onClick={() => addToCart({ name: prod, price: 50.0 })}
                    style={{ width: '100px', height: '80px', background: '#ecf0f1', border: '1px solid #bdc3c7' }}>
                    {prod}<br/>R$ 50,00
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Current Cart */}
            <div style={{ border: '1px solid #ddd', padding: '10px', background: '#fff9c4' }}>
              <h3>Carrinho</h3>
              {cart.length === 0 ? <p>Vazio</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cart.map((item, idx) => (
                    <li key={idx} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                      {item.name} - R$ {item.price}
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                Total: R$ {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </div>
              <button style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#e67e22', color: 'white', border: 'none' }}>
                Finalizar Venda
              </button>
            </div>
          </div>
        </div>
      )}

      {clientSubView === 'returns' && <h2>Gestão de Devoluções</h2>}
      {clientSubView === 'reports' && <h2>Relatórios do Cliente</h2>}
    </div>
  );
}