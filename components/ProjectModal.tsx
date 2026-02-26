import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project } from '../types';
import { useContent } from './ContentContext';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

const CarouselImage: React.FC<{ src: string; alt: string; onClick: () => void }> = ({ src, alt, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div 
            className="w-full h-full relative flex items-center justify-center bg-base-surface rounded-lg overflow-hidden cursor-zoom-in group" 
            onClick={onClick}
        >
            <div className={`absolute inset-0 flex items-center justify-center bg-base-surface transition-opacity duration-500 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="animate-pulse flex flex-col items-center">
                    <svg className="w-12 h-12 text-base-text/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    const dragStart = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const resetView = useCallback(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        setIsLoaded(false);
        resetView();
    }, [src, resetView]);

    const handleZoomToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (scale === 1) {
            setScale(2.5);
        } else {
            resetView();
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        const delta = -e.deltaY;
        const newScale = Math.min(Math.max(scale + delta * 0.005, 1), 5);
        
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale <= 1) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    // Touch support
    const handleTouchStart = (e: React.TouchEvent) => {
        if (scale <= 1) return;
        const touch = e.touches[0];
        setIsDragging(true);
        dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || scale <= 1) return;
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - dragStart.current.x,
            y: touch.clientY - dragStart.current.y
        });
    };

    const handleTouchEnd = () => setIsDragging(false);

    let cursorStyle = 'cursor-zoom-in';
    if (scale > 1) {
        cursorStyle = isDragging ? 'cursor-grabbing' : 'cursor-grab';
    }

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
            onWheel={handleWheel}
        >
             <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-full h-full max-w-4xl max-h-[80vh] bg-base-surface rounded-lg border border-base-border animate-pulse flex items-center justify-center">
                     <svg className="w-16 h-16 text-base-text/10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            <img 
                src={src} 
                alt={alt} 
                className={`max-w-none transition-transform duration-100 ease-out select-none ${cursorStyle} ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                style={{ 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    maxHeight: scale === 1 ? '100%' : 'none',
                    maxWidth: scale === 1 ? '100%' : 'none'
                }}
                onClick={handleZoomToggle}
                onDoubleClick={(e) => { e.stopPropagation(); resetView(); }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onLoad={() => setIsLoaded(true)}
                draggable={false}
            />

            {/* Scale Indicator */}
            {scale > 1 && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none z-50">
                    Zoom: {Math.round(scale * 100)}%
                </div>
            )}

            {/* Reset Button Overlay */}
            {(scale > 1 || position.x !== 0 || position.y !== 0) && (
                <button 
                    onClick={(e) => { e.stopPropagation(); resetView(); }}
                    className="absolute bottom-24 right-6 bg-white/10 hover:bg-white/20 text-white/70 p-3 rounded-xl backdrop-blur-md border border-white/10 transition-all z-50 flex items-center gap-2 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    <span className="text-sm font-medium hidden group-hover:block">Nollaa näkymä</span>
                </button>
            )}
        </div>
    );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const { isEditMode, updateProjects, content } = useContent();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setCurrentSlideIndex(0);
                setIsFullscreen(false);
                setShowCopyFeedback(false);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            setIsFullscreen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isFullscreen) return;
            if (e.key === 'Escape') setIsFullscreen(false);
            else if (e.key === 'ArrowLeft') setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
            else if (e.key === 'ArrowRight') setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % project.images.length);
        };
        if (isFullscreen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, project.images.length]);

    if (!isOpen) return null;

    const handleProjectFieldChange = (field: string, value: any) => {
        const newProjects = [...content.projects];
        const pIndex = newProjects.findIndex(p => p.id === project.id);
        newProjects[pIndex] = { ...newProjects[pIndex], [field]: value };
        updateProjects(newProjects);
    };

    const handleImageChange = (index: number, field: string, value: string) => {
        const newImages = [...project.images];
        newImages[index] = { ...newImages[index], [field]: value };
        handleProjectFieldChange('images', newImages);
    };

    const addImage = () => {
        handleProjectFieldChange('images', [...project.images, { url: 'https://placehold.co/600x400', caption: 'Uusi kuva' }]);
    };

    const removeImage = (index: number) => {
        const newImages = project.images.filter((_, i) => i !== index);
        handleProjectFieldChange('images', newImages);
        if (currentSlideIndex >= newImages.length) {
            setCurrentSlideIndex(Math.max(0, newImages.length - 1));
        }
    };

    const nextSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project.images.length === 0) return;
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const prevSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project.images.length === 0) return;
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const toggleFullscreen = () => {
        if (project.images.length === 0) return;
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
        }).catch(err => console.error('Failed to copy URL:', err));
    };

    const currentImage = project.images[currentSlideIndex];

    return (
        <div id="project-details-modal" className={`modal ${isVisible ? 'open' : ''}`} onClick={handleBackdropClick}>
            <div className="modal-content overflow-y-auto max-h-[90vh] w-[95%] sm:w-[90%] !max-w-3xl !p-0 border border-base-border">
                {/* Header Section */}
                <div className="p-5 md:p-8 border-b border-base-border sticky top-0 bg-base/95 backdrop-blur-md z-30">
                    <span className="close-button !top-4 !right-4 md:!top-6 md:!right-6 text-base-text/60 hover:text-base-text" onClick={onClose}>&times;</span>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8 md:pr-10">
                        <div className="flex items-center gap-2 flex-grow">
                            {isEditMode ? (
                                <input 
                                    type="text" 
                                    value={project.title} 
                                    onChange={(e) => handleProjectFieldChange('title', e.target.value)}
                                    className="text-xl md:text-3xl font-bold text-base-text leading-tight bg-transparent border-b border-accent/20 focus:outline-none w-full"
                                />
                            ) : (
                                <h3 className="text-xl md:text-3xl font-bold text-base-text leading-tight">{project.title}</h3>
                            )}
                            <button 
                                onClick={handleShare}
                                title="Kopioi linkki"
                                className="p-2 rounded-full hover:bg-accent/10 text-accent hover:text-accent-hover transition-all focus:outline-none flex-shrink-0"
                            >
                                {showCopyFeedback ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                )}
                            </button>
                        </div>

                        {isEditMode ? (
                            <input 
                                type="text" 
                                value={project.demoUrl || ''} 
                                onChange={(e) => handleProjectFieldChange('demoUrl', e.target.value)}
                                placeholder="Demo URL"
                                className="text-sm bg-transparent border-b border-accent/20 focus:outline-none text-accent"
                            />
                        ) : (
                            project.demoUrl && (
                                <a 
                                    href={project.demoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent-hover font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex-shrink-0 group"
                                >
                                    <span>Katso live</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                </a>
                            )
                        )}
                    </div>
                </div>

                <div className="p-5 md:p-8 bg-base">
                    {/* Visuals Section */}
                    <div className="relative w-full group/carousel mb-8">
                        <div className="relative h-64 md:h-[450px] bg-base-surface rounded-2xl overflow-hidden shadow-inner border border-base-border">
                            {project.images.length > 0 ? (
                                project.images.map((image, index) => (
                                    <div key={index} className={`carousel-slide ${index === currentSlideIndex ? 'active' : ''} h-full w-full relative`}>
                                        <CarouselImage src={image.url} alt={image.caption || project.title} onClick={toggleFullscreen} />
                                        {isEditMode && (
                                            <div className="absolute top-4 left-4 right-4 z-40 bg-black/60 p-2 rounded-xl backdrop-blur-md flex flex-col gap-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                                                <input 
                                                    type="text" 
                                                    value={image.url} 
                                                    onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                                                    placeholder="Kuvan URL"
                                                    className="bg-white/10 text-white text-xs p-2 rounded focus:outline-none"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={image.caption || ''} 
                                                    onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                                                    placeholder="Kuvateksti"
                                                    className="bg-white/10 text-white text-xs p-2 rounded focus:outline-none"
                                                />
                                                <button 
                                                    onClick={() => removeImage(index)}
                                                    className="bg-red-500 text-white text-[10px] py-1 rounded"
                                                >
                                                    Poista kuva
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-base-text/20 italic">
                                    Ei kuvia
                                </div>
                            )}
                        </div>
                        {project.images.length > 1 && (
                            <>
                                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-base-surface shadow-xl flex items-center justify-center text-accent hover:bg-base-surface/80 transition-all scale-90 hover:scale-100 z-10 border border-base-border">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-base-surface shadow-xl flex items-center justify-center text-accent hover:bg-base-surface/80 transition-all scale-90 hover:scale-100 z-10 border border-base-border">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide items-center">
                        {project.images.map((img, index) => (
                            <button key={index} onClick={() => setCurrentSlideIndex(index)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === currentSlideIndex ? 'border-accent ring-4 ring-accent/10 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                        {isEditMode && (
                            <button 
                                onClick={addImage}
                                className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-accent/30 flex items-center justify-center text-accent hover:bg-accent/10 transition-all"
                            >
                                +
                            </button>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="prose prose-indigo max-w-none mb-12">
                        <h4 className="text-base-text text-xl font-bold mb-4 flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                             Projektin kuvaus
                        </h4>
                        {isEditMode ? (
                            <textarea 
                                value={project.description} 
                                onChange={(e) => handleProjectFieldChange('description', e.target.value)}
                                className="w-full bg-transparent border border-accent/20 rounded p-4 focus:outline-none text-base-text mb-12 text-lg leading-relaxed"
                                rows={6}
                            />
                        ) : (
                            <p className="text-base-text mb-12 text-lg leading-relaxed">{project.description}</p>
                        )}
                    </div>
                    
                    {/* Key Details Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        {/* Client Card */}
                        <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl hover:bg-accent/10 transition-colors group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </div>
                                <span className="text-xs font-bold text-accent/60 uppercase tracking-widest">Asiakas</span>
                            </div>
                            {isEditMode ? (
                                <input 
                                    type="text" 
                                    value={project.client || ''} 
                                    onChange={(e) => handleProjectFieldChange('client', e.target.value)}
                                    className="text-base-text font-bold text-base bg-transparent border-b border-accent/20 focus:outline-none w-full"
                                />
                            ) : (
                                <p className="text-base-text font-bold text-base truncate">{project.client || 'Yksityinen'}</p>
                            )}
                        </div>

                        {/* Project Type Card */}
                        <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl hover:bg-accent/10 transition-colors group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                                </div>
                                <span className="text-xs font-bold text-accent/60 uppercase tracking-widest">Tyyppi</span>
                            </div>
                            {isEditMode ? (
                                <input 
                                    type="text" 
                                    value={project.projectType || ''} 
                                    onChange={(e) => handleProjectFieldChange('projectType', e.target.value)}
                                    className="text-base-text font-bold text-base bg-transparent border-b border-accent/20 focus:outline-none w-full"
                                />
                            ) : (
                                <p className="text-base-text font-bold text-base truncate">{project.projectType || 'Suunnittelu'}</p>
                            )}
                        </div>

                        {/* Tools Card */}
                        <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl hover:bg-accent/10 transition-colors group md:col-span-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                </div>
                                <span className="text-xs font-bold text-accent/60 uppercase tracking-widest">Työkalut</span>
                            </div>
                            {isEditMode ? (
                                <input 
                                    type="text" 
                                    value={project.tools?.join(', ') || ''} 
                                    onChange={(e) => handleProjectFieldChange('tools', e.target.value.split(',').map(t => t.trim()))}
                                    placeholder="Erota pilkulla"
                                    className="text-base-text font-bold text-base bg-transparent border-b border-accent/20 focus:outline-none w-full"
                                />
                            ) : (
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tools && project.tools.length > 0 ? (
                                        project.tools.slice(0, 3).map(tool => (
                                            <span key={tool} className="px-2 py-0.5 bg-base-surface text-accent rounded-md text-[10px] font-bold border border-accent/20 shadow-sm">
                                                {tool}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-base-text/40 text-sm">Ei määritelty</span>
                                    )}
                                    {project.tools && project.tools.length > 3 && (
                                        <span className="text-[10px] font-bold text-accent flex items-center">+{project.tools.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {project.demoUrl && !isEditMode && (
                        <div className="flex justify-center pt-4 border-t border-base-border">
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-2xl hover:-translate-y-1"
                            >
                                <span>Avaa täysi projektisivu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Viewer (Remains enhanced with zooming) */}
            {isFullscreen && project.images.length > 0 && (
                <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 backdrop-blur-xl" onClick={handleFullscreenClose}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[210] p-4" onClick={handleFullscreenClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    
                    {project.images.length > 1 && (
                        <>
                            <button 
                                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all hover:scale-110 z-[210] hidden md:block" 
                                onClick={prevSlide}
                            >
                                 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>

                            <button 
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all hover:scale-110 z-[210] hidden md:block" 
                                onClick={nextSlide}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </>
                    )}

                    <FullscreenImage src={currentImage.url} alt="" />

                    <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-6 pointer-events-none">
                         {currentImage.caption && (
                            <p className="text-white/90 text-center text-lg md:text-xl font-medium bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl max-w-2xl pointer-events-auto shadow-2xl border border-white/10">
                                {currentImage.caption}
                            </p>
                         )}
                         <div className="text-white/40 text-xs font-bold tracking-widest bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md pointer-events-auto border border-white/5">
                             {currentSlideIndex + 1} / {project.images.length}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;
