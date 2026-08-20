import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import StatCounter from './StatCounter';

export default function StatsSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/stats/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load stats:', err));
  }, []);

  if (!data || !data.items?.length) return null;

  return (
    <section className="bg-soft px-6 py-10 md:px-10 lg:py-14">
      {(data.heading || data.subtext) && (
        <Reveal className="mx-auto mb-10 flex max-w-lg flex-col items-center text-center lg:mb-14">
          <Eyebrow>{data.eyebrow_text}</Eyebrow>
          {data.heading && (
            <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.01em] text-foreground sm:text-3xl">
              {data.heading}
            </h2>
          )}
          {data.subtext && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.subtext}</p>
          )}
        </Reveal>
      )}
      <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {data.items.map((stat, i) => (
          <div
            key={stat.id}
            className={i > 0 ? 'border-l border-foreground/10 lg:border-l' : 'lg:border-l-0'}
          >
            <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
          </div>
        ))}
      </div>
    </section>
  );
}