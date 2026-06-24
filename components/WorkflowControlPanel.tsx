"use client";

import React from "react";
import { Play, RotateCcw, Download } from "lucide-react";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { WorkflowExecutor } from "@/services/WorkflowExecutor";

export default function WorkflowControlPanel() {
  const { nodes, edges, setNodes, setEdges, setRunning } = useWorkflowStore();

  const onRun = async () => {
    try {
      setRunning(true);

      console.log("🚀 Running workflow...");

      const results = await WorkflowExecutor.run(nodes as any, edges as any);

      console.log("✅ Workflow Results:", results);

      const updatedNodes = nodes.map((n: any) => ({
        ...n,
        data: {
          ...n.data,
          output: results[n.id] || null
        }
      }));

      setNodes(updatedNodes);

      setRunning(false);
    } catch (err) {
      console.error("Workflow error:", err);
      setRunning(false);
    }
  };

  const onReset = () => {
    setNodes([]);
    setEdges([]);
  };

  const onExport = () => {
    const data = { nodes, edges };

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
