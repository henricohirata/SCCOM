package com.sccom.backend.entidades;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Fornecedor {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Pessoa pessoa;

    private String site;
    private String contatoComercial;
}