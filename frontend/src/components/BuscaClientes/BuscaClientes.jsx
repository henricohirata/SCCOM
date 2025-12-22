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
import './BuscaClientes.css';

// --- Funções Auxiliares de Validação (Corrigidas) ---
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
}

export default function ClientSearch({ onClientSelect, onRegisterNew }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);

    // 1. Efeito de Busca com Debounce
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (query.length >= 1) {
                try {
                    // Importante: Seu backend deve aceitar ?q=... (conforme ajustamos no ControladorCliente)
                    const response = await api.get('/clientes/busca-rapida', {
                        params: { q: query }
                    });
                    setResults(response.data);
                    setShowDropdown(true);
                    setActiveIndex(-1);
                } catch (error) {
                    console.error("Erro ao buscar clientes:", error);
                    setResults([]); // Garante lista vazia em erro
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timeOutId);
    }, [query]);

    // 2. Lógica de Seleção
    const handleSelect = async (clientId) => {
        try {
            const response = await api.get(`/clientes/${clientId}`);
            if (onClientSelect) onClientSelect(response.data);
            setShowDropdown(false);
            setQuery('');
        } catch (error) {
            console.error("Erro ao carregar detalhes:", error);
            alert("Erro ao carregar cliente selecionado.");
        }
    };

    // 3. Navegação por Teclado e NOVO REGISTRO
    const handleKeyDown = (e) => {
        // Se a tecla for ENTER
        if (e.key === 'Enter') {
            e.preventDefault();

            // CASO 1: Tem resultados e um item está selecionado (destacado)
            if (showDropdown && results.length > 0 && activeIndex >= 0) {
                handleSelect(results[activeIndex].id);
                return;
            }

            // CASO 2: Tem resultados mas NENHUM selecionado -> Seleciona o primeiro
            if (showDropdown && results.length > 0 && activeIndex === -1) {
                handleSelect(results[0].id);
                return;
            }

            // CASO 3: NÃO tem resultados (Lista vazia) -> Tenta cadastrar
            if (results.length === 0) {
                const cleanDoc = query.replace(/\D/g, '');
                
                if (cleanDoc.length === 11) {
                    if (validarCPF(cleanDoc)) {
                        if (onRegisterNew) {
                            onRegisterNew(cleanDoc);
                        } else {
                            console.warn("Função onRegisterNew não fornecida pelo componente pai.");
                        }
                    } else {
                        alert("CPF inválido. Verifique os números digitados.");
                    }
                } else if (cleanDoc.length === 14) {
                    if (validarCNPJ(cleanDoc)) {
                        if (onRegisterNew) {
                            onRegisterNew(cleanDoc);
                        } else {
                            console.warn("Função onRegisterNew não fornecida pelo componente pai.");
                        }
                    } else {
                        alert("CNPJ inválido. Verifique os números digitados.");
                    }
                }
            }
        } 
        // Navegação (Setas)
        else if (e.key === 'ArrowDown' && showDropdown && results.length > 0) {
            e.preventDefault();
            setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } 
        else if (e.key === 'ArrowUp' && showDropdown && results.length > 0) {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
    };

    // 4. Fechar ao clicar fora
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
                placeholder="Digite CPF, CNPJ ou Nome..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 1 && setShowDropdown(true)}
            />

            {/* Lista de Resultados */}
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
                            <span className="item-doc">{cliente.cpfCnpj}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Mensagem de "Não Encontrado" (Agora aparece sempre que results=0 e há busca) */}
            {showDropdown && results.length === 0 && query.length >= 1 && (
                <div className="dropdown-results">
                    <div className="result-item" style={{ color: '#999', cursor: 'default', padding: '15px' }}>
                        Nenhum cliente encontrado. <br/>
                        <span style={{ fontSize: '0.85em', color: '#27ae60' }}>
                           Tecle <strong>ENTER</strong> para cadastrar novo.
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}