import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const [data, setData] = useState(null);
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/testimonials/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load testimonials:', err));
  }, []);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!data) return null;

  const items = data.items;
  const pages = Math.max(1, items.length - perView + 1);
  const clamped = Math.min(index, pages - 1);

  return (
    <section className="bg-white px-6 py-12 md:px-10 lg:py-16">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>{data.eyebrow_text}</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.01em] text-foreground sm:text-4xl lg:text-[2.75rem]">
          {data.heading}
        </h2>
      </Reveal>

      <div className="mt-12 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-editorial"
          style={{ transform: `translateX(-${clamped * (100 / perView)}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="shrink-0 px-2" style={{ width: `${100 / perView}%` }}>
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="p-2 text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial group ${i + 1}`}
              aria-current={i === clamped}
              onClick={() => setIndex(i)}
              className={cn('h-1.5 w-1.5 rounded-full transition-colors', i === clamped ? 'bg-accent' : 'bg-border')}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => Math.min(pages - 1, i + 1))}
          className="p-2 text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}