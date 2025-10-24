import Link from "next/link";

export default function PlaylistCard({ title, group, language, region, href }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/80 p-5 transition hover:border-primary/60 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        <span>{group}</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{language}</span>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{region}</p>
      <Link
        href={href}
        className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        View playlist
      </Link>
    </article>
  );
}
