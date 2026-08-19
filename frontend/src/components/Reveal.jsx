import { cn } from '../lib/utils';
import { useInView } from '../hooks/useInView';

export default function Reveal({ children, className, delay = 0, from = 'up' }) {
  const { ref, inView } = useInView();

  const hidden =
    from === 'left'
      ? '-translate-x-6 opacity-0'
      : from === 'right'
        ? 'translate-x-6 opacity-0'
        : 'translate-y-3 opacity-0';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-editorial',
        inView ? 'translate-x-0 translate-y-0 opacity-100' : hidden,
        className
      )}
    >
      {children}
    </div>
  );
}