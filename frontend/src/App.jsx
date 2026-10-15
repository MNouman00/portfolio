import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import SkillsSidebar from "./components/SkillsSidebar";
import AdminBar from "./components/AdminBar";
import { api, getToken, clearToken } from "./api/client";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(!!getToken());

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getProjects();
      setProjects(data);
    } catch (e) {
      setError("Could not load projects. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project) => {
    try {
      const created = await api.addProject(project);
      setProjects([created, ...projects]);
    } catch (e) {
      alert("Failed to add: " + e.message);
    }
  };

  const removeProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (e) {
      alert("Failed to delete: " + e.message);
    }
  };

  const handleLogout = () => {
    clearToken();
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen">
      <AdminBar
        isAdmin={isAdmin}
        onLoginSuccess={() => setIsAdmin(true)}
        onLogout={handleLogout}
      />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Header />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Projects section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <i className="fas fa-cube text-indigo-400"></i>
                    Featured Projects
                  </h2>
                  <p className="text-xs text-[var(--color-text-dim)] mt-1">
                    {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
                    · Latest work
                  </p>
                </div>
              </div>

              {loading && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl glass p-6 animate-pulse"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 mb-4"></div>
                      <div className="h-4 bg-white/5 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-white/5 rounded w-full mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="rounded-2xl glass border-red-500/30 p-6">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-red-400 mt-0.5"></i>
                    <div className="flex-1">
                      <p className="font-medium text-red-400 mb-1">
                        Connection error
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        {error}
                      </p>
                      <button
                        onClick={loadProjects}
                        className="text-xs px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition"
                      >
                        <i className="fas fa-redo mr-2"></i>Retry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !error && (
                <ProjectList
                  projects={projects}
                  onRemove={removeProject}
                  isAdmin={isAdmin}
                />
              )}
            </section>

            {/* Add project form */}
            {isAdmin && (
              <div className="animate-fadeIn">
                <ProjectForm onAdd={addProject} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SkillsSidebar />
          </div>
        </div>

        {/* Footer */}
       <footer className="mt-24 pt-8 border-t border-white/5 text-center">
  <p className="text-sm text-[var(--color-text-muted)] mb-2">
    © {new Date().getFullYear()} M. Nouman. All rights reserved.
  </p>
  <p className="text-xs text-[var(--color-text-dim)]">
    Built with{" "}
    <span className="text-indigo-400">React</span>
    {" · "}
    <span className="text-emerald-400">Django</span>
    {" · "}
    <span className="text-purple-400">SQLite</span>
  </p>
</footer>
      </div>
    </div>
  );
}