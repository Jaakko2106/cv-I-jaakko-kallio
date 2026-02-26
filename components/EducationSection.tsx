import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import { useContent } from './ContentContext';

const EducationItem: React.FC<{ 
    id: string; 
    degree: string; 
    university: string; 
    period: string; 
    delay?: string;
    index: number;
}> = ({ id, degree, university, period, delay = '0s', index }) => {
    const { isEditMode, updateEducation, content } = useContent();

    const handleFieldChange = (field: string, value: string) => {
        const newItems = [...content.education.items];
        newItems[index] = { ...newItems[index], [field]: value };
        updateEducation({ items: newItems });
    };

    const removeItem = () => {
        const newItems = content.education.items.filter((_, i) => i !== index);
        updateEducation({ items: newItems });
    };

    return (
        <div className="bg-base-surface backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-base-border shadow-lg hover:bg-base-text/10 hover:border-accent/30 hover:shadow-accent/20 transition-all duration-300 animate-on-scroll fade-in-up group relative" style={{ transitionDelay: delay }}>
            {isEditMode ? (
                <input 
                    type="text" 
                    value={degree} 
                    onChange={(e) => handleFieldChange('degree', e.target.value)}
                    className="text-xl font-bold text-base-text mb-2 bg-transparent border-b border-accent/20 focus:outline-none w-full"
                />
            ) : (
                <h3 className="text-xl font-bold text-base-text mb-2 group-hover:text-accent transition-colors">{degree}</h3>
            )}

            {isEditMode ? (
                <input 
                    type="text" 
                    value={university} 
                    onChange={(e) => handleFieldChange('university', e.target.value)}
                    className="text-accent font-semibold bg-transparent border-b border-accent/20 focus:outline-none w-full"
                />
            ) : (
                <p className="text-accent font-semibold">{university}</p>
            )}

            {isEditMode ? (
                <input 
                    type="text" 
                    value={period} 
                    onChange={(e) => handleFieldChange('period', e.target.value)}
                    className="text-sm text-base-text/80 mt-1 uppercase tracking-wider bg-transparent border-b border-accent/20 focus:outline-none w-full"
                />
            ) : (
                <p className="text-sm text-base-text/80 mt-1 uppercase tracking-wider">{period}</p>
            )}

            {isEditMode && (
                <button 
                    onClick={removeItem}
                    className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

const EducationSection: React.FC = () => {
    const { content, isEditMode, updateEducation } = useContent();
    const { title, items } = content.education;

    const addItem = () => {
        updateEducation({ 
            items: [
                ...items, 
                { id: Date.now().toString(), degree: "Uusi tutkinto", university: "Yliopisto", period: "2024" }
            ] 
        });
    };

    return (
        <section id="education" className="py-20 px-4 sm:px-8 relative overflow-hidden">
            <AnimatedBackground 
                overlayClassName="bg-accent/10" 
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-bubbles-of-water-in-slow-motion-1162-large.mp4"
            />
            <div className="relative z-10 container mx-auto max-w-4xl">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => updateEducation({ title: e.target.value })}
                        className="text-3xl font-bold text-center mb-12 text-base-text bg-transparent border-b border-accent w-full focus:outline-none drop-shadow-md"
                    />
                ) : (
                    <h2 className="text-3xl font-bold text-center mb-12 text-base-text animate-on-scroll fade-in drop-shadow-md">{title}</h2>
                )}
                
                <div className="grid md:grid-cols-2 gap-8">
                    {items.map((edu, index) => (
                        <EducationItem 
                            key={edu.id}
                            id={edu.id}
                            degree={edu.degree}
                            university={edu.university}
                            period={edu.period}
                            delay={`${index * 0.2}s`}
                            index={index}
                        />
                    ))}
                    {isEditMode && (
                        <button 
                            onClick={addItem}
                            className="bg-accent/10 border-2 border-dashed border-accent/30 rounded-2xl flex items-center justify-center p-8 hover:bg-accent/20 transition-all text-accent font-bold"
                        >
                            + Lisää koulutus
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
