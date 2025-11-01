
import React, { useState, useEffect } from 'react';
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
import { Project } from './types';

const projectsData: Project[] = [
    {
        id: '1',
        title: "Brand Identity Design",
        description: "A complete brand overhaul for a tech startup, including logo, color palette, and typography. This project focused on creating a modern and trustworthy brand presence.",
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/0/09/Helsinki_logo.svg',
            'https://placehold.co/600x400/C3C3FF/3F51B5?text=Logo+Exploration',
            'https://placehold.co/600x400/AEAEFF/3F51B5?text=Final+Styleguide'
        ],
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Helsinki_logo.svg'
    },
    {
        id: '2',
        title: "Responsive Web Design",
        description: "Designed and prototyped a responsive website for an e-commerce platform, focusing on user experience and conversion optimization.",
        images: [
            'https://placehold.co/600x400/B8B8FF/3F51B5?text=Homepage+Desktop',
            'https://placehold.co/600x400/C3C3FF/3F51B5?text=Product+Page',
            'https://placehold.co/600x400/AEAEFF/3F51B5?text=Mobile+View'
        ],
        coverImage: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Web+Design+Project'
    },
    {
        id: '3',
        title: "Digital Illustration Series",
        description: "A series of digital illustrations for a children's book, bringing characters to life with vibrant colors and engaging characters.",
        images: [
            'https://placehold.co/600x400/B8B8FF/3F51B5?text=Character+Sketch',
            'https://placehold.co/600x400/C3C3FF/3F51B5?text=Scene+Illustration',
            'https://placehold.co/600x400/AEAEFF/3F51B5?text=Book+Cover+Art'
        ],
        coverImage: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Illustration+Project'
    }
];

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    }, []);

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

    return (
        <>
            <Header onMenuToggle={handleMenuToggle} />
            <OffCanvasMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
            <div id="overlay" className={`overlay fixed inset-0 z-40 ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuClose}></div>

            <main>
                <HomeSection />
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <WorksSection projects={projectsData} onProjectClick={handleProjectClick} />
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

export default App;
