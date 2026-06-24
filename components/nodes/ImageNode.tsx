"use client";

import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export default function ImageNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[220px] bg-[#1a1a1a] border rounded-lg p-3 text-white shadow-md ${
        selected ? "border-blue-500" : "border-[#333]"
      }`}
    >
      <div className="text-sm font-bold mb-2">Image Node</div>

      <select
        className="w-full bg-[#0c0c0e] border border-[#333] rounded p-2 text-xs mb-2"
        defaultValue={data?.model || "FLUX.1-dev"}
        onChange={(e) => (data.model = e.target.value)}
      >
        <option value="FLUX.1-dev">FLUX.1-dev</option>
        <option value="FLUX.1-schnell">FLUX.1-schnell</option>
        <option value="sd_xl_base_1.0">SDXL</option>
      </select>

      <textarea
        className="w-full h-20 bg-[#0c0c0e] border border-[#333] rounded p-2 text-xs outline-none"
        placeholder="Image prompt..."
        defaultValue={data?.prompt || ""}
        onChange={(e) => (data.prompt = e.target.value)}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
