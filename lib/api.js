import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export async function fetchPlaylistTags(params = {}) {
  const response = await api.get("/api/ai-tags", { params });
  return response.data.tags;
}
