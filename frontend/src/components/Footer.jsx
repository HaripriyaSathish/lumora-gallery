import { useEffect, useState } from 'react';
import axios from 'axios';

const columns = (data) => [
  {
    title: 'Studio',
    links: [
      { label: 'Portfolio', href: '#specialties' },
      { label: 'About Us', href: '#studio' },
      { label: 'Our Process', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Sessions',
    links: [
      { label: 'Weddings', href: '#specialties' },
      { label: 'Portraits', href: '#specialties' },
      { label: 'Family', href: '#specialties' },
      { label: 'Maternity', href: '#specialties' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: data.email, href: `mailto:${data.email}` },
      { label: data.phone_number, href: `tel:${data.phone_number}` },
      { label: 'Instagram', href: data.instagram_url, external: true },
      { label: 'Book a Session', href: '#contact' },
    ],
  },
];

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/footer/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load footer:', err));
  }, []);

  if (!data) return null;

  const cols = columns(data);

  return (
    <footer className="bg-navy px-6 pb-10 pt-16 text-white md:px-10 lg:pt-20">
      <div className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
        <div>
          <a href="#top" className="text-sm font-extrabold uppercase tracking-[0.32em] text-white">
            {data.site_name}
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {data.tagline}
          </p>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              {col.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="break-words text-sm text-white/80 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="flex flex-col gap-3 pt-6 text-[0.68rem] uppercase tracking-[0.2em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {data.site_name}</p>
        <p>Bangalore &middot; Available worldwide</p>
      </div>
    </footer>
  );
}