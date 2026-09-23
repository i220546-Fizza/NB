import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(onFinish, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="absolute -inset-24 rounded-full bg-champagne/10 blur-3xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: phase >= 1 ? 0.8 : 0, scale: phase >= 1 ? 1.1 : 0.6 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.span
              className="font-display text-5xl tracking-[0.3em] text-champagne md:text-6xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              NB
            </motion.span>
            <motion.span
              className="mt-3 label-eyebrow text-beige/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              CLASSIC SCENTS
            </motion.span>

            <motion.p
              className="mt-10 font-serif italic text-lg text-ivory/70 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              The Art of Scent
            </motion.p>

            <motion.div
              className="mt-12 h-px w-40 overflow-hidden bg-cocoa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-champagne"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
