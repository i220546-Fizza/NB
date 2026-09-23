import { Reveal, RevealText } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';
import { GoldLine } from '@/components/ui/GoldLine';

export function OurStory() {
  return (
    <section className="relative overflow-hidden bg-beige py-28 text-espresso md:py-36">
      <div className="section-pad grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <GoldLine />
              <span className="label-eyebrow text-cocoa">Our Philosophy</span>
            </div>
          </Reveal>
          <h2 className="heading-hero mt-6 text-4xl text-espresso md:text-6xl">
            <RevealText text="THE ART OF" className="text-espresso" />
            <br />
            <span className="text-gold">
              <RevealText text="SCENT" delay={0.15} />
            </span>
          </h2>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-cocoa/80">
              Every NB Classic Scents fragrance begins as a single idea — a memory,
              a mood, a moment worth preserving. Our perfumers work in small
              batches, blending rare absolutes with modern accords until the
              scent feels inevitable.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-cocoa/80">
              We believe a fragrance is not worn — it is carried. It becomes
              part of how you are remembered.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-cocoa/20 pt-8">
              {[
                ['12+', 'Years of Craft'],
                ['40', 'Rare Ingredients'],
                ['100%', 'Hand Finished'],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl text-gold">{num}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest2 text-cocoa/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Parallax speed={0.15}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-cocoa via-espresso to-obsidian">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[140px] leading-none text-champagne/10">NB</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 border-t border-champagne/20 pt-4">
              <p className="font-serif italic text-beige/70">
                “Crafted for those who leave an impression.”
              </p>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
