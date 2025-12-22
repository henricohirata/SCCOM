/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Representa um fornecedor no sistema.
 * Mapeia a tabela 'fornecedor' e expande as informações da pessoa com dados de
 * atividade, contato, etc.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.entidades;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Fornecedor {

    @Id
    @Column(name = "id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    // --- DADOS ESPECÍFICOS DO LEGADO ---

    @Column(columnDefinition = "TEXT")
    private String observacoes; // Campo 'Obs' do FFornecedores.py

    // --- CAMPOS ÚTEIS PARA O FUTURO (Opcionais) ---
    private String site;
    private String contatoComercial; // Nome do vendedor que nos atende lá

    // Controle de Status (Ativo/Inativo para compras)
    private Boolean ativo = true;
}