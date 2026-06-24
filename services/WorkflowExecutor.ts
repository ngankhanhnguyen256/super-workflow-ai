"use client";

import { ComfyClient } from "./ComfyClient";

export interface WorkflowNode {
  id: string;
  type: string;
  data?: any;
}

export interface WorkflowEdge {
  source: string;
  target: string;
}

export class WorkflowExecutor {
  static async run(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    // Simple linear execution (Phase 3 MVP)

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    const results: Record<string, any> = {};

    // Find start nodes (no incoming edges)
    const targetIds = new Set(edges.map((e) => e.target));
    const startNodes = nodes.filter((n) => !targetIds.has(n.id));

    for (const start of startNodes) {
      await this.executeNode(start.id, nodeMap, edges, results);
    }

    return results;
  }

  private static async executeNode(
    nodeId: string,
    nodeMap: Map<string, WorkflowNode>,
    edges: WorkflowEdge[],
    results: Record<string, any>
  ) {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    // prevent re-run
    if (results[nodeId]) return;

    let output: any = null;

    switch (node.type) {
      case "prompt":
        output = {
          prompt: node.data?.prompt || ""
        };
        break;

      case "image":
        output = await ComfyClient.runWorkflow({
          workflow: "image",
          model: node.data?.model,
          prompt: node.data?.prompt
        });
        break;

      case "video":
        output = await ComfyClient.runWorkflow({
          workflow: "video",
          model: node.data?.model,
          prompt: node.data?.prompt
        });
        break;

      default:
        output = { message: "Unknown node type" };
    }

    results[nodeId] = output;

    // execute children
    const children = edges.filter((e) => e.source === nodeId);

    for (const edge of children) {
      await this.executeNode(edge.target, nodeMap, edges, results);
    }
  }
}
