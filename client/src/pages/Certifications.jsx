import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { CERTIFICATIONS } from '../data/certifications';

export default function Certifications() {
  return (
    <section className="section page-section pb-20">
      <PageHeader
        kicker="Achievements"
        title="Certifications & Awards"
        intro="Industry-recognized certifications in programming, web development, data science, and enterprise technology training."
      />

      <div className="mx-auto mt-12 grid max-w-[1100px] gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.title} delay={index * 0.05}>
            <article className="flex gap-4 rounded-xl border border-line bg-cream-panel p-5 shadow-soft transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-card">
              <div className="grid h-12 w-12 min-w-12 place-items-center rounded-[14px] bg-gold-soft text-lg text-wine">
                <i className={cert.icon} />
              </div>
              <div>
                <h3 className="mb-1 text-base leading-snug">{cert.title}</h3>
                <span className="block text-xs font-semibold text-muted">{cert.issuer}</span>
                <span className="mt-1 block text-sm font-bold text-gold">{cert.year}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
