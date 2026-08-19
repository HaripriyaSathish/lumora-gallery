import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function StatCounter({ value, suffix = '', label }) {
  const { ref, inView } = useInView();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="px-4 text-center">
      <p className="text-4xl font-extrabold tracking-[-0.02em] text-hero-blue sm:text-5xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-3 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}