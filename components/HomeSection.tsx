import React from 'react';
import CityLandscape from './CityLandscape';
import { useContent } from './ContentContext';

const HomeSection: React.FC = () => {
    const { content, isEditMode, updateHome } = useContent();
    const { title, subtitle, profileImage, description } = content.home;

    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col justify-center items-center text-center p-4 sm:p-8 overflow-hidden">
            <CityLandscape />
            <div className="absolute inset-0 bg-black/20 z-[1]"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-base-text mt-10 sm:mt-0">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => updateHome({ title: e.target.value })}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-transparent border-b border-accent w-full text-center focus:outline-none drop-shadow-lg"
                    />
                ) : (
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 animate-on-scroll fade-in-up drop-shadow-lg">{title}</h1>
                )}

                {isEditMode ? (
                    <input 
                        type="text" 
                        value={subtitle} 
                        onChange={(e) => updateHome({ subtitle: e.target.value })}
                        className="text-lg sm:text-xl md:text-2xl mb-8 bg-transparent border-b border-accent w-full text-center focus:outline-none drop-shadow-md"
                    />
                ) : (
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-on-scroll fade-in-up drop-shadow-md" style={{ transitionDelay: '0.2s' }}>{subtitle}</p>
                )}

                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto bg-white rounded-full flex flex-col items-center justify-center overflow-hidden shadow-2xl border-4 border-accent/30 animate-on-scroll zoom-in relative group" style={{ transitionDelay: '0.4s' }}>
                    <img 
                        src={profileImage} 
                        alt="Photo of Jaakko" 
                        className="w-full h-full object-cover animate-on-scroll fade-in" 
                        style={{ transitionDelay: '0.6s' }}
                    />
                    {isEditMode && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <input 
                                type="text" 
                                value={profileImage} 
                                onChange={(e) => updateHome({ profileImage: e.target.value })}
                                placeholder="Kuvan URL"
                                className="bg-white/20 text-white text-xs p-2 rounded w-4/5 focus:outline-none"
                            />
                        </div>
                    )}
                </div>

                {isEditMode ? (
                    <textarea 
                        value={description} 
                        onChange={(e) => updateHome({ description: e.target.value })}
                        className="mt-8 text-base sm:text-lg max-w-2xl mx-auto bg-transparent border border-accent rounded p-4 w-full text-center focus:outline-none drop-shadow-md"
                        rows={3}
                    />
                ) : (
                    <p className="mt-8 text-base sm:text-lg max-w-2xl mx-auto animate-on-scroll fade-in-up drop-shadow-md px-4 sm:px-0" style={{ transitionDelay: '0.6s' }}>
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
};

export default HomeSection;