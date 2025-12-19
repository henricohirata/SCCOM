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