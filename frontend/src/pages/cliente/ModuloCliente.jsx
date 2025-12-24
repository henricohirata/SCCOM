/*
 * ----------------------------------------------------------------------------
 * Módulo: Clientes
 * ----------------------------------------------------------------------------
 * Atua como o container principal desta seção.
 * Define a estrutura visual específica de Clientes (Área Principal + Sidebar).
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react';
import TelaCliente from './TelaCliente';
import BarraLateralCliente from './MenuCliente';
import { useAutenticacao } from '../../context/AutenticacaoContext';

export default function ModuloCliente() {

  // Estado local do módulo (não precisa mais estar no Contexto Global se for exclusivo daqui)
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [subVisao, setSubVisao] = useState('pdv'); // 'pdv', 'devolucao', 'historico'

  const { temPermissao } = useAutenticacao();

  // Função para limpar a sessão do cliente
  const fecharSessaoCliente = () => {
    setClienteSelecionado(null);
    setSubVisao('pdv');
  };

  return (
    <>
      {/* --- Ilha 2: Área de Trabalho Principal (Específica de Clientes) --- */}
      {/* Note que estamos injetando este main direto no Outlet do LayoutPrincipal */}
      <main className="main-island">
        <div className="workspace-content">
          <TelaCliente
            clienteSelecionado={clienteSelecionado}
            setClienteSelecionado={setClienteSelecionado}
            subVisao={subVisao}
            fecharSessaoCliente={fecharSessaoCliente}
          />
        </div>
      </main>

      {/* --- Ilha 3: Painel de Contexto (Sidebar Direita) --- */}
      {/* Só renderiza se tiver um cliente selecionado E o usuário tiver permissão */}
      {clienteSelecionado && temPermissao(['ADMIN', 'VENDEDOR', 'GERENTE']) && (
        <div className="context-wrapper">
          <BarraLateralCliente
             cliente={clienteSelecionado}
             subVisao={subVisao}
             setSubVisao={setSubVisao}
             aoFechar={fecharSessaoCliente}
          />
        </div>
      )}
    </>
  );
}