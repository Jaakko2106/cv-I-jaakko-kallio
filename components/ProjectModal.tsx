import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

const CarouselImage: React.FC<{ src: string; alt: string; onClick: () => void }> = ({ src, alt, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div 
            className="w-full h-full relative flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in group" 
            onClick={onClick}
        >
            {/* Skeleton / Loading State */}
            <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 transition-opacity duration-500 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="animate-pulse flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            <img 
                src={src} 
                alt={alt} 
                className={`max-w-full max-h-full object-contain transition-all duration-500 ease-in-out transform hover:scale-[1.02] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
                title="Klikkaa suurentaaksesi"
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

const FullscreenImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
    }, [src]);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* Skeleton / Loading State */}
             <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="w-full h-full max-w-4xl max-h-[80vh] bg-white/5 rounded-lg border border-white/10 animate-pulse flex items-center justify-center">
                     <svg className="w-16 h-16 text-white/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            <img 
                src={src} 
                alt={alt} 
                className={`max-w-full max-h-full object-contain shadow-2xl rounded transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                onClick={(e) => e.stopPropagation()} 
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    useEffect(() => {
        // When the modal is set to open, we delay setting it to visible
        // to allow the CSS transition to take effect.
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setCurrentSlideIndex(0); // Reset slide on open
                setIsFullscreen(false);
                setShowCopyFeedback(false);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            setIsFullscreen(false);
        }
    }, [isOpen]);

    // Keyboard navigation for fullscreen mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isFullscreen) return;

            if (e.key === 'Escape') {
                setIsFullscreen(false);
            } else if (e.key === 'ArrowLeft') {
                setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
            } else if (e.key === 'ArrowRight') {
                setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % project.images.length);
            }
        };

        if (isFullscreen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreen, project.images.length]);

    if (!isOpen) return null;

    const nextSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const prevSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleFullscreenClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFullscreen(false);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowCopyFeedback(true);
            setTimeout(() => setShowCopyFeedback(false), 2000);
        }).catch(err => {
            console.error('Failed to copy URL:', err);
        });
    };

    const currentImage = project.images[currentSlideIndex];

    return (
        <div id="project-details-modal" className={`modal ${isVisible ? 'open' : ''}`} onClick={handleBackdropClick}>
            <div className="modal-content overflow-y-auto max-h-[90vh]">
                <span className="close-button" onClick={onClose}>&times;</span>
                
                {/* Header with Title and Share */}
                <div className="flex items-center gap-2 mb-4 pr-8">
                    <h3 id="project-details-title" className="text-2xl font-bold text-indigo-700">{project.title}</h3>
                    <button 
                        onClick={handleShare}
                        className="p-2 rounded-full hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 group relative"
                        title="Jaa projekti"
                        aria-label="Jaa projekti"
                    >
                         {showCopyFeedback ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        )}
                    </button>
                    {showCopyFeedback && (
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded animate-pulse">Kopioitu!</span>
                    )}
                </div>
                
                <div id="project-carousel" className="relative w-full group/carousel">
                    <div id="carousel-wrapper" className="relative h-56 md:h-80 bg-gray-50 rounded-lg">
                        {project.images.map((image, index) => {
                            // Construct descriptive alt text
                            const altText = image.caption 
                                ? `${project.title} - ${image.caption}` 
                                : `${project.title} - Kuva ${index + 1}`;
                            
                            return (
                                <div key={index} className={`carousel-slide ${index === currentSlideIndex ? 'active' : ''} h-full w-full relative`}>
                                    <CarouselImage 
                                        src={image.url} 
                                        alt={altText} 
                                        onClick={toggleFullscreen}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    
                    <button type="button" id="carousel-prev" onClick={prevSlide} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-colors">
                            <svg className="w-4 h-4 text-white shadow-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span className="sr-only">Edellinen</span>
                        </span>
                    </button>
                    <button type="button" id="carousel-next" onClick={nextSlide} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-colors">
                            <svg className="w-4 h-4 text-white shadow-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="sr-only">Seuraava</span>
                        </span>
                    </button>

                     <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
                        Klikkaa suurentaaksesi
                    </div>
                </div>

                {/* Caption Display */}
                <div className="min-h-[1.5rem] my-3 text-center">
                    {currentImage.caption ? (
                        <p className="text-sm text-gray-500 italic font-medium">{currentImage.caption}</p>
                    ) : (
                        <span className="opacity-0">Ei kuvatekstiä</span> // Keeps layout stable
                    )}
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto py-1 justify-center px-2">
                    {project.images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlideIndex(index)}
                            aria-label={`Näytä kuva ${index + 1}`}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                                index === currentSlideIndex 
                                ? 'border-indigo-600 shadow-md scale-105' 
                                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                        >
                            <img 
                                src={img.url} 
                                alt={`Pikkukuva ${index + 1}`} 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                <p id="project-details-description" className="text-gray-700 leading-relaxed mt-2">{project.description}</p>
                
                {project.demoUrl && (
                    <div className="mt-4">
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-300"
                        >
                            Katso live-projekti
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                    </div>
                )}
                
                {/* Project Details */}
                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {project.client && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Asiakas</span>
                            <span className="text-sm font-semibold text-gray-800">{project.client}</span>
                        </div>
                    )}
                    {project.projectType && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Projektityyppi</span>
                            <span className="text-sm font-semibold text-gray-800">{project.projectType}</span>
                        </div>
                    )}
                    {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Työkalut</span>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tools.map(tool => (
                                    <span key={tool} className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Image Overlay */}
            {isFullscreen && (
                <div 
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" 
                    onClick={handleFullscreenClose}
                >
                    <button 
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-[210]" 
                        onClick={handleFullscreenClose}
                        aria-label="Sulje kokoruututila"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <button 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-[210] hidden md:block" 
                        onClick={prevSlide}
                        aria-label="Edellinen kuva"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>

                    <button 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-[210] hidden md:block" 
                        onClick={nextSlide}
                        aria-label="Seuraava kuva"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>

                    <FullscreenImage 
                        src={currentImage.url} 
                        alt={currentImage.caption 
                            ? `${project.title} - ${currentImage.caption}` 
                            : `${project.title} - Kuva ${currentSlideIndex + 1}`}
                    />

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-8 pointer-events-none">
                         {currentImage.caption && (
                            <p className="text-white/90 text-center mb-3 text-lg font-medium drop-shadow-md max-w-3xl pointer-events-auto bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                                {currentImage.caption}
                            </p>
                         )}
                         <div className="text-white/60 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-auto">
                             {currentSlideIndex + 1} / {project.images.length}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;