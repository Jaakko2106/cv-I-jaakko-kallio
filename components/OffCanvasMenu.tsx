import React from 'react';

interface OffCanvasMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MenuItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

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

    const menuItems: MenuItem[] = [
        {
            href: "#home",
            label: "Etusivu",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        },
        {
            href: "#about",
            label: "Minusta",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        },
        {
            href: "#experience",
            label: "Työkokemus",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a10 10 0 0 1-10 10c-4.42 0-8-3.13-8-7a10 10 0 0 1 10-10c4.42 0 8 3.13 8 7"/><path d="M12 12h.01"/></svg>
        },
        {
            href: "#education",
            label: "Koulutus",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.838a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
        },
        {
            href: "#works",
            label: "Työnäytteet",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><circle cx="12" cy="12" r="10"/><path d="M17.5 6.5 17 7l-1.75 1.75A.5.5 0 0 1 13.75 9l-1.5-1.5a.5.5 0 0 1-.13-.45c-.3-.83-.98-1.5-1.82-1.82a.5.5 0 0 1-.45-.13L7 7.5l.5-.5"/><path d="M4.6 9.4a5.5 5.5 0 0 0 0 7.2L9.4 19"/><path d="M14.6 19.4a5.5 5.5 0 0 0 7.2 0L19.4 14.6"/><path d="M19.4 9.4a5.5 5.5 0 0 0-7.2 0L14.6 4.6"/></svg>
        },
        {
            href: "#contact",
            label: "Ota yhteyttä",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        }
    ];

    return (
        <div id="off-canvas-menu" className={`off-canvas-menu fixed top-0 left-0 h-full w-72 text-white shadow-2xl z-[100] flex flex-col ${isOpen ? 'open' : ''}`}>
            {/* Sidebar Header with Logo and Close button */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 mb-6">
                <div className="flex items-center">
                    <svg width="32" height="32" viewBox="0 0 100 100" className="mr-3">
                        <rect width="100" height="100" rx="20" fill="white"/>
                        <text x="50" y="65" fontFamily="Inter, sans-serif" fontSize="50" fill="#4f46e5" textAnchor="middle" fontWeight="bold">J</text>
                    </svg>
                    <span className="font-bold text-lg tracking-tight">Valikko</span>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors focus:outline-none"
                    aria-label="Sulje valikko"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            {/* Middle: Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <a 
                        key={item.href}
                        href={item.href} 
                        onClick={handleLinkClick} 
                        className="flex items-center px-4 py-3 rounded-xl text-indigo-50 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium group"
                    >
                        <span className="group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                        </span>
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Bottom: User Info */}
            <div className="mt-auto p-6 bg-white/5 border-t border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/20 overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocIErQDc91ck-z8LvnzwofgI158k8P3kfkldTtQ0pTqMygEIhMMZTA=s539-c-no" alt="Jaakko" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-white leading-tight">Jaakko Kallio</p>
                        <p className="text-xs text-indigo-200 font-medium">Graafinen suunnittelija</p>
                    </div>
                </div>
                <a 
                    href="mailto:jaakko.kkallio@gmail.com" 
                    className="text-sm text-indigo-300 hover:text-white transition-colors flex items-center gap-2 mt-3 truncate"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.5 0 4.5 2 4.5 4.5z"/><path d="m22 10-8.53 4.26a2 2 0 0 1-1.94 0L3 10"/></svg>
                    jaakko.kkallio@gmail.com
                </a>
            </div>
        </div>
    );
};

export default OffCanvasMenu;