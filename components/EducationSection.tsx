import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const EducationItem: React.FC<{ degree: string; university: string; period: string; delay?: string }> = ({ degree, university, period, delay = '0s' }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll fade-in-up" style={{ transitionDelay: delay }}>
        <h3 className="text-xl font-bold text-indigo-700">{degree}</h3>
        <p className="text-gray-600 font-semibold">{university}</p>
        <p className="text-sm text-gray-500 mt-1">{period}</p>
    </div>
);

const EducationSection: React.FC = () => {
    return (
        <section id="education" className="py-20 px-8 relative overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">Education</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <EducationItem 
                        degree="Master of Arts in Graphic Design"
                        university="University of Art and Design"
                        period="2013 - 2015"
                    />
                    <EducationItem 
                        degree="Bachelor of Fine Arts in Visual Communication"
                        university="State Design College"
                        period="2010 - 2013"
                        delay="0.2s"
                    />
                </div>
            </div>
        </section>
    );
};

export default EducationSection;