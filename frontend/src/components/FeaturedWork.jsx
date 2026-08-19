import { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import FeaturedWorkBlock from './FeaturedWorkBlock';

export default function FeaturedWork() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/featured-work/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load featured work:', err));
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!data) return null;

  return (
    <section id="featured" className="bg-white px-6 pb-12 md:px-10 lg:pb-16">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>{data.eyebrow_text}</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.01em] text-foreground sm:text-4xl lg:text-[2.75rem]">
          {data.heading}
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {data.subtext}
        </p>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-12 lg:gap-16">
        {data.items.map((shoot, i) => (
          <FeaturedWorkBlock key={shoot.id} shoot={shoot} reversed={i % 2 === 1} onOpen={setActive} />
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 animate-[fade_0.3s_ease-out]"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 p-2 text-white"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <img
            src={active.image}
            alt={active.title}
            className="max-h-[85vh] w-auto max-w-full object-contain"
          />
        </div>
      )}
    </section>
  );
}