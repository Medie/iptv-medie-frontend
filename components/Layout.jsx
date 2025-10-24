import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/categories/movies", label: "Categories", protected: true },
  { href: "/account", label: "Account", protected: true },
  { href: "/admin", label: "Admin", admin: true }
];

export default function Layout({ title, children }) {
  const { user, logout } = useAuth();
  const isAuthenticated = Boolean(user);

  const visibleLinks = navLinks.filter((link) => {
    if (link.admin) return !!user?.is_admin;
    if (link.protected) return isAuthenticated;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-dark dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-semibold text-primary">
              Medie IPTV
            </Link>
            <ThemeToggle />
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
            {visibleLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                  {user?.username}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="rounded-md border border-primary/40 px-3 py-1 text-primary">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {title && (
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
