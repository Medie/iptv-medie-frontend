import Link from "next/link";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetchCategoriesSummary } from "../../lib/api";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

const fetcher = () => fetchCategoriesSummary();

export default function CategoriesIndexPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const { data, isLoading, error } = useSWR("categories-summary", fetcher, {
    revalidateOnFocus: false
  });

  if (authLoading) {
    return (
      <Layout title="Categories">
        <p className="text-slate-500 dark:text-slate-400">Preparing your catalog…</p>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout title="Categories">
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Browse by experience
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choose a category to open a TV-style grid filtered by language, region, and tags.
        </p>
      </section>

      {isLoading && <p className="text-slate-500 dark:text-slate-400">Loading categories…</p>}
      {error && (
        <p className="text-red-500 dark:text-red-400">
          Unable to load categories from the backend. Check the API service status.
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          {data?.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`rounded-2xl border border-white/20 bg-gradient-to-r ${category.gradient} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl`}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/80">Category</div>
              <h3 className="mt-2 text-2xl font-bold">{category.label}</h3>
              <p className="mt-2 text-sm text-white/80">{category.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/90">
                <span>{category.stats.channels} channels</span>
                <span>{category.stats.hd} HD</span>
                <span>{category.stats.languages.join(" / ")}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
