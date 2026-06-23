document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  initScrollProgress();
  initRevealAnimations();
  initMagneticElements();
  initMobileMenu();
  initNavHighlight();
  initProjectModal();

  function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    if (!progress && !navbar) return;

    const updateScrollUI = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressWidth = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (progress) progress.style.width = `${progressWidth}%`;
      if (navbar) navbar.classList.toggle('scrolled', scrollTop > 20);
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
      5: ['/static/images/projects/knightbot.png']
    };

    const modal = document.getElementById('slideshow-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const modalTitle = document.getElementById('project-modal-title');
    const modalDate = document.getElementById('project-modal-date');
    const modalCopy = document.getElementById('project-modal-copy');
    const modalThumbs = document.getElementById('project-thumbs');

    if (!modal || !modalImg) return;

    let currentProjectId = null;
    let currentSlideIndex = 0;

    const resolveImage = (path) => (path.startsWith('/') ? path : `${baseUrl}${path}`);

    const renderProjectThumbs = (projectId) => {
      if (!modalThumbs) return;

      modalThumbs.innerHTML = '';
      const images = projectImages[projectId] || [];

      images.forEach((src, index) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = `project-thumb${index === currentSlideIndex ? ' active' : ''}`;
        thumb.setAttribute('aria-label', `Open screenshot ${index + 1}`);

        const img = document.createElement('img');
        img.src = resolveImage(src);
        img.alt = `Project screenshot ${index + 1}`;
        thumb.appendChild(img);

        thumb.addEventListener('click', () => {
          currentSlideIndex = index;
          showSlide(currentSlideIndex);
        });

        modalThumbs.appendChild(thumb);
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
      if (index < 0) currentSlideIndex = images.length - 1;

      modalImg.style.opacity = 0;
      setTimeout(() => {
        modalImg.src = resolveImage(images[currentSlideIndex]);
        modalImg.style.opacity = 1;

        if (modalThumbs) {
          modalThumbs.querySelectorAll('.project-thumb').forEach((thumb, thumbIndex) => {
            thumb.classList.toggle('active', thumbIndex === currentSlideIndex);
          });
        }
      }, 120);
    };

    const openProjectModal = (projectId) => {
      if (!projectId || !projectImages[projectId] || projectImages[projectId].length === 0) return;

      currentProjectId = projectId;
      currentSlideIndex = 0;
      renderProjectDetails(projectId);
      renderProjectThumbs(projectId);
      showSlide(currentSlideIndex);
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

      zone.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProjectModal(zone.getAttribute('data-project'));
        }
      });
    });

    document.querySelectorAll('.project-detail-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        openProjectModal(button.getAttribute('data-project'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (prevBtn) prevBtn.addEventListener('click', () => { currentSlideIndex -= 1; showSlide(currentSlideIndex); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentSlideIndex += 1; showSlide(currentSlideIndex); });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (event) => {
      if (modal.style.display !== 'flex') return;
      if (event.key === 'ArrowRight') { currentSlideIndex += 1; showSlide(currentSlideIndex); }
      else if (event.key === 'ArrowLeft') { currentSlideIndex -= 1; showSlide(currentSlideIndex); }
      else if (event.key === 'Escape') closeProjectModal();
    });
  }
});
