import React from 'react';

interface AnimatedBackgroundProps {
    overlayClassName?: string;
    videoUrl?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
    overlayClassName = "bg-indigo-900/80",
    videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-fluid-smoke-43093-large.mp4"
}) => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
             <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute top-0 left-0 w-full h-full object-cover"
                key={videoUrl} // Force re-render if url changes
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Dynamic Overlay for section-specific coloring */}
            <div className={`absolute inset-0 mix-blend-multiply animate-overlay-shimmer ${overlayClassName}`}></div>
            {/* General darkening/lightening layer for text readability */}
            <div className="absolute inset-0 bg-black/40 dark-theme-only"></div>
            <div className="absolute inset-0 bg-white/60 light-theme-only"></div>

            <style>{`
                :root {
                    --bg-anim-duration: 15s;
                    --bg-anim-opacity-min: 0.7;
                    --bg-anim-opacity-max: 0.9;
                }
                @keyframes overlay-shimmer {
                    0%, 100% { opacity: var(--bg-anim-opacity-min); }
                    50% { opacity: var(--bg-anim-opacity-max); }
                }
                .animate-overlay-shimmer {
                    animation: overlay-shimmer var(--bg-anim-duration) ease-in-out infinite;
                }
            `}</style>
        </div>
    ); 
};

export default AnimatedBackground;