import { useState } from 'react';
import { FiSend, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/contact', form);
            toast.success('Message sent! We\'ll get back to you soon.');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send message');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14 animate-fade-up">
                    <span className="text-brand-400 text-sm uppercase tracking-widest font-medium">Get in Touch</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Contact Us</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-8 border border-white/5">
                        <h2 className="font-display text-xl font-semibold text-white mb-6">Send us a message</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Your Name</label>
                                <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Email Address</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none" />
                            </div>
                            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                                <FiSend /> {submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>

                    {/* Info + Map */}
                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-5">
                            <h2 className="font-display text-xl font-semibold text-white">Visit Us</h2>
                            {[
                                { icon: <FiMapPin className="text-brand-400 shrink-0" />, text: 'M8CR+JQ8, Lalitpur 44600, Nepal' },
                                { icon: <FiPhone className="text-brand-400 shrink-0" />, text: '974-9453158' },
                                { icon: <FiClock className="text-brand-400 shrink-0" />, text: 'Open daily until 11 PM' },
                            ].map((info, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300">{info.icon} {info.text}</div>
                            ))}
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-white/5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.577!2d85.325!3d27.670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzEyLjAiTiA4NcKwMTknMzAuMCJF!5e0!3m2!1sen!2snp!4v1"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Mama Ko Sekuwa Location"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
