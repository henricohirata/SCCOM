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
    public ResponseEntity<List<BuscaClienteDTO>> buscarClientes(@RequestParam String q) {
        // 1. Sanitização: Remove pontos, traços e barras que o usuário digitar
        // Ex: "123.4" vira "1234"
        String termoLimpo = q != null ? q.replaceAll("\\D", "") : "";

        // 2. Validação básica de performance
        if (termoLimpo.length() < 3) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        // 3. Busca no banco com o JOIN
        List<Cliente> clientes = repository.buscarPorInicioDocumento(termoLimpo);

        // 4. Conversão para DTO (Java Stream API)
        List<BuscaClienteDTO> resultado = clientes.stream()
                .map(BuscaClienteDTO::new) // Usa o construtor que criamos acima
                .collect(Collectors.toList());

        return ResponseEntity.ok(resultado);
    }

    // TODO: Adicionar GET, PUT, DELETE conforme necessidade
}