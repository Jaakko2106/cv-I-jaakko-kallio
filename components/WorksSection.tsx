import React from 'react';
import { Project } from '../types';
import AnimatedBackground from './AnimatedBackground';

interface WorksSectionProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const WorksSection: React.FC<WorksSectionProps> = ({ projects, onProjectClick }) => {
    return (
        <section id="works" className="py-20 px-8 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-white animate-on-scroll fade-in drop-shadow-md">Työnäytteet</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="work-item group rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 border border-white/10 transition-all duration-300 ease-in-out cursor-pointer relative animate-on-scroll zoom-in bg-gray-900"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                            onClick={() => onProjectClick(project)}
                        >
                            <img src={project.coverImage} alt={project.title} className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center opacity-100 transition-opacity duration-300 pb-6">
                                <h3 className="text-white text-xl font-bold text-center px-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorksSection;