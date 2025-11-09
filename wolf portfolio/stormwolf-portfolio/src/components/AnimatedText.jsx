import React, { useState, useEffect } from "react";

const phrases = [
  "Forging Code ⚔️",
  "Building Empires 🏰",
  "Crafting Legends 🐺",
  "Create Aesthetics 💫"
];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % phrases.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="text-xl md:text-2xl text-gray-200 font-semibold animate-fade">
      {phrases[index]}
    </h2>
  );
}
