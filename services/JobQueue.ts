"use client";

export type JobStatus = "queued" | "running" | "success" | "error";

export interface Job {
  id: string;
  nodeId: string;
  status: JobStatus;
  progress: number;
  payload?: any;
  result?: any;
  error?: string;
}

export class JobQueue {
  private queue: Job[] = [];
  private running: boolean = false;

  add(job: Job) {
    this.queue.push(job);
  }

  getAll() {
    return this.queue;
  }

  getById(id: string) {
    return this.queue.find(j => j.id === id);
  }

  update(id: string, data: Partial<Job>) {
    const job = this.queue.find(j => j.id === id);
    if (job) {
      Object.assign(job, data);
    }
  }

  async start(processor: (job: Job, update: (data: Partial<Job>) => void) => Promise<any>) {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (!job) continue;

      try {
        this.update(job.id, { status: "running", progress: 0 });

        const result = await processor(job, (data) => this.update(job.id, data));

        this.update(job.id, {
          status: "success",
          progress: 100,
          result
        });

      } catch (err: any) {
        this.update(job.id, {
          status: "error",
          error: err.message
        });
      }
    }

    this.running = false;
  }

  clear() {
    this.queue = [];
  }
}
