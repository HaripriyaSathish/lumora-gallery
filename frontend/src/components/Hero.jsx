import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/hero/`)
      .then((res) => setHero(res.data))
      .catch((err) => console.error('Failed to load hero section:', err));
  }, []);

  if (!hero) {
    return <section className="h-[500px] w-full bg-navy sm:h-[560px] lg:h-[640px]" />;
  }

  return (
    <section
      id="top"
      className="relative -mt-[76px] h-[500px] w-full overflow-hidden sm:h-[560px] lg:h-[640px]"
    >
      <img
        src={hero.background_image}
        alt={hero.title}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover [animation:hero-in_1.4s_cubic-bezier(0.22,1,0.36,1)_both]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top_right,color-mix(in_oklab,var(--navy)_88%,transparent),color-mix(in_oklab,var(--hero-blue)_45%,transparent)_55%,transparent_88%)]" />
      <div className="relative flex h-full items-end pb-16 sm:pb-20 lg:pb-24">
        <div className="w-full px-6 md:px-10">
          <div className="max-w-[600px]">
            <h1 className="animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] text-[2rem] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-[2.6rem] lg:text-[3.4rem]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-md animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] text-sm leading-relaxed text-white/90 sm:text-base">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.45s_both] flex-wrap gap-3">
              <a
                href={hero.primary_button_link}
                className="rounded-full bg-navy px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                {hero.primary_button_text}
              </a>
              <a
                href={hero.secondary_button_link}
                className="rounded-full border border-white/60 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:border-white hover:bg-white/10"
              >
                                {hero.secondary_button_text}
              </a>
            </div>
            {hero.trust_line && (
              <p className="mt-6 animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.6s_both] text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
                {hero.trust_line}
              </p>
            )}
          </div>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-white/60 animate-[scroll-line_2s_ease-in-out_infinite] sm:block"
      />
    </section>
  );
}