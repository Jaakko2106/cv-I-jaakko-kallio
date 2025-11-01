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
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">Work Experience</h2>
                <div className="relative">
                    <ExperienceItem 
                        title="Senior Graphic Designer"
                        company="DesignHub Creative"
                        period="2020 - Present"
                        description="Led branding projects for major clients, mentored junior designers, and developed comprehensive visual identity systems. Specialized in UI/UX for web and mobile applications."
                    />
                    <ExperienceItem 
                        title="Graphic Designer"
                        company="Innovate Solutions Inc."
                        period="2017 - 2020"
                        description="Created marketing collateral, including brochures, social media graphics, and presentations. Collaborated with the marketing team to execute successful campaigns."
                        delay="0.2s"
                    />
                    <ExperienceItem 
                        title="Junior Designer"
                        company="PixelPerfect Agency"
                        period="2015 - 2017"
                        description="Assisted senior designers with various tasks, including image editing, layout design, and preparing files for print. Gained foundational experience in a fast-paced agency environment."
                        delay="0.4s"
                    />
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;