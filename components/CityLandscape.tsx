import React from 'react';

const CityLandscape: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Sky Background */}
            <div className="absolute inset-0 animate-day-cycle transition-colors duration-[10000ms]"></div>
            
            {/* Sun / Moon */}
            <div className="absolute w-20 h-20 rounded-full animate-celestial-move shadow-[0_0_50px_rgba(255,255,255,0.5)]"></div>

            {/* Stars (visible at night) */}
            <div className="absolute inset-0 opacity-0 animate-stars-flicker">
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 60}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random(),
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* City Silhouette */}
            <div className="absolute bottom-0 w-full h-1/3 flex items-end justify-center">
                <svg viewBox="0 0 1000 300" className="w-full h-full fill-indigo-950/40 dark:fill-black/60 transition-colors duration-1000">
                    <path d="M0,300 L0,250 L50,250 L50,200 L100,200 L100,280 L150,280 L150,150 L200,150 L200,220 L250,220 L250,100 L300,100 L300,250 L350,250 L350,180 L400,180 L400,280 L450,280 L450,50 L550,50 L550,280 L600,280 L600,120 L650,120 L650,220 L700,220 L700,80 L750,80 L750,250 L800,250 L800,150 L850,150 L850,280 L900,280 L900,200 L950,200 L950,250 L1000,250 L1000,300 Z" />
                    {/* Windows that light up at night */}
                    <g className="animate-windows-glow opacity-0">
                        <rect x="60" y="210" width="10" height="10" fill="#FFD700" />
                        <rect x="110" y="220" width="10" height="10" fill="#FFD700" />
                        <rect x="160" y="160" width="10" height="10" fill="#FFD700" />
                        <rect x="260" y="110" width="10" height="10" fill="#FFD700" />
                        <rect x="460" y="60" width="10" height="10" fill="#FFD700" />
                        <rect x="460" y="80" width="10" height="10" fill="#FFD700" />
                        <rect x="530" y="60" width="10" height="10" fill="#FFD700" />
                        <rect x="710" y="90" width="10" height="10" fill="#FFD700" />
                        <rect x="810" y="160" width="10" height="10" fill="#FFD700" />
                    </g>
                </svg>
            </div>

            <style>{`
                :root {
                    --city-anim-cycle: 40s;
                    --city-morning: #FF8C00;
                    --city-day: #87CEEB;
                    --city-evening: #FF4500;
                    --city-night: #191970;
                    --city-sun: #FFD700;
                    --city-sun-bright: #FFFACD;
                    --city-moon: #F8F8FF;
                    --city-window-glow: #FFD700;
                }
                @keyframes day-cycle {
                    0% { background-color: var(--city-morning); }
                    25% { background-color: var(--city-day); }
                    50% { background-color: var(--city-evening); }
                    75% { background-color: var(--city-night); }
                    100% { background-color: var(--city-morning); }
                }
                .animate-day-cycle {
                    animation: day-cycle var(--city-anim-cycle) linear infinite;
                }
                @keyframes celestial-move {
                    0% { 
                        bottom: -10%; left: -10%; 
                        background-color: var(--city-sun); 
                        box-shadow: 0 0 50px var(--city-sun);
                    }
                    25% { 
                        bottom: 70%; left: 40%; 
                        background-color: var(--city-sun-bright); 
                        box-shadow: 0 0 80px var(--city-sun-bright);
                    }
                    50% { 
                        bottom: -10%; left: 90%; 
                        background-color: var(--city-evening); 
                        box-shadow: 0 0 50px var(--city-evening);
                    }
                    75% { 
                        bottom: 70%; left: 40%; 
                        background-color: var(--city-moon); 
                        box-shadow: 0 0 40px var(--city-moon);
                    }
                    100% { 
                        bottom: -10%; left: -10%; 
                        background-color: var(--city-sun); 
                    }
                }
                .animate-celestial-move {
                    animation: celestial-move var(--city-anim-cycle) linear infinite;
                }
                @keyframes stars-flicker {
                    0%, 50%, 100% { opacity: 0; }
                    60%, 90% { opacity: 1; }
                }
                .animate-stars-flicker {
                    animation: stars-flicker var(--city-anim-cycle) linear infinite;
                }
                @keyframes windows-glow {
                    0%, 60%, 100% { opacity: 0; }
                    70%, 90% { opacity: 1; }
                }
                .animate-windows-glow {
                    animation: windows-glow var(--city-anim-cycle) linear infinite;
                }
            `}</style>
        </div>
    );
};

export default CityLandscape;
