import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="section page-section pb-20">
      <PageHeader
        kicker="Portfolio"
        title="Featured Projects"
        intro="Enterprise systems, capstone solutions, and AI-powered applications built during internships and academic projects."
      />

      <div className="mx-auto mt-12 grid max-w-[1140px] gap-5 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream-panel shadow-soft transition hover:-translate-y-1 hover:border-gold/45 hover:shadow-card">
              <button
                type="button"
                className="group relative h-[220px] w-full overflow-hidden bg-cream-alt text-left"
                aria-label={`Open ${project.title} gallery`}
                onClick={() => setActiveProject(project)}
              >
                <img
                  src={project.preview}
                  alt={project.previewAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-75" />
                <span className="absolute bottom-4 left-4 inline-flex translate-y-1.5 items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-2 text-xs font-bold text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <i className="fa-solid fa-images" /> View Gallery
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-bold tracking-wider text-gold">{project.index}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                    <i className="fa-regular fa-calendar" /> {project.date}
                  </span>
                </div>
                <h3 className="text-base leading-snug">{project.title}</h3>
                <div className="mt-3 space-y-0">
                  <p className="line-clamp-3 text-sm leading-7 text-muted">{project.copy[0]}</p>
                </div>
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-gold hover:bg-gold-soft hover:text-wine"
                    onClick={() => setActiveProject(project)}
                  >
                    View Details <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
