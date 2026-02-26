import React from 'react';
import { Theme, AccentColor } from '../types';

interface ThemeSwitcherProps {
    currentTheme: Theme;
    currentAccent: AccentColor;
    onThemeChange: (theme: Theme) => void;
    onAccentChange: (accent: AccentColor) => void;
}

const accentColors: { name: AccentColor; var: string }[] = [
    { name: 'indigo', var: 'var(--accent-indigo-primary)' },
    { name: 'emerald', var: 'var(--accent-emerald-primary)' },
    { name: 'rose', var: 'var(--accent-rose-primary)' },
    { name: 'amber', var: 'var(--accent-amber-primary)' },
    { name: 'cyan', var: 'var(--accent-cyan-primary)' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
    currentTheme, 
    currentAccent, 
    onThemeChange, 
    onAccentChange 
}) => {
    return (
        <div className="flex flex-col gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest opacity-70">Teema</span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onThemeChange('dark')}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${currentTheme === 'dark' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white/5 text-base-text hover:bg-white/10'}`}
                    >
                        Tumma
                    </button>
                    <button 
                        onClick={() => onThemeChange('light')}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${currentTheme === 'light' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white/5 text-base-text hover:bg-white/10'}`}
                    >
                        Vaalea
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest opacity-70">Korostusväri</span>
                <div className="flex gap-3 justify-between">
                    {accentColors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => onAccentChange(color.name)}
                            className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${currentAccent === color.name ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            style={{ backgroundColor: color.var }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
