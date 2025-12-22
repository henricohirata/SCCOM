package com.sccom.backend.dtos;

import com.sccom.backend.entidades.Cliente;
import lombok.Data;

@Data
public class BuscaClienteDTO {

    private Long id;       // ID do Cliente (para o link)
    private String nome;   // Vem de Pessoa
    private String cpfCnpj;// Vem de Pessoa

    public BuscaClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        // Proteção contra NullPointer caso existam clientes legados sem Pessoa
        if (cliente.getPessoa() != null) {
            this.nome = cliente.getPessoa().getNome();
            this.cpfCnpj = cliente.getPessoa().getDocumento();
        }
    }

    // Getters...
}