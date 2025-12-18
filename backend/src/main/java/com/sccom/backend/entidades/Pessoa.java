package com.sccom.backend.entidades;

import com.sccom.backend.enums.TipoPessoa;
import jakarta.persistence.*;
import lombok.Data;
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

    private String endereco;
    private String telefone;
    private String email;

    @Column(updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDateTime.now();
    }
}