"use client";

export interface RenderClip {
  path: string;
  duration?: number;
}

export class FFmpegService {
  /**
   * NOTE:
   * In browser environment we cannot run native ffmpeg.
   * This service assumes backend (or serverless FFmpeg / API) is available.
   */

  static async stitchVideos(clips: RenderClip[]) {
    try {
      const res = await fetch("/api/render/stitch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clips })
      });

      if (!res.ok) {
        throw new Error("Failed to stitch videos");
      }

      return await res.json(); // { outputUrl }
    } catch (err) {
      console.error("FFmpegService error:", err);
      throw err;
    }
  }

  static async exportMP4(jobId: string) {
    try {
      const res = await fetch(`/api/render/export?jobId=${jobId}`);

      if (!res.ok) {
        throw new Error("Failed to export video");
      }

      return await res.json(); // { downloadUrl }
    } catch (err) {
      console.error("Export error:", err);
      throw err;
    }
  }
}
