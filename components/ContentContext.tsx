import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Project, Skill, ExperienceItem, EducationItem } from '../types';

interface ContentContextType {
    content: SiteContent;
    isEditMode: boolean;
    setEditMode: (mode: boolean) => void;
    updateContent: (newContent: Partial<SiteContent>) => void;
    updateHome: (data: Partial<SiteContent['home']>) => void;
    updateAbout: (data: Partial<SiteContent['about']>) => void;
    updateExperience: (data: Partial<SiteContent['experience']>) => void;
    updateEducation: (data: Partial<SiteContent['education']>) => void;
    updateProjects: (projects: Project[]) => void;
    updateContact: (data: Partial<SiteContent['contact']>) => void;
}

const defaultContent: SiteContent = {
    home: {
        title: "Hei, olen Jaakko",
        subtitle: "Monipuolinen graafinen suunnittelija",
        profileImage: "https://lh3.googleusercontent.com/a/ACg8ocIErQDc91ck-z8LvnzwofgI158k8P3kfkldTtQ0pTqMygEIhMMZTA=s539-c-no",
        description: "Erikoistunut brändäykseen, UI/UX-suunnitteluun ja visuaaliseen kerrontaan. Luon malleja, jotka viestivät tehokkaasti ja jättävät pysyvän vaikutuksen."
    },
    about: {
        title: "Tietoa minusta",
        description1: "Hei! Olen Jaakko, intohimoinen ja monipuolinen graafinen suunnittelija, jolla on tarkka silmä yksityiskohdille ja rakkaus vakuuttavien visuaalisten tarinoiden luomiseen. Vahvalla suunnitteluperiaatteiden tuntemuksella ja modernilla esteettisellä silmällä autan brändejä yhdistymään yleisöönsä merkityksellisten ja mieleenpainuvien mallien avulla.",
        description2: "Osaamiseni kattaa brändi-identiteetin, UI/UX-suunnittelun, digitaalisen kuvituksen ja printtimedian. Innostun haasteista ja olen aina valmis oppimaan uusia taitoja sekä tutkimaan innovatiivisia suunnitteluratkaisuja. Luodaan yhdessä jotain upeaa!",
        image: "https://photos.app.goo.gl/7nChTps4rCQy2ruJ8",
        skills: [
            { name: "Adobe Photoshop", level: 95 },
            { name: "Adobe Illustrator", level: 90 },
            { name: "Adobe InDesign", level: 85 },
            { name: "Figma / Wireframing", level: 90 },
            { name: "Wordpress", level: 80 },
            { name: "Premiere Pro", level: 70 },
        ]
    },
    experience: {
        title: "Työkokemus",
        items: [
            {
                id: '1',
                title: "Vanhempi graafinen suunnittelija",
                company: "DesignHub Creative",
                period: "2020 - Nykyhetki",
                description: "Vedin brändäysprojekteja suurasiakkaille, mentoroin nuorempia suunnittelijoita ja kehitin kattavia visuaalisia identiteettijärjestelmiä. Erikoistunut UI/UX-suunnitteluun web- ja mobiilisovelluksille."
            },
            {
                id: '2',
                title: "Graafinen suunnittelija",
                company: "Innovate Solutions Inc.",
                period: "2017 - 2020",
                description: "Suunnittelin markkinointimateriaaleja, kuten esitteitä, sosiaalisen median grafiikkaa ja esityksiä. Tein yhteistyötä markkinointitiimin kanssa onnistuneiden kampanjoiden toteuttamiseksi."
            },
            {
                id: '3',
                title: "Nuorempi suunnittelija",
                company: "PixelPerfect Agency",
                period: "2015 - 2017",
                description: "Avustin vanhempia suunnittelijoita erilaisissa tehtävissä, kuten kuvankäsittelyssä, taitossa ja painoaineistojen valmistelussa. Sain perustavanlaatuista kokemusta nopeatempoisessa toimistoympäristössä."
            }
        ]
    },
    education: {
        title: "Koulutus",
        items: [
            {
                id: '1',
                degree: "Taiteen maisteri, Graafinen suunnittelu",
                university: "Taideteollinen korkeakoulu",
                period: "2013 - 2015"
            },
            {
                id: '2',
                degree: "Kuvataiteen kandidaatti, Visuaalinen viestintä",
                university: "Valtion muotoiluopisto",
                period: "2010 - 2013"
            }
        ]
    },
    projects: [
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
    ],
    contact: {
        title: "Ota yhteyttä",
        email: "jaakko@example.com",
        phone: "+358 40 123 4567",
        address: "Helsinki, Suomi"
    }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(() => {
        const saved = localStorage.getItem('site-content');
        return saved ? JSON.parse(saved) : defaultContent;
    });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        localStorage.setItem('site-content', JSON.stringify(content));
    }, [content]);

    const updateContent = (newContent: Partial<SiteContent>) => {
        setContent(prev => ({ ...prev, ...newContent }));
    };

    const updateHome = (data: Partial<SiteContent['home']>) => {
        setContent(prev => ({ ...prev, home: { ...prev.home, ...data } }));
    };

    const updateAbout = (data: Partial<SiteContent['about']>) => {
        setContent(prev => ({ ...prev, about: { ...prev.about, ...data } }));
    };

    const updateExperience = (data: Partial<SiteContent['experience']>) => {
        setContent(prev => ({ ...prev, experience: { ...prev.experience, ...data } }));
    };

    const updateEducation = (data: Partial<SiteContent['education']>) => {
        setContent(prev => ({ ...prev, education: { ...prev.education, ...data } }));
    };

    const updateProjects = (projects: Project[]) => {
        setContent(prev => ({ ...prev, projects }));
    };

    const updateContact = (data: Partial<SiteContent['contact']>) => {
        setContent(prev => ({ ...prev, contact: { ...prev.contact, ...data } }));
    };

    return (
        <ContentContext.Provider value={{ 
            content, 
            isEditMode, 
            setEditMode: setIsEditMode, 
            updateContent,
            updateHome,
            updateAbout,
            updateExperience,
            updateEducation,
            updateProjects,
            updateContact
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
