export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream" aria-hidden="true">
      <div className="absolute inset-[-40%] animate-aurora">
        <div
          className="absolute inset-0"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(184,134,58,0.18), rgba(199,91,57,0.1), rgba(122,62,72,0.08), rgba(250,246,239,0.2), rgba(184,134,58,0.18))',
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(184,134,58,0.1), transparent 55%), radial-gradient(ellipse 70% 55% at 85% 70%, rgba(199,91,57,0.07), transparent 50%), linear-gradient(165deg, rgba(250,246,239,0.55), rgba(242,235,224,0.92))',
        }}
      />
      <div className="absolute -left-[12%] -top-[10%] h-[min(520px,90vw)] w-[min(520px,90vw)] animate-blob-1 rounded-full bg-[radial-gradient(circle,rgba(184,134,58,0.2)_0%,rgba(184,134,58,0)_68%)]" />
      <div className="absolute -bottom-[6%] -right-[8%] h-[min(420px,75vw)] w-[min(420px,75vw)] animate-blob-2 rounded-full bg-[radial-gradient(circle,rgba(199,91,57,0.14)_0%,rgba(199,91,57,0)_68%)]" />
    </div>
  );
}
