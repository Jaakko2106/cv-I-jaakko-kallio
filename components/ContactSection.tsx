import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

const ContactSection: React.FC = () => {
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
        
        // Optional: Reset status after some time or keep it until user clicks "Send another"
    };

    return (
        <section id="contact" className="py-20 px-8 relative overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700 animate-on-scroll fade-in">Ota yhteyttä</h2>
                <p className="text-lg text-gray-600 mb-10 text-center animate-on-scroll fade-in" style={{ transitionDelay: '0.2s' }}>
                    Olen tällä hetkellä käytettävissä freelance-töihin. Jos sinulla on projekti mielessä tai haluat vain sanoa hei, täytä alla oleva lomake!
                </p>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50 animate-on-scroll zoom-in" style={{ transitionDelay: '0.3s' }}>
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Viesti lähetetty!</h3>
                            <p className="text-gray-600">Kiitos yhteydenotostasi. Palaan asiaan mahdollisimman pian.</p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                            >
                                Lähetä uusi viesti
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nimi</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white/50"
                                    placeholder="Nimesi"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Sähköposti</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white/50"
                                    placeholder="sinun@sähköposti.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Viesti</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white/50 resize-none"
                                    placeholder="Miten voin auttaa?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out text-lg shadow-md flex justify-center items-center ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
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