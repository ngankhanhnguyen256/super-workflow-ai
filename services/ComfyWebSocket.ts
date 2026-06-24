"use client";

export type ComfyWSMessage = {
  type: string;
  data?: any;
};

export class ComfyWebSocket {
  private ws: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(onMessage: (msg: ComfyWSMessage) => void) {
    if (!this.url) throw new Error("Missing WebSocket URL");

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("🟢 ComfyWS connected");
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        onMessage(msg);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    this.ws.onclose = () => {
      console.log("🔴 ComfyWS disconnected");
    };

    this.ws.onerror = (err) => {
      console.error("WS error:", err);
    };
  }

  send(data: any) {
    if (!this.ws) throw new Error("WebSocket not connected");
    this.ws.send(JSON.stringify(data));
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}
