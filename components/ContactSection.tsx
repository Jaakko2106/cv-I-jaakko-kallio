import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20 px-8 relative overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700 animate-on-scroll fade-in">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
                    I'm currently available for freelance work and open to discussing new projects. If you have a project in mind or just want to say hello, feel free to reach out!
                </p>
                <a 
                    href="mailto:jaakko.kkallio@gmail.com" 
                    className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out text-lg shadow-md inline-block animate-on-scroll zoom-in"
                    style={{ transitionDelay: '0.4s' }}
                >
                    Email Me
                </a>
            </div>
        </section>
    );
};

export default ContactSection;