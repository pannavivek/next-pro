const STATS = [
  { value: '120+', label: 'Projects shipped' },
  { value: '14', label: 'Years in practice' },
  { value: '98%', label: 'Client retention' },
  { value: '32', label: 'Industries served' },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 border-y border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-4xl md:text-5xl text-sage mb-2">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROCESS = [
  { step: '01', title: 'Discover', description: 'We map your market, audience, and constraints before touching a single pixel.' },
  { step: '02', title: 'Define', description: 'A clear strategy and scope, agreed in writing, so nobody is guessing later.' },
  { step: '03', title: 'Design & Build', description: 'Iterative work in the open — you see progress weekly, not at the finish line.' },
  { step: '04', title: 'Launch & Learn', description: 'We ship, measure, and hand over a system you can keep improving without us.' },
];

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-wrap mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">How we work</p>
        <h2 className="font-display text-3xl md:text-4xl max-w-lg mb-14">
          A process built for clarity, not theatrics.
        </h2>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {PROCESS.map((p) => (
            <div key={p.step} className="border-t border-sage pt-6">
              <p className="font-mono text-xs text-sage mb-4">{p.step}</p>
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10 text-center">
        <p className="eyebrow mb-6 justify-center">Let&apos;s talk</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl mx-auto mb-8 leading-tight">
          Have a project in mind? Let&apos;s make it real.
        </h2>
        <a
          href="/contact"
          className="inline-flex items-center px-7 py-4 bg-ink text-bg text-sm rounded-full hover:bg-sage transition-colors"
        >
          Start the conversation
        </a>
      </div>
    </section>
  );
}