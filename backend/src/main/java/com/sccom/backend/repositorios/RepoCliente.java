/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Interface de acesso a dados para a entidade Cliente.
 * Fornece mecanismos para interagir com registros de clientes no banco de
 * dados, incluindo busca por ID ou outros atributos.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoCliente extends JpaRepository<Cliente, Long> {

    List<Cliente> findByAtivo(Boolean ativo);

    @Query("SELECT c FROM Cliente c JOIN c.pessoa p WHERE p.documento LIKE :termo%")
    List<Cliente> buscarPorInicioDocumento(@Param("termo") String termo);
}