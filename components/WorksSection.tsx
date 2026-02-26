import React from 'react';
import { Project } from '../types';
import AnimatedBackground from './AnimatedBackground';
import { useContent } from './ContentContext';

interface WorksSectionProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const getToolIcon = (toolName: string) => {
    const name = toolName.toLowerCase();
    
    if (name.includes('photoshop')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#31A8FF]" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9.5 18H8V9H5.5V7.5h4v10.5zm6 0h-1.7l-0.6-2h-2.5l-0.6 2h-1.7l3-9h1.8l3 9zm-2.8-3.4l-0.8-2.8l-0.8 2.8h1.6z"/></svg>;
    }
    if (name.includes('illustrator')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF9A00]" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9.6 18H7.4l-0.7-2.3H3.6L2.9 18H0.7l3.6-10h1.7l3.6 10zm-3-3.8l-1.2-4l-1.2 4h2.4zm8.6 3.8h-1.6v-7h1.6v7zm0-8.5h-1.6V8h1.6v1.5z"/></svg>;
    }
    if (name.includes('indesign')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF3366]" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 18H6.9V9H5v-.8h3.5V18zm6.5 0h-1.6v-1.2c-.5.8-1.5 1.4-2.7 1.4-2.3 0-3.5-1.7-3.5-4.3s1.3-4.4 3.6-4.4c1.1 0 2.2.6 2.6 1.4V8h1.6v10zm-3.8-1.3c1.3 0 2.2-1.1 2.2-3s-.9-3-2.2-3-2.2 1.1-2.2 3 .9 3 2.2 3z"/></svg>;
    }
    if (name.includes('figma')) {
        return <svg viewBox="0 0 15 24" className="w-4 h-5" fill="none"><path d="M4 24c2.209 0 4-1.791 4-4v-4H4c-2.209 0-4 1.791-4 4s1.791 4 4 4z" fill="#0ACF83"/><path d="M4 0c-2.209 0-4 1.791-4 4s1.791 4 4 4h4V0H4z" fill="#F24E1E"/><path d="M4 8H0c0 2.209 1.791 4 4 4h4V8H4z" fill="#A259FF"/><path d="M11 16c-2.209 0-4-1.791-4-4V8h4c2.209 0 4 1.791 4 4s-1.791 4-4 4z" fill="#1ABCFE"/><path d="M11 0H7v8h4c2.209 0 4-1.791 4-4s-1.791-4-4-4z" fill="#FF7262"/></svg>;
    }
    if (name.includes('react')) {
         return <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 text-[#61DAFB]"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>;
    }
    if (name.includes('tailwind')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38BDF8]" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>;
    }
    if (name.includes('after effects')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D291FF]" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9.5 18H8l-0.6-2H4.6L4 18H2.5l3-9h1l3 9zm6.5 0h-1.6v-1.2h-3v-2h2.5v-1.2H16V9.8h3V8.5h-4.5v7.5H16V18zm-3.5-3.4l-0.8-2.8l-0.8 2.8h1.6z"/></svg>;
    }
    if (name.includes('procreate')) {
        return <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 19 13-13"/></svg>;
    }
    
    // Default Pen Tool
    return <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
};

const WorksSection: React.FC<WorksSectionProps> = ({ projects, onProjectClick }) => {
    const { isEditMode, updateProjects, content } = useContent();

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: "Uusi projekti",
            description: "Projektin kuvaus...",
            coverImage: "https://placehold.co/600x400?text=Uusi+Projekti",
            images: [],
            tools: ["Figma"]
        };
        updateProjects([...content.projects, newProject]);
    };

    const removeProject = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        updateProjects(content.projects.filter(p => p.id !== id));
    };

    return (
        <section id="works" className="py-20 px-4 sm:px-8 relative overflow-hidden">
            <AnimatedBackground 
                overlayClassName="bg-accent/10" 
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-2022-large.mp4"
            />
            <div className="relative z-10 container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-base-text animate-on-scroll fade-in drop-shadow-md">Työnäytteet</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="work-item group rounded-xl overflow-hidden shadow-lg hover:shadow-accent/30 border border-base-border transition-all duration-300 ease-in-out cursor-pointer animate-on-scroll fade-in-down bg-base-surface backdrop-blur-sm flex flex-col relative"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                            onClick={() => onProjectClick(project)}
                        >
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img 
                                    src={project.coverImage} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 animate-on-scroll fade-in"
                                    style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
                                />
                                <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
                                
                                {isEditMode && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                                        <input 
                                            type="text" 
                                            value={project.coverImage} 
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                                const newProjects = [...content.projects];
                                                const pIndex = newProjects.findIndex(p => p.id === project.id);
                                                newProjects[pIndex] = { ...newProjects[pIndex], coverImage: e.target.value };
                                                updateProjects(newProjects);
                                            }}
                                            placeholder="Kansikuvan URL"
                                            className="bg-white/20 text-white text-xs p-2 rounded w-full focus:outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-5 flex flex-col flex-grow">
                                {isEditMode ? (
                                    <input 
                                        type="text" 
                                        value={project.title} 
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => {
                                            const newProjects = [...content.projects];
                                            const pIndex = newProjects.findIndex(p => p.id === project.id);
                                            newProjects[pIndex] = { ...newProjects[pIndex], title: e.target.value };
                                            updateProjects(newProjects);
                                        }}
                                        className="text-base-text text-lg font-bold mb-3 bg-transparent border-b border-accent/20 focus:outline-none w-full"
                                    />
                                ) : (
                                    <h3 className="text-base-text text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                                )}
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tools?.map((tool, i) => (
                                        <div 
                                            key={i} 
                                            className="bg-base-surface p-2 rounded-lg border border-base-border hover:bg-base-text/10 hover:border-accent/30 transition-all duration-300 animate-on-scroll fade-in-down" 
                                            style={{ transitionDelay: `${(index * 0.1) + (i * 0.05)}s` }}
                                            title={tool}
                                        >
                                            {getToolIcon(tool)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {isEditMode && (
                                <button 
                                    onClick={(e) => removeProject(project.id, e)}
                                    className="absolute right-2 top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                    {isEditMode && (
                        <button 
                            onClick={addProject}
                            className="bg-accent/10 border-2 border-dashed border-accent/30 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-accent/20 transition-all text-accent font-bold aspect-[4/3]"
                        >
                            <span className="text-4xl mb-2">+</span>
                            <span>Lisää projekti</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WorksSection;
