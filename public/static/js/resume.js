(function () {
  const panel = document.getElementById('resume-viewer-panel');
  const emptyState = document.getElementById('resume-empty-state');
  const actionsRow = document.getElementById('resume-actions');
  const openLink = document.getElementById('resume-open-link');
  const downloadLink = document.getElementById('resume-download-link');
  const errorOpenLink = document.querySelector('.resume-error-open-link');

  if (!panel) return;

  const resumeServeUrl = panel.dataset.resumeUrl || '/resume/pdf';
  const staticResumeUrl = panel.dataset.resumeStaticUrl || '/static/uploads/resume.pdf';
  const cdnResumeUrl = panel.dataset.resumeCdnUrl || '';
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

  function showViewer() {
    panel.hidden = false;
    if (emptyState) emptyState.hidden = true;
    if (actionsRow) actionsRow.hidden = false;
  }

  function showEmptyState() {
    panel.hidden = true;
    if (emptyState) emptyState.hidden = false;
    if (actionsRow) actionsRow.hidden = true;
    setResumeUIState({ loading: false, hasError: false });
  }

  function updateActionLinks(url, filename) {
    [openLink, downloadLink, errorOpenLink].forEach((link) => {
      if (!link) return;
      link.href = url;
      if (link === downloadLink) {
        link.download = filename || 'resume.pdf';
      }
    });
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

  function isPdfArrayBuffer(buffer) {
    if (!buffer || buffer.byteLength < 4) return false;
    const header = new Uint8Array(buffer, 0, 4);
    return (
      header[0] === 0x25 &&
      header[1] === 0x50 &&
      header[2] === 0x44 &&
      header[3] === 0x46
    );
  }

  async function fetchResumeArrayBuffer() {
    const urls = [resumeServeUrl, staticResumeUrl, cdnResumeUrl].filter(
      (url, index, list) => url && list.indexOf(url) === index
    );

    let lastError = null;

    for (const url of urls) {
      const isExternal = /^https?:\/\//i.test(url);

      try {
        const response = await fetch(url, {
          cache: 'no-store',
          credentials: isExternal ? 'omit' : 'same-origin',
        });
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status} for ${url}`);
          continue;
        }

        const buffer = await response.arrayBuffer();
        if (!isPdfArrayBuffer(buffer)) {
          lastError = new Error(`Response from ${url} is not a PDF`);
          continue;
        }

        updateActionLinks(url, 'resume.pdf');
        return buffer;
      } catch (error) {
        lastError = error;
        console.warn('Resume fetch failed for', url, error);
      }
    }

    throw lastError || new Error('Failed to fetch resume file');
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

  async function loadResumeFromArrayBuffer(pdfData) {
    setResumeUIState({ loading: true, hasError: false });
    showResumeErrorDetail('');

    if (pagesRoot) pagesRoot.innerHTML = '';

    try {
      await renderResumePreview(pdfData);
      setResumeUIState({ loading: false, hasError: false });
    } catch (error) {
      console.error('Resume preview error:', error);
      const message = error && error.message ? error.message : 'Unknown render error';
      showResumeErrorDetail(`DETAIL: ${message}`);
      setResumeUIState({ loading: false, hasError: true });
      throw error;
    }
  }

  async function bootHostedResume() {
    showViewer();
    const pdfData = await fetchResumeArrayBuffer();
    await loadResumeFromArrayBuffer(pdfData);
  }

  bootHostedResume().catch((error) => {
    console.warn('Hosted resume unavailable:', error);
    showEmptyState();
  });
})();
