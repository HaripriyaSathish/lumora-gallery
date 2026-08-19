import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import ProcessCard from './ProcessCard';

export default function Process() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/process/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load process section:', err));
  }, []);

  if (!data) return null;

  return (
    <section id="process" className="grain bg-process px-6 py-12 md:px-10 lg:py-16">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow tone="light">{data.eyebrow_text}</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.01em] text-white sm:text-4xl lg:text-[2.75rem]">
          {data.heading}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {data.steps.map((step, i) => (
          <Reveal key={step.id} delay={i * 100}>
            <ProcessCard number={step.number} title={step.title} description={step.description} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}