/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Representa um cliente no sistema.
 * Mapeia a tabela 'cliente' e expande as informações da pessoa com dados de
 * status, crédito, etc.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.entidades;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Cliente {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    private BigDecimal limiteCredito;
    private Boolean ativo = true;
    private String observacoes;
}