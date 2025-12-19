package com.sccom.backend.controladores;

import com.sccom.backend.dtos.ClienteDTO;
import com.sccom.backend.servicos.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ControladorCliente {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<ClienteDTO> criar(@RequestBody ClienteDTO dto) {
        ClienteDTO novoCliente = service.salvar(dto);
        return ResponseEntity.ok(novoCliente);
    }

    // TODO: Adicionar GET, PUT, DELETE conforme necessidade
}