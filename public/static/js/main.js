document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  initScrollProgress();
  initRevealAnimations();
  initMagneticElements();
  initMobileMenu();
  initNavHighlight();
  initProjectModal();
  initEmailLinks();
  initBubbles();

  function initEmailLinks() {
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    document.querySelectorAll('.email-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!isMobile) return;

        const mailtoHref = link.dataset.mailto;
        if (!mailtoHref) return;

        event.preventDefault();
        window.location.href = mailtoHref;
      });
    });
  }

  function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    if (!progress && !navbar) return;

    let ticking = false;

    const updateScrollUI = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressWidth = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (progress) progress.style.width = `${progressWidth}%`;
      if (navbar) navbar.classList.toggle('scrolled', scrollTop > 20);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScrollUI);
    }, { passive: true });

    updateScrollUI();
  }

  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    document.querySelectorAll('.reveal-stagger').forEach((group) => {
      group.querySelectorAll('.reveal').forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.08}s`;
      });
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  function initMagneticElements() {
    if (prefersReducedMotion || isTouchDevice) return;

    document.querySelectorAll('.magnetic-btn, .nav-social a').forEach((element) => {
      element.addEventListener('mousemove', (event) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${offsetX * 0.15}px, ${offsetY * 0.15}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }

  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!hamburger || !navLinks) return;

    const icon = hamburger.querySelector('.hamburger-icon');

    const setMenuOpen = (open) => {
      navLinks.classList.toggle('active', open);
      backdrop?.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('active'));
    });

    backdrop?.addEventListener('click', () => setMenuOpen(false));

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
        setMenuOpen(false);
      }
    });
  }

  function initNavHighlight() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;

    document.querySelectorAll('.nav-links a[data-nav]').forEach((link) => {
      link.classList.toggle('active-nav', link.dataset.nav === currentPage);
    });
  }

  function initProjectModal() {
    const baseUrl = 'https://sgdcportfolio.vercel.app/';
    const projectImages = {
      1: [
        'projects/MVIS/1.jpg', 'projects/MVIS/2.jpg', 'projects/MVIS/3.jpg', 'projects/MVIS/4.jpg',
        'projects/MVIS/5.jpg', 'projects/MVIS/6.jpg', 'projects/MVIS/7.jpg', 'projects/MVIS/8.jpg'
      ],
      2: ['projects/MEMO/1.jpg', 'projects/MEMO/2.jpg', 'projects/MEMO/3.jpg', 'projects/MEMO/4.jpg'],
      3: [
        'projects/CAPSTONE/Screenshot_2026-06-13_185847.png', 'projects/CAPSTONE/Screenshot_2026-06-13_185853.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_185858.png', 'projects/CAPSTONE/Screenshot_2026-06-13_185911.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_185924.png', 'projects/CAPSTONE/Screenshot_2026-06-13_185936.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_185950.png', 'projects/CAPSTONE/Screenshot_2026-06-13_185957.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_190003.png', 'projects/CAPSTONE/Screenshot_2026-06-13_190020.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_190026.png', 'projects/CAPSTONE/Screenshot_2026-06-13_190032.png',
        'projects/CAPSTONE/Screenshot_2026-06-13_190040.png'
      ],
      4: [
        'projects/KIOSK/Screenshot_2026-06-13_032327.png', 'projects/KIOSK/Screenshot_2026-06-13_032336.png',
        'projects/KIOSK/Screenshot_2026-06-13_032344.png', 'projects/KIOSK/Screenshot_2026-06-13_032354.png',
        'projects/KIOSK/Screenshot_2026-06-13_032400.png', 'projects/KIOSK/Screenshot_2026-06-13_032409.png',
        'projects/KIOSK/Screenshot_2026-06-13_032415.png'
      ],
      5: ['/static/images/projects/knightbot.png'],
      6: [
        '/static/images/projects/ozzy-party-nest/1.png',
        '/static/images/projects/ozzy-party-nest/2.png',
        '/static/images/projects/ozzy-party-nest/3.png',
        '/static/images/projects/ozzy-party-nest/4.png'
      ]
    };

    const modal = document.getElementById('slideshow-modal');
    const coverflowTrack = document.getElementById('gallery-coverflow-track');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const modalTitle = document.getElementById('project-modal-title');
    const modalDate = document.getElementById('project-modal-date');
    const modalCopy = document.getElementById('project-modal-copy');
    const slideCount = document.getElementById('project-slide-count');

    const coverflow = document.getElementById('gallery-coverflow-track')?.parentElement;

    if (!modal || !coverflowTrack) return;

    let currentProjectId = null;
    let currentSlideIndex = 0;
    let coverflowSlides = [];

    const resolveImage = (path) => (path.startsWith('/') ? path : `${baseUrl}${path}`);

    const getImageBounds = () => {
      const compact = window.matchMedia('(max-width: 820px)').matches;
      const galleryViewport = coverflowTrack.closest('.gallery-viewport');
      const coverflowEl = coverflowTrack.parentElement;

      const viewportWidth = coverflowEl?.clientWidth || galleryViewport?.clientWidth || window.innerWidth;
      const viewportHeight = coverflowEl?.clientHeight || galleryViewport?.clientHeight || window.innerHeight;

      const navPadding = compact ? 56 : 72;
      const counterSpace = 28;

      return {
        maxWidth: Math.max(viewportWidth - navPadding, 280),
        maxHeight: Math.max(viewportHeight - counterSpace, 220),
      };
    };

    const fitSlideImage = (img) => {
      const { maxWidth, maxHeight } = getImageBounds();
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      if (!naturalWidth || !naturalHeight) return;

      const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1);
      const width = Math.round(naturalWidth * scale);
      const height = Math.round(naturalHeight * scale);

      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      img.style.maxWidth = 'none';
      img.style.maxHeight = 'none';
      img.dataset.displayWidth = String(width);
      img.dataset.displayHeight = String(height);
    };

    const fitAllSlideImages = () => {
      coverflowSlides.forEach((slide) => {
        const img = slide.querySelector('img');
        if (img?.complete && img.naturalWidth) fitSlideImage(img);
      });
      syncCoverflowHeight();
    };

    const syncCoverflowHeight = () => {
      if (!coverflow) return;

      const activeImg = coverflowSlides[currentSlideIndex]?.querySelector('img');
      const fittedHeight = activeImg?.offsetHeight || Number(activeImg?.dataset.displayHeight) || 0;
      coverflow.style.height = fittedHeight ? `${fittedHeight}px` : '100%';
    };

    const getCoverflowMetrics = () => {
      const compact = window.matchMedia('(max-width: 820px)').matches;
      return {
        spacing: compact ? 170 : 220,
        rotate: compact ? 28 : 36,
        depth: compact ? 60 : 80,
        scaleStep: compact ? 0.14 : 0.12,
        minScale: compact ? 0.66 : 0.62,
        visibleRange: compact ? 1 : 2,
      };
    };

    const getCoverflowTransform = (offset) => {
      if (offset === 0) {
        return 'translate(-50%, -50%)';
      }

      const { spacing, rotate, depth, scaleStep, minScale } = getCoverflowMetrics();
      const absOffset = Math.abs(offset);
      const scale = Math.max(minScale, 1 - absOffset * scaleStep);
      const translateX = offset * spacing;
      const translateZ = -absOffset * depth;
      const rotateY = offset * -rotate;

      return `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    };

    const updateSlideCount = () => {
      if (!currentProjectId || !projectImages[currentProjectId]) return;
      const total = projectImages[currentProjectId].length;
      if (slideCount) slideCount.textContent = `${currentSlideIndex + 1} / ${total}`;
    };

    const updateCoverflow = () => {
      const { visibleRange } = getCoverflowMetrics();

      coverflowSlides.forEach((slide, index) => {
        const offset = index - currentSlideIndex;
        const isActive = offset === 0;
        const isHidden = Math.abs(offset) > visibleRange;

        slide.classList.toggle('is-active', isActive);
        slide.classList.toggle('is-hidden', isHidden);
        slide.style.zIndex = String(120 - Math.abs(offset));
        slide.style.opacity = isHidden ? '0' : (isActive ? '1' : String(Math.max(0.28, 0.72 - Math.abs(offset) * 0.14)));
        slide.style.transform = getCoverflowTransform(offset);
        slide.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
        slide.tabIndex = isActive ? 0 : -1;
      });

      const activeImg = coverflowSlides[currentSlideIndex]?.querySelector('img');
      if (activeImg?.complete && activeImg.naturalWidth) {
        fitSlideImage(activeImg);
      }

      syncCoverflowHeight();
      updateSlideCount();
    };

    const renderCoverflow = (projectId) => {
      coverflowTrack.innerHTML = '';
      coverflowSlides = [];

      const images = projectImages[projectId] || [];
      images.forEach((src, index) => {
        const slide = document.createElement('button');
        slide.type = 'button';
        slide.className = 'gallery-coverflow-slide';
        slide.setAttribute('aria-label', `View screenshot ${index + 1}`);

        const card = document.createElement('div');
        card.className = 'gallery-coverflow-card';

        const img = document.createElement('img');
        img.src = resolveImage(src);
        img.alt = `Project screenshot ${index + 1}`;
        img.loading = index < 3 ? 'eager' : 'lazy';
        img.decoding = 'async';
        if (index === 0) {
          img.fetchPriority = 'high';
          img.decoding = 'sync';
        }

        const onImageReady = () => {
          fitSlideImage(img);
          if (index === currentSlideIndex) {
            syncCoverflowHeight();
            updateCoverflow();
          }
        };

        img.addEventListener('load', onImageReady);
        if (img.complete) onImageReady();

        card.appendChild(img);
        slide.appendChild(card);

        slide.addEventListener('click', () => {
          if (index === currentSlideIndex) return;
          currentSlideIndex = index;
          updateCoverflow();
        });

        coverflowTrack.appendChild(slide);
        coverflowSlides.push(slide);
      });
    };

    const renderProjectDetails = (projectId) => {
      const card = document.querySelector(`.project-card[data-project="${projectId}"]`);
      if (!card) return;

      const title = card.querySelector('h3');
      const date = card.querySelector('.date');
      const paragraphs = card.querySelectorAll('.project-copy p');

      if (modalTitle) modalTitle.textContent = title ? title.textContent.trim() : '';
      if (modalDate) modalDate.innerHTML = date ? date.innerHTML : '';

      if (modalCopy) {
        modalCopy.innerHTML = '';
        paragraphs.forEach((paragraph) => {
          const copyLine = document.createElement('p');
          copyLine.textContent = paragraph.textContent.trim();
          modalCopy.appendChild(copyLine);
        });
      }
    };

    const showSlide = (index) => {
      if (!currentProjectId || !projectImages[currentProjectId]) return;

      const images = projectImages[currentProjectId];
      if (index >= images.length) currentSlideIndex = 0;
      else if (index < 0) currentSlideIndex = images.length - 1;
      else currentSlideIndex = index;

      updateCoverflow();

      const total = projectImages[currentProjectId]?.length || 0;
      const singleImage = total <= 1;
      if (prevBtn) prevBtn.hidden = singleImage;
      if (nextBtn) nextBtn.hidden = singleImage;
    };

    const openProjectModal = (projectId) => {
      if (!projectId || !projectImages[projectId] || projectImages[projectId].length === 0) return;

      currentProjectId = projectId;
      currentSlideIndex = 0;
      renderProjectDetails(projectId);
      renderCoverflow(projectId);
      updateCoverflow();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fitAllSlideImages();
          updateCoverflow();
        });
      });
      const total = projectImages[projectId]?.length || 0;
      const singleImage = total <= 1;
      if (prevBtn) prevBtn.hidden = singleImage;
      if (nextBtn) nextBtn.hidden = singleImage;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };

    const closeProjectModal = () => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('.project-img-drop').forEach((zone) => {
      zone.addEventListener('click', () => {
        openProjectModal(zone.getAttribute('data-project'));
      });
    });

    document.querySelectorAll('.project-detail-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        openProjectModal(button.getAttribute('data-project'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlideIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlideIndex + 1); });

    window.addEventListener('resize', () => {
      if (modal.style.display === 'flex' && coverflowSlides.length) {
        fitAllSlideImages();
        updateCoverflow();
      }
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (event) => {
      if (modal.style.display !== 'flex') return;
      if (event.key === 'ArrowRight') showSlide(currentSlideIndex + 1);
      else if (event.key === 'ArrowLeft') showSlide(currentSlideIndex - 1);
      else if (event.key === 'Escape') closeProjectModal();
    });
  }

  function initBubbles() {
    const field = document.getElementById('bubble-field');
    if (!field) return;

    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    const bubbleCount = prefersReducedMotion ? 5 : (isMobile ? 6 : 12);
    const palette = [
      {
        border: 'rgba(184, 134, 58, 0.42)',
        glow: 'rgba(184, 134, 58, 0.18)',
        fill: 'rgba(184, 134, 58, 0.12)',
      },
      {
        border: 'rgba(199, 91, 57, 0.38)',
        glow: 'rgba(199, 91, 57, 0.16)',
        fill: 'rgba(199, 91, 57, 0.1)',
      },
      {
        border: 'rgba(122, 62, 72, 0.36)',
        glow: 'rgba(122, 62, 72, 0.14)',
        fill: 'rgba(122, 62, 72, 0.08)',
      },
    ];

    const bubbles = [];
    let animationId = null;
    let isPaused = document.hidden;

    const randomBetween = (min, max) => min + Math.random() * (max - min);

    const getContentBounds = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const horizontalPad = Math.max(vw * 0.05, 16);
      const contentW = Math.min(1200, vw - horizontalPad * 2);
      const left = (vw - contentW) / 2;
      const buffer = 20;

      return {
        left: left - buffer,
        right: left + contentW + buffer,
        top: 84,
        bottom: vh - 32,
        vw,
        vh,
      };
    };

    const hasSideGutters = (bounds, radius) => {
      return bounds.left >= radius + 10 || bounds.vw - bounds.right >= radius + 10;
    };

    const isInsideContent = (x, y, radius, bounds) => {
      return (
        x + radius > bounds.left &&
        x - radius < bounds.right &&
        y + radius > bounds.top &&
        y - radius < bounds.bottom
      );
    };

    const randomBubblePosition = (size) => {
      const bounds = getContentBounds();
      const radius = size / 2;

      if (hasSideGutters(bounds, radius)) {
        const useLeft = bounds.left >= radius + 10 &&
          (bounds.vw - bounds.right < radius + 10 || Math.random() > 0.5);

        const x = useLeft
          ? randomBetween(radius, bounds.left - radius)
          : randomBetween(bounds.right + radius, bounds.vw - radius);

        return {
          x,
          y: randomBetween(bounds.top + radius, bounds.bottom - radius),
        };
      }

      const x = randomBetween(radius, bounds.vw - radius);
      const topStripMax = bounds.top + 56;
      const bottomStripMin = bounds.bottom - 56;
      const y = Math.random() > 0.5
        ? randomBetween(bounds.top + radius, Math.min(topStripMax, bounds.bottom - radius))
        : randomBetween(Math.max(bottomStripMin, bounds.top + radius), bounds.bottom - radius);

      return { x, y };
    };

    const keepBubbleInZone = (bubble) => {
      const bounds = getContentBounds();
      const radius = bubble.size / 2;
      const { vw, vh } = bounds;

      if (hasSideGutters(bounds, radius)) {
        if (isInsideContent(bubble.x, bubble.y, radius, bounds)) {
          const distLeft = bubble.x - bounds.left;
          const distRight = bounds.right - bubble.x;

          if (distLeft < distRight) {
            bubble.x = bounds.left - radius - 2;
            bubble.vx = -Math.abs(bubble.vx);
          } else {
            bubble.x = bounds.right + radius + 2;
            bubble.vx = Math.abs(bubble.vx);
          }
        }

        if (bubble.x - radius < 0) {
          bubble.x = radius;
          bubble.vx = Math.abs(bubble.vx);
        } else if (bubble.x + radius > vw) {
          bubble.x = vw - radius;
          bubble.vx = -Math.abs(bubble.vx);
        }
      } else if (isInsideContent(bubble.x, bubble.y, radius, bounds)) {
        if (bubble.y < (bounds.top + bounds.bottom) / 2) {
          bubble.y = bounds.top - radius - 2;
          bubble.vy = -Math.abs(bubble.vy);
        } else {
          bubble.y = bounds.bottom + radius + 2;
          bubble.vy = Math.abs(bubble.vy);
        }

        bubble.x = Math.min(Math.max(bubble.x, radius), vw - radius);
      }

      if (bubble.y - radius < bounds.top) {
        bubble.y = bounds.top + radius;
        bubble.vy = Math.abs(bubble.vy);
      } else if (bubble.y + radius > bounds.bottom) {
        bubble.y = bounds.bottom - radius;
        bubble.vy = -Math.abs(bubble.vy);
      }

      if (bubble.y + radius > vh) {
        bubble.y = vh - radius;
        bubble.vy = -Math.abs(bubble.vy);
      }
    };

    const spawnPopRing = (x, y, size) => {
      const ring = document.createElement('span');
      ring.className = 'bubble-pop-ring';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      field.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove(), { once: true });
    };

    const popBubble = (bubble) => {
      if (bubble.popping) return;

      bubble.popping = true;
      bubble.el.classList.add('pop');
      bubble.el.disabled = true;
      spawnPopRing(bubble.x, bubble.y, bubble.size);

      window.setTimeout(() => {
        bubble.el.remove();
        const index = bubbles.indexOf(bubble);
        if (index !== -1) bubbles.splice(index, 1);
        window.setTimeout(createBubble, randomBetween(700, 1800));
      }, 420);
    };

    const createBubble = () => {
      const size = randomBetween(isMobile ? 28 : 36, isMobile ? 50 : 76);
      const position = randomBubblePosition(size);

      if (!position) return;

      const el = document.createElement('button');
      const tone = palette[Math.floor(Math.random() * palette.length)];

      el.type = 'button';
      el.className = 'bubble';
      el.setAttribute('aria-label', 'Pop bubble');
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderColor = tone.border;
      el.style.background = `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.38), ${tone.fill} 48%, rgba(45,212,191,0.06) 100%)`;
      el.style.boxShadow = `inset 0 0 14px rgba(255,255,255,0.16), 0 10px 28px ${tone.glow}`;

      const shimmer = document.createElement('span');
      shimmer.className = 'bubble-shimmer';
      shimmer.setAttribute('aria-hidden', 'true');
      el.appendChild(shimmer);

      const speedScale = prefersReducedMotion ? 0.25 : 1;

      const bubble = {
        el,
        size,
        x: position.x,
        y: position.y,
        vx: randomBetween(-0.38, 0.38) * speedScale,
        vy: randomBetween(-0.38, 0.38) * speedScale,
        popping: false,
      };

      el.style.left = `${bubble.x}px`;
      el.style.top = `${bubble.y}px`;

      el.addEventListener('click', (event) => {
        event.stopPropagation();
        popBubble(bubble);
      });

      field.appendChild(el);
      bubbles.push(bubble);
    };

    const tick = () => {
      if (!isPaused) {
        bubbles.forEach((bubble) => {
          if (bubble.popping) return;

          bubble.x += bubble.vx;
          bubble.y += bubble.vy;
          keepBubbleInZone(bubble);

          bubble.el.style.left = `${bubble.x}px`;
          bubble.el.style.top = `${bubble.y}px`;
        });
      }

      animationId = requestAnimationFrame(tick);
    };

    for (let i = 0; i < bubbleCount; i += 1) {
      createBubble();
    }

    animationId = requestAnimationFrame(tick);

    window.addEventListener('resize', () => {
      bubbles.forEach((bubble) => {
        if (!bubble.popping) keepBubbleInZone(bubble);
      });
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      isPaused = document.hidden;
    });
  }
});
