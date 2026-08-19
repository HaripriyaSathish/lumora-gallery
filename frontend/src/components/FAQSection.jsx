import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import FAQItem from './FAQItem';

export default function FAQSection() {
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/faq/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load FAQ section:', err));
  }, []);

  if (!data) return null;

  return (
    <section id="faq" className="bg-white px-6 py-12 sm:py-14 md:px-10 lg:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal from="left">
          <Eyebrow align="left">{data.eyebrow_text}</Eyebrow>
          <h2 className="mt-5 text-[1.6rem] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-foreground sm:text-[2rem]">
            {data.heading}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {data.subtext}
          </p>
        </Reveal>
        <Reveal from="right" delay={80}>
          <div className="border-t border-border/70">
            {data.items.map((item, i) => (
              <FAQItem
                key={item.id}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}