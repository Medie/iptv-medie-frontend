import { useState } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { api } from "../../lib/api";

const fetchUsers = async () => {
  const response = await api.get("/api/users");
  return response.data.users;
};

export default function AdminPage() {
  const { data, isLoading, error } = useSWR("admin-users", fetchUsers, {
    revalidateOnFocus: false
  });
  const [filter, setFilter] = useState("");

  const filtered = (data || []).filter((user) => {
    if (!filter.trim()) return true;
    const q = filter.toLowerCase();
    return (
      user.username.toLowerCase().includes(q) ||
      user.categories.join(", ").toLowerCase().includes(q) ||
      user.countries.join(", ").toLowerCase().includes(q)
    );
  });

  return (
    <Layout title="Admin">
      <section className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">User management</h2>
          <p className="text-sm text-slate-400">
            Inspect entitlements by language, region, and category.
          </p>
        </div>
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search by username, category, region..."
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-primary focus:outline-none md:w-72"
        />
      </section>

      {isLoading && <p className="text-slate-400">Loading users…</p>}
      {error && <p className="text-red-400">Unable to load users from the backend.</p>}

      {!isLoading && !error && (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-slate-900/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Expires</th>
                <th className="px-4 py-3 text-left">Categories</th>
                <th className="px-4 py-3 text-left">Countries</th>
                <th className="px-4 py-3 text-left">Languages</th>
                <th className="px-4 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-slate-800/60">
                  <td className="px-4 py-4 font-medium text-slate-100">{user.username}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {new Date(user.expires_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{user.categories.join(", ")}</td>
                  <td className="px-4 py-4 text-slate-300">{user.countries.join(", ")}</td>
                  <td className="px-4 py-4 text-slate-300">{user.languages.join(", ")}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {user.is_admin ? "Admin" : "Viewer"}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
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
