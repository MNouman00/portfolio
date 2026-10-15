import { skillGroups } from "../data/skills";

export default function SkillsSidebar() {
  const contacts = [
    {
      label: "Email",
      value: "mnouman2025o@gmail.com",
      href: "mailto:mnouman2025o@gmail.com",
      icon: "fa-envelope",
      color: "text-indigo-400",
    },
    {
      label: "Phone",
      value: "+92 322 7757470",
      href: "tel:+923227757470",
      icon: "fa-phone",
      color: "text-emerald-400",
    },
    {
      label: "LinkedIn",
      value: "/in/mnomann",
      href: "http://www.linkedin.com/in/mnomann",
      icon: "fa-linkedin-in",
      color: "text-sky-400",
    },
    {
      label: "GitHub",
      value: "@MNouman00",
      href: "https://github.com/MNouman00",
      icon: "fa-github",
      color: "text-zinc-300",
    },
    {
      label: "Upwork",
      value: "Hire me",
      href: "https://www.upwork.com/freelancers/~0144fabcab6fbdf51e?mp_source=share",
      icon: "fa-brands fa-upwork",
      color: "text-green-400",
    },
    {
      label: "Fiverr",
      value: "Order a gig",
      href: "https://www.fiverr.com/s/yvK8qXA",
      icon: "fa-brands fa-fiverr",
      color: "text-emerald-400",
    },
  ];

  return (
    <aside className="sticky top-6 space-y-4">
      {/* Skills card */}
      <div className="rounded-3xl glass p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <i className="fas fa-bolt text-white text-sm"></i>
          </div>
          <div>
            <h2 className="font-bold text-base">Skills</h2>
            <p className="text-xs text-[var(--color-text-dim)]">
              Tech I work with
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {skillGroups.map((group, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2.5">
                <i
                  className={`fas ${group.icon} text-xs text-indigo-400 w-4`}
                ></i>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[var(--color-text-muted)] hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact card */}
      <div className="rounded-3xl glass p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <i className="fas fa-paper-plane text-white text-sm"></i>
          </div>
          <div>
            <h2 className="font-bold text-base">Get in touch</h2>
            <p className="text-xs text-[var(--color-text-dim)]">
              Open to work & freelance
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") || c.href.startsWith("tel") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <i className={`${c.icon.includes("fa-brands") ? c.icon : `fab ${c.icon}`} text-sm ${c.color}`}></i>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-text-dim)]">
                    {c.label}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] group-hover:text-white transition-colors truncate">
                    {c.value}
                  </p>
                </div>
                <i className="fas fa-arrow-up-right-from-square text-[10px] text-[var(--color-text-dim)] opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}