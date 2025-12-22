/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Objeto de Transferência de Dados (DTO) para a entidade Busca Cliente.
 * Facilita o transporte de informações do cliente, servindo como contêiner
 * para dados de entrada (criação/atualização) e saída (visualização),
 * desacoplando a API da estrutura do banco.
 * Minimiza o compartilhamento de dados para tornar a listagem de múltiplos
 * clientes mais eficientes a compartilhas apenas dados essenciais.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.dtos;

import com.sccom.backend.entidades.Cliente;
import lombok.Data;

@Data
public class BuscaClienteDTO {

    private Long id;
    private String nome;
    private String documento;

    public BuscaClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        // Proteção contra NullPointer caso existam clientes legados sem Pessoa
        if (cliente.getPessoa() != null) {
            this.nome = cliente.getPessoa().getNome();
            this.documento = cliente.getPessoa().getDocumento();
        }
    }

    // Getters...
}