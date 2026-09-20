import React, { useEffect, useState } from 'react';
import { 
    Radar, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { Skill } from '../types';

interface SkillsChartProps {
    skills: Skill[];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ skills }) => {
    const [accentColor, setAccentColor] = useState('#6366f1'); // Default indigo

    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
            if (color) {
                // If it's a CSS variable like var(--accent-indigo-primary), we might need to resolve it
                // but usually it will be a hex or rgb value if set directly in style.
                // In our App.tsx, we set it to var(...) which might not resolve directly with getPropertyValue
                // if we don't resolve the variable.
                // Let's try to get the actual computed color.
                const tempDiv = document.createElement('div');
                tempDiv.style.color = 'var(--accent-primary)';
                document.body.appendChild(tempDiv);
                const computedColor = getComputedStyle(tempDiv).color;
                document.body.removeChild(tempDiv);
                setAccentColor(computedColor);
            }
        };

        updateColor();
        
        // Listen for changes if possible, or just update on mount/skills change
        // Since accent changes via state in App.tsx and updates documentElement style,
        // we might need a MutationObserver or just rely on re-renders if the parent passes it.
        // For now, mount is enough as it re-renders when skills change.
    }, [skills]);

    const data = skills.map(skill => ({
        subject: skill.name,
        A: skill.level,
        fullMark: 100,
    }));

    return (
        <div className="w-full h-[300px] md:h-[400px] animate-on-scroll zoom-in">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="var(--base-border)" strokeOpacity={0.5} />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'var(--base-text)', fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Osaaminen"
                        dataKey="A"
                        stroke={accentColor}
                        fill={accentColor}
                        fillOpacity={0.4}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'var(--base-surface)', 
                            borderColor: 'var(--base-border)',
                            borderRadius: '12px',
                            color: 'var(--base-text)',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: accentColor }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillsChart;
