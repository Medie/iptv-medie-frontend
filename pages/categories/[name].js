import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import ChannelCard from "../../components/ChannelCard";
import { fetchChannels, fetchCategoriesSummary } from "../../lib/api";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import Link from "next/link";

const channelsFetcher = async ([, category]) => fetchChannels({ category });
const categoriesFetcher = () => fetchCategoriesSummary();

export default function CategoryDetailPage() {
  const router = useRouter();
  const slug = router.query.name;
  const { loading: authLoading, user } = useProtectedRoute();
  const { data: categories } = useSWR("categories-summary", categoriesFetcher, {
    revalidateOnFocus: false
  });
  const { data: channels, isLoading, error } = useSWR(
    slug ? ["channels", slug] : null,
    channelsFetcher,
    { revalidateOnFocus: false }
  );

  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reliability");

  const category = categories?.find((entry) => entry.slug === slug);
  const otherCategories = categories?.filter((entry) => entry.slug !== slug) || [];

  const filterOptions = useMemo(() => {
    const regions = new Set();
    const languages = new Set();
    (channels || []).forEach((channel) => {
      if (channel.region) regions.add(channel.region);
      if (channel.language) languages.add(channel.language);
    });
    return {
      regions: Array.from(regions),
      languages: Array.from(languages)
    };
  }, [channels]);

  const filteredChannels = useMemo(() => {
    let results = channels || [];
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (channel) =>
          channel.title.toLowerCase().includes(q) ||
          channel.synopsis?.toLowerCase().includes(q) ||
          channel.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (regionFilter !== "all") {
      results = results.filter((channel) => channel.region === regionFilter);
    }
    if (languageFilter !== "all") {
      results = results.filter((channel) => channel.language === languageFilter);
    }
    results = [...results].sort((a, b) => {
      if (sortBy === "reliability") {
        return (b.reliability || 0) - (a.reliability || 0);
      }
      if (sortBy === "viewers") {
        return (b.viewers || 0) - (a.viewers || 0);
      }
      return a.title.localeCompare(b.title);
    });
    return results;
  }, [channels, query, regionFilter, languageFilter, sortBy]);

  if (authLoading) {
    return (
      <Layout title="Categories">
        <p className="text-slate-500 dark:text-slate-400">Authorizing…</p>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout title={category ? `${category.label} category` : "Category"}>
      {category ? (
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-8 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs uppercase tracking-[0.4em] text-slate-400">Experience</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{category.label}</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{category.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
            <span>{category.stats.channels} curated channels</span>
            <span>{category.stats.hd} HD / Dolby ready</span>
            <span>{category.stats.languages.join(" • ")}</span>
          </div>
          {category.featured && (
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
              {category.featured.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
          Unknown category. Choose another below.
        </section>
      )}

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40 md:flex-row md:items-end md:justify-between">
        <div className="w-full space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Titles, tags, or synopsis…"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Region
            <select
              value={regionFilter}
              onChange={(event) => setRegionFilter(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="all">All</option>
              {filterOptions.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Language
            <select
              value={languageFilter}
              onChange={(event) => setLanguageFilter(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="all">All</option>
              {filterOptions.languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>
          <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Sort
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="reliability">Reliability</option>
              <option value="viewers">Viewers</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      </div>

      {isLoading && <p className="text-slate-500 dark:text-slate-400">Loading channels…</p>}
      {error && (
        <p className="text-red-500 dark:text-red-400">
          Unable to load channels for this category. Please try refreshing.
        </p>
      )}

      {!isLoading && !error && (
        <>
          {filteredChannels.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
              No channels matched your filters yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          )}
        </>
      )}

      {otherCategories.length > 0 && (
        <section className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Jump to another category
          </h3>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((entry) => (
              <Link
                key={entry.slug}
                href={`/categories/${entry.slug}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
              >
                {entry.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
