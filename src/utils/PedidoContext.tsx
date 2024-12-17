// PedidosContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { TPedido, TParcelas, TProdutoPedido, TOrcamentoResponse } from "../types";
import { headers } from "../utils"

interface PedidosContextProps {
  pedidos: TPedido[];
  atualizarPedidos: (cliente: number, vendedor: number) => void;
  orcamentos: TOrcamentoResponse[];
  atualizarOrcamentos: (cliente: number, vendedor: number) => void;
}

export const PedidosContext = createContext<PedidosContextProps | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<TPedido[]>([]);
  const [orcamentos, setOrcamentos] = useState<TOrcamentoResponse[]>([]);

  const atualizarPedidos = async (cliente: number, vendedor: number) => {
    try {
      const response = await fetch('/api/pedidos', {
        method: 'GET',
        headers,
      });

      const json = await response.json();

      const pedidosFiltrados = json.data.filter((pedido: any) => 
        pedido.vendedor_pedido_id === vendedor && pedido.id_cliente === cliente && pedido.status_pedido === "Em Aberto" && pedido.lixeira === "Nao"
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

          // Buscar parcelas do pedido
          const parcelasResponse = await fetch(`/api/pedidos/${pedido.id_ped}/parcelas`, {
            method: 'GET',
            headers,
          });
          const parcelasJson = await parcelasResponse.json();
          const parcelas: TParcelas[] = parcelasJson.data;

          // Retornar o pedido com os produtos e parcelas
          return {
            ...pedido,
            produtos,
            parcelas,
          };
        })
      );

      // Atualizar o estado com os pedidos detalhados
      setPedidos(pedidosComDetalhes);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const atualizarOrcamentos = async (cliente: number, vendedor: number) => {
    try {
      const response = await fetch('/api/orcamentos', {
        method: 'GET',
        headers,
      });

      const json = await response.json();

      const orcamentosFiltrados = json.data.filter((orcamento: any) => 
        orcamento.vendedor_pedido_id === vendedor && orcamento.id_cliente === cliente && orcamento.status_pedido === "Em Aberto" && orcamento.lixeira === "Nao"
      );

      const orcamentosComDetalhes = await Promise.all(
        orcamentosFiltrados.map(async (orcamento: any) => {
          // Buscar produtos do pedido
          const produtosResponse = await fetch(`/api/orcamentos/${orcamento.id_orcamento}/produtos`, {
            method: 'GET',
            headers,
          });
          const produtosJson = await produtosResponse.json();
          const produtos: TProdutoPedido[] = produtosJson.data;

          // Buscar parcelas do pedido
          const parcelasResponse = await fetch(`/api/orcamentos/${orcamento.id_orcamento}/parcelas`, {
            method: 'GET',
            headers,
          });
          const parcelasJson = await parcelasResponse.json();
          const parcelas: TParcelas[] = parcelasJson.data;

          // Retornar o pedido com os produtos e parcelas
          return {
            ...orcamento,
            produtos,
            parcelas,
          };
        })
      );

      // Atualizar o estado com os pedidos detalhados
      setOrcamentos(orcamentosComDetalhes);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <PedidosContext.Provider value={{ pedidos, atualizarPedidos, orcamentos, atualizarOrcamentos }}>
      {children}
    </PedidosContext.Provider>
  );
};
