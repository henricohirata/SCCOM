// src/components/ClientSearch/ClientSearch.jsx
import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import './BuscaClientes.css';

export default function ClientSearch({ onClientSelect }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1); // Para navegação com teclado
    const wrapperRef = useRef(null);

    // 1. Efeito de Busca com Debounce
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (query.length >= 1) {
                try {
                    // O endpoint que vimos no ControladorCliente.java
                    const response = await api.get('/clientes/busca-rapida', {
                        params: { q: query }
                    });
                    setResults(response.data);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Erro ao buscar clientes:", error);
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 300); // Espera 300ms após parar de digitar

        return () => clearTimeout(timeOutId);
    }, [query]);

    // 2. Lógica de Seleção (Busca o Cliente Completo)
    const handleSelect = async (clientId) => {
        try {
            // Busca os detalhes completos para preencher o contexto global
            const response = await api.get(`/clientes/${clientId}`);
            onClientSelect(response.data); // Passa o DTO completo para o pai
            setShowDropdown(false);
            setQuery(''); // Limpa a busca
        } catch (error) {
            console.error("Erro ao carregar detalhes do cliente:", error);
            alert("Erro ao carregar cliente selecionado.");
        }
    };

    // 3. Navegação por Teclado (Setas e Enter)
    const handleKeyDown = (e) => {
        if (!showDropdown || results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && results[activeIndex]) {
                handleSelect(results[activeIndex].id);
            }
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
                placeholder="Digite CPF, CNPJ ou Nome (mín 3 letras)..."
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
                            <span className="item-doc">{cliente.cpfCnpj}</span>
                        </li>
                    ))}
                </ul>
            )}

            {showDropdown && results.length === 0 && query.length >= 1 && (
                <div className="dropdown-results">
                    <div className="result-item" style={{ color: '#999', cursor: 'default' }}>
                        Nenhum cliente encontrado.
                    </div>
                </div>
            )}
        </div>
    );
}