package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoCliente extends JpaRepository<Cliente, Long> {

    // Aqui você pode adicionar buscas específicas, ex: "buscar todos os clientes bloqueados"
    List<Cliente> findByAtivo(Boolean ativo);
}