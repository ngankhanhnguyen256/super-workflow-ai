"use client";

import React from "react";
import { Plus } from "lucide-react";
import { NODE_TYPES } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

const nodeItems = [
  { type: NODE_TYPES.START, label: "Start Node" },
  { type: NODE_TYPES.PROMPT, label: "Prompt Node" },
  { type: NODE_TYPES.IMAGE, label: "Image Node" },
  { type: NODE_TYPES.VIDEO, label: "Video Node" },
  { type: NODE_TYPES.STITCH, label: "Stitch Node" }
];

export default function Sidebar() {
  const { addNodes } = useReactFlow();

  const onAddNode = (type: string, label: string) => {
    addNodes({
      id: generateId(type),
      type,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      },
      data: { label }
    });
  };

  return (
    <div className="w-64 h-screen bg-[#111] border-r border-[#222] p-4">
      <h2 className="text-lg font-bold mb-4">Node Library</h2>

      <div className="space-y-3">
        {nodeItems.map((node) => (
          <button
            key={node.type}
            onClick={() => onAddNode(node.type, node.label)}
            className="w-full flex items-center gap-2 p-2 bg-[#1a1a1a] hover:bg-[#222] rounded"
          >
            <Plus size={16} />
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
}
