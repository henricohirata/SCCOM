import { useForm } from 'react-hook-form';
import api from '../services/api';

function CadastroCliente() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            // Conversões simples para bater com o DTO e Enum
            const payload = {
                ...data,
                ativo: true,
                limiteCredito: parseFloat(data.limiteCredito)
            };
            
            await api.post('/clientes', payload);
            alert('Cliente salvo com sucesso!');
            reset();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar cliente.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cadastro de Cliente</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                
                <label>Documento (CPF/CNPJ):</label>
                <input {...register("documento")} required placeholder="Apenas números" />

                <label>Nome:</label>
                <input {...register("nome")} required />

                <label>Tipo:</label>
                <select {...register("tipo")}>
                    <option value="FISICA">Física</option>
                    <option value="JURIDICA">Jurídica</option>
                </select>

                <label>Email:</label>
                <input {...register("email")} type="email" />

                <label>Limite de Crédito:</label>
                <input {...register("limiteCredito")} type="number" step="0.01" />

                <label>Observações:</label>
                <textarea {...register("observacoes")} />

                <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>Salvar</button>
            </form>
        </div>
    );
}

export default CadastroCliente;