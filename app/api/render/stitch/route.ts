import { NextResponse } from "next/server";

/**
 * MVP FFmpeg stitch API (simulated backend renderer)
 * In production: replace with real FFmpeg worker / cloud function
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clips } = body;

    if (!clips || !Array.isArray(clips)) {
      return NextResponse.json(
        { error: "Invalid clips input" },
        { status: 400 }
      );
    }

    // simulate processing time
    await new Promise((r) => setTimeout(r, 1500));

    // mock output url
    const outputId = crypto.randomUUID();

    const outputUrl = `/outputs/${outputId}.mp4`;

    return NextResponse.json({
      success: true,
      outputUrl,
      clipsProcessed: clips.length,
      message: "Video stitched successfully (mock FFmpeg)"
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Render failed",
        detail: err.message
      },
      { status: 500 }
    );
  }
}
