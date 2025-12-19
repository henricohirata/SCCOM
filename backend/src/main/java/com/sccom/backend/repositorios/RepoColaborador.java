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