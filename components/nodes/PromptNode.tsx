"use client";

import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export default function PromptNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[220px] bg-[#1a1a1a] border rounded-lg p-3 text-white shadow-md ${
        selected ? "border-green-500" : "border-[#333]"
      }`}
    >
      <div className="text-sm font-bold mb-2">Prompt Node</div>

      <textarea
        className="w-full h-24 bg-[#0c0c0e] border border-[#333] rounded p-2 text-xs outline-none"
        placeholder="Enter your prompt..."
        defaultValue={data?.prompt || ""}
        onChange={(e) => (data.prompt = e.target.value)}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
