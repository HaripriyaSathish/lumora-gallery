import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

export default function Manifesto() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/manifesto/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load manifesto section:', err));
  }, []);

  if (!data) return null;

  return (
    <section className="bg-white px-6 py-14 md:px-10 lg:py-20">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Eyebrow>{data.eyebrow_text}</Eyebrow>
        <p className="mt-6 text-xl font-medium italic leading-relaxed tracking-[-0.01em] text-foreground sm:text-2xl lg:text-[1.75rem]">
          &ldquo;{data.statement}&rdquo;
        </p>
        {data.attribution && (
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {data.attribution}
          </p>
        )}
      </Reveal>
    </section>
  );
}