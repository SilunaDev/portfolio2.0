import React, { useState, useRef, useEffect } from 'react';
import htmlIcon from '../assets/html.png';
import phpIcon from '../assets/php.png';
import javaIcon from '../assets/java.png';
import reactIcon from '../assets/react.png';
import reactNativeIcon from '../assets/react-native.png';
import pythonIcon from '../assets/python.png';

// use images imported from assets (avoid hardcoded '/tech-icons/...' paths)
const techStacks = [
    { name: 'HTML', icon: htmlIcon, color: '#E44D26' },
    { name: 'PHP', icon: phpIcon, color: '#777BB4' },
    { name: 'JAVA', icon: javaIcon, color: '#007396' },
    { name: 'REACT', icon: reactIcon, color: '#61DAFB' },
    { name: 'REACT NATIVE', icon: reactNativeIcon, color: '#61DAFB' },
    { name: 'PYTHON', icon: pythonIcon, color: '#2727a1ff' }
];

export default function TechStack() {
	const [selectedTech, setSelectedTech] = useState(null);
	const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
	const containerRef = useRef(null);

	const handleMouseMove = (e) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const x = (e.clientX - centerX) / 20;
		const y = (e.clientY - centerY) / 20;
		const z = rotation.z;

		setRotation({ x: -y, y: x, z });
	};

	// Auto rotation when not interacting
	useEffect(() => {
		const interval = setInterval(() => {
			setRotation(prev => ({
				...prev,
				z: prev.z + 0.5
			}));
		}, 50);

		return () => clearInterval(interval);
	}, []);

	const renderTechItems = () => {
		const total = techStacks.length;
		return techStacks.map((tech, index) => {
			const angle = (index / total) * 2 * Math.PI;
			const radius = 150;
			const x = Math.cos(angle) * radius;
			const y = Math.sin(angle) * radius;

			return (
				<div
					key={tech.name}
					className="absolute transform-gpu transition-all duration-500 cursor-pointer"
					style={{
						left: '50%',
						top: '50%',
						transform: `
              translate(-50%, -50%)
              translate(${x}px, ${y}px)
              rotateX(${rotation.x}deg)
              rotateY(${rotation.y}deg)
              rotateZ(${rotation.z}deg)
              ${selectedTech?.name === tech.name ? 'scale(1.25)' : 'scale(1)'}
            `,
					}}
					onClick={() => setSelectedTech(tech)}
				>
					<div
						className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900/80 
              border-2 border-gray-700 hover:border-white transition-all"
						style={{
							boxShadow: `0 0 30px ${tech.color}40`,
							transform: `rotateZ(${-rotation.z}deg)`,
						}}
					>
						<img
							src={tech.icon}
							alt={tech.name}
							className="w-12 h-12 object-contain"
							style={{
								transform: `rotateZ(${-rotation.z}deg)`,
							}}
						/>
					</div>
				</div>
			);
		});
	};

	return (
		<section className="flex flex-col items-center justify-center py-4 sm:py-8">
			{/* Title - Removed outline box */}
			<div className="relative mb-10 sm:mb-20 perspective-1000">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-center">
					<span className="inline-block animate-title-float">
						<span className="inline-block animate-title-3d bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-transparent bg-clip-text">
							TECH
						</span>
					</span>
					{" "}
					<span className="inline-block animate-title-float-delayed">
						<span className="inline-block animate-title-3d bg-gradient-to-br from-purple-500 via-pink-600 to-red-700 text-transparent bg-clip-text">
							STACK
						</span>
					</span>
					
					{/* Glow Effects - Keep these */}
					<div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl" />
					<div className="absolute -inset-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 blur-3xl" />
				</h2>
				
				{/* Remove these 3D Decorative Lines */}
				{/* <div className="absolute -inset-4 border border-blue-500/20 rounded-lg transform rotate-3d(1, 1, 1, 15deg) animate-border-glow" />
				<div className="absolute -inset-4 border border-purple-500/20 rounded-lg transform -rotate-3d(1, 1, 1, 15deg) animate-border-glow-delayed" /> */}
			</div>

			{/* Decorative 3D Objects - Hide on mobile */}
			<div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 animate-float-slow">
				<div className="relative w-32 h-32 rotate-12 animate-spin-slow">
					<div className="absolute inset-0 rounded-lg border-2 border-cyan-500/30 transform rotate-45" />
					<div className="absolute inset-0 rounded-lg border-2 border-purple-500/30 transform -rotate-45" />
					<div className="absolute inset-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
				</div>
			</div>

			<div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 animate-float-reverse">
				<div className="relative w-40 h-40 -rotate-12 animate-spin-slow-reverse">
					<div className="absolute inset-0 rounded-full border-2 border-pink-500/30" />
					<div className="absolute inset-2 rounded-full border-2 border-blue-500/30" />
					<div className="absolute inset-4 rounded-full border-2 border-purple-500/30" />
					<div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/10 via-blue-500/10 to-purple-500/10" />
				</div>
			</div>

			{/* Tech stack circle - Make responsive */}
			<div 
				ref={containerRef} 
				className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] perspective-1000"
				onMouseMove={handleMouseMove}
				onMouseLeave={() => setRotation(prev => ({ ...prev, x: 0, y: 0 }))}
			>
				{/* Main circle */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div 
						className="w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[440px] md:h-[440px] lg:w-[540px] lg:h-[540px] rounded-full border-2 border-gray-700/50 relative"
						style={{
							transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
							boxShadow: '0 0 50px rgba(255,255,255,0.1)'
						}}
					>
						{/* Hologram effect lines */}
						<div className="absolute inset-0 rounded-full border border-blue-500/20" 
							 style={{ transform: 'scale(0.98)' }} />
						<div className="absolute inset-0 rounded-full border border-blue-500/10" 
							 style={{ transform: 'scale(1.02)' }} />
					</div>
				</div>

				{/* Tech icons - Adjusted positioning and sizes */}
				{techStacks.map((tech, index) => {
					const angle = (index / techStacks.length) * 2 * Math.PI;
					const radius = window.innerWidth < 640 ? 120 : // Increased mobile radius
								 window.innerWidth < 768 ? 160 :
								 window.innerWidth < 1024 ? 200 : 240;
					const x = Math.cos(angle) * radius;
					const y = Math.sin(angle) * radius;

					return (
						<div
							key={tech.name}
							className="absolute transform-gpu transition-all duration-500 cursor-pointer"
							style={{
								left: '50%',
								top: '50%',
								transform: `
                translate(-50%, -50%)
                translate(${x}px, ${y}px)
                rotateX(${rotation.x}deg)
                rotateY(${rotation.y}deg)
                rotateZ(${rotation.z}deg)
                ${selectedTech?.name === tech.name ? 'scale(1.15)' : 'scale(1)'}
              `
							}}
							onClick={() => setSelectedTech(tech)}
						>
							<div
								className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center 
                bg-gray-900/80 border-2 hover:border-blue-500 transition-all duration-300"
								style={{
									boxShadow: `0 0 30px ${tech.color}40`,
									borderColor: selectedTech?.name === tech.name ? tech.color : 'rgb(55, 65, 81)',
									transform: `rotateZ(${-rotation.z}deg)`
								}}
							>
								<img 
									src={tech.icon} 
									alt={tech.name} 
									className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
									style={{ transform: `rotateZ(${-rotation.z}deg)` }}
								/>
							</div>
						</div>
					);
				})}

				{/* Center hologram - Adjusted for better centering */}
				{selectedTech && (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
						<div 
							className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-float"
							style={{
								transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
							}}
						>
							{/* Hologram rings */}
							<div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-pulse"
								 style={{ transform: 'scale(1.1)' }} />
							<div className="absolute inset-0 rounded-full border-2 border-blue-500/10 animate-pulse"
								 style={{ transform: 'scale(1.2)', animationDelay: '0.2s' }} />
							
							{/* Tech icon with enhanced glow */}
							<div className="absolute inset-0 flex items-center justify-center">
								<img
									src={selectedTech.icon}
									alt={selectedTech.name}
									className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain animate-float"
									style={{
										filter: `
                      drop-shadow(0 0 20px ${selectedTech.color})
                      drop-shadow(0 0 40px ${selectedTech.color})
                    `,
									}}
								/>
								{/* Hologram scan line effect */}
								<div 
									className="absolute inset-0 overflow-hidden rounded-full"
									style={{
										background: `linear-gradient(
                      transparent,
                      ${selectedTech.color}20,
                      ${selectedTech.color}40,
                      ${selectedTech.color}20,
                      transparent
                    )`,
										animation: 'scan 2s linear infinite',
									}}
								/>
							</div>
						</div>
						<p className="text-center text-white mt-4 sm:mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
							{selectedTech.name}
						</p>
					</div>
				)}
			</div>
		</section>
	);
}