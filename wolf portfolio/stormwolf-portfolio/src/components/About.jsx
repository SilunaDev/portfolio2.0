import React from "react";

export default function About() {
  return (
    <section className="about-section px-4 py-16" aria-label="About Me">
      <div className="max-w-6xl mx-auto">
        {/* Animated 3D heading */}
        <header className="about-header text-center mb-10">
          <h2 className="about-title-3d text-4xl sm:text-5xl font-black">ABOUT ME</h2>
        </header>

        <div className="about-grid">
          {/* Intro 3D card */}
          <article className="about-card">
            <div className="about-card-inner glow-strong float-tilt">
              <div className="about-face">
                <h3 className="about-name">Siluna Wimalasinghe <span className="nick">— Wolf 🐺</span></h3>

                <div className="about-roles grid-roles">
                  <div className="role-card">
                    <div className="role-emoji">🎨</div>
                    <div className="role-title">Web Designer</div>
                  </div>
                  <div className="role-card">
                    <div className="role-emoji">📱</div>
                    <div className="role-title">App Designer</div>
                  </div>
                  <div className="role-card">
                    <div className="role-emoji">🔌</div>
                    <div className="role-title">API Developer</div>
                  </div>
                  <div className="role-card">
                    <div className="role-emoji">🤝</div>
                    <div className="role-title">Co‑founder @ KreedX</div>
                  </div>
                </div>

                <p className="about-blurb">
                  I design and build polished interfaces, mobile apps and reliable APIs. I enjoy
                  crafting experiences that feel alive — subtle motion, strong contrast and clear
                  intent.
                </p>
              </div>
              <div className="about-card-edge" />
            </div>
          </article>

          {/* Personal habits & interests */}
          <aside className="about-habits">
            <div className="habits-panel glow-soft">
              <h4 className="panel-title">Personal Habits ✨</h4>
              <ul className="habits-list">
                <li>🏁 Formula 1 fan</li>
                <li>⚽ Hala Madrid fan</li>
                <li>🎮 Gamer</li>
                <li>📺 Interest in films & TV series</li>
                <li>😄 Always fun, curious & playful</li>
              </ul>
            </div>

            {/* Studying grid */}
            <div className="study-panel glow-soft">
              <h4 className="panel-title">Studying 📚</h4>
              <div className="study-grid">
                <div className="study-item">Computer Science</div>
                <div className="study-item">Software Engineering</div>
                <div className="study-item">Web Frameworks</div>
                <div className="study-item">APIs & Backend</div>
              </div>
            </div>

            {/* animated 3D electric line */}
            <div className="electric-line-wrap" aria-hidden="true">
              <div className="electric-line" />
              <div className="electric-sparks">
                <span className="spark" />
                <span className="spark" />
                <span className="spark" />
              </div>
            </div>
          </aside>
        </div>

        {/* Electric sparks footer decorative bar */}
        <div className="sparks-wrap" aria-hidden="true">
          <div className="sparks">
            <span className="spark" />
            <span className="spark" />
            <span className="spark" />
            <span className="spark" />
            <span className="spark" />
            <span className="spark" />
          </div>
        </div>
      </div>
    </section>
  );
}