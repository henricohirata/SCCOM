/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Módulo de Clientes.
 * Contém a lógica de integração entre o contexto de atendimento e as
 * telas/componentes específicos do módulo de Clientes.
 * Constrói a interface principal com da tela de clientes.
 * ----------------------------------------------------------------------------
 */

import TelaCliente from '../pages/cliente/TelaCliente';
import MenuCliente from '../pages/cliente/MenuCliente';
import { useAtendimento } from '../context/ContextoAtendimento';
import { useAutenticacao } from '../context/AutenticacaoContext';
import '../pages/cliente/Cliente.css';

export default function ModuloCliente() {
  // Em vez de useState local, usamos o contexto
  const {
    clienteEmAtendimento,
    iniciarAtendimento,
    encerrarAtendimento,
    subVisao,
    setSubVisao
  } = useAtendimento();

  const { temPermissao } = useAutenticacao();

  return (
    <>
      <main className="ilha-principal">
        <div className="workspace">
          <TelaCliente
            // Mapeando os nomes do contexto para as props que a Tela já espera
            clienteSelecionado={clienteEmAtendimento}
            setClienteSelecionado={iniciarAtendimento} // A função de iniciar faz o papel do set
            subVisao={subVisao}
            fecharSessaoCliente={encerrarAtendimento}
          />
        </div>
      </main>

      {/* Sidebar Direita - Persistente */}
      {clienteEmAtendimento && temPermissao(['ADMIN', 'VENDEDOR', 'GERENTE']) && (
        <div className="area-lateral-contexto">
          <MenuCliente
             cliente={clienteEmAtendimento}
             subVisao={subVisao}
             setSubVisao={setSubVisao}
             aoFechar={encerrarAtendimento}
          />
        </div>
      )}
    </>
  );
}