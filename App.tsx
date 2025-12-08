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
        title: "Brändi-identiteetin suunnittelu",
        description: "Täydellinen brändiuudistus teknologia-startupille, mukaan lukien logo, väripaletti ja typografia. Tämä projekti keskittyi modernin ja luotettavan brändi-ilmeen luomiseen.",
        images: [
            {
                url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Helsinki_logo.svg',
                caption: 'Lopullinen logosuunnitelma'
            },
            {
                url: 'https://placehold.co/600x400/C3C3FF/3F51B5?text=Logo+Exploration',
                caption: 'Alustava konseptikartoitus'
            },
            {
                url: 'https://placehold.co/600x400/AEAEFF/3F51B5?text=Final+Styleguide',
                caption: 'Kattava brändiohjeisto'
            }
        ],
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Helsinki_logo.svg',
        client: "Nordic Tech Solutions",
        projectType: "Brändäys & Identiteetti",
        tools: ["Illustrator", "Photoshop", "InDesign"],
        demoUrl: "https://example.com/case-study/nordic-tech"
    },
    {
        id: '2',
        title: "Responsiivinen verkkosuunnittelu",
        description: "Suunnittelin ja prototyypitin responsiivisen verkkosivuston verkkokauppa-alustalle, keskittyen käyttäjäkokemukseen ja konversio-optimointiin.",
        images: [
            {
                url: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Homepage+Desktop',
                caption: 'Työpöytäversion etusivu'
            },
            {
                url: 'https://placehold.co/600x400/C3C3FF/3F51B5?text=Product+Page',
                caption: 'Tuotesivun näkymä'
            },
            {
                url: 'https://placehold.co/600x400/AEAEFF/3F51B5?text=Mobile+View',
                caption: 'Mobiiliresponsiiviset mukautukset'
            }
        ],
        coverImage: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Web+Design+Project',
        client: "Bloom E-Commerce",
        projectType: "UI/UX-suunnittelu",
        tools: ["Figma", "React", "Tailwind CSS"],
        demoUrl: "https://example.com/demo/bloom-ecommerce"
    },
    {
        id: '3',
        title: "Digitaalinen kuvitussarja",
        description: "Sarja digitaalisia kuvituksia lastenkirjaan, hahmojen herättäminen eloon eloisilla väreillä ja kiinnostavilla persoonilla.",
        images: [
            {
                url: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Character+Sketch',
                caption: 'Alustavat hahmoluonnokset'
            },
            {
                url: 'https://placehold.co/600x400/C3C3FF/3F51B5?text=Scene+Illustration',
                caption: 'Koko kohtauksen renderöinti'
            },
            {
                url: 'https://placehold.co/600x400/AEAEFF/3F51B5?text=Book+Cover+Art',
                caption: 'Lopullinen kirjan kansikuva'
            }
        ],
        coverImage: 'https://placehold.co/600x400/B8B8FF/3F51B5?text=Illustration+Project',
        client: "Little Dreamers Publishing",
        projectType: "Kuvitus",
        tools: ["Procreate", "Photoshop", "After Effects"],
        demoUrl: "https://example.com/portfolio/illustration-series"
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