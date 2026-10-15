import { useState } from "react";

export default function ProjectForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", link: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and description are required.");
      return;
    }
    await onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim() || "",
      image: "📁",
    });
    setForm({ title: "", description: "", link: "" });
  };

  return (
    <section className="rounded-3xl glass p-8 animate-fadeUp">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <i className="fas fa-plus text-indigo-400"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold">Add a new project</h2>
          <p className="text-xs text-[var(--color-text-dim)]">
            Share what you've been building
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
            Project title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. AI Chatbot with RAG"
            className="input-modern w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="What does this project do? What tech does it use?"
            className="input-modern w-full px-4 py-3 rounded-xl text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
            Project link{" "}
            <span className="text-[var(--color-text-dim)] font-normal">
              (optional)
            </span>
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="input-modern w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus-circle"></i>
          Add Project
        </button>
      </form>
    </section>
  );
}