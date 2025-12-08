import React from 'react';
import AnimatedBackground from './AnimatedBackground';

interface Skill {
    name: string;
    level: number;
}

const skills: Skill[] = [
    { name: "Adobe Photoshop", level: 95 },
    { name: "Adobe Illustrator", level: 90 },
    { name: "Adobe InDesign", level: 85 },
    { name: "Figma / Wireframing", level: 90 },
    { name: "Wordpress", level: 80 },
    { name: "Premiere Pro", level: 70 },
];

const SkillBar: React.FC<{ skill: Skill; delay?: string }> = ({ skill, delay = '0s' }) => (
    <div 
        className="w-full mb-4 animate-on-scroll fade-in-up group/skill" 
        style={{ transitionDelay: delay, '--target-width': `${skill.level}%` } as React.CSSProperties}
    >
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-gray-700">{skill.name}</span>
            <span className="text-sm font-medium text-indigo-600">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 relative group/tooltip cursor-pointer">
            <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out w-0 group-[.is-visible]/skill:w-[var(--target-width)]" 
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
            ></div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 relative shadow-lg whitespace-nowrap">
                    {skill.name}: {skill.level}%
                    <div className="absolute w-2 h-2 bg-gray-800 rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>
            </div>
        </div>
    </div>
);

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 px-8 relative overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">Tietoa minusta</h2>
                
                {/* Introduction */}
                <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                    <div className="md:w-1/3 animate-on-scroll fade-in-left">
                        <img src="omakuva.svg" alt="Jaakko Kallio" className="rounded-full shadow-lg w-48 h-48 md:w-64 md:h-64 object-cover mx-auto" />
                    </div>
                    <div className="md:w-2/3 text-lg text-gray-700 space-y-4 animate-on-scroll fade-in-right">
                        <p>
                            Hei! Olen Jaakko, intohimoinen ja monipuolinen graafinen suunnittelija, jolla on tarkka silmä yksityiskohdille ja rakkaus vakuuttavien visuaalisten tarinoiden luomiseen. Vahvalla suunnitteluperiaatteiden tuntemuksella ja modernilla esteettisellä silmällä autan brändejä yhdistymään yleisöönsä merkityksellisten ja mieleenpainuvien mallien avulla.
                        </p>
                        <p>
                            Osaamiseni kattaa brändi-identiteetin, UI/UX-suunnittelun, digitaalisen kuvituksen ja printtimedian. Innostun haasteista ja olen aina valmis oppimaan uusia taitoja sekä tutkimaan innovatiivisia suunnitteluratkaisuja. Luodaan yhdessä jotain upeaa!
                        </p>
                    </div>
                </div>

                {/* Software Skills */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-indigo-700 animate-on-scroll fade-in">Ohjelmisto-osaaminen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {skills.map((skill, index) => (
                            <SkillBar 
                                key={skill.name} 
                                skill={skill} 
                                delay={`${index * 0.1}s`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;