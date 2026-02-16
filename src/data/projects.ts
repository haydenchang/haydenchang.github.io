import type { ZigZagEntry } from "../components/ZigZagList";

export const projects: ZigZagEntry[] = [
  {
    title: "Long-Tail BEV Occupancy",
    description:
      "Built a camera-only BEV occupancy pipeline with geometry-aware supervision and explicit unknown masking to handle long-tail edge cases in driving scenes. Designed temporal aggregation and stability mechanisms to improve consistency under viewpoint and lighting variation.",
    tags: ["BEV", "Occupancy", "Computer Vision"],
    links: {
      github: "https://github.com/haydenchang/camera_only_bev_occupancy"
    }
  },
  {
    title: "Self-Supervised Representation Learning",
    description:
      "Developed a self-supervised video representation model for driving scenes to learn motion-aware features without manual labels. Evaluated and analyzed the learned embeddings through downstream probing to assess transferability and robustness.",
    tags: ["Self-Supervised Learning", "Video", "Representation Learning"],
    links: {
      github: "https://github.com/haydenchang/Video_Representation_Learning"
    }
  },
  {
    title: "Investor AI",
    description:
      "Built a Retrieval-Augmented Generation (RAG) system that integrates quarterly earnings reports, real-time market data, and prominent investor positions to generate contextualized stock analysis.",
    thumbnailSrc: "/placeholder-thumb.svg",
    tags: ["RAG", "Finance", "LLM"],
    links: {
      github: "https://github.com/haydenchang/invest.AI"
    }
  }
];
