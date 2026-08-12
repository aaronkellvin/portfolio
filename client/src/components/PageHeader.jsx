import Reveal from './Reveal';

export default function PageHeader({ kicker, title, intro, children }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="section-kicker">{kicker}</span>
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <div className="underline-bar mx-auto" />
      {intro ? <p className="page-intro mx-auto">{intro}</p> : null}
      {children}
    </Reveal>
  );
}
