package com.sccom.backend.entidades;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Cliente {

    @Id
    private Long id; // Note que NÃO tem @GeneratedValue

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    private BigDecimal limiteCredito;
    private Boolean ativo = true;
    private String observacoes;
}