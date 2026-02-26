import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import { useContent } from './ContentContext';

const ExperienceItem: React.FC<{ 
    id: string; 
    title: string; 
    company: string; 
    period: string; 
    description: string; 
    delay?: string;
    index: number;
}> = ({ id, title, company, period, description, delay = '0s', index }) => {
    const { isEditMode, updateExperience, content } = useContent();

    const handleFieldChange = (field: string, value: string) => {
        const newItems = [...content.experience.items];
        newItems[index] = { ...newItems[index], [field]: value };
        updateExperience({ items: newItems });
    };

    const removeItem = () => {
        const newItems = content.experience.items.filter((_, i) => i !== index);
        updateExperience({ items: newItems });
    };

    return (
        <div className="relative pl-8 sm:pl-12 py-6 group animate-on-scroll fade-in-up" style={{ transitionDelay: delay }}>
            <div className="flex items-center mb-1">
                <div className="absolute left-0 h-full w-px bg-accent/30"></div>
                <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-accent border-2 border-white/20 group-hover:bg-accent-hover group-hover:scale-125 transition-all shadow-lg shadow-accent/20"></div>
                
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="text-xl font-bold text-base-text bg-transparent border-b border-accent/20 focus:outline-none w-full"
                    />
                ) : (
                    <h3 className="text-xl font-bold text-base-text group-hover:text-accent transition-colors">{title}</h3>
                )}
            </div>
            
            {isEditMode ? (
                <div className="flex gap-2 mb-2">
                    <input 
                        type="text" 
                        value={company} 
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        className="text-accent font-semibold tracking-wide text-sm bg-transparent border-b border-accent/20 focus:outline-none"
                    />
                    <span className="text-accent">|</span>
                    <input 
                        type="text" 
                        value={period} 
                        onChange={(e) => handleFieldChange('period', e.target.value)}
                        className="text-accent font-semibold tracking-wide text-sm bg-transparent border-b border-accent/20 focus:outline-none"
                    />
                </div>
            ) : (
                <p className="text-accent font-semibold tracking-wide text-sm mb-2">{company} | {period}</p>
            )}

            {isEditMode ? (
                <textarea 
                    value={description} 
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="text-base-text leading-relaxed bg-transparent border border-accent/20 rounded p-2 focus:outline-none w-full"
                    rows={3}
                />
            ) : (
                <p className="text-base-text leading-relaxed">{description}</p>
            )}

            {isEditMode && (
                <button 
                    onClick={removeItem}
                    className="absolute -left-2 top-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

const ExperienceSection: React.FC = () => {
    const { content, isEditMode, updateExperience } = useContent();
    const { title, items } = content.experience;

    const addItem = () => {
        updateExperience({ 
            items: [
                ...items, 
                { id: Date.now().toString(), title: "Uusi tehtävä", company: "Yritys", period: "2024 - Nykyhetki", description: "Kuvaus..." }
            ] 
        });
    };

    return (
        <section id="experience" className="py-20 px-4 sm:px-8 relative overflow-hidden">
            <AnimatedBackground 
                overlayClassName="bg-accent/10" 
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-particles-4618-large.mp4"
            />
            <div className="relative z-10 container mx-auto max-w-4xl">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => updateExperience({ title: e.target.value })}
                        className="text-3xl font-bold text-center mb-12 text-base-text bg-transparent border-b border-accent w-full focus:outline-none drop-shadow-md"
                    />
                ) : (
                    <h2 className="text-3xl font-bold text-center mb-12 text-base-text animate-on-scroll fade-in drop-shadow-md">{title}</h2>
                )}
                
                <div className="relative bg-base-surface backdrop-blur-sm p-5 sm:p-8 rounded-3xl border border-base-border">
                    {items.map((exp, index) => (
                        <ExperienceItem 
                            key={exp.id}
                            id={exp.id}
                            title={exp.title}
                            company={exp.company}
                            period={exp.period}
                            description={exp.description}
                            delay={`${index * 0.2}s`}
                            index={index}
                        />
                    ))}
                    {isEditMode && (
                        <button 
                            onClick={addItem}
                            className="mt-6 mx-auto block px-4 py-2 bg-accent/20 text-accent hover:bg-accent/30 rounded-xl transition-all text-sm font-bold"
                        >
                            + Lisää työkokemus
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
