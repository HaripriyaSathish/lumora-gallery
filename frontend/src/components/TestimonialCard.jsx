import { Star } from 'lucide-react';

export default function TestimonialCard({ item }) {
  return (
    <figure className="flex h-full flex-col border border-border bg-white p-7">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={item.avatar}
          alt={item.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <figcaption className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
          <p className="truncate text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground">
            {item.shoot}
          </p>
        </figcaption>
      </div>
      <div className="mt-5 flex gap-1" aria-label={`Rated ${item.rating} out of 5`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
    </figure>
  );
}