import { useEffect, useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('Tentando conectar ao Java...');

  useEffect(() => {
    // Tenta bater na porta 8081 do Backend
    fetch('http://localhost:8081/teste')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.text();
      })
      .then(data => setMensagem(data))
      .catch(error => setMensagem('Erro: ' + error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Sistema de Vendas (SCCOM)</h1>
      <hr />
      <div style={{ padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', border: '1px solid #006064' }}>
        <strong>Status da Conexão:</strong>
        {/* Se funcionar, a mensagem azul do Java vai aparecer aqui */}
        <p style={{ fontSize: '20px', color: '#006064', fontWeight: 'bold' }}>
          {mensagem}
        </p>
      </div>
    </div>
  );
}

export default App;