import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import OffCanvasMenu from './components/OffCanvasMenu';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import WorksSection from './components/WorksSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { Project, Theme, AccentColor } from './types';
import { ContentProvider, useContent } from './components/ContentContext';

const ACCENT_HEX_MAP: Record<AccentColor, { primary: string; hover: string; shadow: string }> = {
    indigo: { 
        primary: 'var(--accent-indigo-primary)', 
        hover: 'var(--accent-indigo-hover)', 
        shadow: 'var(--accent-indigo-shadow)' 
    },
    emerald: { 
        primary: 'var(--accent-emerald-primary)', 
        hover: 'var(--accent-emerald-hover)', 
        shadow: 'var(--accent-emerald-shadow)' 
    },
    rose: { 
        primary: 'var(--accent-rose-primary)', 
        hover: 'var(--accent-rose-hover)', 
        shadow: 'var(--accent-rose-shadow)' 
    },
    amber: { 
        primary: 'var(--accent-amber-primary)', 
        hover: 'var(--accent-amber-hover)', 
        shadow: 'var(--accent-amber-shadow)' 
    },
    cyan: { 
        primary: 'var(--accent-cyan-primary)', 
        hover: 'var(--accent-cyan-hover)', 
        shadow: 'var(--accent-cyan-shadow)' 
    },
};

const AppContent: React.FC = () => {
    const { content, isEditMode, setEditMode } = useContent();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Theme and Accent state
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('user-theme');
        return (saved as Theme) || 'dark';
    });
    const [accent, setAccent] = useState<AccentColor>(() => {
        const saved = localStorage.getItem('user-accent');
        return (saved as AccentColor) || 'indigo';
    });

    useEffect(() => {
        // Apply theme
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('user-theme', theme);
    }, [theme]);

    useEffect(() => {
        // Apply accent color
        const colors = ACCENT_HEX_MAP[accent];
        document.documentElement.style.setProperty('--accent-primary', colors.primary);
        document.documentElement.style.setProperty('--accent-hover', colors.hover);
        document.documentElement.style.setProperty('--accent-shadow', colors.shadow);
        localStorage.setItem('user-accent', accent);
    }, [accent]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, [searchQuery, content]); // Re-observe when items might change due to search or content update

    useEffect(() => {
        if (isMenuOpen || selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen, selectedProject]);
    
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    const filteredProjects = useMemo(() => {
        if (!searchQuery.trim()) return content.projects;
        const q = searchQuery.toLowerCase();
        return content.projects.filter(p => 
            p.title.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q) ||
            p.projectType?.toLowerCase().includes(q) ||
            p.tools?.some(t => t.toLowerCase().includes(q))
        );
    }, [searchQuery, content.projects]);

    return (
        <>
            <Header onMenuToggle={handleMenuToggle} onSearch={setSearchQuery} />
            <OffCanvasMenu 
                isOpen={isMenuOpen} 
                onClose={handleMenuClose} 
                currentTheme={theme}
                currentAccent={accent}
                onThemeChange={setTheme}
                onAccentChange={setAccent}
            />
            <div id="overlay" className={`overlay fixed inset-0 z-40 ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuClose}></div>

            {/* Edit Mode Toggle Button */}
            <button 
                onClick={() => setEditMode(!isEditMode)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 ${isEditMode ? 'bg-green-500 text-white' : 'bg-accent text-white hover:scale-110'}`}
                title={isEditMode ? 'Tallenna muutokset' : 'Muokkaa sisältöä'}
            >
                {isEditMode ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        <span className="font-bold hidden sm:inline">Tallenna</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span className="font-bold hidden sm:inline">Muokkaa</span>
                    </>
                )}
            </button>

            <main>
                <HomeSection />
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <WorksSection projects={filteredProjects} onProjectClick={handleProjectClick} />
                <ContactSection />
            </main>

            <Footer />

            {selectedProject && (
                <ProjectModal
                    isOpen={!!selectedProject}
                    onClose={handleModalClose}
                    project={selectedProject}
                />
            )}
        </>
    );
};

const App: React.FC = () => {
    return (
        <ContentProvider>
            <AppContent />
        </ContentProvider>
    );
};

export default App;
