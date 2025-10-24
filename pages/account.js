import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import { fetchAccountOverview } from "../lib/api";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

const fetcher = () => fetchAccountOverview();

export default function AccountPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const { data, isLoading, error } = useSWR("account-overview", fetcher, {
    revalidateOnFocus: false
  });
  const [autoRenew, setAutoRenew] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (typeof data?.autoRenew === "boolean") {
      setAutoRenew(data.autoRenew);
    }
  }, [data]);

  const renewalDate = useMemo(() => {
    const iso = data?.renewalDate || user?.expires_at;
    return iso ? new Date(iso).toLocaleString() : "Unknown";
  }, [data, user]);

  const handleAutoRenewToggle = () => {
    setAutoRenew((prev) => !prev);
    setStatus(
      `Auto-renew has been ${!autoRenew ? "enabled" : "disabled"}. Changes will sync to the backend shortly.`
    );
  };

  const handleRenewNow = () => {
    setStatus("Renewal link generated. Complete payment in the billing portal.");
  };

  if (authLoading) {
    return (
      <Layout title="Account">
        <p className="text-slate-500 dark:text-slate-400">Loading your session…</p>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout title="Account">
      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Plan
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {user.plan || data?.plan || "Custom"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Renews on <strong>{renewalDate}</strong>
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span>Languages: {user.languages?.join(", ") || "N/A"}</span>
            <span>Regions: {user.regions?.join(", ") || "N/A"}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRenewNow}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary/80"
            >
              Renew now
            </button>
            <button
              type="button"
              onClick={handleAutoRenewToggle}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                autoRenew
                  ? "border border-emerald-400 text-emerald-600 dark:border-emerald-500 dark:text-emerald-300"
                  : "border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {autoRenew ? "Auto-renew enabled" : "Enable auto-renew"}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Usage
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>{data?.usage?.hoursStreamed ?? "—"} hours</strong> streamed this month
            </li>
            <li>
              Favorite category: <strong>{data?.usage?.favoriteCategory ?? "—"}</strong>
            </li>
            <li>
              Favorite region: <strong>{data?.usage?.favoriteRegion ?? "—"}</strong>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Payment method
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200">{data?.paymentMethod}</p>
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Devices</h3>
          <ul className="mt-4 space-y-4">
            {(data?.devices || []).map((device) => (
              <li
                key={device.id}
                className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300"
              >
                <div className="font-semibold text-slate-900 dark:text-white">{device.name}</div>
                <div>
                  Last seen: {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : "Unknown"}
                </div>
                <div>{device.location}</div>
              </li>
            ))}
          </ul>
          {(!data?.devices || data.devices.length === 0) && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              No devices have been linked to this account yet.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Add-ons</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {(data?.addOns || []).map((addon) => (
              <li
                key={addon.name}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700"
              >
                <span>{addon.name}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    addon.status === "active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100"
                  }`}
                >
                  {addon.status}
                </span>
              </li>
            ))}
          </ul>
          {(!data?.addOns || data.addOns.length === 0) && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              You have no add-ons active on this plan.
            </p>
          )}
        </div>
      </section>

      {status && (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          {status}
        </p>
      )}

      {isLoading && <p className="mt-6 text-slate-500 dark:text-slate-400">Loading account…</p>}
      {error && (
        <p className="mt-6 text-red-500">Unable to fetch account details. Please try again.</p>
      )}
    </Layout>
  );
}
