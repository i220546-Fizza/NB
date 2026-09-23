import { Hero } from '@/sections/Hero';
import { CollectionShowcase } from '@/sections/CollectionShowcase';
import { FragranceNotes } from '@/sections/FragranceNotes';
import { ScentInMotion } from '@/sections/ScentInMotion';
import { SignatureFinder } from '@/sections/SignatureFinder';
import { OurStory } from '@/sections/OurStory';

export default function Home() {
  return (
    <>
      <Hero />
      <CollectionShowcase />
      <FragranceNotes />
      <ScentInMotion />
      <OurStory />
      <SignatureFinder />
    </>
  );
}
