const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const TOKEN_KEY = "nouman_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || `Error ${res.status}`);
  }
  return data;
}

export const api = {
  login: (username, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  getProjects: () => request("/projects"),
  addProject: (project) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(project),
    }),
  deleteProject: (id) =>
    request(`/projects/${id}`, { method: "DELETE" }),
};