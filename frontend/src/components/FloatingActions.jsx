import { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export default function FloatingActions() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/site-settings/`)
      .then((res) => setSettings(res.data))
      .catch((err) => console.error('Failed to load site settings:', err));
  }, []);

  if (!settings) return null;

  const whatsappLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;

  const buttons = [
    {
      href: `tel:${settings.phone_number}`,
      icon: <Phone size={22} />,
      bg: 'bg-blue-600 hover:bg-blue-700',
      label: 'Call us',
      external: false,
    },
    {
      href: whatsappLink,
      icon: <MessageCircle size={22} />,
      bg: 'bg-green-500 hover:bg-green-600',
      label: 'Chat on WhatsApp',
      external: true,
      pulse: true,
    },
    {
      href: `mailto:${settings.email}`,
      icon: <Mail size={22} />,
      bg: 'bg-gray-800 hover:bg-gray-900',
      label: 'Email us',
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {buttons.map((btn, i) => (
        <a
          key={btn.label}
          href={btn.href}
          target={btn.external ? '_blank' : undefined}
          rel={btn.external ? 'noopener noreferrer' : undefined}
          aria-label={btn.label}
          style={{ animationDelay: `${i * 120}ms` }}
          className={`
            relative w-12 h-12 rounded-full ${btn.bg} text-white
            flex items-center justify-center shadow-lg
            transition-transform duration-200 ease-out
            hover:scale-110 active:scale-95
            animate-[fadeSlideIn_0.4s_ease-out_backwards]
          `}
        >
          {btn.pulse && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          )}
          <span className="relative">{btn.icon}</span>
        </a>
      ))}
    </div>
  );
}