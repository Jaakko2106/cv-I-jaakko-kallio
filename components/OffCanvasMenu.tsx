import React from 'react';

interface OffCanvasMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const MenuLink: React.FC<{ href: string; label: string; icon: React.ReactElement; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, label, icon, onClick }) => (
    <a href={href} onClick={onClick} className="text-lg hover:text-indigo-200 transition duration-300 ease-in-out rounded-lg px-3 py-2 menu-link flex items-center">
        {icon}
        {label}
    </a>
);


const OffCanvasMenu: React.FC<OffCanvasMenuProps> = ({ isOpen, onClose }) => {

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onClose();
    };


    return (
        <div id="off-canvas-menu" className={`off-canvas-menu fixed top-0 left-0 h-full w-64 text-white shadow-lg p-6 pt-20 z-50 flex flex-col ${isOpen ? 'open' : ''}`}>
            <button id="close-menu" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <nav className="flex flex-col space-y-4">
                <MenuLink href="#home" label="Home" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home mr-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>} onClick={handleLinkClick} />
                <MenuLink href="#about" label="About" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} onClick={handleLinkClick} />
                <MenuLink href="#experience" label="Experience" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-business mr-2"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a10 10 0 0 1-10 10c-4.42 0-8-3.13-8-7a10 10 0 0 1 10-10c4.42 0 8 3.13 8 7"/><path d="M12 12h.01"/></svg>} onClick={handleLinkClick} />
                <MenuLink href="#education" label="Education" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap mr-2"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.838a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>} onClick={handleLinkClick} />
                <MenuLink href="#works" label="Works" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette mr-2"><circle cx="12" cy="12" r="10"/><path d="M17.5 6.5 17 7l-1.75 1.75A.5.5 0 0 1 13.75 9l-1.5-1.5a.5.5 0 0 1-.13-.45c-.3-.83-.98-1.5-1.82-1.82a.5.5 0 0 1-.45-.13L7 7.5l.5-.5"/><path d="M4.6 9.4a5.5 5.5 0 0 0 0 7.2L9.4 19"/><path d="M14.6 19.4a5.5 5.5 0 0 0 7.2 0L19.4 14.6"/><path d="M19.4 9.4a5.5 5.5 0 0 0-7.2 0L14.6 4.6"/></svg>} onClick={handleLinkClick} />
                <MenuLink href="#contact" label="Contact" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>} onClick={handleLinkClick} />
            </nav>
            <div className="mt-auto border-t border-indigo-400 pt-4">
                <p className="font-bold text-lg">Jaakko</p><br />
                <p className="text-sm text-indigo-200">jaakko.kkallio@gmail.com</p>
            </div>
        </div>
    );
};

export default OffCanvasMenu;