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

export default function BuscaClientes({ onClientSelect, onRegisterNew }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);

    // Efeito Debounce
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (query.length >= 1) {
                try {
                    const response = await api.get('/clientes/busca-rapida', { params: { q: query } });
                    setResults(response.data);
                    setShowDropdown(true); // Abre o dropdown independente de ter resultados
                    setActiveIndex(-1);
                } catch (error) {
                    setResults([]);
                    setShowDropdown(true); // Também mostra o dropdown no erro (para exibir "Nenhum encontrado")
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 100);
        return () => clearTimeout(timeOutId);
    }, [query]);

    // Handle Selection
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

            // 1. Se tem resultados e um item está ativo (ou o primeiro), seleciona
            if (showDropdown && results.length > 0) {
                const targetIndex = activeIndex >= 0 ? activeIndex : 0;
                handleSelect(results[targetIndex].id);
                return;
            }

            // 2. Se NÃO tem resultados (Nenhum cliente encontrado), tenta cadastrar
            if (results.length === 0) {
                const cleanInput = query.trim();
                const cleanDoc = limparDocumento(cleanInput);
                const hasNumbers = /\d/.test(cleanInput);

                console.log("Tentando cadastrar:", cleanInput); // Debug

                if (hasNumbers) {
                    // Valida Documento
                    const isCpf = cleanDoc.length === 11 && validarCPF(cleanDoc);
                    const isCnpj = cleanDoc.length === 14 && validarCNPJ(cleanDoc);

                    if (isCpf || isCnpj) {
                        onRegisterNew(cleanDoc); // Manda o documento limpo
                        setShowDropdown(false);  // Fecha o dropdown após iniciar cadastro
                    } else {
                        alert("CPF/CNPJ inválido. Verifique os dígitos.");
                    }
                } else {
                    // É um nome!
                    if (cleanInput.length > 2) {
                        onRegisterNew(cleanInput);
                        setShowDropdown(false);
                    }
                }
            }
        }
        else if (e.key === 'ArrowDown' && results.length > 0) {
            setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        }
        else if (e.key === 'ArrowUp' && results.length > 0) {
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
    };

    // Click Outside
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
                placeholder="Busque o CPF/CNPJ para iniciar o atendimento..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 1 && setShowDropdown(true)}
            />

            {/* Renderização Condicional Melhorada */}
            {showDropdown && query.length >= 1 && (
                <ul className="dropdown-results">
                    {results.length > 0 ? (
                        results.map((cliente, index) => (
                            <li
                                key={cliente.id}
                                className={`result-item ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => handleSelect(cliente.id)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <span className="item-name">{cliente.nome}</span>
                                <span className="item-doc">{cliente.documento}</span>
                            </li>
                        ))
                    ) : (
                        /* Mensagem de Feedback quando não há resultados */
                        <li className="result-item no-result" onClick={() => {}}>
                            <span className="texto-sem-resultado">Nenhum cliente encontrado</span>
                            <span className="texto-acao-cadastro"> Pressione <strong>ENTER</strong> para cadastrar</span>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}