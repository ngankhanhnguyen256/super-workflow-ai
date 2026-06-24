"use client";

export interface Scene {
  id: string;
  prompt: string;
  duration: number;
  type: "image" | "video";
  asset?: string;
}

export interface StoryboardInput {
  script: string;
  style?: string;
  sceneCount?: number;
}

export class StoryboardService {
  /**
   * Split script into structured scenes (MVP AI storyboard)
   */
  static generateStoryboard(input: StoryboardInput): Scene[] {
    const { script, sceneCount = 4 } = input;

    // naive sentence split for MVP
    const sentences = script
      .split(/[.!?]/)
      .map(s => s.trim())
      .filter(Boolean);

    const scenes: Scene[] = [];

    const used = sentences.slice(0, sceneCount);

    used.forEach((text, index) => {
      scenes.push({
        id: `scene-${index + 1}`,
        prompt: text,
        duration: 3,
        type: index % 2 === 0 ? "image" : "video"
      });
    });

    return scenes;
  }

  /**
   * Convert storyboard into workflow nodes
   */
  static toWorkflowNodes(scenes: Scene[]) {
    return scenes.map((scene) => ({
      id: scene.id,
      type: scene.type,
      data: {
        prompt: scene.prompt,
        duration: scene.duration
      }
    }));
  }
}
