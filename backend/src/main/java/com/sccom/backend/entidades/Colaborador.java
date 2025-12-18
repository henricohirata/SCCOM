package com.sccom.backend.entidades;

import com.sccom.backend.enums.CargoColaborador;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Colaborador {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CargoColaborador cargo;

    @Column(nullable = false)
    private BigDecimal salario;

    private LocalDate dataAdmissao;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(unique = true)
    private String matricula;
}