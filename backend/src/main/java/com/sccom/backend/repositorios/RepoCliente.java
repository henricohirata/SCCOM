package com.sccom.backend.repositorios;

import com.sccom.backend.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoCliente extends JpaRepository<Cliente, Long> {

    // Aqui você pode adicionar buscas específicas, ex: "buscar todos os clientes bloqueados"
    List<Cliente> findByAtivo(Boolean ativo);

    // JPQL Personalizada:
    // Seleciona o Cliente (c), mas olha para a propriedade 'cpfCnpj'
    // dentro da relação 'pessoa' (c.pessoa.cpfCnpj).
    @Query("SELECT c FROM Cliente c JOIN c.pessoa p WHERE p.documento LIKE :termo%")
    List<Cliente> buscarPorInicioDocumento(@Param("termo") String termo);
}