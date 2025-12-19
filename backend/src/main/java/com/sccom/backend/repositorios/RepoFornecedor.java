package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoFornecedor extends JpaRepository<Fornecedor, Long> {
}