import type { ZigZagEntry } from "../components/ZigZagList";

const fedexLogo = new URL("../assets/logos/fedex.png", import.meta.url).href;
const caterpillarLogo = new URL("../assets/logos/caterpillar.png", import.meta.url).href;

export const experience: ZigZagEntry[] = [
  {
    title: "FedEx",
    role: "Data Scientst",
    description:
      "Designed a simulation-based analytics pipeline modeling parcel flow dynamics across a high-volume logistics hub processing 480K+ parcels per day, analyzing throughput, queueing behavior, and bottleneck formation.",
    thumbnailSrc: fedexLogo,
    tags: ["Simulation", "Analytics", "Logistics"]
  },
  {
    title: "Caterpillar",
    role: "Machine Learning Engineer",
    description:
      "Developing an internal LLM-powered assistant to streamline worker data retrieval, reducing friction in accessing operational and technical information. Focused on database, retrieval structure, and reliability in industrial workflows.",
    thumbnailSrc: caterpillarLogo,
    tags: ["LLM", "Retrieval", "Reliability"]
  }
];
