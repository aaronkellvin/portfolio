(function () {
  const panel = document.getElementById('resume-viewer-panel');
  if (!panel) return;

  const resumeUrl = panel.dataset.resumeUrl;
  const resumeViewer = document.getElementById('resume-viewer');
  const resumeLoading = document.getElementById('resume-loading');
  const resumeError = document.getElementById('resume-error');
  const pagesRoot = document.getElementById('resume-pages');

  function setResumeUIState({ loading = false, hasError = false }) {
    if (resumeLoading) resumeLoading.hidden = !loading;
    if (resumeError) resumeError.hidden = !hasError;
    if (resumeViewer) resumeViewer.hidden = hasError;
  }

  function showResumeErrorDetail(detail) {
    if (!resumeError) return;

    let detailNode = resumeError.querySelector('.resume-error-detail');
    if (!detailNode) {
      detailNode = document.createElement('p');
      detailNode.className = 'resume-error-detail';
      resumeError.appendChild(detailNode);
    }

    detailNode.textContent = detail;
  }

  function getPdfjsRuntime() {
    const runtime = window.pdfjsLib;
    if (!runtime) throw new Error('pdf.js runtime not loaded');

    if (!runtime.GlobalWorkerOptions.workerSrc) {
      runtime.GlobalWorkerOptions.workerSrc =
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    }

    return runtime;
  }

  async function fetchResumeArrayBuffer() {
    const response = await fetch(resumeUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch resume file');
    return response.arrayBuffer();
  }

  function getRenderWidth() {
    const width = panel.clientWidth;
    return width > 0 ? width : panel.getBoundingClientRect().width;
  }

  async function renderResumePreview(pdfData) {
    if (!resumeViewer || !pagesRoot) return;

    const runtime = getPdfjsRuntime();
    const binaryPdf = new Uint8Array(pdfData);
    let pdfDoc;

    try {
      const loadingTask = runtime.getDocument({ data: binaryPdf });
      pdfDoc = await loadingTask.promise;
    } catch (workerErr) {
      const fallbackTask = runtime.getDocument({
        data: binaryPdf,
        disableWorker: true,
      });
      pdfDoc = await fallbackTask.promise;
    }

    pagesRoot.innerHTML = '';

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const availableWidth = getRenderWidth();
    const maxRenderDpr = window.matchMedia('(max-width: 820px)').matches ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxRenderDpr);

    for (let pageIndex = 1; pageIndex <= pdfDoc.numPages; pageIndex++) {
      const page = await pdfDoc.getPage(pageIndex);
      const baseViewport = page.getViewport({ scale: 1 });
      const fitScale = availableWidth / baseViewport.width;
      const cssViewport = page.getViewport({ scale: fitScale });

      const pageWrap = document.createElement('div');
      pageWrap.className = 'resume-page';

      const canvas = document.createElement('canvas');
      canvas.className = 'resume-page-canvas';
      canvas.width = Math.floor(cssViewport.width * dpr);
      canvas.height = Math.floor(cssViewport.height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = 'auto';

      const context = canvas.getContext('2d');
      if (!context) continue;

      await page.render({
        canvasContext: context,
        viewport: cssViewport,
        transform: [dpr, 0, 0, dpr, 0, 0],
      }).promise;

      pageWrap.appendChild(canvas);
      pagesRoot.appendChild(pageWrap);

      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  }

  async function bootResumeViewer() {
    setResumeUIState({ loading: true, hasError: false });
    showResumeErrorDetail('');

    if (pagesRoot) pagesRoot.innerHTML = '';

    try {
      const pdfData = await fetchResumeArrayBuffer();
      await renderResumePreview(pdfData);
      setResumeUIState({ loading: false, hasError: false });
    } catch (error) {
      console.error('Resume preview error:', error);
      const message = error && error.message ? error.message : 'Unknown render error';
      showResumeErrorDetail(`DETAIL: ${message}`);
      setResumeUIState({ loading: false, hasError: true });
    }
  }

  bootResumeViewer();
})();
