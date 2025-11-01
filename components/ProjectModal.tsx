
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // When the modal is set to open, we delay setting it to visible
        // to allow the CSS transition to take effect.
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setCurrentSlideIndex(0); // Reset slide on open
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const nextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div id="project-details-modal" className={`modal ${isVisible ? 'open' : ''}`} onClick={handleBackdropClick}>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3 id="project-details-title" className="text-2xl font-bold text-indigo-700 mb-4">{project.title}</h3>
                
                <div id="project-carousel" className="relative w-full mb-4">
                    <div id="carousel-wrapper" className="relative h-56 overflow-hidden rounded-lg md:h-80">
                        {project.images.map((src, index) => (
                            <div key={index} className={`carousel-slide ${index === currentSlideIndex ? 'active' : ''}`}>
                                <img src={src} alt={`${project.title} slide ${index + 1}`} className="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" />
                            </div>
                        ))}
                    </div>
                    
                    <button type="button" id="carousel-prev" onClick={prevSlide} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" id="carousel-next" onClick={nextSlide} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
                <p id="project-details-description" className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>
        </div>
    );
};

export default ProjectModal;