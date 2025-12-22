/*
 * ----------------------------------------------------------------------------
 * Sistema de Controle Comercial - SCCOM
 * ----------------------------------------------------------------------------
 * Autor: Henrico Hirata
 * Data: 2025-12
 * ----------------------------------------------------------------------------
 * Descrição:
 * Gerencia o estado global da aplicação. 
 * Controla a aba ativa (activeTab), o cliente selecionado para venda e o 
 * carrinho de compras (cart), evitando prop-drilling excessivo.
 * ----------------------------------------------------------------------------
 */

import { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Global State
  const [activeTab, setActiveTab] = useState('clientes'); // clientes, produtos, etc.
  
  // Client Module State (Persists even when switching tabs)
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientSubView, setClientSubView] = useState('pos'); // pos, returns, reports
  const [cart, setCart] = useState([]);

  // Mock function to add to cart (for POS)
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const clearClientSession = () => {
    setSelectedClient(null);
    setCart([]);
    setClientSubView('pos');
  };

  return (
    <GlobalContext.Provider value={{
      activeTab, setActiveTab,
      selectedClient, setSelectedClient,
      clientSubView, setClientSubView,
      cart, addToCart,
      clearClientSession
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);