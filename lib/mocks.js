const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockUser = {
  id: "user_demo",
  username: "demo@medie.vip",
  name: "Medie Demo",
  plan: "Ultimate",
  is_admin: true,
  expires_at: "2025-01-12T12:00:00Z",
  languages: ["English", "Spanish", "Arabic"],
  regions: ["Europe", "Americas", "MENA"],
  categories: ["Movies", "Sports", "Kids", "News", "NSFW"]
};

export const mockAccount = {
  plan: "Ultimate",
  renewalDate: "2025-01-12T12:00:00Z",
  paymentMethod: "Visa •• 4242",
  autoRenew: true,
  devices: [
    { id: "apple-tv", name: "Apple TV", lastSeen: "2024-05-12T18:32:00Z", location: "Lisbon, PT" },
    { id: "shield", name: "Nvidia Shield", lastSeen: "2024-05-11T02:10:00Z", location: "Luanda, AO" }
  ],
  addOns: [
    { name: "African Sports Pack", status: "active" },
    { name: "Premium VOD", status: "trial" }
  ],
  usage: {
    hoursStreamed: 86,
    favoriteCategory: "Sports",
    favoriteRegion: "Europe"
  }
};

export const mockCategories = [
  {
    slug: "movies",
    label: "Movies",
    description: "Blockbusters, festivals, and indie premieres in HDR.",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    featured: ["CineVerse HD", "Festival+ Europe"],
    stats: { channels: 42, hd: 32, dolby: 12, languages: ["English", "Spanish", "French"] }
  },
  {
    slug: "sports",
    label: "Sports",
    description: "Live football, UFC, F1, and continental league coverage.",
    gradient: "from-emerald-500 via-lime-500 to-amber-400",
    featured: ["Arena Edge", "Continental Sports"],
    stats: { channels: 36, hd: 28, dolby: 6, languages: ["English", "Portuguese", "Arabic"] }
  },
  {
    slug: "kids",
    label: "Kids",
    description: "Educational series and ad-free cartoons curated for every region.",
    gradient: "from-sky-500 via-indigo-500 to-purple-500",
    featured: ["Galaxy Kids", "Mini Mundo"],
    stats: { channels: 18, hd: 10, dolby: 0, languages: ["English", "Spanish", "Portuguese"] }
  },
  {
    slug: "news",
    label: "News",
    description: "Global 24/7 coverage with regional language breakouts.",
    gradient: "from-cyan-500 via-blue-500 to-slate-600",
    featured: ["Global Pulse", "Metro 24"],
    stats: { channels: 22, hd: 14, dolby: 0, languages: ["English", "Arabic", "French"] }
  },
  {
    slug: "nsfw",
    label: "NSFW",
    description: "Adult-exclusive catalog with biometric locking.",
    gradient: "from-fuchsia-600 via-purple-600 to-slate-800",
    featured: ["Velvet Nights", "Club Noir"],
    stats: { channels: 12, hd: 10, dolby: 4, languages: ["English", "French"] }
  }
];

