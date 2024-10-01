// PedidosContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { TPedido, TParcelas, TProduto, TProdutoPedido } from "../types";

interface PedidosContextProps {
  pedidos: TPedido[];
  atualizarPedidos: (cliente: number, vendedor: number) => void;
}

export const PedidosContext = createContext<PedidosContextProps | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<TPedido[]>([]);

  const headers = {
    'access-token': 'YGZSXYRIZVgQbCcXZGUZPDNRXWUHTE',
    'secret-access-token': 'EZp0ESVrg4rmZ0eWtPcdvNKNRTtSEC',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };

  const atualizarPedidos = async (cliente: number, vendedor: number) => {
    try {
      const response = await fetch('/api/pedidos', {
        method: 'GET',
        headers,
      });

      const json = await response.json();

      const pedidosFiltrados = json.data.filter((pedido: any) => 
        pedido.vendedor_pedido_id === vendedor && pedido.id_cliente === cliente
      );

      const pedidosComDetalhes = await Promise.all(
        pedidosFiltrados.map(async (pedido: any) => {
          // Buscar produtos do pedido
          const produtosResponse = await fetch(`/api/pedidos/${pedido.id_ped}/produtos`, {
            method: 'GET',
            headers,
          });
          const produtosJson = await produtosResponse.json();
          const produtos: TProdutoPedido[] = produtosJson.data;
          console.log('GET produtos de cada pedido', produtos)

          // Buscar parcelas do pedido
          const parcelasResponse = await fetch(`/api/pedidos/${pedido.id_ped}/parcelas`, {
            method: 'GET',
            headers,
          });
          const parcelasJson = await parcelasResponse.json();
          const parcelas: TParcelas[] = parcelasJson.data;
          console.log('GET parcelas de cada pedido', parcelas)

          // Retornar o pedido com os produtos e parcelas
          return {
            ...pedido,
            produtos,
            parcelas,
          };
        })
      );

      // Atualizar o estado com os pedidos detalhados
      console.log('pedidosComDetalhes', pedidosComDetalhes)
      setPedidos(pedidosComDetalhes);
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
