"use client";

import { useEffect, useState } from "react";
import { WorkflowBridge } from "./WorkflowBridge";

export interface WorkflowStreamState {
  jobs: any[];
  running: boolean;
  results: Record<string, any>;
}

export function useWorkflowStream(bridge: WorkflowBridge) {
  const [state, setState] = useState<WorkflowStreamState>({
    jobs: [],
    running: false,
    results: {}
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const queue = bridge.getQueue();

      setState((prev) => ({
        ...prev,
        jobs: queue,
        running: queue.some((j) => j.status === "running")
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [bridge]);

  const runWorkflow = async (nodes: any[], edges: any[]) => {
    const jobId = bridge.enqueueWorkflow(nodes, edges);

    setState((prev) => ({
      ...prev,
      jobs: bridge.getQueue()
    }));

    const result = await bridge.runNext();

    setState((prev) => ({
      ...prev,
      results: {
        ...prev.results,
        [jobId]: result
      }
    }));

    return result;
  };

  const clear = () => {
    bridge.clear();
    setState({ jobs: [], running: false, results: {} });
  };

  return {
    state,
    runWorkflow,
    clear
  };
}
