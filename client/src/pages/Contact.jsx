import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';

export default function Contact() {
  return (
    <section className="section page-section pb-20">
      <PageHeader
        kicker="Let's talk"
        title="Contact"
        intro="Based in Calamba, Laguna, Philippines. Open to WFH, hybrid, and onsite opportunities."
      />

      <Reveal className="mx-auto mt-12 max-w-[920px]">
        <div className="rounded-2xl border border-line bg-cream-panel p-8 shadow-card">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-base leading-8 text-ink">
                I&apos;m open to collaborations, internships, and full-stack development roles. Reach out
                using the details below — I typically respond within 1–2 business days.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-muted px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-cream"
                >
                  <i className="fa-brands fa-linkedin" /> LinkedIn
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-muted px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-cream"
                >
                  <i className="fa-brands fa-github" /> GitHub
                </a>
                <a
                  href={SITE.gmailComposeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-muted px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-cream"
                >
                  <i className="fa-solid fa-envelope" /> Email
                </a>
              </div>
            </div>

            <div>
              <div className="mb-5 border-b border-line pb-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-wine">Name</span>
                <p className="text-lg font-semibold text-ink">{SITE.name}</p>
              </div>
              <div className="mb-5 border-b border-line pb-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-wine">Email</span>
                <p className="text-lg font-semibold text-ink">
                  <a href={SITE.gmailComposeLink} target="_blank" rel="noopener noreferrer" className="hover:text-wine">
                    {SITE.email}
                  </a>
                </p>
              </div>
              <div className="mb-5 border-b border-line pb-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-wine">Contact Number</span>
                <p className="text-lg font-semibold text-ink">
                  <a href={`tel:+639496279623`}>{SITE.phone}</a>
                </p>
              </div>
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-wine">Location</span>
                <p className="text-lg font-semibold text-ink">{SITE.location}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
