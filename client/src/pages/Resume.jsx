import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const FALLBACK_CDN =
  'https://cdn.jsdelivr.net/gh/aaronkellvin/portfolio@main/assets/resume.pdf';

function isPdfBuffer(buffer) {
  if (!buffer || buffer.byteLength < 4) return false;
  const header = new Uint8Array(buffer, 0, 4);
  return header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46;
}

export default function Resume() {
  const canvasHostRef = useRef(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('/resume/pdf');

  useEffect(() => {
    fetch('/api/resume/meta')
      .then((response) => response.json())
      .then(setMeta)
      .catch(() => setMeta({ hasResume: true }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadResume() {
      setLoading(true);
      setError('');

      const urls = ['/resume/pdf', '/static/uploads/resume.pdf', FALLBACK_CDN].filter(
        (url, index, list) => list.indexOf(url) === index
      );

      for (const url of urls) {
        try {
          const response = await fetch(url, { cache: 'no-store' });
          if (!response.ok) continue;
          const buffer = await response.arrayBuffer();
          if (!isPdfBuffer(buffer)) continue;

          if (cancelled) return;
          setPdfUrl(url);

          const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
          const host = canvasHostRef.current;
          if (!host) return;
          host.innerHTML = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.35 });
            const canvas = document.createElement('canvas');
            canvas.className = 'block w-full bg-white';
            if (pageNum > 1) canvas.className += ' border-t border-line';
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            host.appendChild(canvas);
            await page.render({ canvasContext: context, viewport }).promise;
          }

          setLoading(false);
          return;
        } catch (loadError) {
          console.warn('Resume fetch failed for', url, loadError);
        }
      }

      if (!cancelled) {
        setLoading(false);
        setError('Unable to load resume preview right now.');
      }
    }

    loadResume();
    return () => {
      cancelled = true;
    };
  }, []);

  const showViewer = meta?.hasResume !== false && !error;

  return (
    <section className="section page-section pb-20">
      <PageHeader kicker="CV" title="My Resume" intro="View or download my latest resume below.">
        {showViewer ? (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <i className="fa-solid fa-up-right-from-square" /> Open in New Tab
            </a>
            <a href={pdfUrl} download className="btn-primary">
              <i className="fa-solid fa-download" /> Download PDF
            </a>
          </div>
        ) : null}
      </PageHeader>

      <Reveal className="mx-auto mt-10 max-w-[980px]">
        {showViewer ? (
          <div className="relative min-h-[70vh] max-h-[min(85vh,920px)] overflow-auto rounded-xl border border-line bg-white shadow-card">
            {loading ? (
              <div className="absolute inset-0 z-[2] flex items-center justify-center bg-cream-panel text-sm text-muted">
                Loading resume...
              </div>
            ) : null}
            {error ? (
              <div className="p-8 text-center text-sm text-muted">
                <p>{error}</p>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-flex">
                  Open Resume PDF
                </a>
              </div>
            ) : (
              <div ref={canvasHostRef} className="w-full" />
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-cream-panel p-10 text-center shadow-soft">
            <i className="fa-solid fa-file-pdf mb-4 text-4xl text-wine" />
            <h2 className="mb-2 text-xl">Resume not available</h2>
            <p className="text-sm text-muted">Please try again later or use the download link when it becomes available.</p>
          </div>
        )}
      </Reveal>
    </section>
  );
}
