import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MeetTheStudio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/studio/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load studio section:', err));
  }, []);

  if (!data) return null;

  return (
    <section id="studio" className="bg-soft px-6 py-12 md:px-10 lg:py-16">
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-14">
        <Reveal from="left" className="md:col-span-2">
          <div className="border border-foreground/10 p-2">
            <img
              src={data.image}
              alt={data.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal from="right" delay={120} className="md:col-span-3">
          <Eyebrow align="left">{data.eyebrow_text}</Eyebrow>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.01em] text-foreground sm:text-4xl">
            {data.name}
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            {data.role}
          </p>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground/80">
            {data.bio_paragraph_1}
          </p>
          <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-foreground/80">
            {data.bio_paragraph_2}
          </p>
          <p className="mt-8 max-w-lg border-l-2 border-accent pl-5 text-lg italic leading-relaxed text-foreground">
            &ldquo;{data.quote}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}