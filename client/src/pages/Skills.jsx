import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { SKILL_HIGHLIGHTS, SKILL_SECTIONS } from '../data/skills';

function SkillBlock({ section }) {
  return (
    <section
      className={`rounded-2xl border border-line bg-cream-panel p-6 shadow-soft transition hover:border-gold/35 hover:shadow-card ${
        section.primary ? 'bg-[linear-gradient(165deg,rgba(184,134,58,0.1),transparent_55%),white]' : ''
      }`}
    >
      <header className="mb-5 flex items-start gap-4">
        <span className="font-display text-sm font-bold text-gold">{section.num}</span>
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {section.label}
          </span>
          <h3 className="text-lg">{section.title}</h3>
        </div>
      </header>

      {section.stack ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(108px,1fr))] gap-3">
          {section.stack.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-line bg-cream-muted p-4 text-center transition hover:border-gold/35 hover:bg-gold-soft"
            >
              <div className="grid h-[52px] w-[52px] place-items-center rounded-2xl border border-line bg-cream-panel">
                <img src={item.icon} alt="" className="h-[30px] w-[30px] object-contain" />
              </div>
              <span className="text-sm font-semibold text-ink">{item.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <ul className={section.grid ? 'grid gap-0 sm:grid-cols-2' : 'space-y-0'}>
          {section.items.map((item) => (
            <li
              key={item}
              className="border-b border-line py-2.5 pl-4 text-sm font-medium text-ink transition hover:pl-5 hover:text-wine last:border-b-0"
              style={{ position: 'relative' }}
            >
              <span className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gold opacity-75" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Skills() {
  const primary = SKILL_SECTIONS.find((section) => section.primary);
  const paired = SKILL_SECTIONS.filter((section) => ['02', '03'].includes(section.num));
  const security = SKILL_SECTIONS.find((section) => section.num === '04');
  const triple = SKILL_SECTIONS.filter((section) => ['05', '06', '07'].includes(section.num));
  const aiTools = SKILL_SECTIONS.find((section) => section.num === '08');

  return (
    <section className="section page-section pb-20">
      <PageHeader
        kicker="Expertise"
        title="Technical Skills"
        intro="A focused toolkit for building secure, scalable web applications — from interface design to backend architecture and deployment."
      />

      <div className="mx-auto mt-12 grid max-w-[1140px] items-start gap-7 lg:grid-cols-[minmax(240px,300px)_1fr]">
        <Reveal className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-[linear-gradient(165deg,rgba(184,134,58,0.1),transparent_55%),white] p-7 shadow-soft">
            <div className="mb-5 h-[3px] w-10 rounded-full bg-gradient-to-r from-ink to-gold" />
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-gold">
              Profile Summary
            </span>
            <h2 className="mb-3 text-xl leading-snug">What I bring to the table</h2>
            <p className="mb-5 text-sm leading-7 text-muted">
              Full-stack capabilities backed by internship experience in enterprise systems, database
              design, and security-conscious development.
            </p>
            <ul className="space-y-3">
              {SKILL_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                  <i className="fa-solid fa-check mt-1 text-xs text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal>{primary ? <SkillBlock section={primary} /> : null}</Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {paired.map((section, index) => (
              <Reveal key={section.num} delay={index * 0.06}>
                <SkillBlock section={section} />
              </Reveal>
            ))}
          </div>

          <Reveal>{security ? <SkillBlock section={security} /> : null}</Reveal>

          <div className="grid gap-4 xl:grid-cols-3">
            {triple.map((section, index) => (
              <Reveal key={section.num} delay={index * 0.06}>
                <SkillBlock section={section} />
              </Reveal>
            ))}
          </div>

          <Reveal>{aiTools ? <SkillBlock section={aiTools} /> : null}</Reveal>
        </div>
      </div>
    </section>
  );
}
