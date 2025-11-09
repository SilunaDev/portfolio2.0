import React from "react";
import AnimatedText from "./AnimatedText";
import logo from "../assets/stormwolf-logo.jpg";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-1 py-1 bg-black/40 backdrop-blur-sm z-30">
      <div className="flex items-center gap-2">
        <img 
          src={logo} 
          alt="StormWolf Logo" 
          className="w-5 h-5 sm:w-10 sm:h-10 rounded-full border border-gray-400 animate-logo-spin" 
        />
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-widest">StormWolf</h1>
      </div>
      <AnimatedText />
    </header>
  );
}
