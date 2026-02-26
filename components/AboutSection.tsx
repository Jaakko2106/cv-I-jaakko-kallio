import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import { useContent } from './ContentContext';
import { Skill } from '../types';

const SkillBar: React.FC<{ skill: Skill; delay?: string; index: number }> = ({ skill, delay = '0s', index }) => {
    const { isEditMode, updateAbout, content } = useContent();
    
    const handleNameChange = (newName: string) => {
        const newSkills = [...content.about.skills];
        newSkills[index] = { ...newSkills[index], name: newName };
        updateAbout({ skills: newSkills });
    };

    const handleLevelChange = (newLevel: number) => {
        const newSkills = [...content.about.skills];
        newSkills[index] = { ...newSkills[index], level: Math.min(100, Math.max(0, newLevel)) };
        updateAbout({ skills: newSkills });
    };

    return (
        <div 
            className="w-full mb-4 animate-on-scroll fade-in-up group/skill" 
            style={{ transitionDelay: delay, '--target-width': `${skill.level}%` } as React.CSSProperties}
        >
            <div className="flex justify-between mb-1">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={skill.name} 
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="text-base font-medium text-base-text bg-transparent border-b border-accent/30 focus:outline-none"
                    />
                ) : (
                    <span className="text-base font-medium text-base-text">{skill.name}</span>
                )}
                
                {isEditMode ? (
                    <input 
                        type="number" 
                        value={skill.level} 
                        onChange={(e) => handleLevelChange(parseInt(e.target.value) || 0)}
                        className="text-sm font-medium text-accent bg-transparent border-b border-accent/30 focus:outline-none w-12 text-right"
                    />
                ) : (
                    <span className="text-sm font-medium text-accent">{skill.level}%</span>
                )}
            </div>
            <div className="w-full bg-base-surface rounded-full h-2.5 relative group/tooltip cursor-pointer border border-base-border">
                <div 
                    className="bg-accent h-2.5 rounded-full transition-all duration-1000 ease-out w-0 group-[.is-visible]/skill:w-[var(--target-width)] shadow-lg shadow-accent/20" 
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                ></div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-accent text-white text-xs rounded py-1 px-2 relative shadow-lg whitespace-nowrap border border-accent/20">
                        {skill.name}: {skill.level}%
                        <div className="absolute w-2 h-2 bg-accent border-r border-b border-accent/20 rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AboutSection: React.FC = () => {
    const { content, isEditMode, updateAbout } = useContent();
    const { title, description1, description2, image, skills } = content.about;

    const addSkill = () => {
        updateAbout({ skills: [...skills, { name: "Uusi taito", level: 50 }] });
    };

    const removeSkill = (index: number) => {
        const newSkills = skills.filter((_, i) => i !== index);
        updateAbout({ skills: newSkills });
    };

    return (
        <section id="about" className="py-20 px-4 sm:px-8 relative overflow-hidden">
            <AnimatedBackground 
                overlayClassName="bg-accent/10" 
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-purple-and-blue-abstract-smoke-1178-large.mp4"
            />
            <div className="relative z-10 container mx-auto max-w-4xl">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => updateAbout({ title: e.target.value })}
                        className="text-3xl font-bold text-center mb-12 text-base-text bg-transparent border-b border-accent w-full focus:outline-none drop-shadow-md"
                    />
                ) : (
                    <h2 className="text-3xl font-bold text-center mb-12 text-base-text animate-on-scroll fade-in drop-shadow-md">{title}</h2>
                )}
                
                {/* Introduction */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mb-12 md:mb-16">
                    <div className="w-2/3 sm:w-1/2 md:w-1/3 animate-on-scroll fade-in-left">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/30 group">
                            <img 
                                src={image} 
                                alt="Workspace" 
                                className="w-full h-auto block hover:scale-105 transition-transform duration-500 animate-on-scroll fade-in" 
                                style={{ transitionDelay: '0.3s' }}
                            />
                            <div className="absolute inset-0 bg-accent/10"></div>
                            {isEditMode && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <input 
                                        type="text" 
                                        value={image} 
                                        onChange={(e) => updateAbout({ image: e.target.value })}
                                        placeholder="Kuvan URL"
                                        className="bg-white/20 text-white text-xs p-2 rounded w-4/5 focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-2/3 text-base sm:text-lg text-base-text space-y-4 animate-on-scroll fade-in-right text-center md:text-left">
                        {isEditMode ? (
                            <>
                                <textarea 
                                    value={description1} 
                                    onChange={(e) => updateAbout({ description1: e.target.value })}
                                    className="w-full bg-transparent border border-accent/30 rounded p-2 focus:outline-none"
                                    rows={4}
                                />
                                <textarea 
                                    value={description2} 
                                    onChange={(e) => updateAbout({ description2: e.target.value })}
                                    className="w-full bg-transparent border border-accent/30 rounded p-2 focus:outline-none"
                                    rows={4}
                                />
                            </>
                        ) : (
                            <>
                                <p className="leading-relaxed drop-shadow-sm">{description1}</p>
                                <p className="leading-relaxed drop-shadow-sm">{description2}</p>
                            </>
                        )}
                    </div>
                </div>
 
                {/* Software Skills */}
                <div className="mt-8 md:mt-12 bg-base-surface backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-base-border">
                    <h3 className="text-2xl font-bold text-center mb-8 text-base-text animate-on-scroll fade-in">Ohjelmisto-osaaminen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {skills.map((skill, index) => (
                            <div key={index} className="relative group/skill-container">
                                <SkillBar 
                                    skill={skill} 
                                    delay={`${index * 0.1}s`}
                                    index={index}
                                />
                                {isEditMode && (
                                    <button 
                                        onClick={() => removeSkill(index)}
                                        className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover/skill-container:opacity-100 transition-opacity"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {isEditMode && (
                        <button 
                            onClick={addSkill}
                            className="mt-6 mx-auto block px-4 py-2 bg-accent/20 text-accent hover:bg-accent/30 rounded-xl transition-all text-sm font-bold"
                        >
                            + Lisää taito
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;