export const mockChannels = [
  {
    id: "mov-cineverse",
    title: "CineVerse HD",
    category: "movies",
    categoryLabel: "Movies",
    language: "English",
    region: "Americas",
    country: "USA",
    quality: "1080p HDR",
    reliability: 97,
    viewers: 12480,
    tags: ["Dolby Vision", "Blockbusters"],
    synopsis: "Studio premieres and box office hits refreshed daily.",
    streamUrl: "/streams/movies/cineverse.m3u8"
  },
  {
    id: "mov-festival",
    title: "Festival+ Europe",
    category: "movies",
    categoryLabel: "Movies",
    language: "French",
    region: "Europe",
    country: "France",
    quality: "4K HDR",
    reliability: 93,
    viewers: 6200,
    tags: ["Cannes", "Subtitled"],
    synopsis: "Live coverage of European film festivals and award shows.",
    streamUrl: "/streams/movies/festival-plus.m3u8"
  },
  {
    id: "mov-multicinema",
    title: "MultiCinema Arabia",
    category: "movies",
    categoryLabel: "Movies",
    language: "Arabic",
    region: "MENA",
    country: "UAE",
    quality: "1080p",
    reliability: 89,
    viewers: 4820,
    tags: ["Dubbed", "Series"],
    synopsis: "Arabic-dubbed cinema favorites plus Ramadan box sets.",
    streamUrl: "/streams/movies/multicinema.m3u8"
  },
  {
    id: "spo-arena",
    title: "Arena Edge",
    category: "sports",
    categoryLabel: "Sports",
    language: "English",
    region: "Europe",
    country: "UK",
    quality: "4K HDR",
    reliability: 95,
    viewers: 18230,
    tags: ["Premier League", "UFC"],
    synopsis: "Matchday hub with tactical feeds and alternate commentary.",
    streamUrl: "/streams/sports/arena-edge.m3u8"
  },
  {
    id: "spo-continental",
    title: "Continental Sports",
    category: "sports",
    categoryLabel: "Sports",
    language: "Portuguese",
    region: "Americas",
    country: "Brazil",
    quality: "1080p",
    reliability: 90,
    viewers: 9600,
    tags: ["Libertadores", "Futsal"],
    synopsis: "South American football, futsal, and beach sports marathon.",
    streamUrl: "/streams/sports/continental.m3u8"
  },
  {
    id: "spo-velocity",
    title: "Velocity One",
    category: "sports",
    categoryLabel: "Sports",
    language: "Arabic",
    region: "MENA",
    country: "Saudi Arabia",
    quality: "1080p HDR",
    reliability: 88,
    viewers: 7120,
    tags: ["F1", "MotoGP"],
    synopsis: "Motorsport super feed with on-board views and instant replays.",
    streamUrl: "/streams/sports/velocity.m3u8"
  },
  {
    id: "kid-galaxy",
    title: "Galaxy Kids+",
    category: "kids",
    categoryLabel: "Kids",
    language: "English",
    region: "Global",
    country: "USA",
    quality: "1080p",
    reliability: 99,
    viewers: 5400,
    tags: ["STEM", "Ad-free"],
    synopsis: "STEM adventures, coding for kids, and soft-skills shows.",
    streamUrl: "/streams/kids/galaxy.m3u8"
  },
  {
    id: "kid-mini-mundo",
    title: "Mini Mundo",
    category: "kids",
    categoryLabel: "Kids",
    language: "Spanish",
    region: "Americas",
    country: "Mexico",
    quality: "720p",
    reliability: 92,
    viewers: 3800,
    tags: ["Educational", "Music"],
    synopsis: "Latin sing-alongs, bilingual learning, and puppet news.",
    streamUrl: "/streams/kids/mini-mundo.m3u8"
  },
  {
    id: "kid-zen",
    title: "ZenToons",
    category: "kids",
    categoryLabel: "Kids",
    language: "Portuguese",
    region: "Europe",
    country: "Portugal",
    quality: "1080p",
    reliability: 87,
    viewers: 2600,
    tags: ["Mindfulness", "Shorts"],
    synopsis: "Mindful animated shorts to wind down bedtime routines.",
    streamUrl: "/streams/kids/zentoons.m3u8"
  },
  {
    id: "news-global-pulse",
    title: "Global Pulse",
    category: "news",
    categoryLabel: "News",
    language: "English",
    region: "Global",
    country: "UK",
    quality: "4K",
    reliability: 96,
    viewers: 10210,
    tags: ["Markets", "War desk"],
    synopsis: "Breaking news with AI summary tickers and live explainers.",
    streamUrl: "/streams/news/global-pulse.m3u8"
  },
  {
    id: "news-metro24",
    title: "Metro 24",
    category: "news",
    categoryLabel: "News",
    language: "Arabic",
    region: "MENA",
    country: "UAE",
    quality: "1080p",
    reliability: 91,
    viewers: 5630,
    tags: ["Business", "Talk shows"],
    synopsis: "Urban desk with finance bulletins and diaspora reporting.",
    streamUrl: "/streams/news/metro24.m3u8"
  },
  {
    id: "news-panorama",
    title: "Panorama Afrique",
    category: "news",
    categoryLabel: "News",
    language: "French",
    region: "Africa",
    country: "Senegal",
    quality: "720p",
    reliability: 84,
    viewers: 3300,
    tags: ["Francophone", "Parliament"],
    synopsis: "Regional bureaus and on-the-ground correspondents across ECOWAS.",
    streamUrl: "/streams/news/panorama.m3u8"
  },
  {
    id: "nsfw-velvet",
    title: "Velvet Nights",
    category: "nsfw",
    categoryLabel: "NSFW",
    language: "English",
    region: "Europe",
    country: "Netherlands",
    quality: "4K HDR",
    reliability: 86,
    viewers: 2200,
    tags: ["Cinematic", "Verified"],
    synopsis: "Cinematic productions with biometric gatekeeping.",
    streamUrl: "/streams/nsfw/velvet.m3u8",
    isAdult: true
  },
  {
    id: "nsfw-club-noir",
    title: "Club Noir+",
    category: "nsfw",
    categoryLabel: "NSFW",
    language: "French",
    region: "Europe",
    country: "France",
    quality: "1080p",
    reliability: 82,
    viewers: 1800,
    tags: ["Live studio", "VR"],
    synopsis: "Interactive studio nights with synced haptic cues.",
    streamUrl: "/streams/nsfw/club-noir.m3u8",
    isAdult: true
  }
];

