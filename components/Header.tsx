import React from 'react';

interface HeaderProps {
    onMenuToggle: () => void;
    onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearch }) => {
    return (
        <header className="bg-base/40 backdrop-blur-lg border-b border-base-border shadow-sm p-3 sm:p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50 transition-all duration-300">
            {/* Logo and Title */}
            <div className="flex items-center">
                <svg width="36" height="36" viewBox="0 0 100 100" className="mr-2 sm:mr-3 flex-shrink-0 sm:w-[40px] sm:h-[40px]">
                    <rect width="100" height="100" rx="20" fill="var(--accent-primary)"/>
                    <text x="50" y="65" fontFamily="Inter, sans-serif" fontSize="50" fill="white" textAnchor="middle" fontWeight="bold">J</text>
                </svg>
                <span className="text-lg sm:text-xl font-bold text-accent whitespace-nowrap hidden lg:inline">Jaakko | CV</span>
                <span className="text-lg font-bold text-accent hidden sm:inline lg:hidden">J | CV</span>
            </div>

            {/* Search Bar with Icon */}
            <div className="flex-1 mx-2 sm:mx-4 max-w-[160px] sm:max-w-xs md:max-w-md relative group">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3.5 flex items-center pointer-events-none">
                    <svg 
                        className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-accent group-focus-within:text-accent-hover transition-colors duration-200" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Etsi..." 
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="w-full bg-accent/10 border border-transparent focus:bg-base/80 focus:ring-4 focus:ring-accent/20 focus:border-accent rounded-full py-2 sm:py-2.5 pl-8 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-base-text placeholder-accent/50 transition-all outline-none shadow-inner"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-4">
                 <a 
                    href="/Jaakko_Kallio_CV.pdf" 
                    download 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-white font-bold rounded-xl hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 ease-in-out text-sm shadow-md hidden sm:inline-flex items-center gap-2 p-2 sm:py-2.5 sm:px-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    <span className="hidden sm:inline">Lataa CV</span>
                </a>
                <button 
                    id="menu-toggle" 
                    onClick={onMenuToggle} 
                    className="p-2 rounded-xl text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;