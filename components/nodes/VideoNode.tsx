"use client";

import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export default function VideoNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[240px] bg-[#1a1a1a] border rounded-lg p-3 text-white shadow-md ${
        selected ? "border-purple-500" : "border-[#333]"
      }`}
    >
      <div className="text-sm font-bold mb-2">Video Node</div>

      <select
        className="w-full bg-[#0c0c0e] border border-[#333] rounded p-2 text-xs mb-2"
        defaultValue={data?.model || "Wan2.2-I2V-A14B"}
        onChange={(e) => (data.model = e.target.value)}
      >
        <option value="Wan2.2-T2V-A14B">Wan 2.2 Text-to-Video</option>
        <option value="Wan2.2-I2V-A14B">Wan 2.2 Image-to-Video</option>
        <option value="HunyuanVideo">Hunyuan Video</option>
        <option value="LTX-Video-13B">LTX Video</option>
        <option value="Cosmos-1.0-Diffusion-7B">Cosmos</option>
      </select>

      <textarea
        className="w-full h-20 bg-[#0c0c0e] border border-[#333] rounded p-2 text-xs outline-none"
        placeholder="Video prompt or image-to-video instruction..."
        defaultValue={data?.prompt || ""}
        onChange={(e) => (data.prompt = e.target.value)}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
