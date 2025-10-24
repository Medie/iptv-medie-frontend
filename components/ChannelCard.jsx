export default function ChannelCard({ channel }) {
  const {
    title,
    categoryLabel,
    region,
    language,
    quality,
    tags = [],
    synopsis,
    streamUrl,
    viewers,
    reliability
  } = channel;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        <span>{categoryLabel}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          {quality}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{synopsis}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>🌍 {region}</span>
        <span>🗣 {language}</span>
        {typeof reliability === "number" && <span>✅ {reliability}% uptime</span>}
        {typeof viewers === "number" && <span>👀 {viewers.toLocaleString()} live</span>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={streamUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        Watch stream →
      </a>
    </article>
  );
}
