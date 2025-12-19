package com.sccom.backend.servicos;

import com.sccom.backend.dtos.ClienteDTO;
import com.sccom.backend.entidades.Cliente;
import com.sccom.backend.entidades.Pessoa;
import com.sccom.backend.repositorios.RepoCliente;
import com.sccom.backend.repositorios.RepoPessoa;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private RepoPessoa repoPessoa;

    @Autowired
    private RepoCliente repoCliente;

    @Transactional
    public ClienteDTO salvar(ClienteDTO dto) {
        // 1. Verifica se a Pessoa já existe pelo Documento (CPF/CNPJ)
        Optional<Pessoa> pessoaExistente = repoPessoa.findByDocumento(dto.getDocumento());

        Pessoa pessoa;
        if (pessoaExistente.isPresent()) {
            pessoa = pessoaExistente.get();
            // Aqui você pode decidir se atualiza os dados da pessoa (nome, endereço)
            // com o que veio no formulário ou se mantém o antigo.
            // Vamos atualizar para garantir dados recentes:
            atualizarDadosPessoa(pessoa, dto);
        } else {
            pessoa = new Pessoa();
            atualizarDadosPessoa(pessoa, dto);
        }

        // Salva/Atualiza a Pessoa primeiro para gerar/garantir o ID
        pessoa = repoPessoa.save(pessoa);

        // 2. Prepara o Cliente
        // Verifica se esse cliente já existe pelo ID da pessoa (caso seja uma edição)
        Cliente cliente = repoCliente.findById(pessoa.getId()).orElse(new Cliente());

        cliente.setPessoa(pessoa); // O @MapsId usa o ID da pessoa aqui
        cliente.setLimiteCredito(dto.getLimiteCredito());
        cliente.setObservacoes(dto.getObservacoes());
        cliente.setAtivo(dto.getAtivo() != null ? dto.getAtivo() : true);

        // Salva o Cliente
        cliente = repoCliente.save(cliente);

        // Retorna o DTO atualizado com o ID
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
}