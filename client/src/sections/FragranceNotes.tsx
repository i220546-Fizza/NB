import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';

const LAYERS = [
  {
    title: 'Top Notes',
    subtitle: 'The First Impression',
    ingredients: ['Bergamot', 'Pink Pepper', 'Blood Orange', 'Sea Salt'],
    color: '#E8DED0',
  },
  {
    title: 'Heart Notes',
    subtitle: 'The Character',
    ingredients: ['Jasmine', 'Rose', 'Iris', 'Tuberose'],
    color: '#D6B77C',
  },
  {
    title: 'Base Notes',
    subtitle: 'The Lasting Memory',
    ingredients: ['Vanilla', 'Amber', 'Sandalwood', 'Musk'],
    color: '#3A2C25',
  },
];

export function FragranceNotes() {
  return (
    <section className="section-pad relative bg-espresso py-28 md:py-36">
      <Reveal>
        <SectionLabel>Composition</SectionLabel>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="heading-hero mt-6 text-4xl text-ivory md:text-6xl">
          THE ANATOMY OF A SCENT
        </h2>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
        {LAYERS.map((layer, i) => (
          <Reveal key={layer.title} delay={0.15 * i} y={48}>
            <div className="group relative flex h-full flex-col border border-champagne/10 p-8 transition-colors duration-500 hover:border-champagne/40">
              <span
                className="mb-6 h-16 w-16 rounded-full opacity-80 blur-2xl transition-transform duration-700 group-hover:scale-125"
                style={{ backgroundColor: layer.color }}
              />
              <span className="font-serif text-6xl text-champagne/20">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl text-ivory">{layer.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-beige/50">
                {layer.subtitle}
              </p>
              <ul className="mt-6 space-y-2">
                {layer.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="border-b border-cocoa/50 pb-2 font-serif text-beige/70 transition-colors group-hover:text-ivory"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
              {i < LAYERS.length - 1 && (
                <div className="mt-8 hidden justify-center text-champagne/40 md:flex">↓</div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
