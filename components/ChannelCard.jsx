import { useState } from "react";

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

  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(streamUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

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
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          title="Open this channel in your preferred IPTV player"
        >
          Watch stream →
          <span className="text-xs text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
            (opens in external player)
          </span>
        </a>
        <button
          onClick={handleCopyUrl}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-400"
          title="Copy stream URL to clipboard"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy URL
            </>
          )}
        </button>
      </div>
    </article>
  );
}
