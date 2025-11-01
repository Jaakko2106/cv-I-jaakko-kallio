import React from 'react';

interface HeaderProps {
    onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50">
            <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 100 100" className="mr-3">
                    <rect width="100" height="100" rx="20" fill="#4f46e5"/>
                    <text x="50" y="65" fontFamily="Inter, sans-serif" fontSize="50" fill="white" textAnchor="middle" fontWeight="bold">J</text>
                </svg>
                <span className="text-xl font-bold text-indigo-700 hidden sm:inline">Jaakko | CV</span>
            </div>
            <div className="flex items-center gap-4">
                 <a 
                    href="/Jaakko_Kallio_CV.pdf" 
                    download 
                    className="bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out text-sm shadow-md inline-flex items-center gap-2 p-2 sm:py-2 sm:px-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    <span className="hidden sm:inline">Download CV</span>
                </a>
                <button id="menu-toggle" onClick={onMenuToggle} className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;