/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Configuração base do cliente HTTP (Axios). Define a URL base do backend 
 * e interceptadores para gerenciar requisições e respostas globalmente.
 * ----------------------------------------------------------------------------
 */

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081',
});

export default api;