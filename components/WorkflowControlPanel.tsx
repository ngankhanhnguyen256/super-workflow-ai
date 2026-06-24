"use client";

import React from "react";
import { Play, RotateCcw, Download } from "lucide-react";
import { useWorkflowStore } from "@/store/useWorkflowStore";

export default function WorkflowControlPanel() {
  const { nodes, edges, setNodes, setEdges, setRunning } = useWorkflowStore();

  const onRun = async () => {
    setRunning(true);

    // Placeholder execution (Phase 5 will replace with real engine)
    console.log("Running workflow...");
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    setTimeout(() => {
      setRunning(false);
      console.log("Workflow finished");
    }, 1500);
  };

  const onReset = () => {
    setNodes([]);
    setEdges([]);
  };

  const onExport = () => {
    const data = {
      nodes,
      edges
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-14 bg-[#111] border-b border-[#222] flex items-center justify-between px-4">
      <div className="font-bold text-white">Workflow Control</div>

      <div className="flex gap-3">
        <button
          onClick={onRun}
          className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 rounded"
        >
          <Play size={16} /> Run
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
        >
          <RotateCcw size={16} /> Reset
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded"
        >
          <Download size={16} /> Export
        </button>
      </div>
    </div>
  );
}
