import { useEffect, useRef, useState } from "react";
import HeatTextCanvas from "../components/HeatTextCanvas";
import SocialLinks from "../components/SocialLinks";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "2022 Aug - Present",
    title: "Purdue",
    description: "Expected graduation: May 2027"
  },
  {
    date: "2024 Jan - 2025 Jul",
    title: "Republic of Korea Army Service",
    description: "Armor Vehicle Operator / Squad Leader / Mortar Loader"
  },
  {
    date: "2025 Aug - 2025 Dec",
    title: "FedEx",
    description: "Data Scientist"
  },
  {
    date: "2026 Jan - Present",
    title: "Caterpillar",
    description: "Machine Learning Engineer"
  },
  {
    date: "2026 Feb - Present",
    title: "Digital Twin Lab",
    description: "Undergraduate Researcher"
  }
];

export default function HomePage() {
  const professionalEmail = "wynhyun17@gmail.com";
  const timelineRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisibleItems(new Set(timelineEvents.map((_, index) => index)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          let changed = false;
          const next = new Set(prev);
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            const indexAttr = entry.target.getAttribute("data-index");
            const index = Number(indexAttr);
            if (!Number.isFinite(index) || next.has(index)) {
              continue;
            }

            next.add(index);
            changed = true;
          }
          return changed ? next : prev;
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    for (const item of itemRefs.current) {
      if (item) {
        observer.observe(item);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="home-page" aria-label="Home">
      <div className="home-hero">
        <div className="home-headline-wrap">
          <h1 className="home-headline-a11y">Hi, I&apos;m Hayden</h1>
          <HeatTextCanvas text="Hi, I'm Hayden" />
          <span className="hero-title-line" aria-hidden="true" />
        </div>
        <button
          type="button"
          className="hero-scroll-trigger"
          onClick={scrollToTimeline}
          aria-label="Scroll to timeline"
        >
          <span className="hero-scroll-line" aria-hidden="true" />
          <span className="hero-scroll-indicator" aria-hidden="true" />
        </button>
      </div>

      <section ref={timelineRef} className="home-timeline" aria-label="Timeline">
        <ol className="timeline-list">
          {timelineEvents.map((event, index) => {
            const sideClass = index % 2 === 0 ? "is-left" : "is-right";
            const visibleClass = visibleItems.has(index) ? "is-visible" : "";

            return (
              <li
                key={`${event.date}-${event.title}`}
                className={`timeline-item ${sideClass} ${visibleClass}`.trim()}
                data-index={index}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
              >
                <div className="timeline-node" aria-hidden="true" />
                <article className="timeline-card">
                  <p className="timeline-date">{event.date}</p>
                  <h2>{event.title}</h2>
                  <p className="timeline-description">{event.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="home-email-floating" aria-label="Email contact">
        <p className="home-email-caption">feel free to reach out</p>
        <a
          href={`mailto:${professionalEmail}`}
          className="home-email-link"
          aria-label={`Send an email to ${professionalEmail}`}
        >
          {professionalEmail}
        </a>
      </div>

      <SocialLinks />
    </section>
  );
}
