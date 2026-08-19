import { useEffect, useState } from 'react';
import axios from 'axios';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

export default function CTABooking() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cta/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load CTA section:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/enquire/`, { email });
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
      setStatus('error');
    }
  };

  if (!data) return null;

  return (
    <section id="contact" className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <img
          src={data.background_image}
          alt=""
          className="h-full w-full object-cover opacity-35"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--navy)_92%,transparent),color-mix(in_oklab,var(--navy)_55%,transparent))]" />
      <div className="relative px-6 py-14 sm:py-16 md:px-10 lg:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="light">{data.eyebrow_text}</Eyebrow>
          <h2 className="mt-6 text-[1.75rem] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-white sm:text-[2.4rem] lg:text-[3rem]">
            {data.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {data.subtext}
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="cta-email">Email address</label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="shrink-0 rounded-full bg-white px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Enquire'}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-sm text-white">Thanks — we'll be in touch soon!</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-300">Something went wrong — please try again.</p>
          )}

          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.2em] text-white/55">
            {data.footer_note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}