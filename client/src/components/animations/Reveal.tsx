import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'span';
  once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 1,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%' },
};

export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    // The whileInView trigger must live on this unclipped wrapper — a child
    // span that starts translated fully outside its own overflow:hidden
    // mask has an intersection ratio of 0 by definition, so it can never
    // satisfy its own viewport threshold. Variants propagate the animation
    // state down to each masked word instead.
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={wordVariants}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.06,
              ease: EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
