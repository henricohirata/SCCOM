/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Interface de acesso a dados para a entidade Fornecedor.
 * Fornece mecanismos para interagir com registros de fornecedores no banco de
 * dados, incluindo busca por ID ou outros atributos.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoFornecedor extends JpaRepository<Fornecedor, Long> {
}