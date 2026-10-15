export default function Header() {
  const contacts = [
    {
      name: "LinkedIn",
      url: "http://www.linkedin.com/in/mnomann",
      icon: "fa-linkedin-in",
      color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50",
    },
    {
      name: "GitHub",
      url: "https://github.com/MNouman00",
      icon: "fa-github",
      color: "hover:text-white hover:border-white/40",
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~0144fabcab6fbdf51e?mp_source=share",
      icon: "fa-brands fa-upwork",
      color: "hover:text-[#14A800] hover:border-[#14A800]/50",
    },
    {
      name: "Fiverr",
      url: "https://www.fiverr.com/s/yvK8qXA",
      icon: "fa-brands fa-fiverr",
      color: "hover:text-[#1D9BF0] hover:border-[#1D9BF0]/50",
    },
  ];

  return (
    <header className="mb-16 animate-fadeUp">
      {/* Avatar + status */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
          MN
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-emerald-400 font-medium">
              Available for work
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-dim)] mt-0.5">
            Based in Pakistan · Remote friendly
          </p>
        </div>
      </div>

      {/* Hero title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
        <span className="text-[var(--color-text)]">Hi, I'm </span>
        <span className="gradient-text">M. Nouman</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
        Full-stack developer crafting{" "}
        <span className="text-[var(--color-text)] font-medium">
          intelligent, scalable applications
        </span>{" "}
        with React, Python, and Generative AI.
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["React", "Django", "langchain","langGraph", "FastAPI", "AWS", "Docker"].map(
          (tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[var(--color-text-muted)] hover:border-indigo-500/50 hover:text-indigo-300 transition-colors cursor-default"
            >
              {tech}
            </span>
          )
        )}
      </div>

      {/* Contact links */}
      <div className="flex flex-wrap items-center gap-3">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-[var(--color-text-muted)] border border-white/10 transition-all hover:-translate-y-0.5 ${c.color}`}
            title={c.name}
          >
            <i className={`${c.icon.includes("fa-brands") ? c.icon : `fab ${c.icon}`} text-base`}></i>
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </header>
  );
}