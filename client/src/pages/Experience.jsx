import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { EDUCATION, INTERESTS, LANGUAGES, WORK_HISTORY } from '../data/experience';
import { SITE } from '../data/site';

function TimelineCard({ item, list = false }) {
  return (
    <article className="relative mb-4 rounded-xl border border-line bg-cream-panel py-6 pl-8 pr-6 shadow-soft transition hover:translate-x-1 hover:shadow-card">
      <div className="absolute bottom-6 left-0 top-6 w-1 rounded bg-gradient-to-b from-ink to-gold" />
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-wine">{item.date}</span>
        {item.badge ? (
          <span
            className={`rounded-full px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wide ${
              item.badgeAlt ? 'bg-[rgba(199,91,57,0.12)] text-terracotta' : 'bg-gold-soft text-wine'
            }`}
          >
            {item.badge}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg">{item.title}</h3>
      <p className="mb-3 text-sm font-semibold text-muted">{item.org}</p>
      {list ? (
        <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-muted">
          {item.bullets.map((bullet) => (
            <li key={bullet.slice(0, 40)}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function Experience() {
  return (
    <section className="section page-section pb-20">
      <PageHeader
        kicker="Journey"
        title="Experience"
        intro="Hands-on internship experience in full-stack development and structured training in enterprise technologies and AI fundamentals."
      />

      <div className="mx-auto mt-12 grid max-w-[820px] gap-10">
        <Reveal>
          <h2 className="mb-4 flex items-center gap-2 text-xl">
            <i className="fa-solid fa-briefcase text-gold" /> Work History
          </h2>
          {WORK_HISTORY.map((item) => (
            <TimelineCard key={item.title} item={item} list />
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mb-4 flex items-center gap-2 text-xl">
            <i className="fa-solid fa-graduation-cap text-gold" /> Education
          </h2>
          {EDUCATION.map((item) => (
            <TimelineCard key={item.title} item={item} />
          ))}
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mb-4 flex items-center gap-2 text-xl">
            <i className="fa-solid fa-circle-info text-gold" /> Additional Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-cream-panel p-5 shadow-soft">
              <h4 className="mb-3 text-base text-wine">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-cream-muted px-3 py-1.5 text-sm font-medium text-ink">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-cream-panel p-5 shadow-soft">
              <h4 className="mb-3 text-base text-wine">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <span key={lang.label} className="rounded-full border border-line bg-cream-muted px-3 py-1.5 text-sm font-medium text-ink">
                    <i className="fa-solid fa-language mr-1 text-gold" />
                    {lang.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
