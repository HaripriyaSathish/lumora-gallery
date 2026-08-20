import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [siteName, setSiteName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/site-settings/`)
      .then((res) => setSiteName(res.data.site_name))
      .catch((err) => console.error('Failed to load site settings:', err));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Portfolio', href: '#specialties' },
    { label: 'About Us', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  const textColor = scrolled || menuOpen ? 'text-navy' : 'text-white';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ease-out border-b ${
        scrolled || menuOpen ? 'bg-white/90 backdrop-blur border-black/5' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:justify-between md:px-10">
          <span className={`text-lg md:text-xl font-bold tracking-[0.2em] uppercase transition-colors ${textColor}`}>
          {siteName}
        </span>

        <div className={`hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase transition-colors ${textColor}`}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:opacity-70 transition">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className={`md:hidden p-1 transition-colors ${textColor}`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold tracking-widest uppercase text-navy"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}