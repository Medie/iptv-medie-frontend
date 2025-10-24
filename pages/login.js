import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, user, isAuthenticating } = useAuth();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    try {
      setStatus(null);
      await login(credentials);
      router.push("/dashboard");
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      setStatus(apiMessage || "Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Log in • Medie IPTV</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-slate-900 dark:bg-dark dark:text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
          <h1 className="mb-2 text-2xl font-semibold">Sign in to Medie IPTV</h1>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Use the credentials provided by your administrator.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Username
              <input
                name="username"
                required
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            {status && <p className="text-sm text-red-400">{status}</p>}
            <button
              type="submit"
              disabled={isAuthenticating || loading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAuthenticating ? "Signing in…" : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
