import { useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-obsidian pb-32 pt-40">
      <div className="section-pad grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-hero mt-6 text-4xl text-ivory md:text-6xl">CONTACT</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md font-serif text-beige/60">
              For press, partnerships, or personal fragrance consultations,
              reach out — our house is always listening.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-3 text-beige/70">
              <p>hello@nbclassicscents.com</p>
              <p>+1 (212) 555-0192</p>
              <p>Fifth Avenue Atelier, New York</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          {sent ? (
            <div className="border border-champagne/30 p-10 text-center">
              <p className="font-display text-2xl text-champagne">Message Sent</p>
              <p className="mt-3 text-beige/60">We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Name" required />
              <Field label="Email" type="email" required />
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest2 text-beige/50">Message</span>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
                />
              </label>
              <button type="submit" className="btn-luxury">
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
      />
    </label>
  );
}
