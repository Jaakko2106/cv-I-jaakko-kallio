import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const HomeSection: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col justify-center items-center text-center p-8 overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-on-scroll fade-in-up drop-shadow-lg">Hei, olen Jaakko</h1>
                <p className="text-xl md:text-2xl mb-8 animate-on-scroll fade-in-up drop-shadow-md" style={{ transitionDelay: '0.2s' }}>Monipuolinen graafinen suunnittelija</p>
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-indigo-200 animate-on-scroll zoom-in" style={{ transitionDelay: '0.4s' }}>
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocIErQDc91ck-z8LvnzwofgI158k8P3kfkldTtQ0pTqMygEIhMMZTA=s539-c-no" alt="Photo of Jaakko" className="w-full h-full object-cover" />
                </div>
                <p className="mt-8 text-lg max-w-2xl mx-auto animate-on-scroll fade-in-up drop-shadow-md" style={{ transitionDelay: '0.6s' }}>
                    Erikoistunut brändäykseen, UI/UX-suunnitteluun ja visuaaliseen kerrontaan. Luon malleja, jotka viestivät tehokkaasti ja jättävät pysyvän vaikutuksen.
                </p>
            </div>
        </section>
    );
};

export default HomeSection;