export const mockUsers = [
  {
    id: "user_demo",
    username: "demo@medie.vip",
    is_admin: true,
    expires_at: "2025-01-12T12:00:00Z",
    categories: ["Movies", "Sports", "News"],
    countries: ["Portugal", "USA", "Brazil"],
    languages: ["English", "Portuguese", "Spanish"]
  },
  {
    id: "user_sport",
    username: "sport@medie.vip",
    is_admin: false,
    expires_at: "2024-11-01T09:00:00Z",
    categories: ["Sports"],
    countries: ["UK"],
    languages: ["English"]
  },
  {
    id: "user_kids",
    username: "kids@medie.vip",
    is_admin: false,
    expires_at: "2024-09-15T21:00:00Z",
    categories: ["Kids", "News"],
    countries: ["Spain", "Mexico"],
    languages: ["Spanish"]
  }
];

export const mockPlaylistTags = mockChannels.slice(0, 6).map((channel, index) => ({
  playlist_path: `/playlists/${channel.category}/${channel.id}.m3u8`,
  meta: {
    readable: {
      countries: [channel.country],
      languages: [channel.language],
      regions: [channel.region]
    }
  },
  updated_at: new Date(Date.now() - index * 600000).toISOString()
}));

export async function mockLogin(credentials) {
  await delay();
  return {
    token: "mock-token-123",
    user: { ...mockUser, username: credentials.username }
  };
}

export async function mockSession() {
  await delay(200);
  return { user: mockUser };
}

export async function mockLogout() {
  await delay(150);
  return { success: true };
}

export async function mockFetchChannels(params = {}) {
  await delay(200);
  const { category, query, region, language } = params;
  return mockChannels.filter((channel) => {
    if (category && channel.category !== category) return false;
    if (region && region !== "all" && channel.region !== region) return false;
    if (language && language !== "all" && channel.language !== language) return false;
    if (query && !channel.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
}

export async function mockFetchCategories() {
  await delay(150);
  return mockCategories;
}

export async function mockFetchAccount() {
  await delay(200);
  return mockAccount;
}

export async function mockFetchUsers() {
  await delay(200);
  return mockUsers;
}

export async function mockFetchPlaylistTags() {
  await delay(200);
  return { tags: mockPlaylistTags };
}
