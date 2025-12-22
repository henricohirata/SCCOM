/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Interface de acesso a dados para a entidade Colaborador.
 * Fornece mecanismos para interagir com registros de colaboradores no banco de
 * dados, incluindo busca por ID ou outros atributos.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoColaborador extends JpaRepository<Colaborador, Long> {

    // Útil para login ou recuperação de senha no futuro
    Optional<Colaborador> findByMatricula(String matricula);
}