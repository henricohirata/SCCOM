/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Representa um colaborador no sistema.
 * Mapeia a tabela 'colaborador' e expande as informações da pessoa com dados
 * de login, RH, etc.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.entidades;

import com.sccom.backend.enums.CargoColaborador;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Colaborador {

    @Id
    @Column(name = "id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    @Column(unique = true, nullable = false, length = 50)
    private String login;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CargoColaborador cargo;

    @ElementCollection
    @CollectionTable(name = "niveis_colaborador", joinColumns = @JoinColumn(name = "id_colaborador"))
    @Enumerated(EnumType.STRING)
    @Column(name = "nivel")
    private Set<CargoColaborador> niveis = new HashSet<>();

    @Column(unique = true, length = 20)
    private String matricula;

    private LocalDate dataAdmissao;
    private LocalDate dataDemissao;

    private Boolean ativo = true;

    public void addPerfil(CargoColaborador cargo) {
        this.niveis.add(cargo);
    }
}