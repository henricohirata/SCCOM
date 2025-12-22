/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Interface de acesso a dados para a entidade Pessoa.
 * Fornece mecanismos para interagir com registros de pessoas no banco de
 * dados, incluindo busca por ID ou outros atributos.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoPessoa extends JpaRepository<Pessoa, Long> {

    // O Spring cria o SQL automaticamente: "SELECT count(*) > 0 FROM pessoa WHERE documento = ?"
    boolean existsByDocumento(String documento);

    // Útil para buscar alguém pelo CPF/CNPJ
    Optional<Pessoa> findByDocumento(String documento);
}