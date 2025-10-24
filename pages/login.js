import { useState } from "react";
import Head from "next/head";
import { API_BASE_URL } from "../lib/api";

export default function LoginPage() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, value));

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        body,
        credentials: "include"
      });
      if (response.redirected || response.ok) {
        window.location.href = "/dashboard";
      } else {
        setStatus("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setStatus("Unable to reach the backend. Check the API URL.");
    }
  };

  return (
    <>
      <Head>
        <title>Log in • Medie IPTV</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-dark px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-semibold text-slate-100">Sign in to Medie IPTV</h1>
          <p className="mb-6 text-sm text-slate-400">
            Use the credentials provided by your administrator.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-sm text-slate-300">
              Username
              <input
                name="username"
                required
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </label>
            <label className="text-sm text-slate-300">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </label>
            {status && <p className="text-sm text-red-400">{status}</p>}
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-primary/80"
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
