import { cn } from '../lib/utils';
import Reveal from './Reveal';

export default function FeaturedWorkBlock({ shoot, reversed, onOpen }) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-5 md:gap-12">
      <Reveal from={reversed ? 'right' : 'left'} className={cn('md:col-span-3', reversed && 'md:order-2')}>
        <button
          type="button"
          onClick={() => onOpen(shoot)}
          aria-label={`View full image: ${shoot.title}`}
          className="group block w-full overflow-hidden rounded-sm"
        >
          <img
            src={shoot.image}
            alt={shoot.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]"
          />
        </button>
      </Reveal>
      <Reveal from={reversed ? 'left' : 'right'} delay={120} className={cn('md:col-span-2', reversed && 'md:order-1')}>
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-accent">
          {shoot.tag}
        </p>
        <h3 className="mt-4 text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-3xl">
          {shoot.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{shoot.story}</p>
      </Reveal>
    </article>
  );
}