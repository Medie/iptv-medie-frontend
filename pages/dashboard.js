import { useMemo, useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import PlaylistCard from "../components/PlaylistCard";
import { fetchUnifiedPlaylist, generateUnifiedM3U8, API_BASE_URL } from "../lib/api";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

const fetcher = () => fetchUnifiedPlaylist();

export default function DashboardPage() {
  const { loading: authLoading, user } = useProtectedRoute();
  const { data, isLoading, error, mutate } = useSWR("unified-playlist", fetcher, {
    revalidateOnFocus: false
  });
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [isGeneratingPlaylist, setIsGeneratingPlaylist] = useState(false);

  const filterOptions = useMemo(() => {
    const categories = new Set();
    const regions = new Set();
    const languages = new Set();
    (data || []).forEach((channel) => {
      categories.add(channel.groupTitle);
      regions.add(channel.region);
      languages.add(channel.language);
    });
    return {
      categories: Array.from(categories).sort(),
      regions: Array.from(regions).sort(),
      languages: Array.from(languages).sort()
    };
  }, [data]);

  const filtered = (data || []).filter((channel) => {
    const matchesQuery = (() => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        channel.title.toLowerCase().includes(q) ||
        channel.synopsis.toLowerCase().includes(q) ||
        channel.tags.some(tag => tag.toLowerCase().includes(q)) ||
        channel.country.toLowerCase().includes(q) ||
        channel.language.toLowerCase().includes(q) ||
        channel.region.toLowerCase().includes(q)
      );
    })();
    const matchesCategory = categoryFilter === "all" || channel.groupTitle === categoryFilter;
    const matchesRegion = regionFilter === "all" || channel.region === regionFilter;
    const matchesLanguage = languageFilter === "all" || channel.language === languageFilter;

    return matchesQuery && matchesCategory && matchesRegion && matchesLanguage;
  });

  const handleDownloadPlaylist = async () => {
    setIsGeneratingPlaylist(true);
    try {
      const m3u8Url = await generateUnifiedM3U8();
      // Create a temporary link to download the M3U8 file
      const link = document.createElement('a');
      link.href = m3u8Url;
      link.download = 'medie-unified-playlist.m3u8';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate playlist:', error);
      alert('Failed to generate unified playlist. Please try again.');
    } finally {
      setIsGeneratingPlaylist(false);
    }
  };

  if (authLoading) {
    return (
      <Layout title="Dashboard">
        <p className="text-slate-500 dark:text-slate-400">Loading session…</p>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout title="Dashboard">
      <section className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Unified Channel Library</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Browse all channels from a single unified playlist with instant category filtering.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Search and Actions Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search channels, descriptions, tags..."
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:flex-1 sm:py-2 sm:text-sm"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <button
                type="button"
                onClick={() => mutate()}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={handleDownloadPlaylist}
                disabled={isGeneratingPlaylist}
                className="w-full rounded-md bg-primary px-4 py-3 text-base font-medium text-slate-900 transition hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
              >
                {isGeneratingPlaylist ? 'Generating...' : 'Download M3U8'}
              </button>
            </div>
          </div>
          
          {/* Filter Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:w-auto sm:py-2 sm:text-sm"
            >
              <option value="all">All categories</option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={regionFilter}
              onChange={(event) => setRegionFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:w-auto sm:py-2 sm:text-sm"
            >
              <option value="all">All regions</option>
              {filterOptions.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              value={languageFilter}
              onChange={(event) => setLanguageFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:w-auto sm:py-2 sm:text-sm"
            >
              <option value="all">All languages</option>
              {filterOptions.languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {isLoading && <p className="text-slate-500 dark:text-slate-400">Loading playlists…</p>}
      {error && (
        <p className="text-red-500 dark:text-red-400">
          Failed to load data from API. Check <code>NEXT_PUBLIC_API_URL</code> or run the backend.
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((channel) => (
            <PlaylistCard
              key={channel.id}
              title={channel.title}
              group={channel.groupTitle}
              language={channel.language}
              region={channel.region}
              href={`${API_BASE_URL}${channel.streamUrl}`}
            />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-slate-500 dark:text-slate-400">
              No channels matched your filters.
            </p>
          )}
        </div>
      )}
    </Layout>
  );
}
