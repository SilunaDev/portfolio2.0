import React, { useState, useEffect } from 'react';
import { FaGithub, FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const Social = () => {
  const [githubData, setGithubData] = useState(null);
  const [rotating, setRotating] = useState(null);

  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/SilunaDev');
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
      }
    };
    fetchGithubProfile();
  }, []);

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com/YOUR_USERNAME', color: '#E1306C' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/YOUR_USERNAME', color: '#4267B2' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/YOUR_USERNAME', color: '#0077B5' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/YOUR_NUMBER', color: '#25D366' }
  ];

  const handleSocialClick = (url, index) => {
    setRotating(index);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      window.open(url, '_blank');
      setRotating(null);
    }, 1000); // Match this with animation duration
  };

  return (
    <section className="relative min-h-screen bg-black/95 py-16 perspective-1000">
      {/* Animated Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-title-glow">
            SOCIAL
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg opacity-30 blur-xl animate-pulse-slow"></div>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced GitHub Profile Card - 3D Effect */}
        <div className="relative group transform-gpu hover:rotate-y-2 transition-transform duration-500 perspective">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          <div className="relative px-7 py-6 bg-gradient-to-br from-gray-900 to-black ring-1 ring-purple-500/30 rounded-xl leading-none flex items-top justify-start space-x-6 hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
            {githubData && (
              <div className="space-y-4 w-full transform-gpu hover:translate-z-10">
                <div className="flex items-center space-x-4">
                  <img 
                    src={githubData.avatar_url} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full ring-2 ring-purple-500 animate-float"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{githubData.name}</h3>
                    <p className="text-gray-400">{githubData.bio}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <div className="text-xl font-bold text-white">{githubData.public_repos}</div>
                    <div className="text-sm text-gray-400">Repositories</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-800">
                    <div className="text-xl font-bold text-white">{githubData.followers}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-800">
                    <div className="text-xl font-bold text-white">{githubData.following}</div>
                    <div className="text-sm text-gray-400">Following</div>
                  </div>
                </div>
                <a 
                  href={githubData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  View Profile
                </a>
              </div>
            )}
          </div>
          {/* Add 3D edges */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent rounded-b-xl transform-gpu skew-y-12 -z-10"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-pink-500/10 to-transparent rounded-r-xl transform-gpu skew-x-12 -z-10"></div>
        </div>

       { /* Modified Social Links with rotation animation */}
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-6 perspective mt-10 lg:mt-0">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  onClick={() => handleSocialClick(social.url, index)}
                  className="relative group cursor-pointer transform-gpu transition-all duration-500 preserve-3d"
                >
                  <div 
                className={`relative w-full h-full transition-transform duration-1000 transform-gpu preserve-3d
                  ${rotating === index ? 'animate-card-flip' : 'hover:rotate-y-12'}`}
                  >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div 
                    className="relative p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl transform-gpu transition-all duration-300 hover:scale-110 flex items-center justify-center border border-purple-500/20 shadow-xl shadow-purple-500/20"
                    style={{
                      boxShadow: `0 0 30px ${social.color}20`,
                      transform: 'translateZ(20px)'
                    }}
                  >
                    <div className="text-5xl transform-gpu" style={{ color: social.color }}>
                      {social.icon}
                    </div>
                    {/* 3D edges */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent rounded-b-xl transform skew-y-6"></div>
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-pink-500/10 to-transparent rounded-r-xl transform skew-x-6"></div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8">
                    <div className="text-white text-xl font-bold">Opening...</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;