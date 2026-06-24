"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from "@xyflow/react";

import { useWorkflowStore } from "@/store/useWorkflowStore";
import { nodeTypes } from "@/lib/nodeTypes";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 50 },
    data: { label: "Start Node" }
  }
];

const initialEdges: Edge[] = [];

export default function WorkflowCanvas() {
  const { nodes, edges, setNodes, setEdges } = useWorkflowStore();

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(
    nodes.length ? nodes : initialNodes
  );

  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(
    edges.length ? edges : initialEdges
  );

  const onConnect = (connection: Connection) => {
    const newEdges = addEdge(connection, rfEdges);
    setRfEdges(newEdges);
    setEdges(newEdges);
  };

  const syncStore = () => {
    setNodes(rfNodes);
  };

  return (
    <div className="w-full h-screen bg-[#0c0c0e]">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={syncStore}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
