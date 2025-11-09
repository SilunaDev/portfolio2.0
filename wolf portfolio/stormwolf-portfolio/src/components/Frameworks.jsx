import React, { useState, useRef, useEffect } from 'react';
import springIcon from '../assets/spring.png';
import laravelIcon from '../assets/laravel.png';
import nodeIcon from '../assets/nodejs.png';
import expressIcon from '../assets/express.png';

const frameworks = [
	{
		name: 'Spring Boot',
		icon: springIcon,
		color: '#6DB33F',
		position: 0
	},
	{
		name: 'Laravel',
		icon: laravelIcon,
		color: '#FF2D20',
		position: 1
	},
	{
		name: 'Node.js',
		icon: nodeIcon,
		color: '#339933',
		position: 2
	},
	{
		name: 'Express.js',
		icon: expressIcon,
		color: '#000000',
		position: 3
	}
];

export default function Frameworks() {
	const [selectedFramework, setSelectedFramework] = useState(null);
	const [activePath, setActivePath] = useState(null);
	const containerRef = useRef(null);
	const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

	const handleFrameworkClick = (framework) => {
		setSelectedFramework(framework);
		setActivePath(framework.position);
	};

	// Auto rotation
	useEffect(() => {
		const interval = setInterval(() => {
			setRotation((prev) => ({
				...prev,
				z: prev.z + 0.5
			}));
		}, 50);
		return () => clearInterval(interval);
	}, []);

	const renderConnectingLines = () => {
		return frameworks.map((_, index) => {
			const nextIndex = (index + 1) % frameworks.length;
			const isActive = activePath === index || activePath === nextIndex;

			return (
				<div
					key={`line-${index}`}
					className={`absolute top-1/2 left-1/2 h-[2px] origin-left
            ${isActive ? 'animate-electric-spark' : 'bg-gray-600/30'}`}
					style={{
						width: window.innerWidth < 640 ? '100px' : 
                       window.innerWidth < 768 ? '150px' : '200px',
						transform: `rotate(${(index * 360) / frameworks.length}deg)`
					}}
				>
					{isActive && (
						<div className="absolute inset-0 w-full h-full animate-pulse-fast">
							<div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-transparent" />
						</div>
					)}
				</div>
			);
		});
	};

	return (
		<section className="flex flex-col items-center justify-center py-4 sm:py-8">
			{/* Title */}
			<div className="relative mb-10 sm:mb-20">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center">
					<span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-title-glow">
						Frameworks
					</span>
				</h2>
			</div>

			{/* Framework Circle - Made Responsive */}
			<div
				ref={containerRef}
				className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] perspective-1000"
			>
				{/* Connecting Lines - Adjusted radius */}
				<div className="absolute inset-0">
					{frameworks.map((_, index) => {
						const nextIndex = (index + 1) % frameworks.length;
						const isActive = activePath === index || activePath === nextIndex;
						
						return (
							<div
								key={`line-${index}`}
								className={`absolute top-1/2 left-1/2 h-[2px] origin-left
                ${isActive ? 'animate-electric-spark' : 'bg-gray-600/30'}`}
								style={{
									width: window.innerWidth < 640 ? '100px' : 
                       window.innerWidth < 768 ? '150px' : '200px',
									transform: `rotate(${(index * 360) / frameworks.length}deg)`,
								}}
							>
								{isActive && (
									<div className="absolute inset-0 w-full h-full animate-pulse-fast">
										<div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-transparent" />
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Frameworks - Made Responsive */}
				{frameworks.map((framework, index) => {
					const angle = (index * 360) / frameworks.length;
					const radius = window.innerWidth < 640 ? 120 : // Increased mobile radius
                      window.innerWidth < 768 ? 160 :
                      window.innerWidth < 1024 ? 200 : 240;
					const x = Math.cos((angle * Math.PI) / 180) * radius;
					const y = Math.sin((angle * Math.PI) / 180) * radius;

					return (
						<div
							key={framework.name}
							className="absolute transform-gpu transition-all duration-500"
							style={{
								left: '50%',
								top: '50%',
								transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
							}}
						>
							<div
								className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center 
                bg-gray-900/80 border-2 cursor-pointer transition-all duration-300
                ${selectedFramework?.name === framework.name ? 'scale-125' : 'hover:scale-110'}`}
								style={{
									borderColor: selectedFramework?.name === framework.name ? framework.color : 'rgb(75, 85, 99)',
									boxShadow: `0 0 30px ${framework.color}40`,
								}}
								onClick={() => handleFrameworkClick(framework)}
							>
								<img
									src={framework.icon}
									alt={framework.name}
									className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
								/>
							</div>
							<p className="text-center text-white mt-2 text-sm sm:text-base font-bold whitespace-nowrap">
								{framework.name}
							</p>
						</div>
					);
				})}

				{/* Selected Framework Hologram - Better centering */}
				{selectedFramework && (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-float">
							<div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-pulse" />
							<div className="absolute inset-0 rounded-full border-2 border-blue-500/10 animate-pulse-delayed" />
							<img
								src={selectedFramework.icon}
								alt={selectedFramework.name}
								className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
								style={{
									filter: `drop-shadow(0 0 20px ${selectedFramework.color})`
								}}
							/>
							<div
								className="absolute inset-0 animate-scan"
								style={{
									background: `linear-gradient(transparent, ${selectedFramework.color}20)`
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}