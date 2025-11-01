import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 px-8 relative overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 animate-on-scroll fade-in">About Me</h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/3 animate-on-scroll fade-in-left">
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocIErQDc91ck-z8LvnzwofgI158k8P3kfkldTtQ0pTqMygEIhMMZTA=s539-c-no" alt="Jaakko Kallio" className="rounded-full shadow-lg w-48 h-48 md:w-64 md:h-64 object-cover mx-auto" />
                    </div>
                    <div className="md:w-2/3 text-lg text-gray-700 space-y-4 animate-on-scroll fade-in-right">
                        <p>
                            Hello! I'm Jaakko, a passionate and versatile graphic designer with a keen eye for detail and a love for creating compelling visual narratives. With a strong foundation in design principles and a flair for modern aesthetics, I help brands connect with their audiences through meaningful and memorable designs.
                        </p>
                        <p>
                            My expertise spans across brand identity, UI/UX design, digital illustration, and print media. I thrive on challenges and am always eager to learn new skills and explore innovative design solutions. Let's create something amazing together!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;