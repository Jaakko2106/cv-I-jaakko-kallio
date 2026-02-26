import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { useContent } from './ContentContext';

const ContactSection: React.FC = () => {
    const { content, isEditMode, updateContact } = useContent();
    const { title, email, phone, address } = content.contact;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Reset form and show success
        setFormData({ name: '', email: '', message: '' });
        setStatus('success');
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-8 relative overflow-hidden">
            <AnimatedBackground 
                overlayClassName="bg-accent/10" 
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-network-of-white-lines-4554-large.mp4"
            />
            <div className="relative z-10 container mx-auto max-w-2xl">
                {isEditMode ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => updateContact({ title: e.target.value })}
                        className="text-3xl font-bold text-center mb-4 text-base-text bg-transparent border-b border-accent w-full focus:outline-none drop-shadow-md"
                    />
                ) : (
                    <h2 className="text-3xl font-bold text-center mb-4 text-base-text animate-on-scroll fade-in drop-shadow-md">{title}</h2>
                )}
                
                <p className="text-lg text-base-text mb-8 text-center animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
                    Olen tällä hetkellä käytettävissä freelance-töihin. Jos sinulla on projekti mielessä tai haluat vain sanoa hei, täytä alla oleva lomake!
                </p>

                {/* Contact Info (Editable in Edit Mode) */}
                {isEditMode && (
                    <div className="bg-base-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-accent/20 mb-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-accent font-bold w-20">Sähköposti:</span>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(e) => updateContact({ email: e.target.value })}
                                className="bg-transparent border-b border-accent/20 focus:outline-none flex-grow text-base-text"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-accent font-bold w-20">Puhelin:</span>
                            <input 
                                type="text" 
                                value={phone} 
                                onChange={(e) => updateContact({ phone: e.target.value })}
                                className="bg-transparent border-b border-accent/20 focus:outline-none flex-grow text-base-text"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-accent font-bold w-20">Osoite:</span>
                            <input 
                                type="text" 
                                value={address} 
                                onChange={(e) => updateContact({ address: e.target.value })}
                                className="bg-transparent border-b border-accent/20 focus:outline-none flex-grow text-base-text"
                            />
                        </div>
                    </div>
                )}

                {/* Social Media Links */}
                <div className="flex justify-center gap-6 mb-10 animate-on-scroll fade-in" style={{ transitionDelay: '0.25s' }}>
                    <a 
                        href={`mailto:${email}`}
                        className="group bg-base-surface border border-base-border p-3 rounded-full hover:bg-accent hover:border-accent-hover hover:scale-110 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300"
                        aria-label="Email"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-text/70 group-hover:text-white transition-colors">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </a>
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group bg-base-surface border border-base-border p-3 rounded-full hover:bg-accent hover:border-accent-hover hover:scale-110 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-text/70 group-hover:text-white transition-colors">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                    <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group bg-base-surface border border-base-border p-3 rounded-full hover:bg-accent hover:border-accent-hover hover:scale-110 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300"
                        aria-label="GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-text/70 group-hover:text-white transition-colors">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
                
                <div className="bg-base-surface backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-base-border animate-on-scroll zoom-in" style={{ transitionDelay: '0.3s' }}>
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-base-text mb-2">Viesti lähetetty!</h3>
                            <p className="text-base-text/70">Kiitos yhteydenotostasi. Palaan asiaan mahdollisimman pian.</p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-accent font-semibold hover:text-accent-hover transition-colors underline decoration-2 underline-offset-4"
                            >
                                Lähetä uusi viesti
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-base-text/80 mb-1 ml-1">Nimi</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-base-border focus:ring-2 focus:ring-accent/40 focus:border-transparent transition-all outline-none bg-base-surface text-base-text placeholder-base-text/40"
                                    placeholder="Nimesi"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-base-text/80 mb-1 ml-1">Sähköposti</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-base-border focus:ring-2 focus:ring-accent/40 focus:border-transparent transition-all outline-none bg-base-surface text-base-text placeholder-base-text/40"
                                    placeholder="sinun@sähköposti.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-base-text/80 mb-1 ml-1">Viesti</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-base-border focus:ring-2 focus:ring-accent/40 focus:border-transparent transition-all outline-none bg-base-surface text-base-text placeholder-base-text/40 resize-none"
                                    placeholder="Miten voin auttaa?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full bg-accent text-white font-bold py-3.5 px-8 rounded-xl hover:bg-accent-hover transition-all duration-300 ease-in-out text-lg shadow-lg hover:shadow-accent/40 flex justify-center items-center ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Lähetetään...
                                    </>
                                ) : (
                                    'Lähetä viesti'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
