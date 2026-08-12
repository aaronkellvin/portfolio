import { useCallback, useEffect, useState } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const images = project?.images ?? [];
  const total = images.length;
  const singleImage = total <= 1;

  const showSlide = useCallback(
    (index) => {
      if (!total) return;
      if (index >= total) setSlideIndex(0);
      else if (index < 0) setSlideIndex(total - 1);
      else setSlideIndex(index);
    },
    [total]
  );

  useEffect(() => {
    setSlideIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return undefined;

    document.body.classList.add('modal-open');

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') showSlide(slideIndex + 1);
      if (event.key === 'ArrowLeft') showSlide(slideIndex - 1);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [project, onClose, showSlide, slideIndex]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto bg-cream/92 p-2 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="grid w-[min(1760px,99vw)] max-h-[calc(100dvh-0.5rem)] grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_290px] lg:min-h-[94dvh]">
        <div className="relative flex min-h-[54dvh] items-center justify-center px-10 pb-7 lg:min-h-[92dvh] lg:px-11">
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              src={images[slideIndex]}
              alt={`${project.title} screenshot ${slideIndex + 1}`}
              className="max-h-[min(80dvh,900px)] max-w-full rounded-[10px] object-contain"
            />
          </div>

          {!singleImage ? (
            <>
              <button
                type="button"
                className="absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-soft transition hover:bg-ink hover:text-cream"
                aria-label="Previous screenshot"
                onClick={() => showSlide(slideIndex - 1)}
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
              <button
                type="button"
                className="absolute right-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-soft transition hover:bg-ink hover:text-cream"
                aria-label="Next screenshot"
                onClick={() => showSlide(slideIndex + 1)}
              >
                <i className="fa-solid fa-arrow-right" />
              </button>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white/95 px-3 py-1 text-xs font-bold tabular-nums text-ink shadow-soft">
                {slideIndex + 1} / {total}
              </span>
            </>
          ) : null}
        </div>

        <aside className="relative max-h-[42dvh] overflow-y-auto rounded-2xl border border-line bg-white/95 p-4 shadow-card backdrop-blur-md lg:max-h-[92dvh]">
          <button
            type="button"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[10px] border border-line bg-cream-muted text-ink transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
            aria-label="Close gallery"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
            Details
          </span>
          <h2 id="project-modal-title" className="pr-10 text-lg leading-snug">
            {project.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-muted">
            <i className="fa-regular fa-calendar mr-1.5" />
            {project.date}
          </p>
          <div className="my-4 h-px bg-gradient-to-r from-line to-transparent" />
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Project Overview
          </h3>
          <div className="space-y-3">
            {project.copy.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
