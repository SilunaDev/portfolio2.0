import React, { useEffect, useState } from "react";

export default function Projects({ username = "stormwolf66" }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
        );
        const data = await res.json();
        setRepos(Array.isArray(data) ? data : []);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  return (
    <section className="projects-section px-4 py-12" aria-label="My Projects">
      <div className="max-w-7xl mx-auto">
        <div className="projects-header relative z-50 mb-12 text-center">
          <h2 className="projects-title-3d text-3xl sm:text-4xl md:text-5xl font-black mb-3">
            <span>MY</span>&nbsp;<span>PROJECTS</span>
          </h2>
        </div>

        <p className="text-center text-sm text-gray-400 mb-8">
          Projects from GitHub — boxes rotate continuously for a 3D effect.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading && <div className="col-span-full text-center text-gray-400">Loading...</div>}
          {!loading && repos.length === 0 && (
            <div className="col-span-full text-center text-gray-400">No projects found.</div>
          )}

          {repos.map((r, i) => (
            <div key={r.id} className="project-card" style={{ ["--i"]: i }}>
              <div className="project-inner spin-360">
                <div className="project-face face-front p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white">{r.name}</h3>
                    <div className="text-sm text-gray-300">{r.language || "-"}</div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{r.description || "No description"}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>⭐ {r.stargazers_count}</span>
                    <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="project-face face-right" />
                <div className="project-face face-bottom" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          I have published only 4 projects — I will publish the rest later. Grid expands as I add more projects.
        </div>
      </div>
    </section>
  );
}