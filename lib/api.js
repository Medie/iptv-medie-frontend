import axios from "axios";
import {
  mockLogin,
  mockSession,
  mockLogout,
  mockFetchChannels,
  mockFetchCategories,
  mockFetchAccount,
  mockFetchUsers,
  mockFetchPlaylistTags,
  mockFetchUnifiedPlaylist
} from "./mocks";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

const shouldFallback = (error) => !error?.response;

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function fetchPlaylistTags(params = {}) {
  try {
    const response = await api.get("/api/ai-tags", { params });
    return response.data.tags;
  } catch (error) {
    if (shouldFallback(error)) {
      const mock = await mockFetchPlaylistTags();
      return mock.tags;
    }
    throw error;
  }
}

export async function fetchUnifiedPlaylist(params = {}) {
  try {
    const response = await api.get("/api/unified-playlist", { params });
    return response.data.channels;
  } catch (error) {
    if (shouldFallback(error)) {
      const mock = await mockFetchUnifiedPlaylist(params);
      return mock.channels;
    }
    throw error;
  }
}

export async function generateUnifiedM3U8() {
  try {
    const response = await api.get("/api/unified-playlist/m3u8");
    return response.data.m3u8Url;
  } catch (error) {
    if (shouldFallback(error)) {
      // For mock data, generate a mock M3U8 URL
      return `${API_BASE_URL}/api/unified-playlist/m3u8`;
    }
    throw error;
  }
}

export async function loginRequest(credentials) {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockLogin(credentials);
    }
    throw error;
  }
}

export async function fetchSessionRequest() {
  try {
    const response = await api.get("/session");
    return response.data;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockSession();
    }
    throw error;
  }
}

export async function logoutRequest() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockLogout();
    }
    throw error;
  }
}

export async function fetchChannels(params = {}) {
  try {
    const response = await api.get("/api/channels", { params });
    return response.data.channels;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockFetchChannels(params);
    }
    throw error;
  }
}

export async function fetchCategoriesSummary() {
  try {
    const response = await api.get("/api/categories");
    return response.data.categories;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockFetchCategories();
    }
    throw error;
  }
}

export async function fetchAccountOverview() {
  try {
    const response = await api.get("/api/account");
    return response.data.account;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockFetchAccount();
    }
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const response = await api.get("/api/users");
    return response.data.users;
  } catch (error) {
    if (shouldFallback(error)) {
      return mockFetchUsers();
    }
    throw error;
  }
}
