import React from 'react';
import { Project } from '../types';
import AnimatedBackground from './AnimatedBackground';

interface WorksSectionProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const WorksSection: React.FC<WorksSectionProps> = ({ projects, onProjectClick }) => {
    return (
        <section id="works" className="py-20 px-8 relative overflow-hidden bg-gray-50">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">My Works</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="work-item group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer relative animate-on-scroll zoom-in"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                            onClick={() => onProjectClick(project)}
                        >
                            <img src={project.coverImage} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"/>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-2xl font-bold text-center p-4">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorksSection;