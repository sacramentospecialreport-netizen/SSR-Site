"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type CarouselImage = {
  src: string;
  alt?: string;
};

type CarouselCaption = {
  title: string;
  body?: string;
};

export function LegacyCarousel({
  images,
  captions,
  label,
}: {
  images: CarouselImage[];
  captions: CarouselCaption[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const current = images[active];
  const caption = captions[active];

  const show = (index: number) => {
    setActive((index + images.length) % images.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") show(active - 1);
    if (event.key === "ArrowRight") show(active + 1);
    if (event.key === "Escape") setExpanded(false);
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    show(distance > 0 ? active - 1 : active + 1);
  };

  return (
    <section
      className="legacy-carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="legacy-carousel-stage"
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={handlePointerUp}
      >
        <figure>
          <img src={current.src} alt={current.alt || caption.title} />
          <figcaption>
            <span>{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <div>
              <strong>{caption.title}</strong>
              {caption.body && <p>{caption.body}</p>}
            </div>
          </figcaption>
        </figure>
        <div className="legacy-carousel-controls">
          <button type="button" onClick={() => show(active - 1)} aria-label="Previous image">←</button>
          <button type="button" onClick={() => setExpanded(true)} aria-label="View image full screen">Expand</button>
          <button type="button" onClick={() => show(active + 1)} aria-label="Next image">→</button>
        </div>
        <div className="legacy-carousel-progress" aria-hidden="true">
          <i style={{ width: `${((active + 1) / images.length) * 100}%` }} />
        </div>
      </div>

      <div className="legacy-carousel-thumbs" aria-label="Choose an image">
        {images.map((image, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : undefined}
            onClick={() => show(index)}
            aria-label={`Show image ${index + 1}: ${captions[index].title}`}
            aria-current={index === active ? "true" : undefined}
            key={`${image.src}-${index}`}
          >
            <img src={image.src} alt="" loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {expanded && (
        <div className="legacy-carousel-lightbox" role="dialog" aria-modal="true" aria-label={caption.title}>
          <button type="button" onClick={() => setExpanded(false)} aria-label="Close full-screen image">Close ×</button>
          <img src={current.src} alt={current.alt || caption.title} />
          <div><strong>{caption.title}</strong>{caption.body && <p>{caption.body}</p>}</div>
        </div>
      )}
    </section>
  );
}
