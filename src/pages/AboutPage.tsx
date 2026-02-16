import { useMemo, useState } from "react";
import ImageModal, { type ModalImage } from "../components/ImageModal";

type GalleryKey = "porsche" | "army" | "cas";

type GallerySet = {
  title: string;
  images: ModalImage[];
};

function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

export default function AboutPage() {
  const [activeGallery, setActiveGallery] = useState<GalleryKey | null>(null);

  const galleryMap = useMemo<Record<GalleryKey, GallerySet>>(
    () => ({
      porsche: {
        title: "Porsche 930 Turbo",
        images: [
          {
            src: withBase("/photo/911.png"),
            alt: "Porsche 930 Turbo in black finish"
          }
        ]
      },
      army: {
        title: "Korea Army",
        images: [
          {
            src: withBase("/photo/army1.png"),
            alt: "Training scene from Korea Army service"
          },
          {
            src: withBase("/photo/army2.png"),
            alt: "Operational moment during Korea Army service"
          }
        ]
      },
      cas: {
        title: "Cigarettes After Sex",
        images: [
          {
            src: withBase("/photo/cas.png"),
            alt: "Cigarettes After Sex live concert moment"
          }
        ]
      }
    }),
    []
  );

  const openGallery = (key: GalleryKey) => () => setActiveGallery(key);
  const activeSet = activeGallery ? galleryMap[activeGallery] : null;

  return (
    <section id="about" className="content-page" aria-label="about">
      <h1>About</h1>
      <p>
        Hi, I&apos;m Hayden, a Math/Statistics student at Purdue with minors in
        Computer Science and Management. I focus on perception and autonomy
        systems, with an emphasis on building robust components for real-world
        deployment.
      </p>
      <p>
        My recent work centers on camera-centric BEV representation, temporal
        stability, and trajectory planning under uncertainty. I&apos;m particularly
        interested in failure modes, distribution shift, and how perception
        errors propagate into downstream autonomy decisions in closed-loop
        systems.
      </p>
      <p>
        Beyond autonomy, I&apos;ve worked on large-scale optimization at FedEx&apos;s
        Indianapolis hub and contributed to internal LLM infrastructure at
        Caterpillar using AWS Bedrock to enable natural-language data access.
        I&apos;m currently conducting research in Purdue&apos;s Digital Twin Lab on
        vision-action models using NVIDIA Isaac, and I lead the BEV subteam at
        Autonomous Motorsport Purdue while competing in the Waymo End-to-End
        Challenge through Purdue&apos;s ML Club.
      </p>
      <p>
        I previously served in the{" "}
        <button type="button" className="keyword-trigger" onClick={openGallery("army")}>
          Korea Army
        </button>{" "}
        as an armored vehicle operator and squad leader, where I developed
        discipline and operational leadership under demanding conditions.
      </p>
      <p>Feel free to reach out.</p>
      <section id="about-human" className="about-human-section">
        <h2>About Me as a Human</h2>
        <div className="human-grid">
          <article className="human-card">
            <h3>Cars</h3>
            <p>
              I&apos;ve been close to cars my entire life. My father is a
              mechanical engineer at Hyundai Motor Company, and that early
              exposure shaped my fascination with vehicle engineering. I&apos;m
              particularly drawn to precision performance platforms like{" "}
              <button type="button" className="keyword-trigger" onClick={openGallery("porsche")}>
                Porsche 930 Turbo
              </button>
              , as well as modern software-defined vehicles
              such as the Tesla Model S.
            </p>
          </article>
          <article className="human-card">
            <h3>Music</h3>
            <p>
              Music is where I disconnect and reset. I gravitate toward artists
              like Oasis and{" "}
              <button type="button" className="keyword-trigger" onClick={openGallery("cas")}>
                Cigarettes After Sex
              </button>
              . Seeing{" "}
              <button type="button" className="keyword-trigger" onClick={openGallery("cas")}>
                Cigarettes After Sex
              </button>{" "}
              live remains one of my favorite experiences.
            </p>
          </article>
        </div>
      </section>
      <ImageModal
        open={!!activeSet}
        onClose={() => setActiveGallery(null)}
        title={activeSet?.title ?? "Gallery"}
        images={activeSet?.images ?? []}
      />
    </section>
  );
}
