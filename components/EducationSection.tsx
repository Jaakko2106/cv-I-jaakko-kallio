import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const EducationItem: React.FC<{ degree: string; university: string; period: string; delay?: string }> = ({ degree, university, period, delay = '0s' }) => (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/15 hover:border-white/20 hover:shadow-indigo-500/20 transition-all duration-300 animate-on-scroll fade-in-up group" style={{ transitionDelay: delay }}>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">{degree}</h3>
        <p className="text-indigo-300 font-semibold">{university}</p>
        <p className="text-sm text-indigo-200/60 mt-1 uppercase tracking-wider">{period}</p>
    </div>
);

const EducationSection: React.FC = () => {
    return (
        <section id="education" className="py-20 px-8 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-white animate-on-scroll fade-in drop-shadow-md">Koulutus</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <EducationItem 
                        degree="Taiteen maisteri, Graafinen suunnittelu"
                        university="Taideteollinen korkeakoulu"
                        period="2013 - 2015"
                    />
                    <EducationItem 
                        degree="Kuvataiteen kandidaatti, Visuaalinen viestintä"
                        university="Valtion muotoiluopisto"
                        period="2010 - 2013"
                        delay="0.2s"
                    />
                </div>
            </div>
        </section>
    );
};

export default EducationSection;