// PedidosContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { TPedido } from "../types";

interface PedidosContextProps {
  pedidos: TPedido[];
  atualizarPedidos: (cliente: number, vendedor: number) => void;
}

export const PedidosContext = createContext<PedidosContextProps | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<TPedido[]>([]);

  const atualizarPedidos = async (cliente: number, vendedor: number) => {
    const headers = {
      'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
      'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    };
    
    try {
      const response = await fetch('/api/pedidos', {
        method: 'GET',
        headers,
      });

      const json = await response.json();

      const pedidosFiltrados = json.data.filter((pedido: any) => 
        pedido.vendedor_pedido_id === vendedor && pedido.id_cliente === cliente
      );

      setPedidos(pedidosFiltrados); // Atualiza os pedidos no contexto
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <PedidosContext.Provider value={{ pedidos, atualizarPedidos }}>
      {children}
    </PedidosContext.Provider>
  );
};
