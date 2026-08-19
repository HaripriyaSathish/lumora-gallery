import { useEffect, useState } from 'react';
import axios from 'axios';
import Reveal from './Reveal';

export default function InstagramStrip() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/instagram/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load Instagram section:', err));
  }, []);

  if (!data) return null;

  return (
    <section id="instagram" className="bg-white px-6 py-12 md:px-10 lg:py-16">
      <Reveal className="text-center">
        <h2 className="text-xl font-bold tracking-[-0.01em] text-foreground sm:text-2xl">
          {data.heading}
        </h2>
        <p className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-accent">
          {data.handle}
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {data.items.map((img, i) => (
          <Reveal key={img.id} delay={(i % 6) * 70}>
            <a
              href={data.profile_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open Instagram: ${img.alt_text || 'photo'}`}
              className="group relative block aspect-square overflow-hidden"
            >
              <img
                src={img.image}
                alt={img.alt_text}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}