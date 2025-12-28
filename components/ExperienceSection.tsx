import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const ExperienceItem: React.FC<{ title: string; company: string; period: string; description: string; delay?: string }> = ({ title, company, period, description, delay = '0s' }) => (
    <div className="relative pl-8 sm:pl-12 py-6 group animate-on-scroll fade-in-up" style={{ transitionDelay: delay }}>
        <div className="flex items-center mb-1">
            <div className="absolute left-0 h-full w-px bg-indigo-500/50"></div>
            <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-indigo-500 border-2 border-indigo-200 group-hover:bg-indigo-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
        </div>
        <p className="text-indigo-300 font-semibold tracking-wide text-sm mb-2">{company} | {period}</p>
        <p className="text-indigo-100/80 leading-relaxed">
            {description}
        </p>
    </div>
);


const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="py-20 px-8 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-white animate-on-scroll fade-in drop-shadow-md">Työkokemus</h2>
                <div className="relative bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
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