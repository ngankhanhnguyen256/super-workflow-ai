"use client";

import { JobQueue, Job } from "./JobQueue";
import { WorkflowExecutor, WorkflowNode, WorkflowEdge } from "./WorkflowExecutor";
import { ComfyWebSocket } from "./ComfyWebSocket";

export class WorkflowBridge {
  private queue = new JobQueue();
  private ws: ComfyWebSocket | null = null;

  constructor(wsUrl?: string) {
    if (wsUrl) {
      this.ws = new ComfyWebSocket(wsUrl);
    }
  }

  connectWS(onUpdate: (msg: any) => void) {
    if (!this.ws) throw new Error("WebSocket URL not provided");
    this.ws.connect(onUpdate);
  }

  enqueueWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    const job: Job = {
      id: crypto.randomUUID(),
      nodeId: "workflow-root",
      status: "queued",
      progress: 0,
      payload: { nodes, edges }
    };

    this.queue.add(job);
    return job.id;
  }

  async runNext() {
    const jobs = this.queue.getAll();
    const next = jobs.find(j => j.status === "queued");

    if (!next) return null;

    this.queue.update(next.id, { status: "running", progress: 5 });

    try {
      const { nodes, edges } = next.payload;

      const results = await WorkflowExecutor.run(nodes, edges);

      this.queue.update(next.id, {
        status: "success",
        progress: 100,
        result: results
      });

      return results;
    } catch (err: any) {
      this.queue.update(next.id, {
        status: "error",
        error: err.message
      });

      throw err;
    }
  }

  getQueue() {
    return this.queue.getAll();
  }

  clear() {
    this.queue.clear();
  }
}
