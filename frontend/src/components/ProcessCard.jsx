export default function ProcessCard({ number, title, description }) {
  return (
    <div className="h-full border border-white/12 bg-navy p-7">
      <span className="block text-4xl font-extrabold text-accent/55">{number}</span>
      <h3 className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>
    </div>
  );
}