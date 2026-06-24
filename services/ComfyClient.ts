"use client";

import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_COMFYUI_SERVER || process.env.COMFYUI_SERVER;
const API_KEY = process.env.NEXT_PUBLIC_COMFYUI_API_KEY || process.env.COMFYUI_API_KEY;

export interface ComfyRequest {
  workflow: any;
  model?: string;
  prompt?: string;
}

export class ComfyClient {
  static async runWorkflow(request: ComfyRequest) {
    if (!SERVER) throw new Error("Missing ComfyUI server URL");

    try {
      const res = await axios.post(
        `${SERVER}/api/run`,
        {
          workflow: request.workflow,
          model: request.model,
          prompt: request.prompt
        },
        {
          headers: {
            Authorization: API_KEY ? `Bearer ${API_KEY}` : "",
            "Content-Type": "application/json"
          }
        }
      );

      return res.data;
    } catch (err: any) {
      console.error("ComfyClient error:", err?.response?.data || err.message);
      throw err;
    }
  }

  static async getStatus(jobId: string) {
    if (!SERVER) throw new Error("Missing ComfyUI server URL");

    const res = await axios.get(`${SERVER}/api/status/${jobId}`, {
      headers: {
        Authorization: API_KEY ? `Bearer ${API_KEY}` : ""
      }
    });

    return res.data;
  }

  static async getResult(jobId: string) {
    if (!SERVER) throw new Error("Missing ComfyUI server URL");

    const res = await axios.get(`${SERVER}/api/result/${jobId}`, {
      headers: {
        Authorization: API_KEY ? `Bearer ${API_KEY}` : ""
      }
    });

    return res.data;
  }
}
