/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Tela principal do módulo de Clientes.
 * Gerencia a alternância entre a visualização de busca (BuscaClientes) e o
 * painel de detalhes/venda do cliente selecionado.
 * ----------------------------------------------------------------------------
 */

import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import ClientSearch from '../../components/BuscaClientes/BuscaClientes';
import api from '../../services/api';
import './ScreenCliente.css';

// Sub-componentes internos (podem ser extraídos para arquivos próprios futuramente)
import ClientRegistrationForm from './components/ClientRegistrationForm'; // Sugestão de extração
import ClientPOS from './components/ClientPOS'; // Sugestão de extração

export default function ScreenCliente() {
  const { selectedClient, setSelectedClient, clearClientSession, clientSubView } = useGlobal();

  // Controle local de estado da UI
  const [isRegistering, setIsRegistering] = useState(false);
  const [preFilledData, setPreFilledData] = useState({ documento: '', nome: '' });

  // 1. Handler para iniciar cadastro vindo da Busca
  const handleStartRegister = (inputData) => {
      const isDoc = /\d/.test(inputData); // Se tem número, assumimos documento
      setPreFilledData({
          documento: isDoc ? inputData : '',
          nome: !isDoc ? inputData : ''
      });
      setIsRegistering(true);
  };

  const handleRegisterSuccess = (newClient) => {
      setIsRegistering(false);
      setSelectedClient(newClient);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // MODO 1: Cadastro
  if (isRegistering) {
      return (
          <ClientRegistrationForm
              initialData={preFilledData}
              onCancel={() => setIsRegistering(false)}
              onSuccess={handleRegisterSuccess}
          />
      );
  }

  // MODO 2: Dashboard do Cliente (Logado)
  if (selectedClient) {
      return (
        <div className="search-container">
           <div className="client-header">
               <div>
                  <h2 className="search-title">Cliente: {selectedClient.nome}</h2>
                  <small style={{color: '#666'}}>{selectedClient.documento}</small>
               </div>
               <button onClick={clearClientSession} className="btn-close-session">
                  Fechar Sessão
               </button>
            </div>

            {/* Switch de Sub-views */}
            {clientSubView === 'pos' && <ClientPOS />}

            {clientSubView === 'returns' && (
                <div className="panel-card" style={{ textAlign: 'center', padding: '50px' }}>
                    <h2 style={{ color: '#e67e22' }}>🔄 Devoluções e Trocas</h2>
                    <p>Funcionalidade em desenvolvimento.</p>
                </div>
            )}

            {clientSubView === 'reports' && (
                 <div className="panel-card" style={{ textAlign: 'center', padding: '50px' }}>
                    <h2 style={{ color: '#3498db' }}>📄 Histórico</h2>
                    <p>Histórico de compras de {selectedClient.nome}.</p>
                </div>
            )}
        </div>
      );
  }

  // MODO 3: Busca (Estado Inicial)
  return (
    <div className="search-container">
      <h1 className="search-title">Gestão de Clientes</h1>
      <p className="search-subtitle">Busque um cliente para iniciar uma venda ou visualizar detalhes.</p>

      <ClientSearch onClientSelect={setSelectedClient} onRegisterNew={handleStartRegister} />

      <div className="search-tip-box">
         <strong>Dica:</strong> Utilize a barra de busca acima. Pressione <em>ENTER</em> para novos cadastros.
      </div>
    </div>
  );
}

/* * --- Sub-componente Rápido: Formulário de Registro ---
 * (Idealmente mover para arquivo separado)
 */
function ClientRegistrationForm({ initialData, onCancel, onSuccess }) {
    const [formData, setFormData] = useState({
        nome: initialData.nome || '',
        email: '',
        telefone: '',
        documento: initialData.documento || ''
    });

    const handleSubmit = async () => {
        if (!formData.nome) return alert("Nome é obrigatório");
        try {
            const response = await api.post('/clientes', formData);
            alert("Cliente cadastrado!");
            onSuccess(response.data);
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Novo Cliente</h2>
            <div className="form-grid">
                <div>
                    <label className="form-label">Nome Completo</label>
                    <input type="text" className="form-input-large" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                </div>
                <div>
                     <label className="form-label">Documento (CPF/CNPJ)</label>
                     <input type="text" className="form-input" value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} />
                </div>
                {/* Outros campos... */}
            </div>
            <div className="form-actions">
                <button onClick={onCancel} className="btn-base btn-cancel">Cancelar</button>
                <button onClick={handleSubmit} className="btn-base btn-confirm">Confirmar</button>
            </div>
        </div>
    );
}

/* * --- Sub-componente Rápido: PDV ---
 * (Idealmente mover para arquivo separado)
 */
function ClientPOS() {
    const { cart, addToCart } = useGlobal();

    return (
        <div className="pos-grid">
            <div className="panel-card">
                <h3>Produtos</h3>
                <div className="products-list">
                    {/* Aqui entraria um useEffect para buscar da API */}
                    {['Camiseta', 'Calça Jeans', 'Tênis'].map(prod => (
                    <button key={prod} onClick={() => addToCart({ name: prod, price: 50.0 })} className="btn-product">
                        <strong>{prod}</strong><br/><small>R$ 50,00</small>
                    </button>
                    ))}
                </div>
            </div>
            <div className="panel-card">
                <h3>Carrinho ({cart.length})</h3>
                <div className="cart-total">Total: R$ {cart.reduce((acc, i) => acc + i.price, 0).toFixed(2)}</div>
            </div>
        </div>
    )
}