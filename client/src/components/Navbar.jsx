import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '../data/site';

function SocialLinks({ className = '' }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="grid h-9 w-9 place-items-center rounded-full bg-cream-muted text-muted transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
      >
        <i className="fa-brands fa-github" />
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="grid h-9 w-9 place-items-center rounded-full bg-cream-muted text-muted transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
      >
        <i className="fa-brands fa-linkedin" />
      </a>
      <a
        href={SITE.gmailComposeLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
        className="grid h-9 w-9 place-items-center rounded-full bg-cream-muted text-muted transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
      >
        <i className="fa-solid fa-envelope" />
      </a>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className="site-navbar fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-2rem))] -translate-x-1/2 rounded-full border border-black/10 bg-white/90 shadow-soft backdrop-blur-md transition-all [&.is-scrolled]:top-2.5 [&.is-scrolled]:shadow-card">
        <div className="flex min-h-[62px] items-center justify-between gap-4 px-3 pl-5">
          <Link to="/" className="inline-flex items-center gap-2.5 font-display text-lg font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-ink to-ink-soft text-sm font-extrabold text-cream shadow-accent">
              K
            </span>
            Portfolio
          </Link>

          <ul
            className={`absolute left-1/2 top-[calc(4.75rem+env(safe-area-inset-top))] z-[60] hidden w-[calc(100%-1.5rem)] max-w-[400px] -translate-x-1/2 flex-col gap-1 rounded-xl border border-line bg-white/98 p-3.5 shadow-lift lg:static lg:flex lg:max-w-none lg:translate-x-0 lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${open ? '!flex' : ''}`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="w-full lg:w-auto">
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      'flex min-h-12 w-full items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition lg:min-h-0 lg:w-auto lg:px-3 lg:py-2',
                      link.cta
                        ? 'bg-gradient-to-br from-ink to-ink-soft !text-cream shadow-accent hover:-translate-y-px'
                        : isActive
                          ? 'bg-gold-soft text-wine'
                          : 'text-muted hover:bg-cream-muted hover:text-ink',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-1 border-t border-line pt-2 lg:hidden">
              <SocialLinks className="justify-center" />
            </li>
          </ul>

          <div className="hidden lg:block">
            <SocialLinks />
          </div>

          <button
            type="button"
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-cream-muted text-ink lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
