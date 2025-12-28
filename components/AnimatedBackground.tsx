import React from 'react';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
             <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-fluid-smoke-43093-large.mp4" type="video/mp4" />
            </video>
            {/* Overlay for readability and color tinting */}
            <div className="absolute inset-0 bg-indigo-900/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
    ); 
};

export default AnimatedBackground;