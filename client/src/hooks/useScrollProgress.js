import { useEffect } from 'react';

export function useScrollProgress() {
  useEffect(() => {
    const progress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.site-navbar');

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressWidth = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (progress) progress.style.width = `${progressWidth}%`;
      if (navbar) navbar.classList.toggle('is-scrolled', scrollTop > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
