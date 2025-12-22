/**
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Controller REST responsável por operações relacionadas a clientes.
 * Recebe requisições da API, valida entradas e retorna dados de clientes e/ou
 * códigos de status.
 * ----------------------------------------------------------------------------
 */

package com.sccom.backend.controladores;

import com.sccom.backend.dtos.BuscaClienteDTO;
import com.sccom.backend.dtos.ClienteDTO;
import com.sccom.backend.entidades.Cliente;
import com.sccom.backend.repositorios.RepoCliente;
import com.sccom.backend.servicos.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clientes")
public class ControladorCliente {

    @Autowired
    private ClienteService service;

    @Autowired
    private RepoCliente repository;

    @PostMapping
    public ResponseEntity<ClienteDTO> criar(@RequestBody ClienteDTO dto) {
        ClienteDTO novoCliente = service.salvar(dto);
        return ResponseEntity.ok(novoCliente);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable Long id, @RequestBody ClienteDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @GetMapping("/busca-rapida")
    public ResponseEntity<List<BuscaClienteDTO>> buscarClientes(@RequestParam String documento) {

        String docLimpo = documento != null ? documento.replaceAll("\\D", "") : "";

        if (docLimpo.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<Cliente> clientes = repository.buscarPorInicioDocumento(docLimpo);

        List<BuscaClienteDTO> resultado = clientes.stream()
                .map(BuscaClienteDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resultado);
    }
}