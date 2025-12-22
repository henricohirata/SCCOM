/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Representa uma pessoa (física ou jurídica) no sistema.
 * Mapeia a tabela 'pessoa' e armazena dados pessoais, contato, e ‘IDs’.
 * É expandido pelas tabelas 'cliente', 'fornecedor', e 'colaborador'. Uma
 * pessoa pode assumir múltiplos papéis no sistema.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.entidades;

import com.sccom.backend.enums.TipoPessoa;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    // unique = true impede que duas pessoas tenham o mesmo CPF/CNPJ
    @Column(nullable = false, unique = true, length = 20)
    private String documento;

    // FISICA ou JURIDICA
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TipoPessoa tipo;

    // Data de Nascimento/Fundacao
    private LocalDate dataNascimento;

    // Foto de perfil
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] foto;

    // Endereco
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String cep;

    // Informacoes de Contato
    private String telefone;
    private String email;

    @Column(updatable = false)
    private LocalDateTime dataCadastro;

    private LocalDateTime dataUltimaAtualizacao;

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDateTime.now();
        this.dataUltimaAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataUltimaAtualizacao = LocalDateTime.now();
    }
}