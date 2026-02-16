export type ZigZagEntry = {
  title: string;
  role?: string;
  description: string;
  thumbnailSrc?: string;
  tags?: string[];
  links?: {
    github?: string;
    demo?: string;
  };
};

type ZigZagListProps = {
  items: ZigZagEntry[];
};

const PLACEHOLDER_THUMBNAIL = "/placeholder-thumb.svg";

function ZigZagItem({ item, index }: { item: ZigZagEntry; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <article className={isReversed ? "zigzag-item is-reversed" : "zigzag-item"}>
      <div className="zigzag-thumbnail-wrap">
        <img
          className="zigzag-thumbnail"
          src={item.thumbnailSrc ?? PLACEHOLDER_THUMBNAIL}
          alt={`${item.title} thumbnail`}
          loading="lazy"
        />
      </div>
      <div className="zigzag-content">
        <h2>
          {item.links?.github ? (
            <a
              className="zigzag-title-link"
              href={item.links.github}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h2>
        {item.role && <p className="zigzag-role">{item.role}</p>}
        <p className="zigzag-description">{item.description}</p>

        {!!item.tags?.length && (
          <ul className="zigzag-tags">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {item.links?.demo && (
          <div className="zigzag-links">
            <a href={item.links.demo} target="_blank" rel="noreferrer">
              Demo
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ZigZagList({ items }: ZigZagListProps) {
  return (
    <div className="zigzag-list">
      {items.map((item, index) => (
        <ZigZagItem key={`${item.title}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}
