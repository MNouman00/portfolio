import { useState } from "react";
import { api, setToken } from "../api/client";

export default function AdminBar({ isAdmin, onLoginSuccess, onLogout }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api.login(username, password);
      setToken(data.access_token);
      onLoginSuccess();
      setOpen(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full glass backdrop-blur-xl shadow-lg">
          <span className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Admin
          </span>
          <span className="w-px h-4 bg-white/10"></span>
          <button
            onClick={onLogout}
            className="text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <i className="fas fa-sign-out-alt"></i> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      {open ? (
        <form
          onSubmit={handleLogin}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl glass backdrop-blur-xl shadow-xl animate-fadeIn"
        >
          <i className="fas fa-user text-xs text-[var(--color-text-dim)]"></i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
            className="bg-transparent border-none outline-none text-sm w-24 placeholder:text-[var(--color-text-dim)]"
          />
          <span className="w-px h-4 bg-white/10"></span>
          <i className="fas fa-lock text-xs text-[var(--color-text-dim)]"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent border-none outline-none text-sm w-24 placeholder:text-[var(--color-text-dim)]"
          />
          <button
            type="submit"
            disabled={busy}
            className="text-xs px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium disabled:opacity-50 transition"
          >
            {busy ? "…" : "Enter"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setError("");
            }}
            className="text-[var(--color-text-dim)] hover:text-white transition text-xs"
          >
            <i className="fas fa-times"></i>
          </button>
          {error && (
            <span className="text-red-400 text-xs ml-1">{error}</span>
          )}
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2.5 rounded-full glass backdrop-blur-xl text-xs font-medium text-[var(--color-text-muted)] hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-2"
          title="Admin login"
        >
          <i className="fas fa-lock text-[10px]"></i> Admin
        </button>
      )}
    </div>
  );
}