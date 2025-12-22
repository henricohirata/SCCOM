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
import api from '../../services/api'; // <--- Importante: Importar a API

export default function ScreenCliente() {
  const { selectedClient, setSelectedClient, clientSubView, cart, addToCart, clearClientSession } = useGlobal();

  // Estados para o fluxo de cadastro
  const [isRegistering, setIsRegistering] = useState(false);
  const [preFilledDoc, setPreFilledDoc] = useState('');
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
      nome: '',
      email: '',
      telefone: ''
  });

  // Inicia o cadastro vindo da Busca (recebe o CPF/CNPJ validado)
  const handleStartRegister = (doc) => {
      setPreFilledDoc(doc);
      setFormData({ nome: '', email: '', telefone: '' }); // Limpa form anterior
      setIsRegistering(true);
  };

  const handleCancelRegister = () => {
      setIsRegistering(false);
      setPreFilledDoc('');
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- INTEGRAÇÃO BACKEND: Envia o POST para criar o cliente ---
  const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const tipoPessoa = preFilledDoc.length === 14 ? 'JURIDICA' : 'FISICA';
          // Monta o objeto conforme esperado pelo ClienteDTO no Java
          const payload = {
              documento: preFilledDoc, // Documento validado (imutável neste form)
              tipo: tipoPessoa,
              nome: formData.nome,
              email: formData.email,
              telefone: formData.telefone
          };

          const response = await api.post('/clientes', payload);

          // Sucesso:
          alert(`Cliente "${response.data.nome}" cadastrado com sucesso!`);
          
          // Já seleciona o cliente recém-criado e vai para o PDV
          setSelectedClient(response.data);
          setIsRegistering(false);

      } catch (error) {
          console.error("Erro ao cadastrar cliente:", error);
          const msg = error.response?.data?.message || "Erro desconhecido ao conectar com o servidor.";
          alert(`Falha no cadastro: ${msg}`);
      }
  };

  // VIEW 3: Cadastro de Novo Cliente
  if (isRegistering) {
      return (
          <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Novo Cadastro</h2>
              
              <div style={{ background: '#e8f6f3', padding: '15px', borderRadius: '6px', marginBottom: '25px', color: '#16a085' }}>
                  Documento Validado: <strong>{preFilledDoc}</strong>
              </div>
              
              <form onSubmit={handleRegisterSubmit}>
                  <div style={{ display: 'grid', gap: '15px' }}>
                      <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#34495e' }}>Nome Completo / Razão Social *</label>
                          <input 
                            type="text" 
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required 
                            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #bdc3c7', fontSize: '16px' }} 
                            placeholder="Ex: João Silva ou Empresa LTDA"
                          />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div>
                              <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>E-mail</label>
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #bdc3c7' }} 
                                placeholder="cliente@email.com"
                              />
                          </div>
                          <div>
                              <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>Telefone</label>
                              <input 
                                type="text" 
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #bdc3c7' }} 
                                placeholder="(XX) 9XXXX-XXXX"
                              />
                          </div>
                      </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'flex-end' }}>
                      <button 
                        type="button" 
                        onClick={handleCancelRegister}
                        style={{ padding: '12px 24px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                          Cancelar
                      </button>
                      <button 
                        type="submit" 
                        style={{ padding: '12px 24px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                          Confirmar Cadastro
                      </button>
                  </div>
              </form>
          </div>
      );
  }

  // VIEW 1: Seleção de Cliente
  if (!selectedClient) {
    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '10px', color: '#2c3e50' }}>Identificar Cliente</h1>
        <p style={{ marginBottom: '30px', color: '#7f8c8d' }}>
          Inicie a venda buscando pelo CPF/CNPJ ou Nome do cliente.
        </p>

        <ClientSearch 
            onClientSelect={setSelectedClient} 
            onRegisterNew={handleStartRegister}
        />
        
        <div style={{ marginTop: '40px', padding: '20px', background: '#fff3cd', borderRadius: '8px', color: '#856404' }}>
          <strong>Dica:</strong> Se o cliente não for encontrado, digite o CPF/CNPJ completo e tecle ENTER para cadastrar.
        </div>
      </div>
    );
  }

  // VIEW 2: Cliente Selecionado (Painel de Vendas) - MANTIDA IGUAL
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
    </div>
  );
}