import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/account", label: "Account", protected: true },
  { href: "/admin", label: "Admin", admin: true }
];

export default function Layout({ title, children }) {
  const { user, logout } = useAuth();
  const isAuthenticated = Boolean(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleLinks = navLinks.filter((link) => {
    if (link.admin) return !!user?.is_admin;
    if (link.protected) return isAuthenticated;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-dark dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          {/* Mobile header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-lg font-semibold text-primary">
                Medie IPTV
              </Link>
              <ThemeToggle />
            </div>
            
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:hidden">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                    Signed in as <span className="font-medium text-slate-700 dark:text-slate-200">{user?.username}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block rounded-md border border-primary/40 px-3 py-2 text-center text-base font-medium text-primary hover:bg-primary/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          )}

          {/* Desktop navigation */}
          <nav className="hidden items-center justify-between pt-4 sm:flex sm:pt-0">
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
              {visibleLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
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
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {title && (
          <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
