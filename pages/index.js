import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
        Medie IPTV
      </span>
      <h1 className="text-4xl font-bold sm:text-5xl">
        Private IPTV, <span className="text-primary">AI-enriched</span>
      </h1>
      <p className="max-w-2xl text-lg text-slate-300">
        The Medie dashboard lets your viewers explore playlists, languages, and regions curated by
        AI. Log in to access personalised content and administrative tools.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/login"
          className="rounded-md bg-primary px-6 py-3 font-semibold text-slate-900 transition hover:bg-primary/80"
        >
          Log In
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:border-primary hover:text-primary"
        >
          View Dashboard
        </Link>
      </div>
    </main>
  );
}
