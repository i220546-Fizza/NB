import { OurStory } from '@/sections/OurStory';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-obsidian pb-10 pt-32">
      <div className="section-pad mb-16">
        <Reveal>
          <SectionLabel>Since Inception</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="heading-hero mt-6 max-w-3xl text-4xl text-ivory md:text-6xl">
            A HOUSE BUILT ON MEMORY AND MATERIAL
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl font-serif text-lg italic text-beige/60">
            NB Classic Scents was founded on a single conviction: that fragrance
            is the most intimate form of self-expression.
          </p>
        </Reveal>
      </div>
      <OurStory />
    </div>
  );
}
