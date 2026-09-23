import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';

export default function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian pb-32 pt-40">
      <div className="section-pad max-w-3xl">
        <Reveal>
          <SectionLabel>NB Classic Scents</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="heading-hero mt-6 text-4xl text-ivory md:text-5xl">{title}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 space-y-4 font-serif leading-relaxed text-beige/70">{children}</div>
        </Reveal>
      </div>
    </div>
  );
}
