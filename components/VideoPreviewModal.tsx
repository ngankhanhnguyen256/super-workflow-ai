"use client";

import React from "react";
import { X, Download } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function VideoPreviewModal({ isOpen, onClose, videoUrl }: Props) {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (!videoUrl) return;

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "output.mp4";
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#111] w-[800px] max-w-[95%] rounded-lg border border-[#333] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white font-bold">Video Preview</div>

          <button onClick={onClose} className="text-white hover:text-red-400">
            <X size={18} />
          </button>
        </div>

        <div className="w-full bg-black rounded overflow-hidden">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-[400px] object-contain"
            />
          ) : (
            <div className="text-gray-400 p-10 text-center">
              No video available
            </div>
          )}
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
