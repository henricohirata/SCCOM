/*
 * ----------------------------------------------------------------------------
 * Módulo: Clientes
 * ----------------------------------------------------------------------------
 * Atua como o container principal desta seção.
 * Define a estrutura visual específica de Clientes (Área Principal + Sidebar).
 * ----------------------------------------------------------------------------
 */
import TelaCliente from './TelaCliente';
import MenuCliente from './MenuCliente';
import { useAtendimento } from '../../context/ContextoAtendimento'; // <--- IMPORTAR
import { useAutenticacao } from '../../context/AutenticacaoContext';

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
      <main className="main-island">
        <div className="workspace-content">
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
        <div className="context-wrapper">
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