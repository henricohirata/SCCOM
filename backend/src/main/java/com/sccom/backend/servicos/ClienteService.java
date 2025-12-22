package com.sccom.backend.servicos;

import com.sccom.backend.dtos.ClienteDTO;
import com.sccom.backend.entidades.Cliente;
import com.sccom.backend.entidades.Pessoa;
import com.sccom.backend.repositorios.RepoCliente;
import com.sccom.backend.repositorios.RepoPessoa;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private RepoPessoa repoPessoa;

    @Autowired
    private RepoCliente repoCliente;

    @Transactional
    public ClienteDTO salvar(ClienteDTO dto) {
        // 1. Limpa a formatação
        String documentoLimpo = dto.getDocumento().replaceAll("\\D", "");
        dto.setDocumento(documentoLimpo);

        // 2. Busca Pessoa existente
        Optional<Pessoa> pessoaExistente = repoPessoa.findByDocumento(dto.getDocumento());

        Pessoa pessoa;
        if (pessoaExistente.isPresent()) {
            pessoa = pessoaExistente.get();

            // LÓGICA NOVA: Se a Pessoa existe, verificamos se ela JÁ É UM CLIENTE
            if (repoCliente.existsById(pessoa.getId())) {
                // Lança erro 409 Conflict e manda o ID na mensagem para o front capturar
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Cliente já existe com ID: " + pessoa.getId()
                );
            }

            // Se chegou aqui, a Pessoa existe (ex: é um Fornecedor), mas não é Cliente.
            // Atualizamos os dados cadastrais básicos da pessoa para vincular o novo perfil de Cliente
            atualizarDadosPessoa(pessoa, dto);
        } else {
            // Se não existe pessoa nenhuma, cria do zero
            pessoa = new Pessoa();
            atualizarDadosPessoa(pessoa, dto);
        }

        // Salva Pessoa
        pessoa = repoPessoa.save(pessoa);

        // Cria Cliente vinculado
        Cliente cliente = new Cliente();
        cliente.setPessoa(pessoa);
        cliente.setLimiteCredito(dto.getLimiteCredito());
        cliente.setObservacoes(dto.getObservacoes());
        cliente.setAtivo(true);

        cliente = repoCliente.save(cliente);

        dto.setId(cliente.getPessoa().getId());
        return dto;
    }

    private void atualizarDadosPessoa(Pessoa p, ClienteDTO dto) {
        p.setNome(dto.getNome());
        p.setDocumento(dto.getDocumento());
        p.setTipo(dto.getTipo());
        p.setEmail(dto.getEmail());
        p.setTelefone(dto.getTelefone());
        p.setLogradouro(dto.getLogradouro());
        p.setCidade(dto.getCidade());
        p.setUf(dto.getUf());
        p.setCep(dto.getCep());
    }

    public ClienteDTO buscarPorId(Long id) {
        Cliente cliente = repoCliente.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        // Converte Entidade -> DTO para mandar pro Front
        return converterParaDTO(cliente);
    }

    @Transactional
    public ClienteDTO atualizar(Long id, ClienteDTO dto) {
        Cliente cliente = repoCliente.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        // Atualiza dados da Pessoa
        Pessoa pessoa = cliente.getPessoa();
        atualizarDadosPessoa(pessoa, dto); // Reutiliza seu método privado existente
        repoPessoa.save(pessoa);

        // Atualiza dados do Cliente
        cliente.setLimiteCredito(dto.getLimiteCredito());
        cliente.setObservacoes(dto.getObservacoes());
        // cliente.setAtivo(...) // Se quiser permitir inativar na edição

        cliente = repoCliente.save(cliente);
        return converterParaDTO(cliente);
    }

    // Método auxiliar para não repetir código de conversão
    private ClienteDTO converterParaDTO(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getPessoa().getId());
        dto.setLimiteCredito(c.getLimiteCredito());
        dto.setObservacoes(c.getObservacoes());
        dto.setAtivo(c.getAtivo());

        // Dados da Pessoa
        Pessoa p = c.getPessoa();
        dto.setNome(p.getNome());
        dto.setDocumento(p.getDocumento());
        dto.setTipo(p.getTipo());
        dto.setEmail(p.getEmail());
        // ... mapear outros campos (telefone, endereco, etc) ...
        return dto;
    }
}