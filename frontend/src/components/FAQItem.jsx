import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FAQItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-border/70">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              'text-base font-semibold transition-colors duration-200 sm:text-lg',
              open ? 'text-accent' : 'text-foreground'
            )}
          >
            {item.question}
          </span>
          <Plus
            className={cn(
              'mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ease-editorial',
              open ? 'rotate-45 text-accent' : 'text-muted-foreground'
            )}
            strokeWidth={1.5}
          />
        </button>
      </h3>
      <div
        className={cn(
          'grid transition-all duration-500 ease-editorial',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}