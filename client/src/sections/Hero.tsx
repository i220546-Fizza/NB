import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealText } from '@/components/animations/Reveal';
import { HeroBottleExperience } from '@/components/3d/HeroBottleExperience';
import { GoldLine } from '@/components/ui/GoldLine';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(214,183,124,0.08),transparent_60%)]" />

      <div className="section-pad relative z-10 grid w-full grid-cols-1 items-center gap-12 pt-24 lg:grid-cols-2 lg:pt-0">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 flex items-center gap-4"
          >
            <GoldLine />
            <span className="label-eyebrow">NB Classic Scents</span>
          </motion.div>

          <h1 className="heading-hero text-5xl text-ivory sm:text-6xl md:text-7xl xl:text-8xl">
            <RevealText text="A SCENT" />
            <br />
            <RevealText text="THAT DEFINES" delay={0.15} />
            <br />
            <span className="text-champagne">
              <RevealText text="YOU." delay={0.3} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-8 max-w-md font-serif text-lg text-beige/70 md:text-xl"
          >
            Crafted for those who leave an impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link to="/collection" className="btn-luxury">
              Explore Collection
            </Link>
            <Link to="/signature" className="btn-ghost">
              Discover Your Scent
            </Link>
          </motion.div>
        </div>

        <div className="order-1 h-[50vh] lg:order-2 lg:h-[80vh]">
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          >
            <HeroBottleExperience />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-beige/40 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-champagne/40" />
      </motion.div>
    </section>
  );
}
