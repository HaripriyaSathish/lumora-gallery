export default function SpecialtyCard({ item }) {
  return (
    <a
      href="#featured"
      aria-label={`${item.label} photography`}
      className="group relative block h-full w-full overflow-hidden rounded-sm"
    >
      <img
        src={item.image}
        alt={item.label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.04]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-0 left-0 p-5">
        <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-[400ms] ease-editorial group-hover:-translate-y-1">
          {item.label}
        </span>
        <span className="mt-2 block h-px w-0 bg-accent transition-all duration-[400ms] ease-editorial group-hover:w-10" />
      </span>
    </a>
  );
}