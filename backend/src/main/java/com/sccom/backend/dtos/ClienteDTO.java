/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Objeto de Transferência de Dados (DTO) para a entidade Cliente.
 * Facilita o transporte de informações do cliente, servindo como contêiner
 * para dados de entrada (criação/atualização) e saída (visualização),
 * desacoplando a API da estrutura do banco.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.dtos;

import com.sccom.backend.enums.TipoPessoa;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ClienteDTO {

    // Dados da Pessoa
    private Long id; // Pode ser nulo na criação
    private String nome;
    private String documento; // CPF ou CNPJ
    private TipoPessoa tipo;
    private String email;
    private String telefone;

    // Endereço (Simplificado para o exemplo)
    private String logradouro;
    private String cidade;
    private String uf;
    private String cep;

    // Dados Específicos do Cliente
    private BigDecimal limiteCredito;
    private String observacoes;
    private Boolean ativo;
}