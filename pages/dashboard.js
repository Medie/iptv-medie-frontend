import { useMemo, useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import ChannelCard from "../components/ChannelCard";
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
  const [showPlayerSuggestions, setShowPlayerSuggestions] = useState(false);

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

  const handleCopyPlaylist = async () => {
    setIsGeneratingPlaylist(true);
    try {
      const m3u8Url = await generateUnifiedM3U8();
      await navigator.clipboard.writeText(m3u8Url);
      // Show success feedback (we'll add this in the button state)
    } catch (error) {
      console.error('Failed to copy playlist URL:', error);
      alert('Failed to copy unified playlist URL. Please try again.');
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
      <section className="mb-8 flex flex-col gap-6 rounded-xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Watch all channels from a single playlist. Press “M3U8” to copy it and open it in your preferred IPTV player
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Search and Actions Row */}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
  <input
    value={query}
    onChange={(event) => setQuery(event.target.value)}
    placeholder="Search channels..."
    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:flex-[2]"
  />
  <div className="flex gap-1 sm:w-auto">
    <button
      type="button"
      onClick={() => mutate()}
      className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-primary dark:hover:bg-primary/10"
    >
      <div className="flex items-center justify-center gap-1">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </div>
    </button>
    <button
      type="button"
      onClick={handleCopyPlaylist}
      disabled={isGeneratingPlaylist}
      className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-primary hover:bg-primary/5 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-primary dark:hover:bg-primary/10"
    >
      <div className="flex items-center justify-center gap-1">
        {isGeneratingPlaylist ? (
          <svg className="h-3.5 w-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        {isGeneratingPlaylist ? 'Copying...' : 'M3U8'}
      </div>
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
        <>
          {filtered.length > 0 && (
            <div className="mb-6">
              {/* Toggle button for all devices */}
              <button
                onClick={() => setShowPlayerSuggestions(!showPlayerSuggestions)}
                className="mb-3 flex w-full items-center justify-between rounded-lg bg-blue-50 p-4 text-left dark:bg-blue-900/20"
              >
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Recommended IPTV Players
                </span>
                <svg
                  className={`h-4 w-4 transform text-blue-600 transition-transform dark:text-blue-400 ${
                    showPlayerSuggestions ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Player suggestions - toggleable on all devices */}
              <div
                className={`rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20 ${
                  showPlayerSuggestions ? "block" : "hidden"
                }`}
              >
                <h3 className="mb-3 text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Recommended IPTV Players
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-blue-700 dark:text-blue-300 sm:grid-cols-2 lg:grid-cols-4">
  <div>
    <strong className="text-blue-800 dark:text-blue-200">Desktop:</strong>
    <ul className="mt-1 space-y-1">
      <li>• VLC Media Player</li>
      <li>• IPTV Smarters Pro</li>
      <li>• Kodi with IPTV addons</li>
    </ul>
  </div>
  <div>
    <strong className="text-blue-800 dark:text-blue-200">Mobile:</strong>
    <ul className="mt-1 space-y-1">
      <li>• IPTV Smarters</li>
      <li>• TiviMate</li>
      <li>• OTT Navigator</li>
    </ul>
  </div>
  <div>
    <strong className="text-blue-800 dark:text-blue-200">Smart TV:</strong>
    <ul className="mt-1 space-y-1">
      <li>• Smart IPTV</li>
      <li>• SS IPTV</li>
      <li>• IPTV Extreme</li>
    </ul>
  </div>
  <div>
    <strong className="text-blue-800 dark:text-blue-200">Streaming Box:</strong>
    <ul className="mt-1 space-y-1">
      <li>• TiviMate (Android TV)</li>
      <li>• IPTV Smarters Pro</li>
      <li>• Perfect Player</li>
    </ul>
  </div>
</div>

             {/*    <div className="grid gap-4 text-xs text-blue-700 dark:text-blue-300 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <strong className="text-blue-800 dark:text-blue-200">Desktop:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• VLC Media Player</li>
                      <li>• IPTV Smarters Pro</li>
                      <li>• Kodi with IPTV addons</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800 dark:text-blue-200">Mobile:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• IPTV Smarters</li>
                      <li>• TiviMate</li>
                      <li>• OTT Navigator</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800 dark:text-blue-200">Smart TV:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Smart IPTV</li>
                      <li>• SS IPTV</li>
                      <li>• IPTV Extreme</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800 dark:text-blue-200">Streaming Box:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• TiviMate (Android TV)</li>
                      <li>• IPTV Smarters Pro</li>
                      <li>• Perfect Player</li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          )}
          
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={{
                  ...channel,
                  categoryLabel: channel.groupTitle,
                  streamUrl: `${API_BASE_URL}${channel.streamUrl}`
                }}
              />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-slate-500 dark:text-slate-400">
                No channels matched your filters.
              </p>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}
