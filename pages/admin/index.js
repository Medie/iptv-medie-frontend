import { useState } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetchUsers as fetchUsersRequest } from "../../lib/api";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

const fetchUsers = async () => fetchUsersRequest();

export default function AdminPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const isAdmin = !!user?.is_admin;
  const { data, isLoading, error } = useSWR(isAdmin ? "admin-users" : null, fetchUsers, {
    revalidateOnFocus: false
  });
  const [filter, setFilter] = useState("");

  const filtered = (data || []).filter((entry) => {
    if (!filter.trim()) return true;
    const q = filter.toLowerCase();
    return (
      entry.username.toLowerCase().includes(q) ||
      entry.categories.join(", ").toLowerCase().includes(q) ||
      entry.countries.join(", ").toLowerCase().includes(q)
    );
  });

  if (authLoading) {
    return (
      <Layout title="Admin">
        <p className="text-slate-400">Validating role…</p>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout title="Admin">
        <p className="text-red-400">You need admin privileges to access this area.</p>
      </Layout>
    );
  }

  return (
    <Layout title="Admin">
      <section className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            User management
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Inspect entitlements by language, region, and category.
          </p>
        </div>
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search by username, category, region..."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 md:w-72"
        />
      </section>

      {isLoading && <p className="text-slate-500 dark:text-slate-400">Loading users…</p>}
      {error && <p className="text-red-500 dark:text-red-400">Unable to load users from the backend.</p>}

      {!isLoading && !error && (
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full table-auto border-collapse text-sm text-slate-700 dark:text-slate-200">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Expires</th>
                <th className="px-4 py-3 text-left">Categories</th>
                <th className="px-4 py-3 text-left">Countries</th>
                <th className="px-4 py-3 text-left">Languages</th>
                <th className="px-4 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-950/20">
              {filtered.map((entry) => (
                <tr key={entry.id} className="border-t border-slate-100 dark:border-slate-800/60">
                  <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                    {entry.username}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {new Date(entry.expires_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {entry.categories.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {entry.countries.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {entry.languages.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {entry.is_admin ? "Admin" : "Viewer"}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                    No users matched your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
