import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import SpecialtyCard from './SpecialtyCard';

export default function Specialties() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/specialties/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load specialties:', err));
  }, []);

  if (!data) return null;

  return (
    <section id="specialties" className="bg-white px-6 py-12 md:px-10 lg:py-16">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>{data.eyebrow_text}</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.01em] text-navy sm:text-4xl lg:text-[2.75rem]">
          {data.heading}
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
        {data.items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 4) * 80} className="aspect-[3/4]">
            <SpecialtyCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}