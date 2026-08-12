import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';

const PREVIEW_CARDS = [
  { to: '/skills', icon: 'fa-solid fa-wand-magic-sparkles', title: 'Skills', text: 'Programming, frontend, backend, security, frameworks, and professional tools.' },
  { to: '/projects', icon: 'fa-solid fa-rocket', title: 'Projects', text: 'Full-stack systems, AI integrations, and enterprise web applications.' },
  { to: '/experience', icon: 'fa-solid fa-briefcase', title: 'Experience', text: 'Internship at PNP Maritime Group, Accenture Academy training, and education.' },
  { to: '/certifications', icon: 'fa-solid fa-medal', title: 'Certifications', text: 'IT Specialist, Cisco, and industry credentials across development and cloud.' },
  { to: '/resume', icon: 'fa-solid fa-file-pdf', title: 'Resume', text: 'View and download my latest resume PDF on the site.' },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto grid min-h-screen max-w-[1200px] items-center gap-12 px-[5%] pb-16 pt-32 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="flex justify-center">
          <div className="relative w-[min(340px,88vw)]">
            <div className="absolute -inset-3.5 animate-spin-slow rounded-full bg-[conic-gradient(from_200deg,theme(colors.ink.DEFAULT),theme(colors.gold.DEFAULT),theme(colors.terracotta),theme(colors.ink.DEFAULT))] opacity-65" />
            <div className="relative aspect-square overflow-hidden rounded-full border-[5px] border-cream-panel bg-cream-panel shadow-lift">
              <img src={SITE.profileImage} alt={SITE.shortName} className="h-full w-full object-cover" draggable={false} />
            </div>
            <span className="absolute bottom-4 -right-2 flex items-center gap-1.5 rounded-full bg-cream-panel px-4 py-2 text-sm font-bold text-gold shadow-card">
              <i className="fa-solid fa-circle text-[0.55rem] animate-pulse" /> Open to work
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.08}>
            <span className="mb-2 inline-block text-sm font-semibold text-terracotta">Hello there 👋</span>
            <h1 className="text-4xl leading-tight md:text-5xl">
              I&apos;m <span className="highlight-text">{SITE.name}</span>
            </h1>
            <p className="hero-role mt-3 inline-block border-b-2 border-gold-soft pb-1 font-display text-xl font-semibold text-wine md:text-2xl">
              {SITE.role}
            </p>
            <p className="mt-5 max-w-[54ch] leading-7 text-muted">
              Detail-oriented developer with a solid foundation in Information Technology and hands-on
              full-stack experience. I build user-friendly applications and leverage AI tools to solve
              real-world problems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                View My Work <i className="fa-solid fa-arrow-right" />
              </Link>
              <Link to="/resume" className="btn-secondary">
                View Resume
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream-panel px-4 py-2.5 text-sm font-semibold text-ink shadow-soft">
                <i className="fa-solid fa-laptop-code rounded-[10px] bg-gold-soft p-2 text-wine" /> Full Stack Web
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream-panel px-4 py-2.5 text-sm font-semibold text-ink shadow-soft">
                <i className="fa-solid fa-location-dot rounded-[10px] bg-gold-soft p-2 text-wine" /> Calamba, Laguna
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream-panel px-4 py-2.5 text-sm font-semibold text-ink shadow-soft">
                <i className="fa-solid fa-graduation-cap rounded-[10px] bg-gold-soft p-2 text-wine" /> BS Information Technology
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section pb-20 pt-4">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Discover</span>
          <h2 className="text-3xl md:text-4xl">What I Do</h2>
          <div className="underline-bar mx-auto" />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[1100px] gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {PREVIEW_CARDS.map((card, index) => (
            <Reveal key={card.to} delay={index * 0.08}>
              <Link
                to={card.to}
                className="group relative block overflow-hidden rounded-2xl border border-line bg-cream-panel p-6 shadow-soft transition hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-ink to-gold transition group-hover:scale-x-100" />
                <i className={`${card.icon} mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-gold-soft text-lg text-wine`} />
                <h3 className="mb-2 text-lg">{card.title}</h3>
                <p className="text-sm leading-6">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-wine opacity-0 transition group-hover:opacity-100">
                  Explore <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
