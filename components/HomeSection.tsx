import React from 'react';

const HomeSection: React.FC = () => {
    return (
        <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white topography">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-on-scroll fade-in-up">Hi, I'm Jaakko</h1>
                <p className="text-xl md:text-2xl mb-8 animate-on-scroll fade-in-up" style={{ transitionDelay: '0.2s' }}>An All-Around Graphic Designer</p>
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-indigo-200 animate-on-scroll zoom-in" style={{ transitionDelay: '0.4s' }}>
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocIErQDc91ck-z8LvnzwofgI158k8P3kfkldTtQ0pTqMygEIhMMZTA=s539-c-no" alt="Photo of Jaakko" className="w-full h-full object-cover" />
                </div>
                <p className="mt-8 text-lg max-w-2xl mx-auto animate-on-scroll fade-in-up" style={{ transitionDelay: '0.6s' }}>
                    Specializing in branding, UI/UX, and visual storytelling. I create designs that communicate effectively and leave a lasting impression.
                </p>
            </div>
        </section>
    );
};

export default HomeSection;