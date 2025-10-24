import Link from "next/link";

export default function PlaylistCard({ title, group, language, region, href }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-primary/60">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
        <span>{group}</span>
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary">{language}</span>
      </div>
      <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      <p className="text-sm text-slate-400">{region}</p>
      <Link
        href={href}
        className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        View playlist
      </Link>
    </article>
  );
}
