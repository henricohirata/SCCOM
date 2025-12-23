/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Componente de pesquisa de clientes.
 * Implementa um input com debounce para buscar clientes na API em tempo real e
 * exibir os resultados em uma lista selecionável para iniciar uma venda.
 * ----------------------------------------------------------------------------
 */

import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { validarCPF, validarCNPJ, limparDocumento } from '../../utils/validadores';
import './BuscaClientes.css';

export default function ClientSearch({ onClientSelect, onRegisterNew }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);

    // Efeito Debounce (Mantido igual)
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (query.length >= 1) {
                try {
                    const response = await api.get('/clientes/busca-rapida', { params: { q: query } });
                    setResults(response.data);
                    setShowDropdown(true);
                    setActiveIndex(-1);
                } catch (error) {
                    setResults([]);
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 300);
        return () => clearTimeout(timeOutId);
    }, [query]);

    // Handle Selection (Mantido igual)
    const handleSelect = async (clientId) => {
        try {
            const response = await api.get(`/clientes/${clientId}`);
            if (onClientSelect) onClientSelect(response.data);
            setShowDropdown(false);
            setQuery('');
        } catch (error) {
            alert("Erro ao carregar cliente.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // 1. Se tem item selecionado no dropdown, abre ele
            if (showDropdown && results.length > 0) {
                const targetIndex = activeIndex >= 0 ? activeIndex : 0;
                handleSelect(results[targetIndex].id);
                return;
            }

            // 2. Se não tem resultados, analisamos o input para DECIDIR se é cadastro
            if (results.length === 0) {
                const cleanInput = query.trim();
                const cleanDoc = limparDocumento(cleanInput);

                // Checa se parece um documento (tem numeros) ou um nome (só letras/espaço)
                const hasNumbers = /\d/.test(cleanInput);

                if (hasNumbers) {
                    // Tenta validar como documento
                    const isCpf = cleanDoc.length === 11 && validarCPF(cleanDoc);
                    const isCnpj = cleanDoc.length === 14 && validarCNPJ(cleanDoc);

                    if (isCpf || isCnpj) {
                        onRegisterNew(cleanDoc); // Manda o documento limpo
                    } else {
                        alert("CPF/CNPJ inválido. Verifique os dígitos.");
                    }
                } else {
                    // É um nome! Permite iniciar cadastro com o nome
                    if (cleanInput.length > 2) {
                        onRegisterNew(cleanInput); // Manda o nome escrito
                    }
                }
            }
        }
        // Navegação setas (Mantido)
        else if (e.key === 'ArrowDown' && results.length > 0) {
            setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        }
        else if (e.key === 'ArrowUp' && results.length > 0) {
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
    };

    // Click Outside (Mantido)
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="client-search-container" ref={wrapperRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Busque por Nome, CPF ou CNPJ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 1 && setShowDropdown(true)}
            />

            {showDropdown && results.length > 0 && (
                <ul className="dropdown-results">
                    {results.map((cliente, index) => (
                        <li
                            key={cliente.id}
                            className={`result-item ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => handleSelect(cliente.id)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className="item-name">{cliente.nome}</span>
                            <span className="item-doc">{cliente.documento}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}