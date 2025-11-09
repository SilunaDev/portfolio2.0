import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import TechStack from "./components/TechStack";
import Frameworks from "./components/Frameworks";
import Database from "./components/Database";
import Social from './components/Social';
import Projects from "./components/Projects";

// Inside your main App component's return statement
<Social />

import kingdomBg from "./assets/kingdom-bg.webp";
import rainOverlay from "./assets/rain-overlay.mp4";
import thunder from "./assets/thunder.mp3";
import logo from "./assets/stormwolf-logo.jpg"; // 👈 your logo

// import the same images from src/assets so the connector uses the same icons
import htmlIcon from './assets/html.png';
import phpIcon from './assets/php.png';
import javaIcon from './assets/java.png';
import reactIcon from './assets/react.png';
import reactNativeIcon from './assets/react-native.png';
import pythonIcon from './assets/python.png';

import springIcon from './assets/spring.png';
import laravelIcon from './assets/laravel.png';
import nodeIcon from './assets/nodejs.png';
import expressIcon from './assets/express.png';
import About from "./components/About";

export default function App() {
  const lightningRef = useRef(null);
  const rainRef = useRef(null);
  const audioRef = useRef(new Audio(thunder));
  const [textIndex, setTextIndex] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [externalSelectedTech, setExternalSelectedTech] = useState(null);
  const [externalSelectedFramework, setExternalSelectedFramework] = useState(null);

  const phrases = [
    "Welcome To My Portfolio⚔️",
    "Building Empires 🏰",
    "Crafting Innovations 🐺",
    "StormWolf DEV ⚡"
  ];

  const renderPhrase = (phrase) => {
    if (phrase.includes("⚔️")) {
      return phrase.replace("⚔️", "<span class='animate-swords inline-block'>⚔️</span>");
    }
    if (phrase.includes("🏰")) {
      return phrase.replace("🏰", "<span class='animate-castle inline-block'>🏰</span>");
    }
    if (phrase.includes("🐺")) {
      return phrase.replace("🐺", "<span class='animate-wolf inline-block'>🐺</span>");
    }
    if (phrase.includes("⚡")) {
      return phrase.replace("⚡", "<span class='animate-lightning inline-block'>⚡</span>");
    }
    return phrase;
  };

  // Rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subtle rain movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (rainRef.current) {
        rainRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle lightning + thunder
  const handleLightning = () => {
    if (lightningRef.current) {
      lightningRef.current.classList.add("flash");
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setTimeout(() => lightningRef.current.classList.remove("flash"), 150); // Reduced flash duration
      setTriggered(true);
      setTimeout(() => setTriggered(false), 3000);
    }
  };

  const leftItems = [
    { name: 'HTML', icon: htmlIcon, color: '#E44D26' },
    { name: 'PHP', icon: phpIcon, color: '#777BB4' },
    { name: 'JAVA', icon: javaIcon, color: '#007396' },
    { name: 'REACT', icon: reactIcon, color: '#61DAFB' },
    { name: 'REACT NATIVE', icon: reactNativeIcon, color: '#61DAFB' },
    { name: 'PYTHON', icon: pythonIcon, color: '#3776AB' }
  ];

  const rightItems = [
    { name: 'Spring Boot', icon: springIcon, color: '#6DB33F', position: 0 },
    { name: 'Laravel', icon: laravelIcon, color: '#FF2D20', position: 1 },
    { name: 'Node.js', icon: nodeIcon, color: '#339933', position: 2 },
    { name: 'Express.js', icon: expressIcon, color: '#000000', position: 3 }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src={kingdomBg}
            alt="Kingdom"
            className="w-full h-full object-cover animate-wave"
          />
        </div>

        {/* Rain and effects */}
        <video
          ref={rainRef}
          src={rainOverlay}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay z-10"
        />

        <div
          ref={lightningRef}
          className="absolute inset-0 bg-white/50 opacity-0 pointer-events-none z-20"
        ></div>

        {/* Header */}
        <Header />

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-40 perspective-1000">
          <h1
            key={phrases[textIndex]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider animate-text3D"
            style={{
              background: 'linear-gradient(135deg, #FF0000 30%, #FF1111 50%, #FF0000 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '1px #FFFFFF',
              filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.8))',
              textShadow: `
                -1px -1px 0 #FFFFFF,
                1px -1px 0 #FFFFFF,
                -1px 1px 0 #FFFFFF,
                1px 1px 0 #FFFFFF,
                0 0 20px #FF0000,
                0 0 40px #FF0000,
                0 0 60px #FF0000
              `
            }}
            dangerouslySetInnerHTML={{ __html: renderPhrase(phrases[textIndex]) }}
          />
        </div>

        {/* Lightning trigger button */}
        <button
          onClick={handleLightning}
          className="fixed bottom-8 right-8 z-50"
        >
          <img
            src={logo}
            alt="StormWolf Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
          />
        </button>
      </section>

      {/* Tech Stack Section - Modified for better mobile spacing */}
      <section className="relative bg-black/95 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16"> {/* Reduced padding */}
          <div className="space-y-8 sm:space-y-16 md:space-y-24"> {/* Added spacing control between components */}
            <TechStack />
            <Frameworks />
          </div>
        </div>
      </section>

      <Database />
      <Social />
      <Projects username="stormwolf66" />
      <About/>
    </div>
  );
}
