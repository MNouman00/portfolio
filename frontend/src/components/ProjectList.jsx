export default function ProjectList({ projects, onRemove, isAdmin }) {
  if (projects.length === 0)
    return (
      <div className="rounded-3xl glass border-dashed border-2 border-white/10 p-16 text-center animate-fadeIn">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
          <i className="fas fa-folder-open text-2xl text-[var(--color-text-dim)]"></i>
        </div>
        <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
        <p className="text-sm text-[var(--color-text-dim)]">
          {isAdmin
            ? "Add your first project below."
            : "Check back soon for updates."}
        </p>
      </div>
    );

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {projects.map((p, idx) => (
        <div
          key={p.id}
          className="card-hover rounded-2xl glass p-6 group animate-fadeUp"
          style={{ animationDelay: `${idx * 60}ms`, opacity: 0 }}
        >
          {/* Icon + actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
              {p.image}
            </div>
            {isAdmin && (
              <button
                onClick={() => onRemove(p.id)}
                className="opacity-0 group-hover:opacity-100 text-[var(--color-text-dim)] hover:text-red-400 transition-all p-2"
                title="Delete project"
              >
                <i className="fas fa-trash-alt text-sm"></i>
              </button>
            )}
          </div>

          {/* Title + description */}
          <h3 className="font-bold text-lg mb-2 text-[var(--color-text)] group-hover:text-indigo-300 transition-colors">
            {p.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-3">
            {p.description}
          </p>

          {/* Link */}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View project
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}