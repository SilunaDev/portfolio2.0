import React, { useMemo, useEffect, useRef, useState } from "react";
import mysqlIcon from "../assets/mysql-icon.png";
import firebaseIcon from "../assets/firebase-icon.png";
import hibernateIcon from "../assets/hibernate-icon.png";
import mongodbIcon from "../assets/mongodb-icon.png";

const databases = [
  { name: 'MySQL', icon: mysqlIcon, color: '#00758F' },
  { name: 'Firebase', icon: firebaseIcon, color: '#FFA000' },
  { name: 'Hibernate', icon: hibernateIcon, color: '#BCB22C' },
  { name: 'MongoDB', icon: mongodbIcon, color: '#4DB33D' }
];

const NODE_COUNT = 24; // Reduced for cleaner look with 4 databases

const StarField = ({ side }) => {
  return (
    <div className={`absolute inset-y-0 ${side}-0 w-32 sm:w-48 overflow-hidden pointer-events-none`}>
      <div className="star-field">
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Database() {
  const [selectedDb, setSelectedDb] = useState(null);
  const containerRef = useRef(null);

  // Generate mesh nodes in a sphere pattern
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      arr.push({ x, y, z, id: `n-${i}` });
    }
    return arr;
  }, []);

  // Place databases at strategic points in the mesh
  const dbPositions = useMemo(() => {
    return [
      { x: 0.8, y: 0.8, z: 0.2 },   // MySQL
      { x: -0.8, y: 0.8, z: 0.2 },  // Firebase
      { x: -0.8, y: -0.8, z: 0.2 }, // Hibernate
      { x: 0.8, y: -0.8, z: 0.2 },  // MongoDB
    ];
  }, []);

  // small responsive radius calculation so mobile doesn't shrink mesh too much
  const radius = () => {
    if (!containerRef.current) return 120;
    const w = containerRef.current.clientWidth;
    return Math.max(110, Math.min(260, Math.floor(w * 0.35)));
  };

  // animate subtle offset to nodes (a "wave") - update CSS variable for sync
  useEffect(() => {
    let raf;
    let t0 = performance.now();
    const tick = (t) => {
      const tsec = (t - t0) / 1000;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--dmesh-phase", `${(tsec % 6) / 6}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center py-6 sm:py-10 relative">
      {/* Add star fields to the left and right */}
      <StarField side="left" />
      <StarField side="right" />

      {/* Completely restructured title area with more spacing */}
      <div className="relative mb-12 sm:mb-16 space-y-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 animate-title-glow">
            DATABASES
          </span>
        </h2>
        <div className="relative">
          <span className="absolute inset-0 animate-pulse-slow bg-cyan-500/10 blur-xl"></span>
          <p className="text-base sm:text-lg md:text-xl text-cyan-400/80 tracking-[0.3em] font-light text-center">
            D MESH
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="dmesh-wrapper relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[640px] lg:h-[640px]"
      >
        <div className="dmesh-scene absolute inset-0 flex items-center justify-center">
          {/* Mesh nodes */}
          {nodes.map((n, i) => (
            <div
              key={n.id}
              className="dmesh-dot absolute"
              style={{
                transform: `translate3d(
                  ${n.x * 150}px,
                  ${n.y * 150}px,
                  ${n.z * 40}px
                )`
              }}
            />
          ))}

          {/* Database Icons */}
          {databases.map((db, i) => (
            <div
              key={db.name}
              className={`absolute transform-gpu transition-all duration-300 cursor-pointer
                ${selectedDb?.name === db.name ? 'scale-125' : 'hover:scale-110'}`}
              style={{
                transform: `translate3d(
                  ${dbPositions[i].x * 140}px,
                  ${dbPositions[i].y * 140}px,
                  ${dbPositions[i].z * 40}px
                )`
              }}
              onClick={() => setSelectedDb(db)}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center
                  bg-gray-900/80 border-2 transition-all duration-300"
                style={{
                  borderColor: selectedDb?.name === db.name ? db.color : 'rgb(75, 85, 99)',
                  boxShadow: `0 0 30px ${db.color}40`
                }}
              >
                <img
                  src={db.icon}
                  alt={db.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <p className="text-center text-white mt-2 text-sm sm:text-base font-bold">
                {db.name}
              </p>
            </div>
          ))}

          {/* Center Core */}
          <div className="dmesh-core">
            <div className="dmesh-core-ring" />
            <div className="dmesh-core-label">DATA</div>
          </div>

          {/* Connecting Lines */}
          {databases.map((db, i) => (
            <div
              key={`conn-${i}`}
              className={`dmesh-connector absolute
                ${selectedDb?.name === db.name ? 'active' : ''}`}
              style={{
                transform: `rotate(${(i * 360) / databases.length}deg)`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}