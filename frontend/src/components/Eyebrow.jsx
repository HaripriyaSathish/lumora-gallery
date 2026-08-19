import { cn } from '../lib/utils';

export default function Eyebrow({ children, className, align = 'center', tone = 'accent' }) {
  return (
    <div className={cn('flex flex-col gap-2', align === 'center' ? 'items-center' : 'items-start', className)}>
      <span className={cn(
        'text-[0.68rem] font-medium uppercase tracking-[0.28em]',
        tone === 'light' ? 'text-white/70' : 'text-accent'
      )}>
        {children}
      </span>
      <span className={cn('h-px w-10', tone === 'light' ? 'bg-white/40' : 'bg-accent')} />
    </div>
  );
}