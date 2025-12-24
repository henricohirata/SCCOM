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
import BuscaClientes from '../../components/BuscaClientes/BuscaClientes';
import './TelaCliente.css';

export default function TelaCliente({ clienteSelecionado, setClienteSelecionado, subVisao, fecharSessaoCliente }) {
  const [estaCadastrando, setEstaCadastrando] = useState(false);
  const [dadosPreenchidos, setDadosPreenchidos] = useState(null);

  // Handler para iniciar cadastro vindo da busca
  const iniciarCadastro = (valorInput) => {
      const temNumeros = /\d/.test(valorInput);
      setDadosPreenchidos({
          documento: temNumeros ? valorInput : '',
          nome: !temNumeros ? valorInput : ''
      });
      setEstaCadastrando(true);
  };

  if (estaCadastrando) {
      return (
          <div className="cadastro-placeholder">
             {/* Aqui entraria o <FormularioCadastro /> */}
             <h2>Cadastro de Cliente</h2>
             <button onClick={() => setEstaCadastrando(false)}>Cancelar</button>
             <button onClick={() => {
                 setClienteSelecionado({ nome: 'Novo Cliente', documento: '000' });
                 setEstaCadastrando(false);
             }}>Salvar (Mock)</button>
          </div>
      );
  }

  // Dashboard do Cliente (Logado)
  if (clienteSelecionado) {
      return (
        <div className="search-container">
           <div className="client-header">
               <div>
                  <h2 className="search-title">Atendimento: {clienteSelecionado.nome}</h2>
                  <small style={{color: '#666'}}>{clienteSelecionado.documento}</small>
               </div>
            </div>

            {/* O conteúdo central muda baseado na subVisao controlada pelo Módulo */}
            {subVisao === 'pdv' && <div className="pdv-mock">Area do PDV</div>}
            {subVisao === 'devolucao' && <h2>🔄 Devoluções (Em breve)</h2>}
            {subVisao === 'historico' && <h2>📄 Histórico (Em breve)</h2>}
        </div>
      );
  }

  // Modo Busca (Padrão)
  return (
    <div className="search-container">
      <h1 className="search-title">Gestão de Clientes</h1>
      <p className="search-subtitle">Busque um cliente para iniciar.</p>

      <BuscaClientes
        onClientSelect={setClienteSelecionado}
        onRegisterNew={iniciarCadastro}
      />
    </div>
  );
}