import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCounter from './StatCounter';

export default function StatsSection() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/stats/`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Failed to load stats:', err));
  }, []);

  if (!stats.length) return null;

  return (
    <section className="bg-soft px-6 py-10 md:px-10 lg:py-14">
      <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
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