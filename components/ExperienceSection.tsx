import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const ExperienceItem: React.FC<{ title: string; company: string; period: string; description: string; delay?: string }> = ({ title, company, period, description, delay = '0s' }) => (
    <div className="relative pl-8 sm:pl-12 py-6 group animate-on-scroll fade-in-up" style={{ transitionDelay: delay }}>
        <div className="flex items-center mb-1">
            <div className="absolute left-0 h-full w-px bg-indigo-200"></div>
            <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-indigo-500 border-2 border-white group-hover:bg-indigo-700 transition-colors"></div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-indigo-600 font-semibold">{company} | {period}</p>
        <p className="mt-2 text-gray-600">
            {description}
        </p>
    </div>
);


const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="py-20 px-8 relative overflow-hidden bg-gray-50">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">Työkokemus</h2>
                <div className="relative">
                    <ExperienceItem 
                        title="Vanhempi graafinen suunnittelija"
                        company="DesignHub Creative"
                        period="2020 - Nykyhetki"
                        description="Vedin brändäysprojekteja suurasiakkaille, mentoroin nuorempia suunnittelijoita ja kehitin kattavia visuaalisia identiteettijärjestelmiä. Erikoistunut UI/UX-suunnitteluun web- ja mobiilisovelluksille."
                    />
                    <ExperienceItem 
                        title="Graafinen suunnittelija"
                        company="Innovate Solutions Inc."
                        period="2017 - 2020"
                        description="Suunnittelin markkinointimateriaaleja, kuten esitteitä, sosiaalisen median grafiikkaa ja esityksiä. Tein yhteistyötä markkinointitiimin kanssa onnistuneiden kampanjoiden toteuttamiseksi."
                        delay="0.2s"
                    />
                    <ExperienceItem 
                        title="Nuorempi suunnittelija"
                        company="PixelPerfect Agency"
                        period="2015 - 2017"
                        description="Avustin vanhempia suunnittelijoita erilaisissa tehtävissä, kuten kuvankäsittelyssä, taitossa ja painoaineistojen valmistelussa. Sain perustavanlaatuista kokemusta nopeatempoisessa toimistoympäristössä."
                        delay="0.4s"
                    />
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;