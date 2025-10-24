import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <div className="min-h-screen bg-dark text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold text-primary">
            Medie IPTV
          </Link>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {title && <h1 className="mb-6 text-3xl font-bold text-slate-50">{title}</h1>}
        {children}
      </main>
    </div>
  );
}
